import React, { useEffect, useState, useMemo } from 'react';
import {
    Box,
    Typography,
    Button,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Alert,
    Snackbar,
    TextField
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSclasses } from '../../../redux/sclassRelated/sclassHandle';
import { getAllSubjects, getAllTeachers } from '../../../redux/sclassRelated/sclassHandle';
import { createExamTimetable } from '../../../redux/examTimetableRelated/examTimetableHandle';

const AddExamTimetable = () => {
    const dispatch = useDispatch();
    const { sclassesList } = useSelector(state => state.sclass);
    const { subjectsList } = useSelector(state => state.sclass);
    const { teachersList } = useSelector(state => state.sclass);
    const { status, error } = useSelector(state => state.examTimetable);
    const { currentUser } = useSelector(state => state.user);

    const [formData, setFormData] = useState({
        semester: '',
        examDate: '',
        subject: '',
        sclass: '',
        teacher: '',
        examType: 'Final'
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
            [field]: value,
            ...(field === 'sclass' && { subject: '' }) // Reset subject when class changes
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            ...formData,
            school: currentUser._id
        };
        dispatch(createExamTimetable(data));
    };

    useEffect(() => {
        if (status === 'succeeded') {
            setSnackbar({
                open: true,
                message: 'Exam timetable entry created successfully!',
                severity: 'success'
            });
            setFormData({
                semester: '',
                examDate: '',
                subject: '',
                sclass: '',
                teacher: '',
                examType: 'Final'
            });
        } else if (status === 'failed') {
            setSnackbar({
                open: true,
                message: error || 'Failed to create exam timetable entry',
                severity: 'error'
            });
        }
    }, [status, error]);

    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    const semesters = ['1st Semester', '2nd Semester', '3rd Semester', '4th Semester', '5th Semester', '6th Semester', '7th Semester', '8th Semester'];
    const examTypes = ['Mid-term', 'Final', 'Quiz', 'Assignment'];

    const sortedSclassesList = useMemo(() => {
        return [...sclassesList].sort((a, b) => (a.sclassName || '').localeCompare(b.sclassName || ''));
    }, [sclassesList]);

    const filteredSubjectsList = useMemo(() => {
        return [...subjectsList].sort((a, b) => (a.subName || '').localeCompare(b.subName || ''));
    }, [subjectsList]);

    const sortedTeachersList = useMemo(() => {
        return [...teachersList].sort((a, b) => (a.name || '').localeCompare(b.name || ''));
    }, [teachersList]);

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
                Add Exam Timetable Entry
            </Typography>

            <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 600, mt: 3 }}>
                <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel>Semester</InputLabel>
                    <Select
                        value={formData.semester}
                        onChange={(e) => handleChange('semester', e.target.value)}
                        label="Semester"
                        required
                    >
                        {semesters.map(sem => (
                            <MenuItem key={sem} value={sem}>{sem}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <TextField
                    fullWidth
                    sx={{ mb: 2 }}
                    label="Exam Date"
                    type="date"
                    value={formData.examDate}
                    onChange={(e) => handleChange('examDate', e.target.value)}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    required
                />

                <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel>Class</InputLabel>
                    <Select
                        value={formData.sclass}
                        onChange={(e) => handleChange('sclass', e.target.value)}
                        label="Class"
                        required
                    >
                        {sortedSclassesList.map(sclass => (
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
                        disabled={!formData.sclass}
                    >
                        {filteredSubjectsList.map(subject => (
                            <MenuItem key={subject._id} value={subject._id}>{subject.subName}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel>Teacher</InputLabel>
                    <Select
                        value={formData.teacher}
                        onChange={(e) => handleChange('teacher', e.target.value)}
                        label="Teacher"
                        required
                        disabled={!formData.sclass}
                    >
                        {sortedTeachersList.map(teacher => (
                            <MenuItem key={teacher._id} value={teacher._id}>{teacher.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl fullWidth sx={{ mb: 3 }}>
                    <InputLabel>Exam Type</InputLabel>
                    <Select
                        value={formData.examType}
                        onChange={(e) => handleChange('examType', e.target.value)}
                        label="Exam Type"
                        required
                    >
                        {examTypes.map(type => (
                            <MenuItem key={type} value={type}>{type}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    disabled={!formData.semester || !formData.examDate || !formData.subject || !formData.sclass || !formData.teacher}
                >
                    Add Exam Timetable Entry
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

export default AddExamTimetable;
