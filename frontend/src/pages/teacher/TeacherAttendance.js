import React, { useEffect, useState } from 'react';
import {
    Box,
    Typography,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    IconButton,
    Snackbar,
    Alert,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getClassStudents } from '../../redux/sclassRelated/sclassHandle';
import { markAttendance } from '../../redux/studentRelated/studentHandle'; // Assuming you have this action
import EditIcon from '@mui/icons-material/Edit';

const TeacherAttendance = () => {
    const dispatch = useDispatch();
    const { sclassStudents: studentsList, loading, error } = useSelector(state => state.sclass);
    const { currentUser } = useSelector(state => state.user);

    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [attendanceData, setAttendanceData] = useState({});
    const [open, setOpen] = useState(false);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
    const [snackbarKey, setSnackbarKey] = useState(0);

    useEffect(() => {
        if (currentUser && currentUser.teachSclass && currentUser.teachSclass._id) {
            dispatch(getClassStudents(currentUser.teachSclass._id));
        }
    }, [dispatch, currentUser]);

    useEffect(() => {
        if (error) {
            setSnackbar({ open: true, message: error, severity: 'error' });
            setSnackbarKey(prev => prev + 1);
        }
    }, [error]);

    const handleAttendanceChange = (studentId, status) => {
        setAttendanceData(prev => ({
            ...prev,
            [studentId]: status
        }));
    };

    const handleSubmitAttendance = async () => {
        try {
            for (const [studentId, status] of Object.entries(attendanceData)) {
                await dispatch(markAttendance({ studentId, date: selectedDate, status }));
            }
            setSnackbar({ open: true, message: 'Attendance marked successfully!', severity: 'success' });
            setSnackbarKey(prev => prev + 1);
            setAttendanceData({});
        } catch (error) {
            setSnackbar({ open: true, message: 'Failed to mark attendance.', severity: 'error' });
            setSnackbarKey(prev => prev + 1);
        }
    };

    const handleOpenDialog = () => setOpen(true);
    const handleCloseDialog = () => setOpen(false);

    if (loading) return <Typography>Loading...</Typography>;

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
                Mark Attendance
            </Typography>

            <Box sx={{ mb: 3, display: 'flex', gap: 2, alignItems: 'center' }}>
                <TextField
                    label="Select Date"
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                />
                <Button variant="contained" onClick={handleOpenDialog}>
                    View Attendance
                </Button>
            </Box>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Roll Number</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Attendance Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {studentsList.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={3} align="center">
                                    <Typography variant="body1" color="textSecondary">
                                        No students found
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        ) : (
                            studentsList.map((student) => (
                                <TableRow key={student._id}>
                                    <TableCell>{student.rollNum}</TableCell>
                                    <TableCell>{student.name}</TableCell>
                                    <TableCell>
                                        <FormControl size="small">
                                            <Select
                                                value={attendanceData[student._id] || ''}
                                                onChange={(e) => handleAttendanceChange(student._id, e.target.value)}
                                                displayEmpty
                                            >
                                                <MenuItem value="">
                                                    <em>Select</em>
                                                </MenuItem>
                                                <MenuItem value="Present">Present</MenuItem>
                                                <MenuItem value="Absent">Absent</MenuItem>
                                                <MenuItem value="Late">Late</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
                <Button variant="contained" color="primary" onClick={handleSubmitAttendance}>
                    Submit Attendance
                </Button>
            </Box>

            <Dialog open={open} onClose={handleCloseDialog} maxWidth="md" fullWidth>
                <DialogTitle>Attendance for {selectedDate}</DialogTitle>
                <DialogContent>
                    <Typography variant="body1">
                        Attendance viewing functionality can be implemented here.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Close</Button>
                </DialogActions>
            </Dialog>

            <Snackbar
                key={snackbarKey}
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
            >
                <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default TeacherAttendance;
