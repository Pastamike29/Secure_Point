import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Card,
  CardContent,
  CardActions
} from '@mui/material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import ResponsiveAppBar from '../../../../Components/Navbar';
import Cookies from 'js-cookie'; // ✅ Import Cookies
import { useNavigate } from 'react-router-dom'; // ✅ Import useNavigate

const UpdateProfile: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const navigate = useNavigate(); // ✅ Initialize useNavigate

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = Cookies.get('auth_token'); // ✅ Get token from cookies
      console.log("DEBUG: auth_token from Cookies:", token); // ✅ Debugging log

      if (!token) {
        toast.error('Session expired. Please log in again.');
        navigate('/LoginPage'); // ✅ Redirect if no token
        return;
      }

      try {
        console.log('Fetching user profile...');
        const response = await axios.get('http://localhost:5000/user/profile', {
          withCredentials: true, // ✅ Ensures cookies are sent
        });

        const userData = response.data;
        setUsername(userData.username);
        setEmail(userData.email);
        setBirthDate(userData.birthDate || '');
      } catch (error) {
        console.error('Error fetching user profile:', error);
        toast.error('Failed to fetch profile data. Please log in again.');
        navigate('/LoginPage'); // ✅ Redirect if API request fails
      }
    };

    fetchUserProfile();
  }, [navigate]);

  const handleSubmitProfile = async (event: React.FormEvent) => {
    event.preventDefault();
    setErrors({});

    const formData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
    formData.append('birthDate', birthDate);
    if (image) {
      formData.append('profileImage', image);
    }

    try {
      await axios.put('http://localhost:5000/user/profile', formData, {
        withCredentials: true, // ✅ Ensures cookies are sent
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success('Profile updated successfully!');
      
      // ✅ Redirect to HomePage after 2 seconds
      setTimeout(() => {
        navigate('/');
      }, 2000);
      
    } catch (error: any) {
      console.error('Error updating profile:', error);
      if (error.response && error.response.data.errors) {
        setErrors(error.response.data.errors);
      } else {
        toast.error('Failed to update profile');
      }
    }
  };

  return (
    <>
      <ResponsiveAppBar />
      <Box
        sx={{
          minHeight: '100vh',
          bgcolor: 'linear-gradient(to bottom right, #ece9e6, #ffffff)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          p: 2,
        }}
      >
        <Card
          sx={{
            maxWidth: 400,
            width: '100%',
            p: 3,
            boxShadow: 4,
            borderRadius: 3,
            textAlign: 'center',
            bgcolor: 'background.paper',
          }}
        >
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
            Profile Settings
          </Typography>

          <CardContent sx={{ textAlign: 'left', p: 0 }}>
            <form onSubmit={handleSubmitProfile}>
              <TextField
                label="Username"
                variant="outlined"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                sx={{ mb: 2, width: '100%' }}
                error={!!errors.username}
                helperText={errors.username}
              />
              <TextField
                label="Email"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{ mb: 2, width: '100%' }}
                error={!!errors.email}
                helperText={errors.email}
              />
              <TextField
                label="Birth Date"
                type="date"
                variant="outlined"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                sx={{ mb: 2, width: '100%' }}
                InputLabelProps={{
                  shrink: true,
                }}
                error={!!errors.birthDate}
                helperText={errors.birthDate}
              />
              <CardActions sx={{ p: 0 }}>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ width: '100%', borderRadius: 2, py: 1.5 }}
                >
                  Update Profile
                </Button>
              </CardActions>
            </form>
          </CardContent>
        </Card>
      </Box>
    </>
  );
};

export default UpdateProfile;
