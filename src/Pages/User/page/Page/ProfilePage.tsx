import React, { useEffect, useState } from 'react';
import { Box, Typography, Avatar, Button } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import { User } from '../../../../Login/Component/UserAuthen'; // Adjust the import path as necessary
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProfilePage: React.FC = () => {
     const [userData, setUserData] = useState<User | null>(null); // Use User type

const navigate = useNavigate();

const handleUpdateProfile= ()  =>{
     navigate('/UpdateProfile')
}
     // Fetch user profile data when the component mounts
     useEffect(() => {
          const fetchUserProfile = async () => {
               const token = localStorage.getItem('token'); // Get the token from local storage
               if (!token) {
                    toast.error('User is not logged in'); // Handle case when token is not found
                    return;
               }

               try {
                    const response = await axios.get('http://localhost:5000/user/profile', {
                         headers: {
                              Authorization: `Bearer ${token}`, // Set the token in the header
                         },
                    });
                    setUserData(response.data); // Assuming the response shape matches the User interface
               } catch (error) {
                    console.error('Error fetching user profile:', error);
                    toast.error('Failed to fetch user data');
               }
          };

          fetchUserProfile();
     }, []);

     if (!userData) {
          return <Typography>Loading...</Typography>;
     }

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
                    textAlign: 'center',
               }}
          >
               <Typography variant="h4" gutterBottom>
                    User Profile
               </Typography>
               <Avatar
                    alt="Profile Picture"
                    src={userData.profileImage || '/default-profile.png'}
                    sx={{ width: 100, height: 100, mb: 2, mx: 'auto' }}
               />
               <Typography variant="h6">Username: {userData.username}</Typography>
               <Typography variant="h6">Email: {userData.email}</Typography>
               <Typography variant="h6">Password: ****</Typography>
               <Typography variant="h6">Birth Date: {userData.birthDate || '-'}</Typography>
               <Button variant="contained" sx={{ mt: 3 }} onClick={handleUpdateProfile}>
                    Edit Profile
               </Button>
               <ToastContainer />
          </Box>
     );
};

export default ProfilePage;
