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
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    IconButton,
    Chip,
    Snackbar,
    Alert,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getAssignmentsByTeacher, createAssignment, gradeAssignment, deleteAssignment } from '../../redux/assignmentRelated/assignmentHandle';
import { getAllSubjects } from '../../redux/sclassRelated/sclassHandle';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const TeacherAssignments = () => {
    const dispatch = useDispatch();
    const { assignments, loading, error } = useSelector(state => state.assignment);
    const { subjectsList } = useSelector(state => state.sclass);
    const { currentUser } = useSelector(state => state.user);

    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        dueDate: '',
        subject: '',
    });
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
    const [snackbarKey, setSnackbarKey] = useState(0);

    useEffect(() => {
        if (currentUser && currentUser._id && currentUser.school && currentUser.school._id) {
            dispatch(getAssignmentsByTeacher(currentUser._id));
            dispatch(getAllSubjects(currentUser.school._id));
        }
    }, [dispatch, currentUser]);

    useEffect(() => {
        if (error) {
            setSnackbar({ open: true, message: error, severity: 'error' });
            setSnackbarKey(prev => prev + 1);
        }
    }, [error]);

    useEffect(() => {
        if (!loading && !error && assignments) {
            setSnackbar({ open: true, message: 'Assignments loaded successfully', severity: 'success' });
            setSnackbarKey(prev => prev + 1);
        }
    }, [assignments, loading, error]);

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setFormData({ title: '', description: '', dueDate: '', subject: '' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!currentUser || !currentUser._id || !currentUser.teachSclass || !currentUser.teachSclass._id) {
            setSnackbar({ open: true, message: 'User data is not available. Please try logging in again.', severity: 'error' });
            return;
        }
        const assignmentData = {
            ...formData,
            teacher: currentUser._id,
            sclass: currentUser.teachSclass._id,
        };
        console.log('Assignment Data:', assignmentData); // Debug log
        try {
            await dispatch(createAssignment(assignmentData));
            setSnackbar({ open: true, message: 'Assignment created successfully!', severity: 'success' });
            setSnackbarKey(prev => prev + 1);
            handleClose();
        } catch (error) {
            setSnackbar({ open: true, message: 'Failed to create assignment.', severity: 'error' });
            setSnackbarKey(prev => prev + 1);
        }
    };

    const handleDelete = async (assignmentId) => {
        try {
            await dispatch(deleteAssignment(assignmentId));
            setSnackbar({ open: true, message: 'Assignment deleted successfully!', severity: 'success' });
            setSnackbarKey(prev => prev + 1);
        } catch (error) {
            setSnackbar({ open: true, message: 'Failed to delete assignment.', severity: 'error' });
            setSnackbarKey(prev => prev + 1);
        }
    };

    if (loading) return <Typography>Loading...</Typography>;

    return (
        <Box sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h4">Assignments</Typography>
                <Button variant="contained" startIcon={<AddIcon />} onClick={handleOpen}>
                    Create Assignment
                </Button>
            </Box>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Title</TableCell>
                            <TableCell>Subject</TableCell>
                            <TableCell>Due Date</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {assignments.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} align="center">
                                    <Typography variant="body1" color="textSecondary">
                                        No assignments available
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        ) : (
                            assignments.map((assignment) => (
                                <TableRow key={assignment._id}>
                                    <TableCell>{assignment.title}</TableCell>
                                    <TableCell>{assignment.subject?.subName || 'N/A'}</TableCell>
                                    <TableCell>{new Date(assignment.dueDate).toLocaleDateString()}</TableCell>
                                    <TableCell>
                                        <Chip
                                            label={new Date(assignment.dueDate) > new Date() ? 'Active' : 'Expired'}
                                            color={new Date(assignment.dueDate) > new Date() ? 'success' : 'error'}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <IconButton color="primary">
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton color="error" onClick={() => handleDelete(assignment._id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
                <DialogTitle>Create New Assignment</DialogTitle>
                <DialogContent>
                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                        <TextField
                            fullWidth
                            label="Title"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            required
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            fullWidth
                            label="Description"
                            multiline
                            rows={4}
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            required
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            fullWidth
                            label="Due Date"
                            type="date"
                            value={formData.dueDate}
                            onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                            required
                            InputLabelProps={{ shrink: true }}
                            sx={{ mb: 2 }}
                        />
                        <FormControl fullWidth sx={{ mb: 2 }}>
                            <InputLabel>Subject</InputLabel>
                            <Select
                                value={formData.subject}
                                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                required
                            >
                                {subjectsList.map((subject) => (
                                    <MenuItem key={subject._id} value={subject._id}>
                                        {subject.subName}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit} variant="contained">Create</Button>
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

export default TeacherAssignments;
