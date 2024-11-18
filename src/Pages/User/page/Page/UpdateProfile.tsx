import React, { useEffect, useState } from 'react';
import { Box, Button, TextField, Typography, Avatar } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const UpdateProfile = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [birthDate, setBirthDate] = useState(''); // Keep this as an empty string initially
    const [image, setImage] = useState<File | null>(null);
    const [profileImage, setProfileImage] = useState<string | null>(null);
    const [quizScore, setQuizScore] = useState<number | null>(null);
    const [errors, setErrors] = useState<{ [key: string]: string }>({}); // State for errors

    // Fetch user profile data when the component mounts
    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const token = localStorage.getItem('token'); // Adjust as per your implementation
                const response = await axios.get('http://localhost:5000/user/profile', {
                    headers: {
                        Authorization: `Bearer ${token}`, // Include token for authentication
                    },
                });
                const userData = response.data;

                setUsername(userData.username);
                setEmail(userData.email);
                setBirthDate(userData.birthDate || ''); // Set birthDate with the fetched value
                setProfileImage(userData.profileImage);
            } catch (error) {
                console.error('Error fetching user profile:', error);
                toast.error('Failed to fetch profile data');
            }
        };

        fetchUserProfile();
    }, []);

    // Handle image upload
    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImage(reader.result as string); // Preview the image
            };
            reader.readAsDataURL(file);
        }
    };

    // Handle profile form submission
    const handleSubmitProfile = async (event: React.FormEvent) => {
        event.preventDefault();
        setErrors({}); // Clear previous errors

        const formData = new FormData();
        formData.append('username', username);
        formData.append('email', email);
        formData.append('birthDate', birthDate);
        if (image) {
            formData.append('profileImage', image);
        }

        try {
            await axios.put('http://localhost:5000/user/profile', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            toast.success('Profile updated successfully!');
        } catch (error) {
            console.error('Error updating profile:', error);
            if (error.response && error.response.data.errors) {
                setErrors(error.response.data.errors); // Set the error messages received from the server
            } else {
                toast.error('Failed to update profile');
            }
        }
    };

    return (
        <Box
            sx={{
                maxWidth: 400,
                mx: 'auto',
                my:10,
                p: 4,
                bgcolor: 'background.paper',
                boxShadow: 3,
                borderRadius: 2,
            }}
        >
            <Typography variant="h4" gutterBottom>
                Profile Settings
            </Typography>
            <Avatar
                alt="Profile Picture"
                src={profileImage || '/default-profile.png'}
                sx={{ width: 100, height: 100, mb: 2, mx: 'auto' }}
            />
            <input
                accept="image/*"
                style={{ display: 'none' }}
                id="file-input"
                type="file"
                onChange={handleImageChange}
            />
            <label htmlFor="file-input">
                <Button variant="contained" component="span" sx={{ mb: 2 }}>
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
                <Button type="submit" variant="contained" sx={{ width: '100%' }}>
                    Update Profile
                </Button>
            </form>

            <ToastContainer />
        </Box>
    );
};

export default UpdateProfile;
