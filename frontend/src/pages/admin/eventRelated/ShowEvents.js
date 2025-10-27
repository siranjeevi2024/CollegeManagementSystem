import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import {
    Paper, Box, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button
} from '@mui/material';
import EventNoteIcon from '@mui/icons-material/EventNote';
import DeleteIcon from "@mui/icons-material/Delete";
import { getAllEvents, deleteEvent } from '../../../redux/eventRelated/eventHandle';
import TableTemplate from '../../../components/TableTemplate';
import { GreenButton } from '../../../components/buttonStyles';
import SpeedDialTemplate from '../../../components/SpeedDialTemplate';

const ShowEvents = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch();
    const { eventsList, loading, error, response } = useSelector((state) => state.event);
    const { currentUser } = useSelector(state => state.user)

    const [openDialog, setOpenDialog] = useState(false);
    const [selectedEventId, setSelectedEventId] = useState(null);

    useEffect(() => {
        dispatch(getAllEvents(currentUser._id, "Event"));
    }, [currentUser._id, dispatch]);

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
                    dispatch(getAllEvents(currentUser._id, "Event"));
                });
        }
        setOpenDialog(false);
        setSelectedEventId(null);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedEventId(null);
    };

    const deleteHandler = (deleteID, address) => {
        dispatch(deleteEvent(deleteID, address))
            .then(() => {
                dispatch(getAllEvents(currentUser._id, "Event"));
            })
    }

    const eventColumns = [
        { id: 'title', label: 'Title', minWidth: 170 },
        { id: 'description', label: 'Description', minWidth: 100 },
        { id: 'date', label: 'Date', minWidth: 170 },
        { id: 'time', label: 'Time', minWidth: 170 },
        { id: 'location', label: 'Location', minWidth: 170 },
        { id: 'registrationLink', label: 'Registration Link', minWidth: 170 },
    ];

    const eventRows = eventsList && eventsList.length > 0 && eventsList.map((event) => {
        const date = new Date(event.date);
        const dateString = date.toString() !== "Invalid Date" ? date.toISOString().substring(0, 10) : "Invalid Date";
        return {
            title: event.title,
            description: event.description,
            date: dateString,
            time: event.time,
            location: event.location,
            registrationLink: event.registrationLink || 'N/A',
            id: event._id,
        };
    });

    const EventButtonHaver = ({ row }) => {
        return (
            <>
                <IconButton onClick={() => handleDeleteClick(row.id)}>
                    <DeleteIcon color="error" />
                </IconButton>
            </>
        );
    };

    const actions = [
        {
            icon: <EventNoteIcon color="primary" />, name: 'Add New Event',
            action: () => navigate("/Admin/addevent")
        },
        {
            icon: <DeleteIcon color="error" />, name: 'Delete All Events',
            action: () => deleteHandler(currentUser._id, "Events")
        }
    ];

    return (
        <>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <>
                    {response ? (
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                            <GreenButton variant="contained"
                                onClick={() => navigate("/Admin/addevent")}>
                                Add Event
                            </GreenButton>
                        </Box>
                    ) : (
                        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                            {Array.isArray(eventsList) && eventsList.length > 0 &&
                                <TableTemplate buttonHaver={EventButtonHaver} columns={eventColumns} rows={eventRows} />
                            }
                            <SpeedDialTemplate actions={actions} />
                        </Paper>
                    )}
                </>
            )}
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
        </>
    );
};

export default ShowEvents;
