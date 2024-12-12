import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Avatar,
  Card,
  CardContent,
  CardActions
} from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { PhotoCamera } from '@mui/icons-material';

const UpdateProfile: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          toast.error('User is not logged in');
          return;
        }

        const response = await axios.get('http://localhost:5000/user/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const userData = response.data;
        setUsername(userData.username);
        setEmail(userData.email);
        setBirthDate(userData.birthDate || '');
        setProfileImage(userData.profileImage);
      } catch (error) {
        console.error('Error fetching user profile:', error);
        toast.error('Failed to fetch profile data');
      }
    };

    fetchUserProfile();
  }, []);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

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
      const token = localStorage.getItem('token');
      await axios.put('http://localhost:5000/user/profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success('Profile updated successfully!');
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
        <Avatar
          alt="Profile Picture"
          src={profileImage || '/default-profile.png'}
          sx={{
            width: 120,
            height: 120,
            mx: 'auto',
            mb: 2,
            border: '2px solid',
            borderColor: 'primary.main',
          }}
        />
        <CardContent sx={{ textAlign: 'left', p: 0 }}>
          <input
            accept="image/*"
            style={{ display: 'none' }}
            id="file-input"
            type="file"
            onChange={handleImageChange}
          />
          <label htmlFor="file-input">
            <Button
              variant="outlined"
              component="span"
              startIcon={<PhotoCamera />}
              sx={{ mb: 3, display: 'block', mx: 'auto' }}
            >
              Upload Profile
            </Button>
          </label>
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
        <ToastContainer />
      </Card>
    </Box>
  );
};

export default UpdateProfile;
