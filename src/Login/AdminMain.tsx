import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify'; // Import toast functions
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles
import { useAuth } from './Component/AuthContext'; // Import useAuth
import { useNavigate } from 'react-router-dom'; // Import useNavigate

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const { login } = useAuth(); // Get the login function from useAuth
  const navigate = useNavigate(); // Hook for navigation
  const intervalRef = useRef<NodeJS.Timeout | null>(null); // Prevent multiple intervals

  // Track failed login attempts
  const [attempts, setAttempts] = useState(() => {
    const storedAttempts = localStorage.getItem('adminAttempts');
    return storedAttempts ? parseInt(storedAttempts, 10) : 0;
  });

  // Track lockout time (in seconds)
  const [lockoutTime, setLockoutTime] = useState<number | null>(() => {
    const storedLockoutEnd = localStorage.getItem('adminLockoutEndTime');
    if (storedLockoutEnd) {
      const remainingTime = Math.ceil(
        (parseInt(storedLockoutEnd, 10) - Date.now()) / 1000
      );
      return remainingTime > 0 ? remainingTime : null;
    }
    return null;
  });

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (lockoutTime) {
      toast.error(`Too many failed attempts. Try again in ${lockoutTime}s.`);
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/admin-login', { password });

      // Get user role from response (assuming it's returned)
      const userRole = response.data.role || 'admin';

      // Call the login function from AuthContext
      login(userRole);

      // Reset attempts on successful login
      setAttempts(0);
      localStorage.setItem('adminAttempts', '0');

      // Use toast to show success and navigate after the toast
      toast.success('Login success', {
        autoClose: 2000,
        onClose: () => {
          navigate('/admin/UserManagement'); // Redirect to admin page
        },
      });
    } catch (error) {
      handleFailedAttempt();
    }
  };

  // Handles failed login attempt logic
  const handleFailedAttempt = () => {
    const newAttempts = attempts + 1;
    setAttempts(newAttempts);
    localStorage.setItem('adminAttempts', newAttempts.toString());

    if (newAttempts >= 3) {
      const lockoutDuration = 30; // Lockout time in seconds
      const lockoutEndTime = Date.now() + lockoutDuration * 1000;
      localStorage.setItem('adminLockoutEndTime', lockoutEndTime.toString());

      setLockoutTime(lockoutDuration);
      toast.error(`Too many failed attempts. Please wait ${lockoutDuration} seconds before trying again.`);

      // Ensure only ONE interval is running
      if (intervalRef.current) clearInterval(intervalRef.current);

      intervalRef.current = setInterval(() => {
        setLockoutTime((prevTime) => {
          if (prevTime === null || prevTime <= 1) {
            clearInterval(intervalRef.current!);
            localStorage.removeItem('adminLockoutEndTime');
            setAttempts(0);
            localStorage.setItem('adminAttempts', '0');
            return null;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else {
      toast.error('Invalid password, you are not admin');
    }
  };

  // Lockout countdown effect
  useEffect(() => {
    if (lockoutTime !== null && lockoutTime > 0) {
      if (intervalRef.current) clearInterval(intervalRef.current);

      intervalRef.current = setInterval(() => {
        setLockoutTime((prevTime) => {
          if (prevTime === null || prevTime <= 1) {
            clearInterval(intervalRef.current!);
            localStorage.removeItem('adminLockoutEndTime');
            setAttempts(0);
            localStorage.setItem('adminAttempts', '0');
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

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      {/* Centered Header */}
      <Typography variant="h4" gutterBottom>
        Admin Login
      </Typography>

      {/* Password Input and Submit Button */}
      <form onSubmit={handleSubmit}>
        <Box display="flex" flexDirection="column" alignItems="center">
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            fullWidth
            sx={{ marginBottom: 2, width: '300px' }}
          />

          {/* Submit Button */}
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={!!lockoutTime}
          >
            {lockoutTime ? `Try again in ${lockoutTime}s` : 'Submit'}
          </Button>
        </Box>
      </form>
    </Box>
  );
}
