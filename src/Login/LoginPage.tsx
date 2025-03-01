import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Box, Button, CircularProgress, IconButton, Modal, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { useUser, User } from './Component/UserAuthen';
import { Close } from '@mui/icons-material';

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
    const [emailError, setEmailError] = useState('');
    const { setUser } = useUser();
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
    const [forgotEmail, setForgotEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Failed login attempt tracking
    const [currentAttempts, setCurrentAttempts] = useState(() => {
        const storedAttempts = Cookies.get('currentAttempts');
        return storedAttempts ? parseInt(storedAttempts, 10) : 0;
    });

    const [lockoutTime, setLockoutTime] = useState<number | null>(() => {
        const storedLockoutEnd = Cookies.get('lockoutEndTime');
        if (storedLockoutEnd) {
            const remainingTime = Math.ceil((parseInt(storedLockoutEnd, 10) - Date.now()) / 1000);
            return remainingTime > 0 ? remainingTime : null;
        }
        return null;
    });

    // ✅ Function to handle login
    const attemptLogin = async () => {
        try {
            const response = await axios.post(
                process.env.NODE_ENV === 'production'
                    ? 'https://your-production-api.com/auth/login'
                    : 'http://localhost:5000/auth/login',
                { email, password },
                {
                    withCredentials: true,
                    headers: { "Content-Type": "application/json" },
                }
            );

            console.log("Login Response:", response);

            // ✅ Read role from JSON response instead of cookies
            const userRole = response.data.role;

            if (!userRole) {
                toast.error('Login failed. No role found.');
                handleFailedAttempt(false); // ✅ Call failed attempt handler
                return;
            }

            // ✅ Reset failed login attempts on success
            setCurrentAttempts(0);
            Cookies.set('currentAttempts', '0', { expires: 1, path: '/' });

            toast.success('Login successful!');
            navigate(userRole === 'admin' ? '/admin/UserManagement' : '/');
        } catch (error) {
            console.error("Login Error:", error.response ? error.response.data : error.message);

            // ✅ Always call `handleFailedAttempt()` on login failure
            handleFailedAttempt();
        }
    };


    // Handles failed login attempt logic
    const handleFailedAttempt = (showToast = true) => {
        const storedAttempts = Cookies.get('currentAttempts');
        const currentAttempts = storedAttempts ? parseInt(storedAttempts, 10) : 0;
        const newAttempts = currentAttempts + 1;
    
        Cookies.set('currentAttempts', newAttempts.toString(), { expires: 1, path: '/' }); // ✅ Store in Cookies
    
        if (newAttempts >= 3) {
            const lockoutDuration = 30; // Lockout time in seconds
            const lockoutEndTime = Date.now() + lockoutDuration * 1000;
            Cookies.set('lockoutEndTime', lockoutEndTime.toString(), { expires: 1, path: '/' }); // ✅ Store lockout time in Cookies
    
            setLockoutTime(lockoutDuration);
    
            // ✅ Show lockout message only once
            if (showToast) {
                toast.error(`Too many failed attempts. Please wait ${lockoutDuration} seconds before trying again.`);
            }
    
            // Ensure only ONE interval is running
            if (intervalRef.current) clearInterval(intervalRef.current);
    
            intervalRef.current = setInterval(() => {
                setLockoutTime((prevTime) => {
                    if (prevTime === null || prevTime <= 1) {
                        clearInterval(intervalRef.current!);
                        Cookies.remove('lockoutEndTime');
                        Cookies.set('currentAttempts', '0', { expires: 1, path: '/' }); // ✅ Reset attempts
                        return null;
                    }
                    return prevTime - 1;
                });
            }, 1000);
        } else {
            // ✅ Prevent duplicate error toast
            if (showToast) {
                toast.error('Invalid email or password', {
                    position: 'top-right',
                    autoClose: 3000,
                });
            }
        }
    };
    

    // ✅ Handle "Enter" key for login
    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent) => {
            if (event.key === 'Enter') {
                if (lockoutTime) {
                    toast.error(`Please wait ${lockoutTime} seconds before trying again.`);
                } else {
                    attemptLogin();
                }
            }
        };

        document.addEventListener('keydown', handleKeyPress);
        return () => document.removeEventListener('keydown', handleKeyPress);
    }, [email, password, lockoutTime]);

    return (
        <Box sx={{
            position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
            width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4,
        }}>

            <Typography variant="h4" sx={{ mb: 5 }} gutterBottom>Sign in</Typography>
            <IconButton
                sx={{ position: 'absolute', top: 10, right: 8 }}
                onClick={() => navigate('/')}
            >
                <Close />
            </IconButton>
            <TextField label="TTB Email" variant="outlined" value={email} onChange={(e) => setEmail(e.target.value)}
                sx={{ mb: 2, width: '100%' }} error={!!emailError} helperText={emailError} />
            <TextField label="Password" type="password" variant="outlined" value={password}
                onChange={(e) => setPassword(e.target.value)} sx={{ mb: 2, width: '100%' }} />
            <Button variant="contained" onClick={attemptLogin} sx={{ mb: 2, width: '100%' }} disabled={!!lockoutTime}>
                {lockoutTime ? `Try again in ${lockoutTime}s` : 'Login'}
            </Button>

            <Typography variant="body2" sx={{ textAlign: 'center', cursor: 'pointer', mt: 1 }}
                onClick={() => setIsForgotPasswordOpen(true)}>
                Forgot Password?
            </Typography>

            {/* Forgot Password Modal */}
            <Modal open={isForgotPasswordOpen} onClose={() => setIsForgotPasswordOpen(false)}>
                <Box sx={{
                    position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                    width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4, borderRadius: 2,
                }}>
                    <Typography variant="h6" gutterBottom>Reset Password</Typography>
                    <TextField label="Enter your email" variant="outlined" value={forgotEmail}
                        onChange={(e) => setForgotEmail(e.target.value)} sx={{ mb: 2, width: '100%' }} />
                    <Button variant="contained" onClick={() => { }} sx={{ width: '100%' }}>
                        {isLoading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Send Reset Link'}
                    </Button>
                </Box>
            </Modal>
        </Box>
    );
};

export default LoginPage;
