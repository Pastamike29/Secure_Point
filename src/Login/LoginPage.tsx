import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { jwtDecode } from 'jwt-decode';
import { useUser, User } from './Component/UserAuthen';

interface JwtPayload {
    exp?: number;
    role?: string;
    username?: string;
    email?: string;
    birthDate?: string | null;
}

const LoginPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userRole, setUserRole] = useState('');
    const [emailError, setEmailError] = useState('');
    const { setUser } = useUser();
    const intervalRef = useRef<NodeJS.Timeout | null>(null); // Prevent multiple intervals
    const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
    const [forgotEmail, setForgotEmail] = useState('');

    // Track failed login attempts
    const [currentAttempts, setCurrentAttempts] = useState(() => {
        const storedAttempts = localStorage.getItem('currentAttempts');
        return storedAttempts ? parseInt(storedAttempts, 10) : 0;
    });

    // Track lockout time (in seconds)
    const [lockoutTime, setLockoutTime] = useState<number | null>(() => {
        const storedLockoutEnd = localStorage.getItem('lockoutEndTime');
        if (storedLockoutEnd) {
            const remainingTime = Math.ceil(
                (parseInt(storedLockoutEnd, 10) - Date.now()) / 1000
            );
            return remainingTime > 0 ? remainingTime : null;
        }
        return null;
    });

    // Function to handle login
    const attemptLogin = async () => {
        if (lockoutTime) {
            toast.error(`Please wait ${lockoutTime} seconds before trying again.`);
            return;
        }

        try {
            const userData = { email, password };
            const response = await axios.post('http://localhost:5000/login', userData);
            const result = response.data;

            // Store token in localStorage
            localStorage.setItem('token', result.token);

            // Decode JWT token
            const decoded = jwtDecode<JwtPayload>(result.token);
            console.log('Decoded JWT:', decoded);

            const userInfo: User = {
                username: decoded.username || '',
                email: decoded.email || '',
                role: decoded.role || 'user',
                birthDate: decoded.birthDate || null,
                quiz_amount: 0,
            };
            setUser(userInfo);
            setUserRole(decoded.role || '');

            toast.success('Login successful!', {
                position: 'top-right',
                autoClose: 3000,
            });

            // Reset attempts on successful login
            setCurrentAttempts(0);
            localStorage.setItem('currentAttempts', '0');

            // Redirect based on role
            if (decoded.role === 'admin') {
                navigate('/AdminLogin');
            } else {
                navigate('/');
            }
        } catch (error) {
            handleFailedAttempt();
        }
    };

    // Handles failed login attempt logic
    const handleFailedAttempt = () => {
        const newAttempts = currentAttempts + 1;
        setCurrentAttempts(newAttempts);
        localStorage.setItem('currentAttempts', newAttempts.toString());

        if (newAttempts >= 3) {
            const lockoutDuration = 30; // Lockout time in seconds
            const lockoutEndTime = Date.now() + lockoutDuration * 1000;
            localStorage.setItem('lockoutEndTime', lockoutEndTime.toString());

            setLockoutTime(lockoutDuration);
            toast.error(`Too many failed attempts. Please wait ${lockoutDuration} seconds before trying again.`);

            // Ensure only ONE interval is running
            if (intervalRef.current) clearInterval(intervalRef.current);

            intervalRef.current = setInterval(() => {
                setLockoutTime((prevTime) => {
                    if (prevTime === null || prevTime <= 1) {
                        clearInterval(intervalRef.current!);
                        localStorage.removeItem('lockoutEndTime');
                        setCurrentAttempts(0);
                        localStorage.setItem('currentAttempts', '0');
                        return null;
                    }
                    return prevTime - 1;
                });
            }, 1000);
        } else {
            toast.error('Invalid email or password', {
                position: 'top-right',
                autoClose: 3000,
            });
        }
    };

    // Handle email validation
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setEmail(value);

        if (!value.endsWith('@ttbbank.com')) {
            setEmailError('Email must end with @ttbbank.com');
        } else {
            setEmailError('');
        }
    };

    // Handle Forgot Password Request
    // Handle Forgot Password Request
    const handleForgotPassword = async () => {
        if (!forgotEmail) {
            toast.error('Please enter your email.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/forgot-password', { email: forgotEmail });

            // Check if the response is successful
            if (response.status === 200) {
                toast.success('Password reset link sent to your email.', {
                    position: 'top-right',
                    autoClose: 3000,
                });
                setIsForgotPasswordOpen(false); // Close modal after request
            }
        } catch (error) {
            // If email is not found in the database
            if (error.response?.status === 404) {
                toast.error('Please use a correct email. This email is not registered.');
            } else {
                toast.error('Failed to send reset email. Please try again later.');
            }
        }
    };

    // Prevent multiple intervals and ensure 1s updates
    useEffect(() => {
        if (lockoutTime !== null && lockoutTime > 0) {
            if (intervalRef.current) clearInterval(intervalRef.current);

            intervalRef.current = setInterval(() => {
                setLockoutTime((prevTime) => {
                    if (prevTime === null || prevTime <= 1) {
                        clearInterval(intervalRef.current!);
                        localStorage.removeItem('lockoutEndTime');
                        setCurrentAttempts(0);
                        localStorage.setItem('currentAttempts', '0');
                        return null;
                    }
                    return prevTime - 1;
                });
            }, 1000);
        }
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [lockoutTime]);



    // Handle "Enter" keypress for login
    // Handle "Enter" keypress
    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent) => {
            if (event.key === 'Enter') {
                if (lockoutTime) {
                    toast.error(`Please wait ${lockoutTime} seconds before trying again.`);
                } else {
                    if (isForgotPasswordOpen) {
                        handleForgotPassword(); // 🔹 Trigger password reset instead of login
                    } else {
                        attemptLogin(); // 🔹 Only trigger login if reset modal is closed
                    }
                }
            }
        };

        document.addEventListener('keydown', handleKeyPress);
        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, [email, password, lockoutTime, currentAttempts, isForgotPasswordOpen]); // 🔹 Added `isForgotPasswordOpen` dependency


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
                Sign in
            </Typography>
            <TextField
                label="TTB Email"
                variant="outlined"
                value={email}
                onChange={handleEmailChange}
                error={Boolean(emailError)}
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
            <Button
                variant="contained"
                onClick={attemptLogin}
                sx={{ mb: 2, width: '100%' }}
                disabled={!!lockoutTime}
            >
                {lockoutTime ? `Try again in ${lockoutTime}s` : 'Login'}
            </Button>

            {/* Forgot Password Button */}
            <Typography
                variant="body2"
                sx={{ textAlign: 'center', cursor: 'pointer', mt: 1 }}
                onClick={() => setIsForgotPasswordOpen(true)}
            >
                Forgot Password?
            </Typography>

            {/* Forgot Password Modal */}
            <Modal open={isForgotPasswordOpen} onClose={() => setIsForgotPasswordOpen(false)}>
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
                        borderRadius: 2,
                    }}
                >
                    <Typography variant="h6" gutterBottom>
                        Reset Password
                    </Typography>
                    <TextField
                        label="Enter your email"
                        variant="outlined"
                        value={forgotEmail}
                        onChange={(e) => setForgotEmail(e.target.value)}
                        sx={{ mb: 2, width: '100%' }}
                    />
                    <Button
                        variant="contained"
                        onClick={handleForgotPassword}
                        sx={{ width: '100%' }}
                    >
                        Send Reset Link
                    </Button>
                </Box>
            </Modal>
        </Box>
    );
};

export default LoginPage;
