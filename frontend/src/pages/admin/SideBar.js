import * as React from 'react';
import { Divider, ListItemButton, ListItemIcon, ListItemText, ListSubheader } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

import HomeIcon from "@mui/icons-material/Home";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AnnouncementOutlinedIcon from '@mui/icons-material/AnnouncementOutlined';
import ClassOutlinedIcon from '@mui/icons-material/ClassOutlined';
import SupervisorAccountOutlinedIcon from '@mui/icons-material/SupervisorAccountOutlined';
import ReportIcon from '@mui/icons-material/Report';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ScheduleIcon from '@mui/icons-material/Schedule';
import AssessmentIcon from '@mui/icons-material/Assessment';
import GradeIcon from '@mui/icons-material/Grade';
import EventIcon from '@mui/icons-material/Event';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const SideBar = () => {
    const location = useLocation();
    return (
        <>
            <React.Fragment>
                <ListItemButton component={Link} to="/">
                    <ListItemIcon>
                        <HomeIcon color={location.pathname === "/" || location.pathname === "/Admin/dashboard" ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Home" />
                </ListItemButton>
                <ListItemButton component={Link} to="/Admin/classes">
                    <ListItemIcon>
                        <ClassOutlinedIcon color={location.pathname.startsWith('/Admin/classes') ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Departments" />
                </ListItemButton>
                <ListItemButton component={Link} to="/Admin/subjects">
                    <ListItemIcon>
                        <AssignmentIcon color={location.pathname.startsWith("/Admin/subjects") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Subjects" />
                </ListItemButton>
                <ListItemButton component={Link} to="/Admin/teachers">
                    <ListItemIcon>
                        <SupervisorAccountOutlinedIcon color={location.pathname.startsWith("/Admin/teachers") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Teachers" />
                </ListItemButton>
                <ListItemButton component={Link} to="/Admin/students">
                    <ListItemIcon>
                        <PersonOutlineIcon color={location.pathname.startsWith("/Admin/students") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Students" />
                </ListItemButton>
                <ListItemButton component={Link} to="/Admin/attendance">
                    <ListItemIcon>
                        <CheckCircleIcon color={location.pathname.startsWith("/Admin/attendance") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Attendance" />
                </ListItemButton>
                <ListItemButton component={Link} to="/Admin/notices">
                    <ListItemIcon>
                        <AnnouncementOutlinedIcon color={location.pathname.startsWith("/Admin/notices") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Notices" />
                </ListItemButton>
                <ListItemButton component={Link} to="/Admin/complains">
                    <ListItemIcon>
                        <ReportIcon color={location.pathname.startsWith("/Admin/complains") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Complains" />
                </ListItemButton>
                <ListItemButton component={Link} to="/Admin/timetable">
                    <ListItemIcon>
                        <ScheduleIcon color={location.pathname.startsWith("/Admin/timetable") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Timetable" />
                </ListItemButton>
                <ListItemButton component={Link} to="/Admin/examtimetable">
                    <ListItemIcon>
                        <AssessmentIcon color={location.pathname.startsWith("/Admin/examtimetable") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Exam Timetable" />
                </ListItemButton>
                <ListItemButton component={Link} to="/Admin/results">
                    <ListItemIcon>
                        <GradeIcon color={location.pathname.startsWith("/Admin/results") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Results" />
                </ListItemButton>
                <ListItemButton component={Link} to="/Admin/postresults">
                    <ListItemIcon>
                        <GradeIcon color={location.pathname.startsWith("/Admin/postresults") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Post Results" />
                </ListItemButton>
                <ListItemButton component={Link} to="/Admin/events">
                    <ListItemIcon>
                        <EventIcon color={location.pathname.startsWith("/Admin/events") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Events" />
                </ListItemButton>
            </React.Fragment>
            <Divider sx={{ my: 1 }} />
            <React.Fragment>
                <ListSubheader component="div" inset>
                    User
                </ListSubheader>
                <ListItemButton component={Link} to="/Admin/profile">
                    <ListItemIcon>
                        <AccountCircleOutlinedIcon color={location.pathname.startsWith("/Admin/profile") ? 'primary' : 'inherit'} />
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

export default SideBar
