import React, { useState } from 'react';
import {
    Box,
    TextField,
    Button,
    Typography,
    IconButton,
    Dialog,
    DialogActions,
    DialogContent,
    CircularProgress,
} from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';
import ReplayIcon from '@mui/icons-material/Replay';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';

const Chatbot = () => {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSend = async () => {
        if (input.trim()) {
            setMessages((prev) => [...prev, { sender: 'User', text: input }]);
            setIsLoading(true);
            setError(null);

            try {
                const response = await fetch(
                    'http://localhost:3000/api/v1/prediction/63a7d545-be0e-4021-958b-5e1617f299a0',
                    {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ question: input }),
                    }
                );

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                console.log(data); // Debugging line to see the response

                // Check if the response contains an answer
                const botResponse = data.text && data.text.trim() ? data.text : 'Sorry, I didn’t get that. Can you please clarify?';

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

            setInput('');
        }
    };



    const handleReset = () => {
        setMessages([]);
        setError(null); // Clear error on reset
    };

    const toggleModal = () => {
        setIsModalOpen((prev) => !prev);
    };

    const handleKeyPress = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            handleSend();
        }
    };

    return (
        <>
            {/* Floating Icon to Toggle Chat */}
            {!isChatOpen && (
                <IconButton
                    onClick={() => setIsChatOpen(true)}
                    sx={{
                        position: 'fixed',
                        bottom: 20,
                        right: 20,
                        bgcolor: 'primary.main',
                        color: 'white',
                        '&:hover': { bgcolor: 'primary.dark' },
                    }}
                >
                    <ChatIcon />
                </IconButton>
            )}

            {/* Chat Box (small version) */}
            {isChatOpen && !isModalOpen && (
                <Box
                    sx={{
                        position: 'fixed',
                        bottom: 20,
                        right: 20,
                        width: 460,
                        height: 650,
                        bgcolor: 'rgba(50, 50, 50, .85)',
                        boxShadow: 3,
                        borderRadius: 2,
                        overflow: 'hidden',
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    {/* Chat Header */}
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            bgcolor: 'primary.main',
                            color: 'white',
                            p: 1,
                        }}
                    >
                        <Typography variant="h6" sx={{ fontSize: '1rem' }}>
                            Chat
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                            {/* Reset Button */}
                            <IconButton onClick={handleReset} sx={{ color: 'white', p: 0.5 }}>
                                <ReplayIcon />
                            </IconButton>
                            {/* Expand Button */}
                            <IconButton onClick={toggleModal} sx={{ color: 'white', p: 0.5 }}>
                                <OpenInFullIcon />
                            </IconButton>
                            {/* Close Button */}
                            <IconButton onClick={() => setIsChatOpen(false)} sx={{ color: 'white', p: 0.5 }}>
                                <CloseIcon />
                            </IconButton>
                        </Box>
                    </Box>

                    {/* Chat Messages */}
                    <Box sx={{ flex: 1, p: 1, overflowY: 'auto' }}>
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
                                        maxWidth: '70%',
                                        p: 1,
                                        borderRadius: 2,
                                        bgcolor: msg.sender === 'User' ? 'primary.main' : 'grey.300',
                                        color: msg.sender === 'User' ? 'white' : 'black',
                                        fontSize: '16px',
                                        lineHeight: '28px',
                                    }}
                                >
                                    <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
                                        {msg.text}
                                    </Typography>
                                </Box>
                            </Box>
                        ))}
                        {isLoading && (
                            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 2 }}>
                                <CircularProgress size={24} />
                            </Box>
                        )}
                        {error && <Typography color="error">{error}</Typography>}
                    </Box>

                    {/* Chat Input */}
                    <Box
                        sx={{
                            p: 1,
                            borderTop: '1px solid #ddd',
                            display: 'flex',
                            gap: 1,
                            fontSize: '16px',
                            lineHeight: '28px',
                        }}
                    >
                        <TextField
                            variant="outlined"
                            fullWidth
                            size="small"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyPress}
                            placeholder="Type a message..."
                            multiline
                            sx={{
                                '& .MuiInputBase-root': {
                                    height: 'auto', // Allow dynamic height based on content
                                    minHeight: 40,  // Set a minimum height for the text area
                                    maxHeight: 170, // Set a maximum height to control the area
                                    overflowY: 'auto', // Enable vertical scrolling when content overflows
                                },
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        border: 'none', // Remove the border in all states
                                    },
                                    '&:hover fieldset': {
                                        border: 'none', // Remove the border on hover
                                    },
                                    '&:focus-within fieldset': {
                                        border: 'none', // Remove the border on focus
                                    },
                                },
                            }}
                        />
                        <Button variant="contained" onClick={handleSend}>
                            Send
                        </Button>
                    </Box>

                </Box>
            )}


            {/* Modal (Expanded Chat) */}
            <Dialog open={isModalOpen} onClose={toggleModal} fullWidth maxWidth="lg">
                <DialogContent
                    sx={{
                        bgcolor: 'rgba(50, 50, 50, .85)',
                        display: 'flex',
                        flexDirection: 'column',
                        height: 750,
                        p: 2,
                    }}
                >
                    {/* Chat Header */}
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            bgcolor: 'primary.main',
                            color: 'white',
                            p: 1,
                        }}
                    >
                        <Typography variant="h6" sx={{ fontSize: '1rem' }}>
                            Chat
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                            {/* Reset Button */}
                            <IconButton onClick={handleReset} sx={{ color: 'white', p: 0.5 }}>
                                <ReplayIcon />
                            </IconButton>
                            {/* Close Button */}
                            <IconButton onClick={toggleModal} sx={{ color: 'white', p: 0.5 }}>
                                <CloseIcon />
                            </IconButton>
                        </Box>
                    </Box>

                    {/* Chat Messages */}
                    <Box sx={{ flex: 1, p: 1, overflowY: 'auto' }}>
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
                                        maxWidth: '60%',
                                        p: 1,
                                        borderRadius: 2,
                                        bgcolor: msg.sender === 'User' ? 'rgba(50,50,50,0.)' : 'grey.300',
                                        color: msg.sender === 'User' ? 'white' : 'black',
                                    }}
                                >
                                    <Typography variant="body2">{msg.text}</Typography>
                                </Box>
                            </Box>
                        ))}
                        {isLoading && (
                            <Box sx={{ display: 'flex', justifyContent: 'start', alignItems: 'start', mt: 2 }}>
                                <CircularProgress size={24} />
                            </Box>
                        )}
                        {error && <Typography color="error">{error}</Typography>}
                    </Box>

                    {/* Chat Input */}
                    <Box
                        sx={{
                            p: 1,
                            borderTop: '1px solid #ddd',
                            display: 'flex',
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
                            placeholder="Type a message..."
                            multiline
                            sx={{
                                '& .MuiInputBase-root': {
                                    height: 'auto',
                                    minHeight: 40,
                                    maxHeight: 170,
                                    overflowY: 'auto',
                                },
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        border: 'none', // Removes the border in all states
                                    },
                                    '&:hover fieldset': {
                                        border: 'none', // Removes the border on hover
                                    },
                                    '&:focus-within fieldset': {
                                        border: 'none', // Removes the border on focus
                                    },
                                },
                            }}
                        />

                        <Button variant="contained" onClick={handleSend}>
                            Send
                        </Button>
                    </Box>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default Chatbot;
