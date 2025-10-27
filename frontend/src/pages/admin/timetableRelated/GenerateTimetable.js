import React, { useState } from 'react';
import {
    Box,
    Typography,
    Button,
    Alert,
    CircularProgress,
    Paper
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { generateTimetable } from '../../../redux/timetableRelated/timetableHandle';

const GenerateTimetable = () => {
    const dispatch = useDispatch();
    const { loading, error, message } = useSelector(state => state.timetable);
    const { currentUser } = useSelector(state => state.user);

    const [generated, setGenerated] = useState(false);

    const handleGenerate = () => {
        dispatch(generateTimetable(currentUser._id));
        setGenerated(true);
    };

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
                Generate Automatic Timetable
            </Typography>

            <Paper sx={{ p: 3, mt: 2 }}>
                <Typography variant="body1" gutterBottom>
                    This will automatically generate a timetable based on the subjects, teachers, and classes in your system.
                    It will ensure no teacher or class has overlapping schedules.
                </Typography>

                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    Note: This will replace any existing timetable for your school.
                </Typography>

                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleGenerate}
                    disabled={loading}
                    startIcon={loading && <CircularProgress size={20} />}
                >
                    {loading ? 'Generating...' : 'Generate Timetable'}
                </Button>

                {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
                {message && generated && !loading && (
                    <Alert severity="success" sx={{ mt: 2 }}>
                        {message}
                    </Alert>
                )}

                {message && generated && !loading && (
                    <Box sx={{ mt: 2 }}>
                        <Button
                            variant="outlined"
                            onClick={() => window.location.href = '/Admin/timetable'}
                        >
                            View Timetable
                        </Button>
                    </Box>
                )}
            </Paper>
        </Box>
    );
};

export default GenerateTimetable;
