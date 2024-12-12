import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Avatar,
  Button,
  Card,
  CardContent,
  CardActions,
  LinearProgress
} from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import { User } from '../../../../Login/Component/UserAuthen'; // Adjust the import path as necessary
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProfilePage: React.FC = () => {
  const [userData, setUserData] = useState<User | null>(null);
  const navigate = useNavigate();

  const handleUpdateProfile = () => {
    navigate('/UpdateProfile');
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('User is not logged in');
        return;
      }

      try {
        const response = await axios.get('http://localhost:5000/user/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
        toast.error('Failed to fetch user data');
      }
    };

    fetchUserProfile();
  }, []);

  return (
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
      {!userData ? (
        <Box sx={{ width: '50%', maxWidth: 400 }}>
          <LinearProgress />
          <Typography variant="subtitle1" align="center" sx={{ mt: 2 }}>
            Loading your profile...
          </Typography>
        </Box>
      ) : (
        <Card
          sx={{
            maxWidth: 400,
            width: '100%',
            p: 2,
            boxShadow: 3,
            borderRadius: 3,
            bgcolor: 'background.paper',
            textAlign: 'center',
          }}
        >
          <Box sx={{ mb: 2 }}>
            {/* <Avatar
              alt="Profile Picture"
              src={userData.profileImage || '/default-profile.png'}
              sx={{
                width: 120,
                height: 120,
                mx: 'auto',
                mb: 2,
                border: '2px solid',
                borderColor: 'primary.main',
              }}
            /> */}
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
              {userData.username}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {userData.email}
            </Typography>
          </Box>
          <CardContent>
            <Typography variant="body1" gutterBottom>
              <strong>Password:</strong> ****
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Birth Date:</strong> {userData.birthDate || '-'}
            </Typography>
          </CardContent>
          <CardActions sx={{ justifyContent: 'center' }}>
            <Button
              variant="contained"
              onClick={handleUpdateProfile}
              sx={{ borderRadius: 2, px: 3 }}
            >
              Edit Profile
            </Button>
          </CardActions>
          <ToastContainer />
        </Card>
      )}
    </Box>
  );
};

export default ProfilePage;
