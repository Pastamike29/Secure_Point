import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, TextField, Typography, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ResetPassword = () => {
    const navigate = useNavigate();
    const [token, setToken] = useState<string | null>(null);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // Get token from URL
        const urlParams = new URLSearchParams(window.location.search);
        const tokenFromUrl = urlParams.get('token');
        setToken(tokenFromUrl);
    }, []);

    // Handle Password Reset Submission
    const handleResetPassword = async () => {
        if (!token) {
            toast.error("Invalid or missing reset token.");
            return;
        }

        if (newPassword.length < 6) {
            toast.error("Password must be at least 6 characters long.");
            return;
        }

        if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match.");
            return;
        }

        setIsLoading(true);

        try {
            const response = await axios.post('http://localhost:5000/reset-password', {
                token,
                new_password: newPassword,
            });

            if (response.status === 200) {
                toast.success("Password reset successful!");
                navigate('/LoginPage'); // Redirect to login page
            }
        } catch (error) {
            if (error.response?.status === 400) {
                toast.error("Reset token is invalid or expired.");
            } else {
                toast.error("Failed to reset password. Try again.");
            }
        } finally {
            setIsLoading(false);
        }
    };

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
                Reset Password
            </Typography>
            <TextField
                label="New Password"
                type="password"
                variant="outlined"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
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
            <Button
                variant="contained"
                onClick={handleResetPassword}
                sx={{ width: '100%' }}
                disabled={isLoading}
            >
                {isLoading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Reset Password'}
            </Button>
        </Box>
    );
};

export default ResetPassword;
