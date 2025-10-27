import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllStudents } from '../../../redux/studentRelated/studentHandle';
import { getAllSclasses, getAllSubjects } from '../../../redux/sclassRelated/sclassHandle';
import { updateAllExamResults } from '../../../redux/studentRelated/studentHandle';
import {
    Box, Typography, Button, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, TextField, FormControl, InputLabel, Select, MenuItem, Chip
} from '@mui/material';

const PostResults = () => {
    const dispatch = useDispatch();
    const { studentsList, loading: studentsLoading } = useSelector((state) => state.student);
    const { sclassesList, subjectsList } = useSelector((state) => state.sclass);
    const { currentUser } = useSelector(state => state.user);

    const [className, setClassName] = useState('');
    const [sclassStudents, setSclassStudents] = useState([]);
    const [examResults, setExamResults] = useState({});

    useEffect(() => {
        dispatch(getAllStudents(currentUser._id));
        dispatch(getAllSclasses());
        dispatch(getAllSubjects(currentUser._id));
    }, [dispatch, currentUser]);

    const handleClassChange = (event) => {
        const selectedClass = event.target.value;
        setClassName(selectedClass);
        if (selectedClass) {
            const studentsInClass = studentsList.filter(student => student.sclassName._id === selectedClass);
            setSclassStudents(studentsInClass);
            // Get subjects for the selected class
            const classSubjects = subjectsList.filter(subject => subject.sclassName._id === selectedClass);
            // Initialize exam results for each student with all subjects
            const initialResults = {};
            studentsInClass.forEach(student => {
                const existingResults = student.examResult || [];
                const resultsWithAllSubjects = classSubjects.map(subject => {
                    const existing = existingResults.find(result => result.subName._id === subject._id);
                    return existing || { subName: subject, marksObtained: '', grade: '' };
                });
                initialResults[student._id] = resultsWithAllSubjects;
            });
            setExamResults(initialResults);
        } else {
            setSclassStudents([]);
            setExamResults({});
        }
    };

    const handleMarksChange = (studentId, subjectId, marks) => {
        setExamResults(prev => ({
            ...prev,
            [studentId]: prev[studentId].map(result =>
                result.subName._id === subjectId ? { ...result, marksObtained: marks } : result
            )
        }));
    };

    const handleGradeChange = (studentId, subjectId, grade) => {
        setExamResults(prev => ({
            ...prev,
            [studentId]: prev[studentId].map(result =>
                result.subName._id === subjectId ? { ...result, grade } : result
            )
        }));
    };

    const getGradeColor = (grade) => {
        const passGrades = ['O', 'A+', 'A', 'B+', 'B', 'C'];
        return passGrades.includes(grade) ? 'success' : 'error';
    };

    const handleSubmit = async () => {
        try {
            const promises = Object.keys(examResults).map(async (studentId) => {
                const results = examResults[studentId].map(result => ({
                    subName: result.subName._id,
                    marksObtained: result.marksObtained,
                    grade: result.grade
                }));
                return dispatch(updateAllExamResults(studentId, results));
            });
            await Promise.all(promises);
            alert('Results posted successfully!');
            // Clear the form after successful posting
            setClassName('');
            setSclassStudents([]);
            setExamResults({});
        } catch (error) {
            console.error('Error posting results:', error);
            alert('Failed to post results. Please try again.');
        }
    };

    const displayStudents = className ? sclassStudents : [];

    const sortedSclassesList = useMemo(() => {
        return [...sclassesList].sort((a, b) => (a.sclassName || '').localeCompare(b.sclassName || ''));
    }, [sclassesList]);

    return (
        <Box sx={{ width: '100%', overflow: 'hidden' }}>
            {studentsLoading ? (
                <div>Loading...</div>
            ) : (
                <>
                    <Typography variant="h4" align="center" gutterBottom>
                        Post Student Results
                    </Typography>

                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <InputLabel>Select Class</InputLabel>
                        <Select
                            value={className}
                            onChange={handleClassChange}
                            label="Select Class"
                        >
                            <MenuItem value="">
                                <em>Select a class</em>
                            </MenuItem>
                            {sortedSclassesList && sortedSclassesList.map((sclass) => (
                                <MenuItem key={sclass._id} value={sclass._id}>
                                    {sclass.sclassName}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>



                    {displayStudents && displayStudents.length > 0 ? (
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="results table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>S.No</TableCell>
                                        <TableCell>Roll Number</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Subject Code</TableCell>
                                        <TableCell>Subject</TableCell>
                                        <TableCell>Marks</TableCell>
                                        <TableCell>Grade</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {displayStudents.map((student, studentIndex) =>
                                        examResults[student._id] && examResults[student._id].length > 0 ? (
                                            examResults[student._id].map((result, resultIndex) => (
                                                <TableRow key={`${student._id}-${resultIndex}`}>
                                                    {resultIndex === 0 && (
                                                        <>
                                                            <TableCell rowSpan={examResults[student._id].length}>
                                                                {studentIndex + 1}
                                                            </TableCell>
                                                            <TableCell rowSpan={examResults[student._id].length}>
                                                                {student.rollNum}
                                                            </TableCell>
                                                            <TableCell rowSpan={examResults[student._id].length}>
                                                                {student.name}
                                                            </TableCell>
                                                        </>
                                                    )}
                                                    <TableCell>{result.subName.subCode || 'N/A'}</TableCell>
                                                    <TableCell>{result.subName.subName}</TableCell>
                                                    <TableCell>
                                                        <TextField
                                                            type="number"
                                                            value={result.marksObtained || ''}
                                                            onChange={(e) => handleMarksChange(student._id, result.subName._id, e.target.value)}
                                                            size="small"
                                                        />
                                                    </TableCell>
                                                    <TableCell>
                                                        <TextField
                                                            value={result.grade || ''}
                                                            onChange={(e) => handleGradeChange(student._id, result.subName._id, e.target.value)}
                                                            size="small"
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        ) : (
                                            <TableRow key={student._id}>
                                                <TableCell>{studentIndex + 1}</TableCell>
                                                <TableCell>{student.rollNum}</TableCell>
                                                <TableCell>{student.name}</TableCell>
                                                <TableCell colSpan={4} align="center">No subjects available</TableCell>
                                            </TableRow>
                                        )
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    ) : (
                        <Typography variant="body1" align="center">
                            Select a class to post results.
                        </Typography>
                    )}

                    {displayStudents && displayStudents.length > 0 && (
                        <Box sx={{ mt: 2, textAlign: 'center' }}>
                            <Button variant="contained" color="primary" onClick={handleSubmit}>
                                Post Results
                            </Button>
                        </Box>
                    )}
                </>
            )}
        </Box>
    );
};

export default PostResults;
