import React, { useEffect, useState } from 'react';
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
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Alert
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getExamTimetables } from '../../redux/examTimetableRelated/examTimetableHandle';
import { getSubjectList } from '../../redux/sclassRelated/sclassHandle';

const StudentShowExamTimetable = () => {
    const dispatch = useDispatch();
    const { examTimetables, status, error } = useSelector(state => state.examTimetable);
    const { subjectsList } = useSelector((state) => state.sclass);
    const { currentUser } = useSelector(state => state.user);

    const [selectedSemester, setSelectedSemester] = useState('');

    useEffect(() => {
        if (currentUser && currentUser.sclass) {
            // Get exam timetables for the student's class
            dispatch(getExamTimetables(currentUser.school, currentUser.sclass._id, selectedSemester));
            // Get subjects for the student's class
            dispatch(getSubjectList(currentUser.sclass._id, "ClassSubjects"));
        }
    }, [dispatch, currentUser, selectedSemester]);

    const handleSemesterChange = (event) => {
        setSelectedSemester(event.target.value);
    };

    const semesters = ['1st Semester', '2nd Semester', '3rd Semester', '4th Semester', '5th Semester', '6th Semester', '7th Semester', '8th Semester'];

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

            <Box sx={{ mb: 3 }}>
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

            {status === 'succeeded' && subjectsList && subjectsList.length > 0 && (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Subject</TableCell>
                                <TableCell>Subject Code</TableCell>
                                <TableCell>Exam Date</TableCell>
                                <TableCell>Exam Type</TableCell>
                                <TableCell>Teacher</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {subjectsList.map((subject) => {
                                const exam = examTimetables.find(ex => ex.subject._id === subject._id && (!selectedSemester || ex.semester === selectedSemester));
                                return (
                                    <TableRow key={subject._id}>
                                        <TableCell>{subject.subName}</TableCell>
                                        <TableCell>{subject.subCode}</TableCell>
                                        <TableCell>{exam ? formatDate(exam.examDate) : 'Not Scheduled'}</TableCell>
                                        <TableCell>{exam ? exam.examType : '-'}</TableCell>
                                        <TableCell>{exam ? exam.teacher?.name : '-'}</TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}

            {status === 'succeeded' && (!subjectsList || subjectsList.length === 0) && (
                <Typography>No subjects found for your class.</Typography>
            )}
        </Box>
    );
};

export default StudentShowExamTimetable;
