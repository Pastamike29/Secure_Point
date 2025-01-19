import React, { useState, useEffect } from 'react';
import {
     Box,
     Typography,
     Button,
     TextField,
     Grid,
     Paper,
     IconButton,
     Snackbar,
     Alert,
     Table,
     TableBody,
     TableCell,
     TableContainer,
     TableHead,
     TableRow,
     Dialog,
     DialogActions,
     DialogContent,
     DialogTitle
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import AdminDashboardLayout from '../Component/AdminDashboardLayout';

const API_URL = 'http://localhost:5000/tickets';

const TicketManagement: React.FC = () => {
     const [tickets, setTickets] = useState([]);
     const [formData, setFormData] = useState({
          application_number: '',
          employee_id: '',
          application_name: '',
          name: '',
          finding_issue: '',
          email: '',
          message: ''
     });
     const [editingTicket, setEditingTicket] = useState<string | null>(null);
     const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
     const [dialogOpen, setDialogOpen] = useState(false);

     const fetchTickets = async () => {
          try {
               const response = await axios.get(API_URL);
               setTickets(response.data);
          } catch (error) {
               console.error('Error fetching tickets:', error);
          }
     };

     useEffect(() => {
          fetchTickets();
     }, []);

     const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const { name, value } = e.target;
          setFormData((prev) => ({ ...prev, [name]: value }));
     };

     const handleSubmit = async () => {
          try {
               if (editingTicket) {
                    await axios.put(`${API_URL}/${editingTicket}`, formData);
                    toast.success('Ticket updated successfully!');
               } else {
                    await axios.post(API_URL, formData);
                    toast.success('Ticket created successfully!');
               }
               setDialogOpen(false);
               setFormData({
                    application_number: '',
                    employee_id: '',
                    application_name: '',
                    name: '',
                    finding_issue: '',
                    email: '',
                    message: ''
               });
               setEditingTicket(null);
               fetchTickets();
          } catch (error) {
               toast.error('Error submitting ticket.');
          }
     };

     const handleDelete = async (id: string) => {
          try {
               await axios.delete(`${API_URL}/${id}`);
               toast.success('Ticket deleted successfully!');
               fetchTickets();
          } catch (error) {
               toast.error('Error deleting ticket.');
          }
     };

     const handleEdit = (ticket: any) => {
          setFormData(ticket);
          setEditingTicket(ticket.id);
          setDialogOpen(true);
     };

     return (
          <AdminDashboardLayout>
               <Box sx={{ padding: 4 }}>
                    <Typography variant="h4" gutterBottom>
                         Ticket Management
                    </Typography>

                    <Button
                         variant="contained"
                         color="primary"
                         onClick={() => {
                              setFormData({
                                   application_number: '',
                                   employee_id: '',
                                   application_name: '',
                                   name: '',
                                   finding_issue: '',
                                   email: '',
                                   message: ''
                              });
                              setEditingTicket(null);
                              setDialogOpen(true);
                         }}
                    >
                         Create Ticket
                    </Button>

                    <TableContainer component={Paper} sx={{ marginTop: 4 }}>
                         <Table>
                              <TableHead>
                                   <TableRow>
                                        <TableCell>Application Number</TableCell>
                                        <TableCell>Employee ID</TableCell>
                                        <TableCell>Application Name</TableCell>
                                        <TableCell>Finding Issue</TableCell>
                                        <TableCell>Email</TableCell>
                                        <TableCell>Message</TableCell>
                                        <TableCell>Actions</TableCell>
                                   </TableRow>
                              </TableHead>
                              <TableBody>
                                   {tickets.map((ticket: any) => (
                                        <TableRow key={ticket.id}>
                                             <TableCell>{ticket.application_number}</TableCell>
                                             <TableCell>{ticket.employee_id}</TableCell>
                                             <TableCell>{ticket.application_name}</TableCell>
                                             <TableCell>{ticket.finding_issue}</TableCell>
                                             <TableCell>{ticket.email}</TableCell>
                                             <TableCell>{ticket.message}</TableCell>
                                             <TableCell>
                                                  <IconButton onClick={() => handleEdit(ticket)} color="primary">
                                                       <EditIcon />
                                                  </IconButton>
                                                  <IconButton onClick={() => handleDelete(ticket.id)} color="secondary">
                                                       <DeleteIcon />
                                                  </IconButton>
                                             </TableCell>
                                        </TableRow>
                                   ))}
                              </TableBody>
                         </Table>
                    </TableContainer>

                    <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} fullWidth maxWidth="sm">
                         <DialogTitle>{editingTicket ? 'Edit Ticket' : 'Create Ticket'}</DialogTitle>
                         <DialogContent>
                              <Grid container spacing={2}>
                                   <Grid item xs={12}>
                                        <TextField
                                             label="Application Number"
                                             name="application_number"
                                             value={formData.application_number}
                                             onChange={handleInputChange}
                                             fullWidth
                                             required
                                        />
                                   </Grid>
                                   <Grid item xs={12}>
                                        <TextField
                                             label="Employee ID"
                                             name="employee_id"
                                             value={formData.employee_id}
                                             onChange={handleInputChange}
                                             fullWidth
                                             required
                                        />
                                   </Grid>
                                   <Grid item xs={12}>
                                        <TextField
                                             label="Application Name"
                                             name="application_name"
                                             value={formData.application_name}
                                             onChange={handleInputChange}
                                             fullWidth
                                             required
                                        />
                                   </Grid>
                                   <Grid item xs={12}>
                                        <TextField
                                             label="Name"
                                             name="name"
                                             value={formData.name}
                                             onChange={handleInputChange}
                                             fullWidth
                                             required
                                        />
                                   </Grid>
                                   <Grid item xs={12}>
                                        <TextField
                                             label="Finding Issue"
                                             name="finding_issue"
                                             value={formData.finding_issue}
                                             onChange={handleInputChange}
                                             fullWidth
                                             required
                                        />
                                   </Grid>
                                   <Grid item xs={12}>
                                        <TextField
                                             label="Email"
                                             name="email"
                                             value={formData.email}
                                             onChange={handleInputChange}
                                             fullWidth
                                             required
                                        />
                                   </Grid>
                                   <Grid item xs={12}>
                                        <TextField
                                             label="Message"
                                             name="message"
                                             value={formData.message}
                                             onChange={handleInputChange}
                                             fullWidth
                                             required
                                             multiline
                                             rows={4}
                                        />
                                   </Grid>
                              </Grid>
                         </DialogContent>
                         <DialogActions>
                              <Button onClick={() => setDialogOpen(false)} color="secondary">
                                   Cancel
                              </Button>
                              <Button onClick={handleSubmit} color="primary">
                                   {editingTicket ? 'Update' : 'Create'}
                              </Button>
                         </DialogActions>
                    </Dialog>

                    <Snackbar
                         open={snackbar.open}
                         autoHideDuration={4000}
                         onClose={() => setSnackbar({ ...snackbar, open: false })}
                    >
                         <Alert severity={snackbar.severity as any} sx={{ width: '100%' }}>
                              {snackbar.message}
                         </Alert>
                    </Snackbar>

                    <ToastContainer />
               </Box>
          </AdminDashboardLayout>
     );
};

export default TicketManagement;
