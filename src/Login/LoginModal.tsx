     import React from 'react';
     import { Modal, Box, Typography, Button, Grid, IconButton, Link } from '@mui/material';
     import FacebookIcon from '@mui/icons-material/Facebook';
     import GoogleIcon from '@mui/icons-material/Google';
     import CloseIcon from '@mui/icons-material/Close';
     import { useNavigate } from 'react-router-dom';

     const LoginModal = ({ open, onClose }) => {

          const navigate = useNavigate();

          return (
               <Modal open={open} onClose={onClose} aria-labelledby="login-modal">
                    <Box sx={{ display: 'flex', width: '30vw', height: '65vh', bgcolor: 'background.paper',border:'3px solid white', m: 'auto', my: 15, boxShadow: 24, p: 2, borderRadius: 2 }}>

               

                         {/* Right Panel */}
                         <Grid container sx={{ width: '100%', p: 2 }} direction="column" justifyContent="space-between">
                              <IconButton sx={{ alignSelf: 'flex-end' }} onClick={onClose}>
                                   <CloseIcon />
                              </IconButton>

                              <Box textAlign="center" sx={{ mb: 7.5 }}>
                                   <Typography variant="h5" gutterBottom>Sign in</Typography>
                                   <Button variant="outlined" onClick={() => navigate('/LoginPage')} sx={{ my: 1, width: '70%' }} >
                                       TTB Username
                                   </Button>
                              </Box>

                              <Box textAlign="center">
                                   <Typography onClick={() => navigate('/RegisterPage')} sx={{ fontSize: 14, ":hover": { cursor: 'pointer', textDecoration: 'underline' } }}>
                                        Create Account?
                                   </Typography>
                              </Box>
                         </Grid>
                    </Box>
               </Modal>
          );
     };

     export default LoginModal;
