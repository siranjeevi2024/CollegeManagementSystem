import React, { useEffect } from 'react'
import { Container, Grid, Paper } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails } from '../../redux/userRelated/userHandle';
import styled from 'styled-components';
import SeeNotice from '../../components/SeeNotice';
import CountUp from 'react-countup';
import Subject from "../../assets/subjects.svg";
import Assignment from "../../assets/assignment.svg";
import { getSubjectList } from '../../redux/sclassRelated/sclassHandle';
import { getAssignmentsByStudent } from '../../redux/assignmentRelated/assignmentHandle';
import CalendarWidget from '../../components/CalendarWidget';
import ClockWidget from '../../components/ClockWidget';

const StudentHomePage = () => {
    const dispatch = useDispatch();

    const { currentUser } = useSelector((state) => state.user);
    const { subjectsList } = useSelector((state) => state.sclass);
    const { assignments } = useSelector((state) => state.assignment);

    const classID = currentUser.sclassName._id

    useEffect(() => {
        dispatch(getUserDetails(currentUser._id, "Student"));
        dispatch(getSubjectList(classID, "ClassSubjects"));
        dispatch(getAssignmentsByStudent(currentUser._id));
    }, [dispatch, currentUser._id, classID]);

    const numberOfSubjects = subjectsList && subjectsList.length;
    const numberOfAssignments = assignments && assignments.length;

    return (
        <>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={4} lg={4}>
                        <StyledPaper>
                            <img src={Subject} alt="Subjects" />
                            <Title>
                                Total Subjects
                            </Title>
                            <Data start={0} end={numberOfSubjects} duration={2.5} />
                        </StyledPaper>
                    </Grid>
                    <Grid item xs={12} md={4} lg={4}>
                        <StyledPaper>
                            <img src={Assignment} alt="Assignments" />
                            <Title>
                                Total Assignments
                            </Title>
                            <Data start={0} end={numberOfAssignments} duration={4} />
                        </StyledPaper>
                    </Grid>
                    <Grid item xs={12} md={4} lg={4}>
                        <StyledPaper>
                            <ClockWidget />
                        </StyledPaper>
                    </Grid>

                    <Grid item xs={12}>
                        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                            <SeeNotice />
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}



const StyledPaper = styled(Paper)`
  padding: 16px;
  display: flex;
  flex-direction: column;
  height: 200px;
  justify-content: space-between;
  align-items: center;
  text-align: center;
`;

const Title = styled.p`
  font-size: 1.25rem;
`;

const Data = styled(CountUp)`
  font-size: calc(1.3rem + .6vw);
  color: green;
`;



export default StudentHomePage