import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const RegisterPage = () => {
    const navigate = useNavigate();
    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    // Check if passwords match
    useEffect(() => {
        if (confirmPassword && password !== confirmPassword) {
            setErrorMessage('Passwords do not match');
        } else {
            setErrorMessage('');
        }
    }, [confirmPassword, password]);

    // Email validation
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputEmail = e.target.value;
        setEmail(inputEmail);

        // Check if email ends with @TTBBANK.COM (case insensitive)
        if (!inputEmail.toLowerCase().endsWith('@ttbbank.com')) {
            setEmailError('Please use only your @TTBBANK.COM email');
        } else {
            setEmailError('');
        }
    };

    // Registration handler
    const handleRegister = async () => {
        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match');
            return;
        }

        if (emailError) {
            toast.error(emailError);
            return;
        }

        const userData = { username, email, password };

        try {
            const response = await axios.post('http://localhost:5000/register', userData);
            toast.success('Registered Successfully!', { position: 'top-right', autoClose: 3000 });
            setTimeout(() => { navigate('/LoginPage'); }, 3000);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data.message || 'Registration failed');
            } else {
                console.error('Error registering user:', error);
                toast.error('Something went wrong: ' + error.message);
            }
        }
    };

    // Add keypress event listener for Enter key
    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent) => {
            if (event.key === 'Enter') {
                handleRegister(); // Trigger register when the Enter key is pressed
            }
        };

        document.addEventListener('keydown', handleKeyPress);
        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, [username, email, password, confirmPassword, emailError]);

    return (
        <Box
            sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 400,
                bgcolor: 'background.paper',
                boxShadow: 24,
                p: 4,
            }}
        >
            <Typography variant="h4" gutterBottom>
                Register
            </Typography>
            <TextField
                label="Username"
                variant="outlined"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
                sx={{ mb: 2, width: '100%' }}
            />
            <TextField
                label="TTB Email"
                variant="outlined"
                value={email}
                onChange={handleEmailChange}
                error={!!emailError}
                helperText={emailError}
                sx={{ mb: 2, width: '100%' }}
            />
            <TextField
                label="Password"
                type="password"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{ mb: 2, width: '100%' }}
            />
            <TextField
                label="Confirm Password"
                type="password"
                variant="outlined"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                sx={{ mb: 2, width: '100%' }}
            />
            {errorMessage && (
                <Typography sx={{ color: 'red', mb: 2 }}>{errorMessage}</Typography>
            )}
            <Button variant="contained" onClick={handleRegister} sx={{ width: '100%' }}>
                Register
            </Button>
            <ToastContainer />
        </Box>
    );
};

export default RegisterPage;
