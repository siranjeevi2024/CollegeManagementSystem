import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Paper, TextField, Box, Typography } from '@mui/material';
import { createEvent, getAllEvents } from '../../../redux/eventRelated/eventHandle';
import { GreenButton } from '../../../components/buttonStyles';

const AddEvent = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { status, error, loading } = useSelector(state => state.event);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [location, setLocation] = useState('');
    const [registrationLink, setRegistrationLink] = useState('');

    const { currentUser } = useSelector(state => state.user);

    const adminID = currentUser.school;
    const creatorID = currentUser._id;

    const fields = { title, description, date, time, location, registrationLink, adminID, creatorID };

    const submitHandler = (event) => {
        event.preventDefault();
        dispatch(createEvent(fields, "Event"));
    };

    useEffect(() => {
        if (status === 'added') {
            dispatch({ type: 'event/resetStatus' });
            dispatch(getAllEvents(currentUser.school, "Event"));
            navigate('/Teacher/events');
        } else if (status === 'failed') {
            dispatch({ type: 'event/resetStatus' });
        } else if (status === 'error') {
            dispatch({ type: 'event/resetStatus' });
        }
    }, [status, navigate, error, dispatch, currentUser.school]);

    return (
        <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
            <Paper sx={{ p: 4 }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Add Event
                </Typography>
                <form onSubmit={submitHandler}>
                    <TextField
                        fullWidth
                        required
                        label="Title"
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        fullWidth
                        required
                        multiline
                        rows={4}
                        label="Description"
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        fullWidth
                        required
                        type="date"
                        label="Date"
                        InputLabelProps={{ shrink: true }}
                        value={date}
                        onChange={(event) => setDate(event.target.value)}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        fullWidth
                        required
                        type="time"
                        label="Time"
                        InputLabelProps={{ shrink: true }}
                        value={time}
                        onChange={(event) => setTime(event.target.value)}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        fullWidth
                        required
                        label="Location"
                        value={location}
                        onChange={(event) => setLocation(event.target.value)}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        fullWidth
                        label="Registration Link (Optional)"
                        value={registrationLink}
                        onChange={(event) => setRegistrationLink(event.target.value)}
                        sx={{ mb: 2 }}
                    />
                    <GreenButton
                        fullWidth
                        size="large"
                        type="submit"
                        variant="contained"
                        sx={{ mt: 2 }}
                        disabled={loading}
                    >
                        {loading ? "Adding..." : "Add Event"}
                    </GreenButton>
                </form>
            </Paper>
        </Box>
    );
};

export default AddEvent;
