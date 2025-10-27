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
    Chip,
    IconButton,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getAssignmentsByStudent, submitAssignment } from '../../redux/assignmentRelated/assignmentHandle';
import UploadIcon from '@mui/icons-material/Upload';
import VisibilityIcon from '@mui/icons-material/Visibility';

const StudentAssignments = () => {
    const dispatch = useDispatch();
    const { assignments, loading } = useSelector(state => state.assignment);
    const { currentUser } = useSelector(state => state.user);

    const [open, setOpen] = useState(false);
    const [selectedAssignment, setSelectedAssignment] = useState(null);
    const [submissionText, setSubmissionText] = useState('');

    useEffect(() => {
        if (currentUser?._id) {
            dispatch(getAssignmentsByStudent(currentUser._id));
        }
    }, [dispatch, currentUser]);

    const handleOpen = (assignment) => {
        setSelectedAssignment(assignment);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedAssignment(null);
        setSubmissionText('');
    };

    const handleSubmit = async () => {
        if (selectedAssignment && submissionText.trim()) {
            const submissionData = {
                assignmentId: selectedAssignment._id,
                content: submissionText,
                studentId: currentUser._id,
            };
            try {
                await dispatch(submitAssignment(submissionData));
                // Re-fetch assignments to update status
                dispatch(getAssignmentsByStudent(currentUser._id));
                handleClose();
            } catch (error) {
                // Handle error if needed
            }
        }
    };

    if (loading) return <Typography>Loading...</Typography>;

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" sx={{ mb: 3 }}>My Assignments</Typography>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Title</TableCell>
                            <TableCell>Subject</TableCell>
                            <TableCell>Due Date</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Grade</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {assignments.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} align="center">
                                    <Typography variant="body1" color="textSecondary">
                                        No assignments available
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        ) : (
                            assignments.map((assignment) => {
                                const submission = assignment.submissions?.find(
                                    sub => sub.student.toString() === currentUser._id
                                );
                                const isSubmitted = !!submission;
                                const isOverdue = new Date(assignment.dueDate) < new Date();

                                return (
                                    <TableRow key={assignment._id}>
                                        <TableCell>{assignment.title}</TableCell>
                                        <TableCell>{assignment.subject?.subName || 'N/A'}</TableCell>
                                        <TableCell>{new Date(assignment.dueDate).toLocaleDateString()}</TableCell>
                                        <TableCell>
                                            <Chip
                                                label={
                                                    isSubmitted
                                                        ? 'Submitted'
                                                        : isOverdue
                                                            ? 'Overdue'
                                                            : 'Pending'
                                                }
                                                color={
                                                    isSubmitted
                                                        ? 'success'
                                                        : isOverdue
                                                            ? 'error'
                                                            : 'warning'
                                                }
                                            />
                                        </TableCell>
                                        <TableCell>{submission?.grade || 'Not graded'}</TableCell>
                                        <TableCell>
                                            <IconButton
                                                color="primary"
                                                onClick={() => handleOpen(assignment)}
                                                disabled={isSubmitted}
                                            >
                                                {isSubmitted ? <VisibilityIcon /> : <UploadIcon />}
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                );
                            })
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
                <DialogTitle>{selectedAssignment?.title}</DialogTitle>
                <DialogContent>
                    <Typography variant="body1" sx={{ mb: 2 }}>
                        {selectedAssignment?.description}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                        Due Date: {selectedAssignment ? new Date(selectedAssignment.dueDate).toLocaleDateString() : ''}
                    </Typography>
                    <TextField
                        fullWidth
                        label="Your Submission"
                        multiline
                        rows={6}
                        value={submissionText}
                        onChange={(e) => setSubmissionText(e.target.value)}
                        placeholder="Enter your assignment submission here..."
                        sx={{ mt: 2 }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit} variant="contained" disabled={!submissionText.trim()}>
                        Submit Assignment
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default StudentAssignments;
