import React from 'react';
import styled from 'styled-components';
import { Card, CardContent, Typography, Avatar } from '@mui/material';
import { useSelector } from 'react-redux';

const TeacherProfile = () => {
  const { currentUser, response, error } = useSelector((state) => state.user);

  if (response) console.log(response);
  if (error) console.log(error);

  if (!currentUser) {
    return <CenteredText>Loading teacher profile...</CenteredText>;
  }

  const teachSclass = currentUser?.teachSclass;
  const teachSubject = currentUser?.teachSubject;
  const teachSchool = currentUser?.school;

  return (
    <Background>
      <ProfileCard>
        <AvatarWrapper>
          <Avatar
            alt={currentUser?.name}
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            sx={{ width: 100, height: 100, mb: 2, border: '3px solid white' }}
          />
          <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#333' }}>
            {currentUser?.name || "N/A"}
          </Typography>
          <Typography variant="body2" sx={{ color: '#777' }}>
            {teachSubject?.subName || "Unknown Subject"}
          </Typography>
        </AvatarWrapper>

        <StyledCardContent>
          <InfoRow>
            <Label>Email</Label>
            <Value>{currentUser?.email || "N/A"}</Value>
          </InfoRow>
          <InfoRow>
            <Label>Department</Label>
            <Value>{teachSclass?.sclassName || "N/A"}</Value>
          </InfoRow>
          <InfoRow>
            <Label>Subject</Label>
            <Value>{teachSubject?.subName || "N/A"}</Value>
          </InfoRow>
          <InfoRow>
            <Label>College</Label>
            <Value>{teachSchool?.schoolName || "N/A"}</Value>
          </InfoRow>
        </StyledCardContent>
      </ProfileCard>
    </Background>
  );
};

export default TeacherProfile;

// 🌈 Styled Components
const Background = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
  animation: fadeIn 1s ease-in-out;
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const ProfileCard = styled(Card)`
  width: 420px;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0px 8px 25px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0px 12px 30px rgba(0, 0, 0, 0.25);
  }
`;

const AvatarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(135deg, #89f7fe, #66a6ff);
  padding: 30px 20px;
  color: white;
`;

const StyledCardContent = styled(CardContent)`
  display: flex;
  flex-direction: column;
  padding: 20px 30px 30px;
  background-color: #fff;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
`;

const Label = styled(Typography)`
  font-weight: bold !important;
  color: #555;
`;

const Value = styled(Typography)`
  color: #333;
`;

const CenteredText = styled(Typography)`
  text-align: center;
  margin-top: 50px;
  font-size: 18px;
`;

