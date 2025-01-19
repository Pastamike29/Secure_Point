import React, { useEffect, useState } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  CircularProgress,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminDashboardLayout from '../../Component/AdminDashboardLayout';

type Feedback = {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
};

const FeedbackManagement: React.FC = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingFeedback, setEditingFeedback] = useState<Feedback | null>(null);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/feedback');
        setFeedbacks(response.data);
      } catch (err) {
        toast.error('Failed to fetch feedbacks. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, []);

  const handleEdit = (feedback: Feedback) => {
    setEditingFeedback(feedback);
    setDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/feedback/${id}`);
      setFeedbacks((prev) => prev.filter((feedback) => feedback.id !== id));
      toast.success('Feedback deleted successfully.');
    } catch (err) {
      toast.error('Failed to delete feedback. Please try again later.');
    }
  };

  const handleDialogClose = () => {
    setEditingFeedback(null);
    setDialogOpen(false);
  };

  const handleDialogSave = async () => {
    if (!editingFeedback) return;

    try {
      await axios.put(`http://localhost:5000/feedback/${editingFeedback.id}`, editingFeedback);
      setFeedbacks((prev) =>
        prev.map((feedback) =>
          feedback.id === editingFeedback.id ? editingFeedback : feedback
        )
      );
      toast.success('Feedback updated successfully.');
      setDialogOpen(false);
    } catch (err) {
      toast.error('Failed to update feedback. Please try again later.');
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Typography color="error" variant="h6">
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <AdminDashboardLayout title="Feedback Management">
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          Feedback Table
        </Typography>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>ID</strong></TableCell>
                <TableCell><strong>Name</strong></TableCell>
                <TableCell><strong>Email</strong></TableCell>
                <TableCell><strong>Message</strong></TableCell>
                <TableCell><strong>Created At</strong></TableCell>
                <TableCell><strong>Actions</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {feedbacks.map((feedback) => (
                <TableRow key={feedback.id}>
                  <TableCell>{feedback.id}</TableCell>
                  <TableCell>{feedback.name}</TableCell>
                  <TableCell>{feedback.email}</TableCell>
                  <TableCell>{feedback.message}</TableCell>
                  <TableCell>{new Date(feedback.created_at).toLocaleString()}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEdit(feedback)} color="primary">
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(feedback.id)} color="secondary">
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Edit Dialog */}
      {editingFeedback && (
        <Dialog open={dialogOpen} onClose={handleDialogClose} fullWidth maxWidth="sm">
          <DialogTitle>Edit Feedback</DialogTitle>
          <DialogContent>
            <TextField
              label="Name"
              fullWidth
              value={editingFeedback.name}
              onChange={(e) =>
                setEditingFeedback({ ...editingFeedback, name: e.target.value })
              }
              sx={{ marginBottom: 2 }}
            />
            <TextField
              label="Email"
              fullWidth
              value={editingFeedback.email}
              onChange={(e) =>
                setEditingFeedback({ ...editingFeedback, email: e.target.value })
              }
              sx={{ marginBottom: 2 }}
            />
            <TextField
              label="Message"
              fullWidth
              multiline
              rows={4}
              value={editingFeedback.message}
              onChange={(e) =>
                setEditingFeedback({ ...editingFeedback, message: e.target.value })
              }
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose} color="secondary">
              Cancel
            </Button>
            <Button onClick={handleDialogSave} color="primary" variant="contained">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      )}

      <ToastContainer position="top-right" />
    </AdminDashboardLayout>
  );
};

export default FeedbackManagement;
