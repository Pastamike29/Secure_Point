import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const RegisterPage = () => {
    const navigate = useNavigate();
    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
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
            setEmailError('Please use only your @ttbbank.com email');
        } else {
            setEmailError('');
        }
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputPassword = e.target.value;
        setPassword(inputPassword);
    
        // Updated regex to include dot (.)
        const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*\.])[A-Za-z\d!@#$%^&*\.]{8,}$/;
    
        const isValidPassword = passwordRegex.test(inputPassword);
    
        console.log(`Password: "${inputPassword}", isValid: ${isValidPassword}`); // Debugging
    
        if (!isValidPassword) {
            setPasswordError(
                'Password must be at least 8 characters long, include one uppercase letter, and one special character'
            );
        } else {
            setPasswordError(''); // Clear error if password is valid
        }
    };
    

    const handleRegister = async () => {
        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match');
            return;
        }

        if (emailError || passwordError) {
            toast.error('Please fix the errors before registering');
            return;
        }

        const userData = { username, email, password };

        try {
            const response = await axios.post('http://localhost:5000/register', userData);
            toast.success('Registered Successfully!', { position: 'top-right', autoClose: 3000 });
            setTimeout(() => {
                navigate('/LoginPage');
            }, 3000);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const errorMessage = error.response?.data.message || 'Registration failed';

                if (errorMessage.toLowerCase().includes('email already exists')) {
                    setEmailError('Please use another email');
                } else {
                    toast.error(errorMessage);
                }
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
    }, [username, email, password, confirmPassword, emailError, passwordError]);

    return (
        <Box
            sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 500, // Increased width
                bgcolor: 'background.paper',
                boxShadow: 24,
                p: 6, // Increased padding
                borderRadius: 4, // Add rounded corners
            }}
        >
            <Typography variant="h3" gutterBottom textAlign="center">
                Register
            </Typography>
            <TextField
                label="Username"
                variant="outlined"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
                sx={{ mb: 3, width: '100%' }} // Increased spacing
            />
            <TextField
                label="TTB Email"
                variant="outlined"
                value={email}
                onChange={handleEmailChange}
                error={!!emailError} // Display error style if there's an error
                helperText={
                    emailError && (
                        <Typography
                            sx={{
                                color: 'red', // Error color
                                fontSize: '1rem', // Slightly larger than default
                            }}
                        >
                            {emailError}
                        </Typography>
                    )
                }
                sx={{ mb: 3, width: '100%' }} // Consistent spacing
            />

            <TextField
                label="Password"
                type="password"
                variant="outlined"
                value={password}
                onChange={handlePasswordChange}
                error={!!passwordError} // Display error style if validation fails
                helperText={
                    passwordError && (
                        <Typography
                            sx={{
                                color: 'red',
                                fontSize: '1rem',
                            }}
                        >
                            {passwordError}
                        </Typography>
                    )
                }
                sx={{ mb: 3, width: '100%' }}
            />
            <TextField
                label="Confirm Password"
                type="password"
                variant="outlined"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                sx={{ mb: 3, width: '100%' }} // Increased spacing
            />
            {errorMessage && (
                <Typography
                    sx={{
                        color: 'red',
                        fontSize: '1rem', // Increased font size
                        mb: 3,
                    }}
                >
                    {errorMessage}
                </Typography>
            )}
            <Button
                variant="contained"
                onClick={handleRegister}
                sx={{ width: '100%', py: 2 }} // Increased button height
                disabled={!!emailError || !!passwordError || !username || !email || !password || !confirmPassword}
            >
                Register
            </Button>
        </Box>
    );
};

export default RegisterPage;
