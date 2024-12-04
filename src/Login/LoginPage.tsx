import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { jwtDecode } from 'jwt-decode'; // Correct import for jwt-decode
import { useUser, User } from './Component/UserAuthen'; // Adjust the path as needed

// Define your JWT payload structure
interface JwtPayload {
    exp?: number;
    role?: string;
    username?: string;
    email?: string; // Add other fields if necessary
    birthDate?: string | null; // Add birthDate field
    profileImage?: string | null; // Add profileImage field
}

const LoginPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userRole, setUserRole] = useState('');
    const [emailError, setEmailError] = useState(''); // New state for email validation error
    const { setUser } = useUser(); // Get setUser from useUser hook

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decoded = jwtDecode<JwtPayload>(token);
                if (decoded.exp && decoded.exp * 1000 > Date.now()) {
                    setUserRole(decoded.role || '');
                    setIsLoggedIn(true);
                    console.log(`Welcome back, ${decoded.username || 'User'}`);
                } else {
                    localStorage.removeItem('token');
                    setIsLoggedIn(false);
                }
            } catch (error) {
                console.error('Invalid token', error);
                setIsLoggedIn(false);
            }
        }
    }, [setUser]);

    const handleLogin = async () => {
        // Prevent login if email validation fails
        if (emailError) return;

        try {
            const userData = { email, password }; // Send email instead of username
            const response = await axios.post('http://localhost:5000/login', userData);
            const result = response.data;

            localStorage.setItem('token', result.token);
            const decoded = jwtDecode<JwtPayload>(result.token);

            const userInfo: User = {
                username: decoded.username || '',
                email: decoded.email || '',
                birthDate: decoded.birthDate || null,
                profileImage: decoded.profileImage || null,
                role: decoded.role || 'user',
                quiz_amount: 0,
            };

            setUser(userInfo);
            setUserRole(decoded.role || '');
            setIsLoggedIn(true);

            toast.success('Login successful!', {
                position: 'top-right',
                autoClose: 3000,
            });

            if (decoded.role === 'admin') {
                navigate('/admin');
            } else {
                navigate('/');
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast.error('Invalid email or password', {
                    position: 'top-right',
                    autoClose: 3000,
                });
            } else {
                toast.error('Something went wrong', {
                    position: 'top-right',
                    autoClose: 3000,
                });
            }
        }
    };

    // Handle email validation
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setEmail(value);

        // Check if email ends with @ttbbank.com
        if (!value.endsWith('@ttbbank.com')) {
            setEmailError('Email must end with @ttbbank.com');
        } else {
            setEmailError('');
        }
    };

    // Add keypress event listener for Enter key
    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent) => {
            if (event.key === 'Enter') {
                handleLogin(); // Trigger login when the Enter key is pressed
            }
        };

        document.addEventListener('keydown', handleKeyPress);

        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, [email, password]);

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
            {isLoggedIn ? (
                <>
                    <Typography variant="h6">
                        You are logged in as: {userRole || 'User'}
                    </Typography>
                    <Typography variant="body1">
                        Redirecting...
                    </Typography>
                </>
            ) : (
                <>
                    <Typography variant="h4" gutterBottom>
                        Sign in
                    </Typography>
                    <TextField
                        label="TTB Email"
                        variant="outlined"
                        value={email}
                        onChange={handleEmailChange}
                        error={Boolean(emailError)} // Display error if validation fails
                        helperText={emailError} // Show validation message
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
                    <Button variant="contained" onClick={handleLogin} sx={{ mb: 2, width: '100%' }}>
                        Login
                    </Button>
                    <ToastContainer />
                </>
            )}
        </Box>
    );
};

export default LoginPage;
