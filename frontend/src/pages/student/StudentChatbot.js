import React, { useState } from 'react';
import {
    Box,
    TextField,
    Button,
    Typography,
    Paper,
    List,
    ListItem,
    ListItemText,
    Divider,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

const StudentChatbot = () => {
    const [messages, setMessages] = useState([
        { text: 'Hello! How can I help you today? You can ask about attendance, timetable, assignments, or results.', sender: 'bot' }
    ]);
    const [input, setInput] = useState('');

    const handleSend = () => {
        if (input.trim() === '') return;

        const userMessage = { text: input, sender: 'user' };
        setMessages(prev => [...prev, userMessage]);

        // Simple rule-based responses
        const response = getBotResponse(input.toLowerCase());
        const botMessage = { text: response, sender: 'bot' };
        setMessages(prev => [...prev, botMessage]);

        setInput('');
    };

    const getBotResponse = (query) => {
        if (query.includes('attendance')) {
            return 'You can view your attendance by going to the Attendance section in the sidebar.';
        } else if (query.includes('timetable')) {
            return 'Check your timetable in the Timetable section. It includes both regular and exam timetables.';
        } else if (query.includes('assignment')) {
            return 'View your assignments in the Assignments section. You can see pending and completed tasks.';
        } else if (query.includes('result') || query.includes('grade')) {
            return 'Your results are available in the Results section. Check your grades there.';
        } else if (query.includes('subject')) {
            return 'Go to the Subjects section to see your enrolled subjects and details.';
        } else if (query.includes('complain')) {
            return 'If you have a complaint, use the Complain section to submit it.';
        } else if (query.includes('profile')) {
            return 'Update your profile information in the Profile section.';
        } else {
            return 'I\'m sorry, I didn\'t understand that. Try asking about attendance, timetable, assignments, results, subjects, complains, or profile.';
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    };

    return (
        <Box sx={{ p: 3, maxWidth: 600, mx: 'auto' }}>
            <Typography variant="h4" gutterBottom>
                Student Chatbot
            </Typography>
            <Paper elevation={3} sx={{ height: 400, overflow: 'auto', mb: 2, p: 2 }}>
                <List>
                    {messages.map((message, index) => (
                        <React.Fragment key={index}>
                            <ListItem>
                                <ListItemText
                                    primary={message.text}
                                    sx={{
                                        textAlign: message.sender === 'user' ? 'right' : 'left',
                                        bgcolor: message.sender === 'user' ? 'primary.light' : 'grey.100',
                                        p: 1,
                                        borderRadius: 1,
                                    }}
                                />
                            </ListItem>
                            {index < messages.length - 1 && <Divider />}
                        </React.Fragment>
                    ))}
                </List>
            </Paper>
            <Box sx={{ display: 'flex', gap: 1 }}>
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Type your message..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                />
                <Button
                    variant="contained"
                    endIcon={<SendIcon />}
                    onClick={handleSend}
                    disabled={!input.trim()}
                >
                    Send
                </Button>
            </Box>
        </Box>
    );
};

export default StudentChatbot;
