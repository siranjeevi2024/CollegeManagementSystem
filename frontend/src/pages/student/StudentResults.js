import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails } from '../../redux/userRelated/userHandle';
import {
    Box, Typography, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, Chip, Grid
} from '@mui/material';

const StudentResults = () => {
    const dispatch = useDispatch();
    const { currentUser, userDetails, loading } = useSelector((state) => state.user);

    useEffect(() => {
        if (currentUser && currentUser._id) {
            dispatch(getUserDetails(currentUser._id, "Student"));
        }
    }, [dispatch, currentUser]);

    const getGradeColor = (grade) => {
        const passGrades = ['O', 'A+', 'A', 'B+', 'B', 'C'];
        return passGrades.includes(grade) ? 'success' : 'error';
    };

    const getGradePoints = (grade) => {
        const gradeMap = {
            'O': 10,
            'A+': 9,
            'A': 8,
            'B+': 7,
            'B': 6,
            'C': 5,
            'D': 4,
            'F': 0
        };
        return gradeMap[grade] || 0;
    };

    const calculateSGPA = (results) => {
        if (!results || results.length === 0) return 0;
        const totalPoints = results.reduce((sum, result) => sum + getGradePoints(result.grade), 0);
        return (totalPoints / results.length).toFixed(2);
    };

    return (
        <Box sx={{ width: '100%', overflow: 'hidden' }}>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <>
                    <Grid container spacing={2} sx={{ mb: 3 }}>
                        <Grid item xs={12}>
                            <Typography variant="h4" align="center">
                                My Results
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Box sx={{ ml: 2 }}>
                                <Typography variant="h6">Name: {userDetails?.name || 'N/A'}</Typography>
                                <Typography variant="h6">Roll No: {userDetails?.rollNum || 'N/A'}</Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={6}>
                            {/* Empty grid item for balance */}
                        </Grid>
                    </Grid>
                    {userDetails && userDetails.examResult && userDetails.examResult.length > 0 ? (
                        <>
                            <TableContainer component={Paper} sx={{ mb: 3 }}>
                                <Table sx={{ minWidth: 650 }} aria-label="results table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>S.No</TableCell>
                                            <TableCell>Subject Code</TableCell>
                                            <TableCell>Subject</TableCell>
                                            <TableCell>Result</TableCell>
                                            <TableCell>Grade</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {userDetails.examResult.map((result, index) => (
                                            <TableRow key={index}>
                                                <TableCell>{index + 1}</TableCell>
                                                <TableCell>{result.subName.subCode || 'N/A'}</TableCell>
                                                <TableCell>{result.subName.subName}</TableCell>
                                                <TableCell>
                                                    <Chip
                                                        label={getGradeColor(result.grade) === 'success' ? 'Pass' : 'Fail'}
                                                        color={getGradeColor(result.grade)}
                                                        variant="outlined"
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <Chip
                                                        label={result.grade || 'N/A'}
                                                        color={getGradeColor(result.grade)}
                                                        variant="outlined"
                                                    />
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2, mr: 2 }}>
                                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                    SGPA: {calculateSGPA(userDetails.examResult)}
                                </Typography>
                            </Box>
                        </>
                    ) : (
                        <Typography variant="body1" align="center">
                            No results available.
                        </Typography>
                    )}
                </>
            )}
        </Box>
    );
};

export default StudentResults;
