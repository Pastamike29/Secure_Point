import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
} from '@mui/material';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify'; // Import toast functions
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles
import { useAuth } from './Component/AuthContext'; // Import useAuth
import { useNavigate } from 'react-router-dom'; // Import useNavigate

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const { login } = useAuth(); // Get the login function from useAuth
  const navigate = useNavigate(); // Hook for navigation

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/admin-login', { password });
      
      // Get user role from response (assuming it's in the response data)
     //  const userRole = response.data.user.role; // Adjust this line based on your backend response structure
      toast.success('Login success', {
        onClose: () => {
          // login(userRole); // Call login function with user role
          navigate('/admin/AddVulnerability'); // Redirect to the Add Vulnerability page
        },
      });
    } catch (error) {
      toast.error('Invalid password, you are not admin');
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      {/* Toast container to display messages */}
      <ToastContainer />

      {/* Centered Header */}
      <Typography variant="h4" gutterBottom>
        admin
      </Typography>

      {/* Password Input and Submit Button below each other */}
      <form onSubmit={handleSubmit}>
        <Box display="flex" flexDirection="column" alignItems="center">
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            fullWidth
            sx={{ marginBottom: 2, width: '300px' }}  // Adjust width as needed
          />

          {/* Submit Button */}
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </Box>
      </form>
    </Box>
  );
}
