import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Grid, Box } from "@mui/material";
import styled from "styled-components";
import Students from "../assets/students.svg";

const Homepage = () => {
  const [displayedText, setDisplayedText] = useState("");
  const fullText = "  Welcome to College Management System";

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < fullText.length) {
        setDisplayedText((prev) => prev + fullText.charAt(index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 150); // typing speed
    return () => clearInterval(interval);
  }, []);

  return (
    <BackgroundWrapper>
      <StyledContainer>
        <Grid container spacing={0} alignItems="center">
          {/* Left - Image */}
          <Grid item xs={12} md={6}>
            <StyledImage src={Students} alt="students" />
          </Grid>

          {/* Right - Card */}
          <Grid item xs={12} md={6}>
            <StyledCard>
              <TypewriterTitle>{displayedText}</TypewriterTitle>

              <BodyText>
                Streamline college management, organize classes, and add students & faculty.
                Track attendance, assess performance, and provide feedback seamlessly.
              </BodyText>

              <ActionBox>
                <StyledLink to="/choose">
                  <PrimaryButton>Login</PrimaryButton>
                </StyledLink>
                <StyledLink to="/chooseasguest">
                  <SecondaryButton>Login as Guest</SecondaryButton>
                </StyledLink>

                <SmallText>
                  Don’t have an account?{" "}
                  <Link to="/Adminregister" style={{ color: "#9b5eff", fontWeight: "600" }}>
                    Sign up
                  </Link>
                </SmallText>
              </ActionBox>
            </StyledCard>
          </Grid>
        </Grid>

      </StyledContainer>
    </BackgroundWrapper>
  );
};

export default Homepage;

/* -------------------- STYLES -------------------- */

const BackgroundWrapper = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  background: linear-gradient(135deg, #0a0a0a, #1a1a1a);
`;

const StyledContainer = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledImage = styled.img`
  width: 100%;
  max-width: 500px;
  animation: float 4s ease-in-out infinite;

  @keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-12px); }
    100% { transform: translateY(0px); }
  }
`;

const StyledCard = styled.div`
  padding: 40px;
  border-radius: 20px;
  background: rgba(30, 30, 30, 0.85);
  backdrop-filter: blur(12px);
  box-shadow: 0px 8px 32px rgba(155, 94, 255, 0.3);
  text-align: center;
`;

const TypewriterTitle = styled.h1`
  font-size: 2.4rem;
  font-weight: 700;
  margin-bottom: 20px;
  background: linear-gradient(90deg, #9b5eff, #ff3cac);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  white-space: pre-wrap;
  min-height: 3.2rem;
  border-right: 3px solid #9b5eff;
  animation: blinkCursor 0.8s step-end infinite;

  @keyframes blinkCursor {
    from { border-color: transparent; }
    to { border-color: #9b5eff; }
  }
`;

const BodyText = styled.p`
  color: #d1d1d1;
  margin-bottom: 30px;
  font-size: 1rem;
  line-height: 1.6;
`;

const ActionBox = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
`;

const PrimaryButton = styled.button`
  width: 100%;
  padding: 14px;
  border: none;
  border-radius: 50px;
  background: linear-gradient(90deg, #9b5eff, #ff3cac);
  color: #fff;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: 0.3s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0px 4px 25px rgba(155, 94, 255, 0.6);
  }
`;

const SecondaryButton = styled.button`
  width: 100%;
  padding: 14px;
  border: 2px solid #9b5eff;
  border-radius: 50px;
  background: transparent;
  color: #9b5eff;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: 0.3s ease;

  &:hover {
    background: rgba(155, 94, 255, 0.1);
    transform: scale(1.05);
    box-shadow: 0px 4px 20px rgba(155, 94, 255, 0.4);
  }
`;

const SmallText = styled.p`
  color: #aaa;
  margin-top: 16px;
`;

const StyledLink = styled(Link)`
  width: 100%;
  text-decoration: none;
`;


