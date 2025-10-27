import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllEvents, deleteEvent } from '../../redux/eventRelated/eventHandle';
import { Paper, Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';

const TeacherEvents = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { currentUser } = useSelector(state => state.user);
    const { eventsList, loading, error } = useSelector(state => state.event);

    const [openDialog, setOpenDialog] = useState(false);
    const [selectedEventId, setSelectedEventId] = useState(null);

    useEffect(() => {
        dispatch(getAllEvents(currentUser.school, "Event"));
    }, [dispatch, currentUser.school]);

    const filteredEvents = Array.isArray(eventsList) ? eventsList.filter(event => event.creator === currentUser._id) : [];

    if (error) {
        console.log(error);
    }

    const handleDeleteClick = (eventId) => {
        setSelectedEventId(eventId);
        setOpenDialog(true);
    };

    const handleConfirmDelete = () => {
        if (selectedEventId) {
            dispatch(deleteEvent(selectedEventId, "Event"))
                .then(() => {
                    dispatch(getAllEvents(currentUser.school, "Event"));
                });
        }
        setOpenDialog(false);
        setSelectedEventId(null);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedEventId(null);
    };

    const eventColumns = [
        { id: 'title', label: 'Title', minWidth: 170 },
        { id: 'description', label: 'Description', minWidth: 100 },
        { id: 'date', label: 'Date', minWidth: 170 },
        { id: 'registrationLink', label: 'Registration Link', minWidth: 170 },
    ];

    const eventRows = Array.isArray(filteredEvents) ? filteredEvents.map((event) => {
        const date = new Date(event.date);
        const dateString = date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
        return {
            title: event.title,
            description: event.description,
            date: dateString,
            registrationLink: event.registrationLink ? (
                <a href={event.registrationLink} target="_blank" rel="noopener noreferrer">
                    Register
                </a>
            ) : 'N/A',
            id: event._id,
        };
    }) : [];

    return (
        <Box sx={{ width: '100%', overflow: 'hidden' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Events
                </Typography>
                <Button variant="contained" color="primary" onClick={() => navigate('/Teacher/events/add')}>
                    Add Event
                </Button>
            </Box>
            <>
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                        {Array.isArray(filteredEvents) && filteredEvents.length > 0 && (
                            <TableContainer>
                                <Table stickyHeader aria-label="sticky table">
                                    <TableHead>
                                        <TableRow>
                                            {eventColumns.map((column) => (
                                                <TableCell
                                                    key={column.id}
                                                    align={column.align}
                                                    style={{ minWidth: column.minWidth }}
                                                >
                                                    {column.label}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {eventRows.map((row) => {
                                            return (
                                                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                                    {eventColumns.map((column) => {
                                                        const value = row[column.id];
                                                        return (
                                                            <TableCell key={column.id} align={column.align}>
                                                                {column.format && typeof value === 'number'
                                                                    ? column.format(value)
                                                                    : value}
                                                            </TableCell>
                                                        );
                                                    })}
                                                    <TableCell>
                                                        <IconButton onClick={() => handleDeleteClick(row.id)}>
                                                            <DeleteIcon color="error" />
                                                        </IconButton>
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        )}
                        {Array.isArray(filteredEvents) && filteredEvents.length === 0 && (
                            <Typography variant="h6" sx={{ textAlign: "center", margin: "50px", padding: "20px" }}>
                                No events found
                            </Typography>
                        )}
                    </Paper>
                )}
            </>
            <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Confirm Deletion"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete this event? This action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancel</Button>
                    <Button onClick={handleConfirmDelete} color="error" autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default TeacherEvents;
