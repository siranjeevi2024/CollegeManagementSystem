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
    Chip,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getStudentAttendance } from '../../redux/studentRelated/studentHandle';

const ViewStdAttendance = () => {
    const dispatch = useDispatch();
    const { studentsList, loading, error } = useSelector(state => state.student);
    const { currentUser } = useSelector(state => state.user);

    const [attendanceData, setAttendanceData] = useState([]);

    useEffect(() => {
        if (currentUser?._id) {
            dispatch(getStudentAttendance(currentUser._id))
                .then((result) => {
                    if (result.payload) {
                        setAttendanceData(result.payload);
                    }
                });
        }
    }, [dispatch, currentUser]);

    if (loading) return <Typography>Loading...</Typography>;

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
                My Attendance
            </Typography>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Date</TableCell>
                            <TableCell>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {attendanceData.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={2} align="center">
                                    <Typography variant="body1" color="textSecondary">
                                        No attendance records found
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        ) : (
                            attendanceData.attendance && attendanceData.attendance.map((record, index) => (
                                <TableRow key={index}>
                                    <TableCell>{new Date(record.date).toLocaleDateString()}</TableCell>
                                    <TableCell>
                                        <Chip
                                            label={record.status}
                                            color={
                                                record.status === 'Present'
                                                    ? 'success'
                                                    : record.status === 'Absent'
                                                        ? 'error'
                                                        : 'warning'
                                            }
                                        />
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default ViewStdAttendance;
