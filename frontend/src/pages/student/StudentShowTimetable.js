import React, { useEffect } from 'react';
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
    Alert
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getTimetables } from '../../redux/timetableRelated/timetableHandle';

const StudentShowTimetable = () => {
    const dispatch = useDispatch();
    const { timetables, error } = useSelector(state => state.timetable);
    const { currentUser } = useSelector(state => state.user);

    useEffect(() => {
        if (currentUser.sclassName && currentUser.sclassName._id && currentUser.school) {
            dispatch(getTimetables(currentUser.school._id, currentUser.sclassName._id));
        }
    }, [dispatch, currentUser.school, currentUser.sclassName]);

    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    const timeSlots = ['9-10 AM', '10-11 AM', '11-12 PM', '1-2 PM', '2-3 PM', '3-4 PM'];

    const getTimetableForSlot = (day, slot) => {
        return timetables.find(t => t.day === day && t.timeSlot === slot);
    };

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
                Class Timetable - {currentUser.sclassName ? currentUser.sclassName.sclassName : ''}
            </Typography>

            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Time</TableCell>
                            {days.map(day => (
                                <TableCell key={day} align="center">{day}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {timeSlots.map(slot => (
                            <TableRow key={slot}>
                                <TableCell component="th" scope="row">
                                    {slot}
                                </TableCell>
                                {days.map(day => {
                                    const entry = getTimetableForSlot(day, slot);
                                    return (
                                        <TableCell key={day} align="center">
                                            {entry ? (
                                                <Box>
                                                    <Typography variant="body2" fontWeight="bold">
                                                        {entry.subject.subName}
                                                    </Typography>
                                                    <Typography variant="caption" color="text.secondary">
                                                        {entry.teacher.name}
                                                    </Typography>
                                                </Box>
                                            ) : (
                                                <Typography variant="body2" color="text.secondary">
                                                    -
                                                </Typography>
                                            )}
                                        </TableCell>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default StudentShowTimetable;
