import * as React from 'react';
import { Divider, ListItemButton, ListItemIcon, ListItemText, ListSubheader } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

import HomeIcon from '@mui/icons-material/Home';
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AnnouncementOutlinedIcon from '@mui/icons-material/AnnouncementOutlined';
import ClassOutlinedIcon from '@mui/icons-material/ClassOutlined';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ScheduleIcon from '@mui/icons-material/Schedule';
import AssessmentIcon from '@mui/icons-material/Assessment';
import EventNoteIcon from '@mui/icons-material/EventNote';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';


import { useSelector } from 'react-redux';

const TeacherSideBar = () => {
    const { currentUser } = useSelector((state) => state.user);
    const sclassName = currentUser.teachSclass

    const location = useLocation();
    return (
        <>
            <React.Fragment>
                <ListItemButton component={Link} to="/">
                    <ListItemIcon>
                        <HomeIcon color={location.pathname === ("/" || "/Teacher/dashboard") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Home" />
                </ListItemButton>
                <ListItemButton component={Link} to="/Teacher/class">
                    <ListItemIcon>
                        <ClassOutlinedIcon color={location.pathname.startsWith("/Teacher/class") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary={`Department ${sclassName.sclassName}`} />
                </ListItemButton>
                <ListItemButton component={Link} to="/Teacher/complain">
                    <ListItemIcon>
                        <AnnouncementOutlinedIcon color={location.pathname.startsWith("/Teacher/complain") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Complain" />
                </ListItemButton>
                <ListItemButton component={Link} to="/Teacher/timetable">
                    <ListItemIcon>
                        <ScheduleIcon color={location.pathname.startsWith("/Teacher/timetable") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Timetable" />
                </ListItemButton>
                <ListItemButton component={Link} to="/Teacher/assignments">
                    <ListItemIcon>
                        <AssignmentIcon color={location.pathname.startsWith("/Teacher/assignments") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Assignments" />
                </ListItemButton>
                <ListItemButton component={Link} to="/Teacher/attendance">
                    <ListItemIcon>
                        <CheckCircleIcon color={location.pathname.startsWith("/Teacher/attendance") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Attendance" />
                </ListItemButton>
                <ListItemButton component={Link} to="/Teacher/results">
                    <ListItemIcon>
                        <AssessmentIcon color={location.pathname.startsWith("/Teacher/results") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Results" />
                </ListItemButton>
                <ListItemButton component={Link} to="/Teacher/events">
                    <ListItemIcon>
                        <EventNoteIcon color={location.pathname.startsWith("/Teacher/events") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Events" />
                </ListItemButton>

            </React.Fragment>
            <Divider sx={{ my: 1 }} />
            <React.Fragment>
                <ListSubheader component="div" inset>
                    User
                </ListSubheader>
                <ListItemButton component={Link} to="/Teacher/profile">
                    <ListItemIcon>
                        <AccountCircleOutlinedIcon color={location.pathname.startsWith("/Teacher/profile") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Profile" />
                </ListItemButton>
                <ListItemButton component={Link} to="/logout">
                    <ListItemIcon>
                        <ExitToAppIcon color={location.pathname.startsWith("/logout") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Logout" />
                </ListItemButton>
            </React.Fragment>
        </>
    )
}

export default TeacherSideBar
