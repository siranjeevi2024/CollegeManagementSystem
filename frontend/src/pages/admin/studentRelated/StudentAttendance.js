import React, { useEffect, useState, useMemo } from 'react';
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
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Snackbar,
    Alert,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getAllStudentAttendance } from '../../../redux/studentRelated/studentHandle';
import { getAllStudents } from '../../../redux/studentRelated/studentHandle';

const StudentAttendance = () => {
    const dispatch = useDispatch();
    const { studentsList, loading, error } = useSelector(state => state.student);
    const { currentUser } = useSelector(state => state.user);

    const [selectedClass, setSelectedClass] = useState('');
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    // const [attendanceData, setAttendanceData] = useState([]);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
    const [snackbarKey, setSnackbarKey] = useState(0);

    useEffect(() => {
        if (currentUser && currentUser._id) {
            dispatch(getAllStudents(currentUser._id));
            dispatch(getAllStudentAttendance(currentUser._id));
        }
    }, [dispatch, currentUser]);

    const attendanceData = useMemo(() => {
        if (selectedClass && selectedDate && studentsList) {
            return studentsList.filter(att => att.date === selectedDate && att.student.sclassName._id === selectedClass);
        }
        return [];
    }, [selectedClass, selectedDate, studentsList]);

    useEffect(() => {
        if (error) {
            setSnackbar({ open: true, message: error, severity: 'error' });
            setSnackbarKey(prev => prev + 1);
        }
    }, [error]);

    const handleClassChange = (event) => {
        setSelectedClass(event.target.value);
    };

    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
    };

    const uniqueClasses = useMemo(() => {
        return studentsList ? [...new Set(studentsList.map(student => student.sclassName._id))] : [];
    }, [studentsList]);

    const classOptions = useMemo(() => {
        return uniqueClasses.map(classId => {
            const classObj = studentsList.find(student => student.sclassName._id === classId);
            return { id: classId, name: classObj ? classObj.sclassName.sclassName : '' };
        }).sort((a, b) => (a.name || '').localeCompare(b.name || ''));
    }, [uniqueClasses, studentsList]);

    const studentsInClass = useMemo(() => {
        return studentsList ? studentsList.filter(student => student.sclassName._id === selectedClass) : [];
    }, [studentsList, selectedClass]);

    const getAttendanceStatus = useMemo(() => {
        return (studentId) => {
            const attendance = attendanceData.find(att => att.student === studentId);
            return attendance ? attendance.status : 'Not Marked';
        };
    }, [attendanceData]);

    if (loading) return <Typography>Loading...</Typography>;

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
                Student Attendance
            </Typography>

            <Box sx={{ mb: 3, display: 'flex', gap: 2, alignItems: 'center' }}>
                <FormControl sx={{ minWidth: 200 }}>
                    <InputLabel>Select Class</InputLabel>
                    <Select
                        value={selectedClass}
                        onChange={handleClassChange}
                        label="Select Class"
                    >
                        {classOptions.map((classOption) => (
                            <MenuItem key={classOption.id} value={classOption.id}>
                                {classOption.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <TextField
                    label="Select Date"
                    type="date"
                    value={selectedDate}
                    onChange={handleDateChange}
                    InputLabelProps={{ shrink: true }}
                />
            </Box>

            {selectedClass && (
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
                            {studentsInClass.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={3} align="center">
                                        <Typography variant="body1" color="textSecondary">
                                            No students found in this class
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                studentsInClass.map((student) => (
                                    <TableRow key={student._id}>
                                        <TableCell>{student.rollNum}</TableCell>
                                        <TableCell>{student.name}</TableCell>
                                        <TableCell>{getAttendanceStatus(student._id)}</TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}

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

export default StudentAttendance;
