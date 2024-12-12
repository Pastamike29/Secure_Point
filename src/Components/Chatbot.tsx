import React, { useState, useEffect, useRef } from 'react';
import {
    Box,
    TextField,
    Button,
    Typography,
    IconButton,
    Dialog,
    DialogContent,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ReplayIcon from '@mui/icons-material/Replay';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import { useUser } from '../Login/Component/UserAuthen';

const Chatbot = () => {
    const { user } = useUser(); // Get user from context
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const messagesEndRef = useRef<HTMLDivElement | null>(null); // Reference for the chat container

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom(); // Scroll to the bottom whenever messages change
    }, [messages]);

    const simulateTyping = (fullText: string) => {
        const sanitizedText = fullText.replace(/[^\w\s.,!?'-]/g, '').trim(); // Basic sanitization
        setIsLoading(true);

        // Start with an empty bot message
        setMessages((prev) => [...prev, { sender: 'Bot', text: '' }]);

        let currentIndex = 0;

        const interval = setInterval(() => {
            setMessages((prev) => {
                // Ensure we are updating the last bot message
                const lastMessageIndex = prev.length - 1;
                const lastMessage = prev[lastMessageIndex];

                if (lastMessage?.sender === 'Bot') {
                    const updatedMessages = [...prev];
                    updatedMessages[lastMessageIndex] = {
                        ...lastMessage,
                        text: lastMessage.text + sanitizedText[currentIndex], // Append the next character
                    };
                    return updatedMessages;
                }
                return prev;
            });

            currentIndex++;

            if (currentIndex >= sanitizedText.length) {
                clearInterval(interval);
                setIsLoading(false); // Stop the loading indicator
            }
        }, 50); // Adjust the typing speed
    };


    const handleSend = async () => {
        if (input.trim()) {

            if (!user) {
                alert('User not logged in. Please log in first.');
                return;
            }

            const { username, email } = user;

            setMessages((prev) => [...prev, { sender: 'User', text: input }]);
            setInput('');
            setIsLoading(true);
            setError(null);

            try {
                const response = await fetch(
                    'http://localhost:3000/api/v1/prediction/63a7d545-be0e-4021-958b-5e1617f299a0',
                    {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            question: input.trim(),
                            username,
                            email,
                        }),
                    }
                );

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                const botResponse = data.text?.trim() || 'Sorry, I didn’t get that.';

                // Add bot's response to messages
                setMessages((prev) => [...prev, { sender: 'Bot', text: botResponse }]);
            } catch (error) {
                setMessages((prev) => [
                    ...prev,
                    { sender: 'Bot', text: 'Sorry, something went wrong. Please try again later.' },
                ]);
                setError('Error: Something went wrong.');
                console.error('Error:', error);
            } finally {
                setIsLoading(false);
            }
        }
    };

    const handleReset = () => {
        setMessages([]);
        setError(null);
    };

    const toggleModal = () => {
        setIsModalOpen((prev) => !prev);
        setIsChatOpen(false); // Close the small chat box when modal is open
    };

    const handleKeyPress = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter' && event.shiftKey) {
            event.preventDefault(); // Prevent default behavior of submitting the form
            setInput((prevInput) => prevInput + '\n'); // Add a new line to the input
        } else if (event.key === 'Enter') {
            event.preventDefault(); // Prevent default newline
            handleSend(); // Send the message
        }
    };

    return (
        <>
            {!isChatOpen && !isModalOpen && (
                <IconButton
                    onClick={() => setIsChatOpen(true)}
                    sx={{
                        position: 'fixed',
                        bottom: 20,
                        right: 20,
                        bgcolor: 'linear-gradient(135deg, #ff7eb3 30%, #ff758c 90%)',
                        color: 'white',
                        width: 60,
                        height: 60,
                        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.3)',
                        '&:hover': { bgcolor: 'linear-gradient(135deg, #ff758c 30%, #ff7eb3 90%)' },
                        borderRadius: '50%',
                    }}
                >
                    <img
                        src="https://firebasestorage.googleapis.com/v0/b/p-c58c4.firebasestorage.app/o/Secure_P_Project%2Flogo_SecureP.png?alt=media&token=349d0a70-d898-44f0-a92d-5ce252448c6a"
                        alt="Logo"
                        style={{
                            height: '60px',
                            marginRight: '10px',
                            justifyContent: 'center',
                            border: '4px solid white',
                            borderRadius: 50 
                        }}
                    />

                </IconButton>
            )}

            {isChatOpen && !isModalOpen && (
                <Box
                    sx={{
                        position: 'fixed',
                        bottom: 20,
                        right: 20,
                        width: 400,
                        height: 550,
                        bgcolor: 'white',
                        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
                        borderRadius: '16px',
                        overflow: 'hidden',
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            bgcolor: 'linear-gradient(135deg, #ff7eb3 30%, #ff758c 90%)',
                            color: 'white',
                            p: 2,
                        }}
                    >
                        <Typography variant="h6">Chat</Typography>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                            <IconButton
                                sx={{ color: 'black', '& svg': { color: 'black !important' } }}
                                onClick={handleReset}
                            >
                                <ReplayIcon />
                            </IconButton>
                            <IconButton
                                sx={{ color: 'black', '& svg': { color: 'black !important' } }}
                                onClick={toggleModal}
                            >
                                <OpenInFullIcon />
                            </IconButton>
                            <IconButton
                                sx={{ color: 'black', '& svg': { color: 'black !important' } }}
                                onClick={() => setIsChatOpen(false)}
                            >
                                <CloseIcon />
                            </IconButton>
                        </Box>
                    </Box>
                    <Box sx={{ flex: 1, p: 2, overflowY: 'auto' }}>
                        {messages.map((msg, index) => (
                            <Box
                                key={index}
                                sx={{
                                    display: 'flex',
                                    justifyContent: msg.sender === 'User' ? 'flex-end' : 'flex-start',
                                    mb: 1,
                                }}
                            >
                                <Box
                                    sx={{
                                        maxWidth: '75%',
                                        p: 1.5,
                                        borderRadius: 4,
                                        bgcolor: msg.sender === 'User' ? '#ff758c' : '#f1f0f0',
                                        color: msg.sender === 'User' ? 'white' : 'black',
                                        fontSize: '14px',
                                        lineHeight: '20px',
                                        boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.1)',
                                    }}
                                >
                                    <Typography>{msg.text}</Typography>
                                </Box>
                            </Box>
                        ))}
                        <div ref={messagesEndRef} />
                    </Box>
                    <Box
                        sx={{
                            p: 2,
                            borderTop: '1px solid #ddd',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                        }}
                    >
                        <TextField
                            variant="outlined"
                            fullWidth
                            size="small"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyPress}
                            placeholder="Type your message..."
                            multiline
                            sx={{
                                '& .MuiInputBase-root': {
                                    color: 'black',
                                    bgcolor: 'white',
                                    borderRadius: '16px',
                                },
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: 4,
                                    '& fieldset': { 
                                        borderColor: '#ddd',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: '#bbb',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#888',
                                    },
                                },
                            }}
                        />
                        <Button
                            variant="contained"
                            sx={{
                                bgcolor: 'linear-gradient(135deg, #ff7eb3 30%, #ff758c 90%)',
                                color: 'white',
                                '&:hover': { bgcolor: 'linear-gradient(135deg, #ff758c 30%, #ff7eb3 90%)' },
                            }}
                            onClick={handleSend}
                        >
                            Send
                        </Button>
                    </Box>
                </Box>
            )}

            <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} fullWidth maxWidth="md">
                <DialogContent
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        height: 700,
                        p: 2,
                        bgcolor: '#f9f9f9',
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            bgcolor: 'linear-gradient(135deg, #ff7eb3 30%, #ff758c 90%)',
                            color: 'white',
                            p: 2,
                        }}
                    >
                        <Typography variant="h6">Chat</Typography>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                            <IconButton
                                sx={{ color: 'black', '& svg': { color: 'black' } }}
                                onClick={handleReset}
                            >
                                <ReplayIcon />
                            </IconButton>
                            <IconButton
                                sx={{ color: 'black', '& svg': { color: 'black' } }}
                                onClick={() => setIsModalOpen(false)}
                            >
                                <CloseIcon />
                            </IconButton>
                        </Box>
                    </Box>
                    <Box sx={{ flex: 1, p: 2, overflowY: 'auto' }}>
                        {messages.map((msg, index) => (
                            <Box
                                key={index}
                                sx={{
                                    display: 'flex',
                                    justifyContent: msg.sender === 'User' ? 'flex-end' : 'flex-start',
                                    mb: 1,
                                }}
                            >
                                <Box
                                    sx={{
                                        maxWidth: '75%',
                                        p: 1.5,
                                        borderRadius: 16,
                                        bgcolor: msg.sender === 'User' ? '#ff758c' : '#f1f0f0',
                                        color: msg.sender === 'User' ? 'white' : 'black',
                                        fontSize: '14px',
                                        lineHeight: '20px',
                                        boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.1)',
                                    }}
                                >
                                    <Typography>{msg.text}</Typography>
                                </Box>
                            </Box>
                        ))}
                        <div ref={messagesEndRef} />
                    </Box>
                    <Box
                        sx={{
                            p: 2,
                            borderTop: '1px solid #ddd',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                        }}
                    >
                        <TextField
                            variant="outlined"
                            fullWidth
                            size="small"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyPress}
                            placeholder="Type your message..."
                            multiline
                            sx={{
                                '& .MuiInputBase-root': {
                                    color: 'black',
                                    bgcolor: 'white',
                                    borderRadius: '16px',
                                },
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: 4,
                                    '& fieldset': {
                                        borderColor: '#ddd',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: '#bbb',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#888',
                                    },
                                },
                            }}
                        />
                        <Button
                            variant="contained"
                            sx={{
                                bgcolor: 'linear-gradient(135deg, #ff7eb3 30%, #ff758c 90%)',
                                color: 'white',
                                '&:hover': { bgcolor: 'linear-gradient(135deg, #ff758c 30%, #ff7eb3 90%)' },
                            }}
                            onClick={handleSend}
                        >
                            Send
                        </Button>
                    </Box>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default Chatbot;
