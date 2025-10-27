import React, { useEffect, useState, useMemo } from 'react';
import {
    Box,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Alert,
    IconButton
} from '@mui/material';
import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { getExamTimetables, deleteExamTimetable } from '../../../redux/examTimetableRelated/examTimetableHandle';
import { getAllSclasses } from '../../../redux/sclassRelated/sclassHandle';

const ShowExamTimetable = () => {
    const dispatch = useDispatch();
    const { examTimetables, status, error } = useSelector(state => state.examTimetable);
    const { sclassesList } = useSelector(state => state.sclass);
    const { currentUser } = useSelector(state => state.user);

    const [selectedClass, setSelectedClass] = useState('');
    const [selectedSemester, setSelectedSemester] = useState('');

    useEffect(() => {
        dispatch(getAllSclasses(currentUser._id, "Sclass"));
        dispatch(getExamTimetables(currentUser._id, selectedClass, selectedSemester));
    }, [dispatch, currentUser._id, selectedClass, selectedSemester]);

    const handleClassChange = (event) => {
        setSelectedClass(event.target.value);
    };

    const handleSemesterChange = (event) => {
        setSelectedSemester(event.target.value);
    };

    const semesters = ['1st Semester', '2nd Semester', '3rd Semester', '4th Semester', '5th Semester', '6th Semester', '7th Semester', '8th Semester'];

    const sortedSclassesList = useMemo(() => {
        return [...sclassesList].sort((a, b) => (a.sclassName || '').localeCompare(b.sclassName || ''));
    }, [sclassesList]);

    const sortedExamTimetables = useMemo(() => {
        return [...examTimetables];
    }, [examTimetables]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
                Exam Timetable
            </Typography>

            <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                <FormControl sx={{ minWidth: 200 }}>
                    <InputLabel>Filter by Class</InputLabel>
                    <Select
                        value={selectedClass}
                        onChange={handleClassChange}
                        label="Filter by Class"
                    >
                        <MenuItem value="">
                            <em>All Classes</em>
                        </MenuItem>
                        {sortedSclassesList.map(sclass => (
                            <MenuItem key={sclass._id} value={sclass._id}>
                                {sclass.sclassName}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl sx={{ minWidth: 200 }}>
                    <InputLabel>Filter by Semester</InputLabel>
                    <Select
                        value={selectedSemester}
                        onChange={handleSemesterChange}
                        label="Filter by Semester"
                    >
                        <MenuItem value="">
                            <em>All Semesters</em>
                        </MenuItem>
                        {semesters.map(sem => (
                            <MenuItem key={sem} value={sem}>{sem}</MenuItem>
                        ))}
                    </Select>
                </FormControl>


            </Box>

            {status === 'loading' && <Typography>Loading...</Typography>}
            {status === 'failed' && <Alert severity="error">{error}</Alert>}

            {status === 'succeeded' && examTimetables.length === 0 && (
                <Typography>No exam timetable entries found.</Typography>
            )}

            {status === 'succeeded' && examTimetables.length > 0 && (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Semester</TableCell>
                                <TableCell>Exam Date</TableCell>
                                <TableCell>Class</TableCell>
                                <TableCell>Subject</TableCell>

                                <TableCell>Exam Type</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {sortedExamTimetables.map((exam) => (
                                <TableRow key={exam._id}>
                                    <TableCell>{exam.semester}</TableCell>
                                    <TableCell>{formatDate(exam.examDate)}</TableCell>
                                    <TableCell>{exam.sclass?.sclassName}</TableCell>
                                    <TableCell>{exam.subject?.subName}</TableCell>

                                    <TableCell>{exam.examType}</TableCell>
                                    <TableCell>
                                        <IconButton
                                            color="error"
                                            onClick={() => dispatch(deleteExamTimetable(exam._id))}
                                            aria-label="delete"
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}

            <Box sx={{ mt: 3 }}>
                <Button
                    variant="contained"
                    color="primary"
                    component={Link}
                    to="/Admin/addexamtimetable"
                >
                    Add Exam Timetable
                </Button>
            </Box>
        </Box>
    );
};

export default ShowExamTimetable;
