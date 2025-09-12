import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Grid,
  Box,
  Typography,
  Paper,
  Checkbox,
  FormControlLabel,
  TextField,
  CssBaseline,
  IconButton,
  InputAdornment,
  CircularProgress,
  Backdrop,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { LightPurpleButton } from '../components/buttonStyles';
import styled from 'styled-components';
import { loginUser } from '../redux/userRelated/userHandle';
import Popup from '../components/Popup';

const defaultTheme = createTheme();

const LoginPage = ({ role }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { status, currentUser, response, error, currentRole } = useSelector(state => state.user);

  const [toggle, setToggle] = useState(false)
  const [guestLoader, setGuestLoader] = useState(false)
  const [loader, setLoader] = useState(false)
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [rollNumberError, setRollNumberError] = useState(false);
  const [studentNameError, setStudentNameError] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (role === "Student") {
      const rollNum = event.target.rollNumber.value;
      const studentName = event.target.studentName.value;
      const password = event.target.password.value;

      if (!rollNum || !studentName || !password) {
        if (!rollNum) setRollNumberError(true);
        if (!studentName) setStudentNameError(true);
        if (!password) setPasswordError(true);
        return;
      }
      setLoader(true)
      dispatch(loginUser({ rollNum, studentName, password }, role))
    } else {
      const email = event.target.email.value;
      const password = event.target.password.value;
      if (!email || !password) {
        if (!email) setEmailError(true);
        if (!password) setPasswordError(true);
        return;
      }
      setLoader(true)
      dispatch(loginUser({ email, password }, role))
    }
  };

  const handleInputChange = (event) => {
    const { name } = event.target;
    if (name === 'email') setEmailError(false);
    if (name === 'password') setPasswordError(false);
    if (name === 'rollNumber') setRollNumberError(false);
    if (name === 'studentName') setStudentNameError(false);
  };

  const guestModeHandler = () => {
    const password = "zxc"
    if (role === "Admin") dispatch(loginUser({ email: "yogendra@12", password }, role), setGuestLoader(true))
    else if (role === "Student") dispatch(loginUser({ rollNum: "1", studentName: "Dipesh Awasthi", password }, role), setGuestLoader(true))
    else if (role === "Teacher") dispatch(loginUser({ email: "tony@12", password }, role), setGuestLoader(true))
  }

  useEffect(() => {
    if (status === 'success' || currentUser !== null) {
      if (currentRole === 'Admin') navigate('/Admin/dashboard');
      else if (currentRole === 'Student') navigate('/Student/dashboard');
      else if (currentRole === 'Teacher') navigate('/Teacher/dashboard');
    } else if (status === 'failed') {
      setMessage(response); setShowPopup(true); setLoader(false);
    } else if (status === 'error') {
      setMessage("Network Error"); setShowPopup(true); setLoader(false); setGuestLoader(false);
    }
  }, [status, currentRole, navigate, error, response, currentUser]);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid
        container
        component="main"
        sx={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          background: "linear-gradient(135deg, #f0eaff, #ffffff)",
        }}
      >
        <CssBaseline />

        <Grid
          item
          xs={11} sm={8} md={5}
          component={Paper}
          elevation={12}
          square
          sx={{
            borderRadius: "20px",
            background: "linear-gradient(145deg, #ffffff, #f0eaff)",
            boxShadow: "0px 15px 30px rgba(0,0,0,0.2)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: 4,
          }}
        >
          <Box sx={{ width: "100%", textAlign: 'center', animation: "fadeIn 1s ease-in-out" }}>
            <Typography variant="h4" sx={{ mb: 2, color: "#2c2143", fontWeight: "bold" }}>{role} Login</Typography>
            <Typography variant="body1" sx={{ color: "#6b6b6b", mb: 3 }}>Welcome back! Please enter your details</Typography>

            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1, width: "100%" }}>
              {role === "Student" ? <>
                <TextField
                  margin="normal"
                  fullWidth
                  id="rollNumber"
                  label="Enter your Roll Number"
                  name="rollNumber"
                  type="number"
                  autoFocus
                  error={rollNumberError}
                  helperText={rollNumberError && 'Roll Number is required'}
                  onChange={handleInputChange}
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
                />
                <TextField
                  margin="normal"
                  fullWidth
                  id="studentName"
                  label="Enter your name"
                  name="studentName"
                  error={studentNameError}
                  helperText={studentNameError && 'Name is required'}
                  onChange={handleInputChange}
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
                />
              </> : <TextField
                margin="normal"
                fullWidth
                id="email"
                label="Enter your email"
                name="email"
                error={emailError}
                helperText={emailError && 'Email is required'}
                onChange={handleInputChange}
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
              />}

              <TextField
                margin="normal"
                fullWidth
                name="password"
                label="Password"
                type={toggle ? 'text' : 'password'}
                id="password"
                error={passwordError}
                helperText={passwordError && 'Password is required'}
                onChange={handleInputChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setToggle(!toggle)}>
                        {toggle ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
              />

              <Grid container sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
                <FormControlLabel control={<Checkbox color="primary" />} label="Remember me" />
                <StyledLink to="#">Forgot password?</StyledLink>
              </Grid>

              <LightPurpleButton
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, py: 1.5, fontWeight: "bold", borderRadius: "12px", transition: "0.3s", "&:hover": { transform: "scale(1.03)", boxShadow: "0px 8px 20px rgba(127,86,218,0.3)" } }}
              >
                {loader ? <CircularProgress size={24} color="inherit" /> : "Login"}
              </LightPurpleButton>

              <Button
                fullWidth
                onClick={guestModeHandler}
                variant="outlined"
                sx={{ mt: 2, mb: 3, py: 1.5, color: "#7f56da", borderColor: "#7f56da", borderRadius: "12px", fontWeight: "bold", transition: "0.3s", "&:hover": { backgroundColor: "#f3eaff", borderColor: "#7f56da", transform: "scale(1.03)" } }}
              >
                {guestLoader ? <CircularProgress size={24} color="inherit" /> : "Login as Guest"}
              </Button>

              {/* Aligned Sign Up */}
              {role === "Admin" && (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 1, gap: 1 }}>
                  <Typography variant="body2" sx={{ color: "#6b6b6b" }}>Don't have an account?</Typography>
                  <StyledLink to="/Adminregister">Sign up</StyledLink>
                </Box>
              )}
            </Box>
          </Box>
        </Grid>
      </Grid>

      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={guestLoader}>
        <CircularProgress color="primary" />
        Please Wait
      </Backdrop>

      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </ThemeProvider>
  );
}

export default LoginPage

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #7f56da;
  font-weight: 500;
  transition: 0.3s;
  &:hover {
    text-decoration: underline;
    color: #5b38a3;
  }
`;
