import React, { useEffect, useState } from 'react';
import {
    Box,
    Typography,
    Button,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Alert,
    Snackbar
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSclasses } from '../../../redux/sclassRelated/sclassHandle';
import { getAllSubjects, getAllTeachers } from '../../../redux/sclassRelated/sclassHandle';
import { createTimetable } from '../../../redux/timetableRelated/timetableHandle';

const AddTimetable = () => {
    const dispatch = useDispatch();
    const { sclassesList } = useSelector(state => state.sclass);
    const { subjectsList } = useSelector(state => state.sclass);
    const { teachersList } = useSelector(state => state.sclass);
    const { status, error } = useSelector(state => state.timetable);
    const { currentUser } = useSelector(state => state.user);

    const [formData, setFormData] = useState({
        day: '',
        timeSlot: '',
        subject: '',
        sclass: '',
        teacher: ''
    });

    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success'
    });

    useEffect(() => {
        dispatch(getAllSclasses(currentUser._id, "Sclass"));
        dispatch(getAllSubjects(currentUser._id));
        dispatch(getAllTeachers(currentUser._id));
    }, [dispatch, currentUser._id]);

    const handleChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            ...formData,
            school: currentUser._id
        };
        dispatch(createTimetable(data));
    };

    useEffect(() => {
        if (status === 'success') {
            setSnackbar({
                open: true,
                message: 'Timetable entry created successfully!',
                severity: 'success'
            });
            setFormData({
                day: '',
                timeSlot: '',
                subject: '',
                sclass: '',
                teacher: ''
            });
        } else if (status === 'error') {
            setSnackbar({
                open: true,
                message: error || 'Failed to create timetable entry',
                severity: 'error'
            });
        }
    }, [status, error]);

    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    const timeSlots = ['9-10 AM', '10-11 AM', '11-12 PM', '1-2 PM', '2-3 PM', '3-4 PM'];

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
                Add Timetable Entry
            </Typography>

            <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 600, mt: 3 }}>
                <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel>Day</InputLabel>
                    <Select
                        value={formData.day}
                        onChange={(e) => handleChange('day', e.target.value)}
                        label="Day"
                        required
                    >
                        {days.map(day => (
                            <MenuItem key={day} value={day}>{day}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel>Time Slot</InputLabel>
                    <Select
                        value={formData.timeSlot}
                        onChange={(e) => handleChange('timeSlot', e.target.value)}
                        label="Time Slot"
                        required
                    >
                        {timeSlots.map(slot => (
                            <MenuItem key={slot} value={slot}>{slot}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel>Class</InputLabel>
                    <Select
                        value={formData.sclass}
                        onChange={(e) => handleChange('sclass', e.target.value)}
                        label="Class"
                        required
                    >
                        {sclassesList.map(sclass => (
                            <MenuItem key={sclass._id} value={sclass._id}>{sclass.sclassName}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel>Subject</InputLabel>
                    <Select
                        value={formData.subject}
                        onChange={(e) => handleChange('subject', e.target.value)}
                        label="Subject"
                        required
                    >
                        {subjectsList.map(subject => (
                            <MenuItem key={subject._id} value={subject._id}>{subject.subName}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl fullWidth sx={{ mb: 3 }}>
                    <InputLabel>Teacher</InputLabel>
                    <Select
                        value={formData.teacher}
                        onChange={(e) => handleChange('teacher', e.target.value)}
                        label="Teacher"
                        required
                    >
                        {teachersList.map(teacher => (
                            <MenuItem key={teacher._id} value={teacher._id}>{teacher.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    disabled={!formData.day || !formData.timeSlot || !formData.subject || !formData.sclass || !formData.teacher}
                >
                    Add Timetable Entry
                </Button>
            </Box>

            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
            >
                <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default AddTimetable;
