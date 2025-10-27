import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllStudents } from '../../redux/studentRelated/studentHandle';
import { useNavigate } from 'react-router-dom';
import {
    Box, Typography, Button, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, Chip, Grid, TextField
} from '@mui/material';
import CustomBarChart from '../../components/CustomBarChart';
import CustomPieChart from '../../components/CustomPieChart';

const TeacherResults = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { studentsList, loading: studentsLoading, error: studentsError } = useSelector((state) => state.student);
    const { currentUser } = useSelector(state => state.user);

    const [showTable, setShowTable] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        dispatch(getAllStudents());
    }, [dispatch]);

    const getGradeColor = (grade) => {
        const passGrades = ['O', 'A+', 'A', 'B+', 'B', 'C'];
        return passGrades.includes(grade) ? 'success' : 'error';
    };

    // Filter students to only those in the teacher's assigned class
    const teacherClassStudents = studentsList.filter(student => student.sclassName._id === currentUser.teachSclass._id);

    // Filter students based on search term
    const filteredStudents = teacherClassStudents.filter(student =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.rollNum.toString().includes(searchTerm)
    );

    // Aggregate grade counts for charts
    const gradeCounts = {};
    teacherClassStudents.forEach(student => {
        if (student.examResult && student.examResult.length > 0) {
            student.examResult.forEach(result => {
                const grade = result.grade || 'N/A';
                gradeCounts[grade] = (gradeCounts[grade] || 0) + 1;
            });
        }
    });

    const barChartData = Object.keys(gradeCounts).map(grade => ({
        grade,
        count: gradeCounts[grade]
    }));

    const pieChartData = Object.keys(gradeCounts).map(grade => ({
        name: grade,
        value: gradeCounts[grade]
    }));

    return (
        <Box sx={{ width: '100%', overflow: 'hidden' }}>
            {studentsLoading ? (
                <div>Loading...</div>
            ) : (
                <>
                    <Typography variant="h4" align="center" gutterBottom>
                        Student Results for {currentUser.teachSclass.sclassName}
                    </Typography>

                    {teacherClassStudents && teacherClassStudents.length > 0 ? (
                        <>
                            {barChartData.length > 0 && (
                                <Box sx={{ mt: 4 }}>
                                    <Typography variant="h5" align="center" gutterBottom>
                                        Grade Distribution
                                    </Typography>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} md={6}>
                                            <Typography variant="h6" align="center" gutterBottom>
                                                Bar Chart
                                            </Typography>
                                            <CustomBarChart chartData={barChartData} dataKey="count" />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <Typography variant="h6" align="center" gutterBottom>
                                                Pie Chart
                                            </Typography>
                                            <CustomPieChart data={pieChartData} />
                                        </Grid>
                                    </Grid>
                                </Box>
                            )}

                            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                                <Button variant="contained" onClick={() => setShowTable(!showTable)}>
                                    {showTable ? 'Hide All Students Marks' : 'View All Students Marks'}
                                </Button>
                            </Box>

                            {showTable && (
                                <>
                                    <TextField
                                        fullWidth
                                        label="Search by Name or Roll Number"
                                        variant="outlined"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        sx={{ mt: 2, mb: 2 }}
                                    />

                                    <TableContainer component={Paper} sx={{ mt: 4 }}>
                                        <Table sx={{ minWidth: 650 }} aria-label="results table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>S.No</TableCell>
                                                    <TableCell>Roll Number</TableCell>
                                                    <TableCell>Name</TableCell>
                                                    <TableCell>Class</TableCell>
                                                    <TableCell>Subject Code</TableCell>
                                                    <TableCell>Subject</TableCell>
                                                    <TableCell>Grade</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {filteredStudents.map((student, studentIndex) =>
                                                    student.examResult && student.examResult.length > 0 ? (
                                                        student.examResult.map((result, resultIndex) => (
                                                            <TableRow key={`${student._id}-${resultIndex}`}>
                                                                {resultIndex === 0 && (
                                                                    <>
                                                                        <TableCell rowSpan={student.examResult.length}>
                                                                            {studentIndex + 1}
                                                                        </TableCell>
                                                                        <TableCell rowSpan={student.examResult.length}>
                                                                            {student.rollNum}
                                                                        </TableCell>
                                                                        <TableCell rowSpan={student.examResult.length}>
                                                                            {student.name}
                                                                        </TableCell>
                                                                        <TableCell rowSpan={student.examResult.length}>
                                                                            {student.sclassName.sclassName}
                                                                        </TableCell>
                                                                    </>
                                                                )}
                                                                <TableCell>{result.subName.subCode || 'N/A'}</TableCell>
                                                                <TableCell>{result.subName.subName}</TableCell>
                                                                <TableCell>
                                                                    <Chip
                                                                        label={result.grade || 'N/A'}
                                                                        color={getGradeColor(result.grade)}
                                                                        variant="outlined"
                                                                    />
                                                                </TableCell>
                                                            </TableRow>
                                                        ))
                                                    ) : (
                                                        <TableRow key={student._id}>
                                                            <TableCell>{studentIndex + 1}</TableCell>
                                                            <TableCell>{student.rollNum}</TableCell>
                                                            <TableCell>{student.name}</TableCell>
                                                            <TableCell>{student.sclassName.sclassName}</TableCell>
                                                            <TableCell colSpan={3} align="center">No results available</TableCell>
                                                        </TableRow>
                                                    )
                                                )}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </>
                            )}
                        </>
                    ) : (
                        <Typography variant="body1" align="center">
                            No students found in your class.
                        </Typography>
                    )}
                </>
            )}
        </Box>
    );
};

export default TeacherResults;
