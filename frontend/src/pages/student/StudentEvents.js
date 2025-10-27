import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllEvents } from '../../redux/eventRelated/eventHandle';
import { Paper, Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const StudentEvents = () => {
    const dispatch = useDispatch();
    const { currentUser } = useSelector(state => state.user);
    const { eventsList, loading, error } = useSelector(state => state.event);

    useEffect(() => {
        dispatch(getAllEvents(currentUser.school, "Event"));
    }, [dispatch, currentUser.school]);

    if (error) {
        console.log(error);
    }

    const eventColumns = [
        { id: 'title', label: 'Title', minWidth: 170 },
        { id: 'description', label: 'Description', minWidth: 100 },
        { id: 'date', label: 'Date', minWidth: 170 },
        { id: 'registrationLink', label: 'Registration Link', minWidth: 170 },
    ];

    const eventRows = Array.isArray(eventsList) ? eventsList.map((event) => {
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
            <Typography variant="h4" align="center" gutterBottom>
                Events
            </Typography>
            <>
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                        {Array.isArray(eventsList) && eventsList.length > 0 && (
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
                                                </TableRow>
                                            );
                                        })}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        )}
                        {Array.isArray(eventsList) && eventsList.length === 0 && (
                            <Typography variant="h6" sx={{ textAlign: "center", margin: "50px", padding: "20px" }}>
                                No events found
                            </Typography>
                        )}
                    </Paper>
                )}
            </>
        </Box>
    );
};

export default StudentEvents;
