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
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Alert
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getTimetables } from '../../../redux/timetableRelated/timetableHandle';
import { getAllSclasses } from '../../../redux/sclassRelated/sclassHandle';

const ShowTimetable = () => {
    const dispatch = useDispatch();
    const { timetables, error } = useSelector(state => state.timetable);
    const { sclassesList } = useSelector(state => state.sclass);
    const { currentUser } = useSelector(state => state.user);

    const [selectedClass, setSelectedClass] = useState('');

    useEffect(() => {
        dispatch(getAllSclasses(currentUser._id, "Sclass"));
    }, [dispatch, currentUser._id]);

    useEffect(() => {
        if (sclassesList.length > 0 && !selectedClass) {
            setSelectedClass(sclassesList[0]._id);
        }
    }, [sclassesList, selectedClass]);

    useEffect(() => {
        if (selectedClass) {
            dispatch(getTimetables(currentUser._id, selectedClass));
        }
    }, [dispatch, currentUser._id, selectedClass]);

    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    const timeSlots = ['9-10 AM', '10-11 AM', '11-12 PM', '1-2 PM', '2-3 PM', '3-4 PM'];

    const getTimetableForSlot = (day, slot) => {
        const entry = timetables.find(t => t.day === day && t.timeSlot === slot);
        return entry;
    };

    const sortedSclassesList = useMemo(() => {
        return [...sclassesList].sort((a, b) => (a.sclassName || '').localeCompare(b.sclassName || ''));
    }, [sclassesList]);

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
                Timetable
            </Typography>

            <Box sx={{ mb: 3 }}>
                <FormControl fullWidth sx={{ maxWidth: 300 }}>
                    <InputLabel>Select Class</InputLabel>
                    <Select
                        value={selectedClass}
                        onChange={(e) => setSelectedClass(e.target.value)}
                        label="Select Class"
                    >

                        {sortedSclassesList.map((sclass) => (
                            <MenuItem key={sclass._id} value={sclass._id}>
                                {sclass.sclassName}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>

            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

            {true && (
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
            )}

            <Box sx={{ mt: 3 }}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => window.location.href = '/Admin/generatetimetable'}
                    sx={{ mr: 2 }}
                >
                    Generate New Timetable
                </Button>
                <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => window.location.href = '/Admin/addtimetable'}
                >
                    Add Timetable Entry
                </Button>
            </Box>
        </Box>
    );
};

export default ShowTimetable;
