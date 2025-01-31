import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Container,
  IconButton,
  Paper,
  TableContainer,
  Avatar,
  Tooltip,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';

// Define the type of each score
interface Score {
  username: string;
  score: number;
  date: string;
}

const ScoreboardPage: React.FC = () => {
  const [scores, setScores] = useState<Score[]>([]); // Type the state as an array of Score objects
  const navigate = useNavigate(); // Initialize useNavigate for redirection

  useEffect(() => {
    // Fetch scores from the backend
    const fetchScores = async () => {
      try {
        const response = await fetch('http://localhost:5000/getScores');
        const data = await response.json();
        console.log('Fetched Data:', data); // Inspect the date field
        setScores(data);
      } catch (error) {
        console.error('Error fetching scores:', error);
      }
    };

    fetchScores();
  }, []);

  // Handle navigation to homepage when close button is clicked
  const handleClose = () => {
    navigate('/'); // Replace '/' with the appropriate homepage route if needed
  };

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          mt: 5,
          height: '90vh',
          overflowY: 'auto',
          bgcolor: 'background.default',
          borderRadius: 3,
          boxShadow: 3,
          position: 'relative',
        }}
        component={Paper}
        elevation={4}
      >
        <IconButton
          sx={{
            position: 'absolute',
            top: 16,
            right: 16,
            bgcolor: 'rgba(0, 0, 0, 0.04)',
          }}
          onClick={handleClose}
        >
          <Tooltip title="Close">
            <CloseIcon />
          </Tooltip>
        </IconButton>

        <Box sx={{ p: 5, textAlign: 'center' }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3, color: 'primary.main' }}>
            Scoreboard
          </Typography>

          <TableContainer component={Paper} elevation={3} sx={{ borderRadius: 3, overflow: 'hidden' }}>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: 'primary.main' }}>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Avatar</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Username</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Score</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {scores.map((score, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      '&:nth-of-type(odd)': { bgcolor: 'rgba(0, 0, 0, 0.03)' },
                      '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.08)' },
                    }}
                  >
                    <TableCell>
                      <Avatar sx={{ bgcolor: 'primary.main', color: 'white' }}>
                        {score.username.charAt(0).toUpperCase()}
                      </Avatar>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                        {score.username}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body1" sx={{ fontWeight: 'bold', color: 'secondary.main' }}>
                        {score.score}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {score.date ? new Date(score.date).toLocaleString() : 'N/A'}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Container>
  );
};

export default ScoreboardPage;
