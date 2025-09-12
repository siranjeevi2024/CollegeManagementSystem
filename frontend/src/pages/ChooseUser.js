import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Grid,
  Paper,
  Box,
  Container,
  CircularProgress,
  Backdrop,
} from '@mui/material';
import { AccountCircle, School, Group } from '@mui/icons-material';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/userRelated/userHandle';
import Popup from '../components/Popup';

const ChooseUser = ({ visitor }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const password = "zxc";

  const { status, currentUser, currentRole } = useSelector(state => state.user);

  const [loader, setLoader] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");

  const navigateHandler = (user) => {
    if (user === "Admin") {
      if (visitor === "guest") {
        const email = "yogendra@12";
        const fields = { email, password };
        setLoader(true);
        dispatch(loginUser(fields, user));
      } else {
        navigate('/Adminlogin');
      }
    }

    else if (user === "Student") {
      if (visitor === "guest") {
        const rollNum = "1";
        const studentName = "Dipesh Awasthi";
        const fields = { rollNum, studentName, password };
        setLoader(true);
        dispatch(loginUser(fields, user));
      } else {
        navigate('/Studentlogin');
      }
    }

    else if (user === "Teacher") {
      if (visitor === "guest") {
        const email = "tony@12";
        const fields = { email, password };
        setLoader(true);
        dispatch(loginUser(fields, user));
      } else {
        navigate('/Teacherlogin');
      }
    }
  };

  useEffect(() => {
    if (status === 'success' || currentUser !== null) {
      if (currentRole === 'Admin') {
        navigate('/Admin/dashboard');
      }
      else if (currentRole === 'Student') {
        navigate('/Student/dashboard');
      } else if (currentRole === 'Teacher') {
        navigate('/Teacher/dashboard');
      }
    }
    else if (status === 'error') {
      setLoader(false);
      setMessage("Network Error");
      setShowPopup(true);
    }
  }, [status, currentRole, navigate, currentUser]);

  return (
    <StyledContainer>
      <Container>
        <Title>Choose Your Role</Title>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <Card onClick={() => navigateHandler("Admin")} rolecolor="#3f8efc">
              <Box mb={2}>
                <AccountCircle fontSize="large" />
              </Box>
              <CardTitle>Admin</CardTitle>
              <CardDesc>
                Login as an administrator to access the dashboard to manage app data.
              </CardDesc>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card onClick={() => navigateHandler("Student")} rolecolor="#3efc81">
              <Box mb={2}>
                <School fontSize="large" />
              </Box>
              <CardTitle>Student</CardTitle>
              <CardDesc>
                Login as a student to explore course materials and assignments.
              </CardDesc>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card onClick={() => navigateHandler("Teacher")} rolecolor="#fc9f3e">
              <Box mb={2}>
                <Group fontSize="large" />
              </Box>
              <CardTitle>Teacher</CardTitle>
              <CardDesc>
                Login as a teacher to create courses, assignments, and track student progress.
              </CardDesc>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Loader */}
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loader}
      >
        <CircularProgress color="inherit" />
        Please Wait
      </Backdrop>

      {/* Popup */}
      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </StyledContainer>
  );
};

export default ChooseUser;

// Styled Components
const StyledContainer = styled.div`
  background: linear-gradient(to bottom, #411d70, #19118b);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3rem 1rem;
`;

const Title = styled.h2`
  color: white;
  text-align: center;
  margin-bottom: 2rem;
`;

const Card = styled(Paper)`
  padding: 30px !important;
  text-align: center;
  background-color: #1f1f38 !important;   /* Force dark background */
  border-radius: 20px !important;
  cursor: pointer;
  transition: all 0.3s ease;
  min-height: 260px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: rgba(255, 255, 255, 0.7) !important;

  svg {
    font-size: 3rem !important;
    color: rgba(255, 255, 255, 0.7) !important;
    transition: color 0.3s ease, transform 0.3s ease;
  }

  &:hover {
    background-color: #2c2c6c !important;
    transform: translateY(-8px);
    box-shadow: 0px 0px 20px ${(props) => props.rolecolor};

    svg {
      color: ${(props) => props.rolecolor} !important;
      transform: scale(1.1);
    }

    h2, p {
      color: white !important;
    }
  }
`;

const CardTitle = styled.h2`
  margin-bottom: 10px;
  color: rgba(255, 255, 255, 0.85) !important;
`;

const CardDesc = styled.p`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.65) !important;
`;
