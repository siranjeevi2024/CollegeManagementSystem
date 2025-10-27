import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import CalendarWidget from './CalendarWidget';

const ClockWidget = () => {
  const [time, setTime] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDate = (date) => {
    return date.toLocaleDateString([], { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  return (
    <>
      <ClockContainer>
        <TimeDisplay>{formatTime(time)}</TimeDisplay>
        <DateDisplay>{formatDate(time)}</DateDisplay>
        <ViewCalendarButton onClick={() => setShowCalendar(!showCalendar)}>
          View Calendar
        </ViewCalendarButton>
      </ClockContainer>
      {showCalendar && (
        <ModalOverlay onClick={() => setShowCalendar(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <CloseButton onClick={() => setShowCalendar(false)}>×</CloseButton>
            <CalendarWidget />
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
};

export default ClockWidget;

/* -------------------- STYLES -------------------- */

const ClockContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  text-align: center;
  width: 100%;
  height: 100%;
`;

const TimeDisplay = styled.div`
  font-size: 1.25rem;
  font-weight: bold;
  color: #333;
  margin-top: 10px;
`;

const DateDisplay = styled.div`
  font-size: 1rem;
  color: #000;
  margin-top: 5px;
`;

const ViewCalendarButton = styled.button`
  margin-top: 10px;
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;

  &:hover {
    background-color: #0056b3;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: transparent;
  padding: 20px;
  border-radius: 8px;
  max-width: 90%;
  max-height: 90%;
  overflow: auto;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: red;
`;
