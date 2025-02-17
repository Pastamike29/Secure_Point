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
  Select,
  MenuItem,
  IconButton,
} from '@mui/material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import AdminDashboardLayout from '../Component/AdminDashboardLayout';
import { Delete, Edit } from '@mui/icons-material';

interface User {
  id: string;
  username: string;
  password: string;
  email: string;
  role: string;
  birth_date: string;
  quiz_amount: number;
  last_updated: string;
}

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [open, setOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');

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
  const [emailError, setEmailError] = useState(false);

  const getToken = () => {
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
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Failed to fetch users');
    }
  };

  const handleResetPassword = async () => {
    try {
      const token = getToken();
      await axios.post(
        'http://localhost:5000/admin/reset-user-password',
        { email: resetEmail, new_password: newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success('Password has been reset successfully. User must change password on login.');
      setPasswordDialogOpen(false);
      setNewPassword('');
      setResetEmail('');
      fetchUsers();
    } catch (error) {
      console.error('Error resetting password:', error);
      toast.error('Failed to reset password.');
    }
  };


  const handleSendResetLink = async (email: string) => {
    try {
      const token = getToken();
      await axios.post(
        'http://localhost:5000/admin/send-reset-link',
        { email },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success('Reset link sent to user’s email.');
    } catch (error) {
      console.error('Error sending reset link:', error);
      toast.error('Failed to send reset link.');
    }
  };


  const handleClickOpen = (user?: User) => {
    if (user) {
      setCurrentUser(user);
      setFormValues({
        username: user.username,
        password: '',
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
    const regex = /^[a-zA-Z0-9._%+-]+@ttbbank\.com$/i;
    return regex.test(email);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    setFormValues({ ...formValues, email });
    setEmailError(!validateEmail(email));
  };

  const handleSave = async () => {
    if (emailError) {
      toast.error('Please correct the errors before saving.');
      return;
    }

    try {
      const token = getToken();
      if (currentUser) {
        await axios.put(`http://localhost:5000/admin/user/${currentUser.id}`, formValues, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success('User updated successfully!');
      } else {
        await axios.post('http://localhost:5000/admin/user', formValues, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success('User created successfully!');
      }
      fetchUsers();
      handleClose();
    } catch (error) {
      console.error('Error saving user:', error);
      toast.error('Failed to save user');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const token = getToken();
      await axios.delete(`http://localhost:5000/admin/user/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('User deleted successfully!');
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error('Failed to delete user');
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
                <TableCell>Last Updated</TableCell>
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
                  <TableCell>{new Date(user.last_updated).toLocaleString()}</TableCell>
                  <TableCell>
                    <IconButton
                      color="primary"
                      onClick={() => handleClickOpen(user)}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton 
                     color="error" 
                     onClick={() => handleDelete(user.id)}
                     >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Reset Password Dialog */}
        <Dialog open={passwordDialogOpen} onClose={() => setPasswordDialogOpen(false)}>
          <DialogTitle>Reset User Password</DialogTitle>
          <DialogContent>
            <Typography sx={{ mb: 2 }}>Enter a new password for {resetEmail}:</Typography>
            <TextField
              label="New Password"
              type="password"
              fullWidth
              variant="outlined"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setPasswordDialogOpen(false)} color="primary">
              Cancel
            </Button>
            <Button onClick={handleResetPassword} color="primary">
              Reset Password
            </Button>
          </DialogActions>
        </Dialog>

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
              label="Password"
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
              error={emailError}
              helperText={emailError && 'Please use your @TTBBANK.COM email only'}
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
                setFormValues({ ...formValues, quizAmount: isNaN(value) ? 0 : value });
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
      </Container>
    </AdminDashboardLayout>
  );
};

export default UserManagement;
