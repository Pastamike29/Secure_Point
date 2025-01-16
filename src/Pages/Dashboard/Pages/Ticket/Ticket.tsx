import React, { useState } from 'react';
import {
     Box,
     Typography,
     Button,
     TextField,
     IconButton,
     Grid,
     Paper,
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import DashboardLayout from '../../Components/DashboardLayout';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

const Ticket: React.FC = () => {

     const [emailError, setEmailError] = useState(false);

     const [formData, setFormData] = useState({
          application_number: '',
          employee_id: '',
          application_name: '',
          name: '',
          finding_issue: '',
          email: '',
          message: ''
     });

     const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const { name, value } = e.target;

          if (name === "email") {
               // Check if the email ends with @ttbbank.com
               const emailRegex = /^[a-zA-Z0-9._%+-]+@ttbbank\.com$/;
               if (!emailRegex.test(value)) {
                    setEmailError(true); // Set error state
               } else {
                    setEmailError(false); // Clear error state
               }
          }

          setFormData((prevData) => ({ ...prevData, [name]: value }));
     };

     const handleSubmit = async () => {
          try {
               console.log('Submitting form data:', formData); // Log form data
               const response = await axios.post('http://localhost:5000/tickets', formData);
               toast.success('Ticket sent successfully!', { position: 'top-right' });
               setFormData({
                    application_number: '',
                    employee_id: '',
                    application_name: '',
                    name: '',
                    finding_issue: '',
                    email: '',
                    message: '',
               });
          } catch (error) {
               console.error('Error submitting ticket:', error);
               toast.error('Failed to send ticket. Please try again.', { position: 'top-right' });
          }
     };


     return (
          <>
               <DashboardLayout title="Ticket">
                    <Box sx={{ py: 5 }}>
                         <Paper
                              sx={{
                                   display: 'flex',
                                   flexDirection: { xs: 'column', sm: 'row' },
                                   height: { xs: '100%', sm: '50 vh' },
                                   width: { xs: '100%', sm: '100 vh' },
                                   borderRadius: 2,
                                   overflow: 'hidden',
                                   boxShadow: 4,
                              }}
                         >
                              {/* Left Side */}
                              <Box
                                   sx={{
                                        flex: 8,
                                        backgroundColor: '#ffffff',
                                        color: '#121212',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        p: 10
                                   }}
                              >
                                   <Typography
                                        variant="h5"
                                        sx={{ fontWeight: 'bold', color: '#f06292', mb: 2 }}
                                   >
                                        FINDING ISSUE TICKET
                                   </Typography>

                                   <Grid container spacing={4}>
                                        <Grid item xs={6}>
                                             <TextField
                                                  label="Application Number"
                                                  name="application_number"
                                                  value={formData.application_number}
                                                  onChange={handleInputChange} // Ensure this updates formData
                                                  fullWidth
                                                  required
                                                  InputLabelProps={{ style: { color: '#121212', fontSize: '1.2rem' } }}
                                                  inputProps={{ style: { color: '#121212', fontSize: '1.2rem' } }}
                                                  sx={{
                                                       '& .MuiOutlinedInput-root': {
                                                            '& fieldset': {
                                                                 borderColor: '#121212',
                                                            },
                                                            '&:hover fieldset': {
                                                                 borderColor: '#ffccd5',
                                                            },
                                                            '&.Mui-focused fieldset': {
                                                                 borderColor: '#ffccd5',
                                                            },
                                                       },
                                                  }} />
                                        </Grid>

                                        <Grid item xs={6}>
                                             <TextField
                                                  label="Employee ID"
                                                  name="employee_id"
                                                  value={formData.employee_id}
                                                  onChange={handleInputChange}
                                                  required
                                                  variant="outlined"
                                                  InputLabelProps={{ style: { color: '#121212', fontSize: '1.2rem' } }}
                                                  inputProps={{ style: { color: '#121212', fontSize: '1.2rem' } }}
                                                  sx={{
                                                       '& .MuiOutlinedInput-root': {
                                                            '& fieldset': {
                                                                 borderColor: '#121212',
                                                            },
                                                            '&:hover fieldset': {
                                                                 borderColor: '#ffccd5',
                                                            },
                                                            '&.Mui-focused fieldset': {
                                                                 borderColor: '#ffccd5',
                                                            },
                                                       },
                                                  }} />
                                        </Grid>

                                        <Grid item xs={6}>
                                             <TextField
                                                  label="Application Name"
                                                  name="application_name"
                                                  required
                                                  value={formData.application_name}
                                                  onChange={handleInputChange}
                                                  variant="outlined"
                                                  InputLabelProps={{ style: { color: '#121212', fontSize: '1.2rem' } }}
                                                  inputProps={{ style: { color: '#121212', fontSize: '1.2rem' } }}
                                                  sx={{
                                                       '& .MuiOutlinedInput-root': {
                                                            '& fieldset': {
                                                                 borderColor: '#121212',
                                                            },
                                                            '&:hover fieldset': {
                                                                 borderColor: '#ffccd5',
                                                            },
                                                            '&.Mui-focused fieldset': {
                                                                 borderColor: '#ffccd5',
                                                            },
                                                       },
                                                  }} />
                                        </Grid>

                                        <Grid item xs={6}>
                                             <TextField
                                                  label="Name"
                                                  name="name"
                                                  required
                                                  value={formData.name}
                                                  onChange={handleInputChange}
                                                  variant="outlined"
                                                  InputLabelProps={{ style: { color: '#121212', fontSize: '1.2rem' } }}
                                                  inputProps={{ style: { color: '#121212', fontSize: '1.2rem' } }}
                                                  sx={{
                                                       '& .MuiOutlinedInput-root': {
                                                            '& fieldset': {
                                                                 borderColor: '#121212',
                                                            },
                                                            '&:hover fieldset': {
                                                                 borderColor: '#ffccd5',
                                                            },
                                                            '&.Mui-focused fieldset': {
                                                                 borderColor: '#ffccd5',
                                                            },
                                                       },
                                                  }} />
                                        </Grid>
                                        <Grid item xs={6}>
                                             <TextField
                                                  label="Finding Issue"
                                                  name="finding_issue"
                                                  required
                                                  value={formData.finding_issue}
                                                  onChange={handleInputChange}
                                                  variant="outlined"
                                                  InputLabelProps={{ style: { color: '#121212', fontSize: '1.2rem' } }}
                                                  inputProps={{ style: { color: '#121212', fontSize: '1.2rem' } }}
                                                  sx={{
                                                       '& .MuiOutlinedInput-root': {
                                                            '& fieldset': {
                                                                 borderColor: '#121212',
                                                            },
                                                            '&:hover fieldset': {
                                                                 borderColor: '#ffccd5',
                                                            },
                                                            '&.Mui-focused fieldset': {
                                                                 borderColor: '#ffccd5',
                                                            },
                                                       },
                                                  }} />
                                        </Grid>
                                        <Grid item xs={6}>
                                             <TextField
                                                  label="TTB Email"
                                                  name="email"
                                                  value={formData.email}
                                                  onChange={handleInputChange}
                                                  fullWidth
                                                  required
                                                  variant="outlined"
                                                  error={emailError} // Display red border when error is true
                                                  helperText={emailError ? "Please use @ttbbank.com only" : ""} // Show error message
                                                  InputLabelProps={{ style: { color: emailError ? "#d32f2f" : "#121212", fontSize: '1.2rem' } }}
                                                  inputProps={{ style: { color: '#121212', fontSize: '1.2rem' } }}
                                                  sx={{
                                                       '& .MuiOutlinedInput-root': {
                                                            '& fieldset': {
                                                                 borderColor: emailError ? '#d32f2f' : '#121212',
                                                            },
                                                            '&:hover fieldset': {
                                                                 borderColor: emailError ? '#d32f2f' : '#ffccd5',
                                                            },
                                                            '&.Mui-focused fieldset': {
                                                                 borderColor: emailError ? '#d32f2f' : '#ffccd5',
                                                            },
                                                       },
                                                  }}
                                             />
                                        </Grid>
                                        <Grid item xs={6}>
                                             <TextField
                                                  label="Message"
                                                  name="message"
                                                  fullWidth
                                                  required
                                                  value={formData.message}
                                                  onChange={handleInputChange}
                                                  variant="outlined"
                                                  InputLabelProps={{ style: { color: '#121212', fontSize: '1.2rem' } }}
                                                  inputProps={{ style: { color: '#121212', fontSize: '1.2rem' } }}
                                                  sx={{
                                                       '& .MuiOutlinedInput-root': {
                                                            '& fieldset': {
                                                                 borderColor: '#121212',
                                                            },
                                                            '&:hover fieldset': {
                                                                 borderColor: '#ffccd5',
                                                            },
                                                            '&.Mui-focused fieldset': {
                                                                 borderColor: '#ffccd5',
                                                            },
                                                       },
                                                  }} />
                                        </Grid>
                                   </Grid>
                                   <Button
                                        variant="contained"
                                        sx={{
                                             bgcolor: '#ff4d6d',
                                             color: '#fff',
                                             fontWeight: 'bold',
                                             fontSize: '1.2rem',
                                             py: 2,
                                             mt: 10,
                                             '&:hover': {
                                                  bgcolor: '#ff6684',
                                             },
                                        }}
                                        onClick={handleSubmit} // Attach the handleSubmit function here
                                   >
                                        Submit
                                   </Button>
                                   <Typography
                                        variant="caption"
                                        sx={{ mt: 1, textAlign: 'center', color: '#757575' }}
                                   >
                                        I agree I only upload <span style={{ color: '#f06292' }}>Quality work</span>
                                   </Typography>
                              </Box>

                              {/* Right Side */}
                              <Box
                                   sx={{
                                        flex: 2,
                                        backgroundColor: '#333333',
                                        color: '#ffffff',
                                        padding: 3,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                   }}
                              >
                                   <Box
                                        sx={{
                                             display: 'flex',
                                             justifyContent: 'center',
                                             alignItems: 'center',
                                             mb: 3,
                                        }}
                                   >
                                        <IconButton
                                             sx={{
                                                  backgroundColor: '#f06292',
                                                  width: 60,
                                                  height: 60,
                                                  borderRadius: '50%',
                                             }}
                                        >
                                             <Typography
                                                  variant="h6"
                                                  sx={{ color: '#ffffff', fontWeight: 'bold' }}
                                             >
                                                  M
                                             </Typography>
                                        </IconButton>
                                   </Box>

                                   <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                        <LocationOnIcon sx={{ mr: 1, color: '#f06292' }} />
                                        <Typography variant="body1">Location: Dribbble</Typography>
                                   </Box>

                                   <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <AttachMoneyIcon sx={{ mr: 1, color: '#f06292' }} />
                                        <Typography variant="body1">Ticket Price: $79.95</Typography>
                                   </Box>
                              </Box>
                         </Paper>
                         <ToastContainer />
                    </Box>
               </DashboardLayout>
          </>
     );
};

export default Ticket;
