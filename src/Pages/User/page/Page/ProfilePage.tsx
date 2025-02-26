import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
  LinearProgress
} from '@mui/material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ResponsiveAppBar from '../../../../Components/Navbar';
import Cookies from 'js-cookie'; // ✅ Import Cookies

interface User {
  username: string;
  email: string;
  birthDate: string | null;
}

const ProfilePage: React.FC = () => {
  const [userData, setUserData] = useState<User | null>(null);
  const [loading, setLoading] = useState(true); // ✅ Added loading state
  const navigate = useNavigate();

  const handleUpdateProfile = () => {
    navigate('/UpdateProfile');
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = Cookies.get('auth_token'); // ✅ Read token from cookies

      if (!token) {
        toast.error('Session expired. Please log in again.');
        navigate('/LoginPage'); // ✅ Redirect to login if no token
        return;
      }

      try {
        console.log('Fetching user profile...'); // ✅ Debugging log
        const response = await axios.get('http://localhost:5000/user/profile', {
          withCredentials: true, // ✅ Ensures cookies are sent
        });

        console.log('User Data:', response.data); // ✅ Debugging log
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
        toast.error('Failed to fetch user data. Please log in again.');
        navigate('/LoginPage'); // ✅ Redirect if API request fails
      } finally {
        setLoading(false); // ✅ Stop loading after API call
      }
    };

    fetchUserProfile();
  }, [navigate]);

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
        {loading ? ( // ✅ Show loading indicator
          <Box sx={{ width: '50%', maxWidth: 400 }}>
            <LinearProgress />
            <Typography variant="subtitle1" align="center" sx={{ mt: 2 }}>
              Loading your profile...
            </Typography>
          </Box>
        ) : !userData ? ( // ✅ Show error if no data
          <Typography variant="h6" color="error">
            Failed to load profile. Please try again.
          </Typography>
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
          </Card>
        )}
      </Box>
    </>
  );
};

export default ProfilePage;
