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
  Select,
  MenuItem,
} from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import axios from 'axios';
import AdminDashboardLayout from '../Component/AdminDashboardLayout';

interface User {
  id: string;
  username: string;
  password: string;
  email: string;
  role: string;
  birth_date: string;
  quiz_amount: number;
  last_updated: string; // New field
}


const AddUser: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [open, setOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [formValues, setFormValues] = useState<{
    username: string;
    password: string;
    email: string;
    role: string;
    birthdate: string;
    quizAmount: number;
  }>({
    username: '',
    password: '',
    email: '',
    role: 'user',
    birthdate: '',
    quizAmount: 0,
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');
  const [emailError, setEmailError] = useState(false);


  // Placeholder for token retrieval
  const getToken = () => {
    // Replace this with a real token retrieval method
    return localStorage.getItem('authToken') || 'mockToken';
  };

  const fetchUsers = async () => {
    try {
      const token = getToken();
      const response = await axios.get('http://localhost:5000/admin/user', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Response data:', response.data); // Add this
      const data = response.data;

      if (Array.isArray(data)) {
        setUsers(data);
      } else {
        console.error('Expected an array of users, but received:', data);
        setUsers([]);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      setSnackbarMessage('Failed to fetch users');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };


  const handleClickOpen = (user?: User) => {
    if (user) {
      setCurrentUser(user);
      setFormValues({
        username: user.username,
        password: '', // To prevent showing hashed passwords
        email: user.email,
        role: user.role,
        birthdate: user.birth_date || '',
        quizAmount: user.quiz_amount || 0,
      });
    } else {
      setCurrentUser(null);
      setFormValues({
        username: '',
        password: '',
        email: '',
        role: 'user',
        birthdate: '',
        quizAmount: 0,
      });
    }
    setOpen(true);
  };


  const handleClose = () => {
    setOpen(false);
  };


  const validateEmail = (email: string) => {
    const regex = /^[a-zA-Z0-9._%+-]+@TTBBANK\.COM$/i;
    return regex.test(email);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    setFormValues({ ...formValues, email });
    setEmailError(!validateEmail(email)); // Update validation state
  };


  const handleSave = async () => {
    if (emailError) {
      setSnackbarMessage('Please correct the errors before saving.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }

    // Existing save logic
    try {
      const token = getToken();
      if (currentUser) {
        await axios.put(`http://localhost:5000/admin/user/${currentUser.id}`, formValues, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSnackbarMessage('User updated successfully!');
      } else {
        await axios.post('http://localhost:5000/admin/user', formValues, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSnackbarMessage('User created successfully!');
      }
      setSnackbarSeverity('success');
      fetchUsers();
      handleClose();
    } catch (error) {
      console.error('Error saving user:', error);
      setSnackbarMessage('Failed to save user');
      setSnackbarSeverity('error');
    } finally {
      setSnackbarOpen(true);
    }
  };


  const handleDelete = async (id: string) => {
    try {
      const token = getToken();
      await axios.delete(`http://localhost:5000/admin/user/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSnackbarMessage('User deleted successfully!');
      setSnackbarSeverity('success');
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
      setSnackbarMessage('Failed to delete user');
      setSnackbarSeverity('error');
    } finally {
      setSnackbarOpen(true);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <AdminDashboardLayout title="User Management">
      <Container>

        <Button variant="contained" color="primary" onClick={() => handleClickOpen()} sx={{ my: 2 }}>
          Add User
        </Button>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Username</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Birthdate</TableCell>
                <TableCell>Quiz Amount</TableCell>
                <TableCell>Last Updated</TableCell> {/* New column */}
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>{user.birth_date}</TableCell>
                  <TableCell>{user.quiz_amount}</TableCell>
                  <TableCell>{new Date(user.last_updated).toLocaleString()}</TableCell> {/* Format timestamp */}
                  <TableCell>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleClickOpen(user)}
                      style={{ marginRight: '8px' }}
                    >
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
              label="Password" // New field for password
              type="password"
              fullWidth
              variant="outlined"
              value={formValues.password}
              onChange={(e) => setFormValues({ ...formValues, password: e.target.value })}
            />
            <TextField
              margin="dense"
              label="Email"
              type="email"
              fullWidth
              variant="outlined"
              value={formValues.email}
              onChange={handleEmailChange}
              error={emailError} // Highlight field in red if there's an error
              helperText={
                emailError ? (
                  <span style={{ fontSize: '1rem' }}>Please use your @TTBBANK.COM email only</span>
                ) : ''
              }
            />
            <TextField
              margin="dense"
              label="Birthdate"
              type="date"
              fullWidth
              variant="outlined"
              value={formValues.birthdate}
              onChange={(e) => setFormValues({ ...formValues, birthdate: e.target.value })}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              margin="dense"
              label="Quiz Amount"
              type="number"
              fullWidth
              variant="outlined"
              value={formValues.quizAmount}
              onChange={(e) => {
                const value = parseInt(e.target.value, 10);
                if (!isNaN(value)) {
                  setFormValues({ ...formValues, quizAmount: value });
                } else {
                  setFormValues({ ...formValues, quizAmount: 0 }); // Default to 0 if the input is invalid
                }
              }}
            />

            <Select
              fullWidth
              value={formValues.role}
              onChange={(e) => setFormValues({ ...formValues, role: e.target.value })}
              margin="dense"
              variant="outlined"
            >
              <MenuItem value="user">User</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
            </Select>
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
          <MuiAlert
            elevation={6}
            severity={snackbarSeverity}
            onClose={() => setSnackbarOpen(false)}
          >
            {snackbarMessage}
          </MuiAlert>
        </Snackbar>
      </Container>
    </AdminDashboardLayout>
  );
};

export default AddUser;
