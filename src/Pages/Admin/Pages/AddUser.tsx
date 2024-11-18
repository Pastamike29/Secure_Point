import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Snackbar,
} from '@mui/material';
import axios from 'axios';
import MuiAlert from '@mui/material/Alert';
import { Token } from '@mui/icons-material';
import AdminDashboardLayout from '../Component/AdminDashboardLayout';

interface User {
  id: string;
  username: string;
  email: string;
  role: string;
}

const AddUser: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [open, setOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [formValues, setFormValues] = useState<{ username: string; email: string; role: string }>({
    username: '',
    email: '',
    role: 'user',
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const fetchUsers = async () => {
    try {
      const token = Token // Ensure you replace this with the actual token
      const response = await axios.get('http://localhost:5000/admin/user', {
        headers: {
          'Authorization': `Bearer ${token}`, // Correctly formatted
        }
      });
      const data = response.data;

      if (Array.isArray(data)) {
        setUsers(data);
      } else {
        console.error('Expected an array of users, but received:', data);
        setUsers([]);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };




  const handleClickOpen = (user?: User) => {
    if (user) {
      setCurrentUser(user);
      setFormValues({ username: user.username, email: user.email, role: user.role });
    } else {
      setCurrentUser(null);
      setFormValues({ username: '', email: '', role: 'user' });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = async () => {
    try {
      if (currentUser) {
        // Update user
        await axios.put(`/admin/user/${currentUser.id}`, formValues);
        setSnackbarMessage('User updated successfully!');
      } else {
        // Create new user
        await axios.post('/admin/user', formValues);
        setSnackbarMessage('User created successfully!');
      }
      fetchUsers();
      handleClose();
    } catch (error) {
      console.error('Error saving user:', error);
      setSnackbarMessage('Failed to save user');
    } finally {
      setSnackbarOpen(true); // Show snackbar for success/error
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/admin/user/${id}`);
      setSnackbarMessage('User deleted successfully!');
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
      setSnackbarMessage('Failed to delete user');
    } finally {
      setSnackbarOpen(true); // Show snackbar for success/error
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <AdminDashboardLayout title='User Management'>
    <Container>

      <Button variant="contained" color="primary" onClick={() => handleClickOpen()}>
        Add User
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Username</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <Button variant="contained" color="secondary" onClick={() => handleClickOpen(user)}>
                    Edit
                  </Button>
                  <Button variant="contained" color="error" onClick={() => handleDelete(user.id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{currentUser ? 'Edit User' : 'Add User'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Username"
            type="text"
            fullWidth
            variant="outlined"
            value={formValues.username}
            onChange={(e) => setFormValues({ ...formValues, username: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Email"
            type="email"
            fullWidth
            variant="outlined"
            value={formValues.email}
            onChange={(e) => setFormValues({ ...formValues, email: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Role"
            type="text"
            fullWidth
            variant="outlined"
            value={formValues.role}
            onChange={(e) => setFormValues({ ...formValues, role: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
      >
        <MuiAlert elevation={6} severity="error" onClose={() => setSnackbarOpen(false)}>
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </Container>
    </AdminDashboardLayout>
  );
};

export default AddUser;
