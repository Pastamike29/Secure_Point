import React, { useState, useEffect } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableHead, TableRow, Container, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close'; // Import the CloseIcon
import { useNavigate } from 'react-router-dom'; // For navigating to homepage

// Define the type of each score
interface Score {
    username: string;
    score: number;
    date: string;
}

const ScoreboardPage: React.FC = () => {
    const [scores, setScores] = useState<Score[]>([]);  // Type the state as an array of Score objects
    const navigate = useNavigate(); // Initialize useNavigate for redirection
    
    useEffect(() => {
        // Fetch scores from the backend
        const fetchScores = async () => {
            try {
                const response = await fetch('http://localhost:5000/getScores');
                const data = await response.json();
                setScores(data);  // TypeScript now knows `data` is an array of Score objects
            } catch (error) {
                console.error('Error fetching scores:', error);
            }
        };
        fetchScores();
    }, []);

    // Handle navigation to homepage when close button is clicked
    const handleClose = () => {
        navigate('/');  // Replace '/' with the appropriate homepage route if needed
    };

    return (
        <Container maxWidth="md">
            <Box sx={{ m: 5, height: '90vh', overflowY: 'auto', bgcolor: 'rgba(255,255,255,0.3)', position: 'relative' }}>
                <IconButton
                    sx={{ position: 'absolute', top:55,right:45 }}
                    onClick={handleClose}
                >
                    <CloseIcon />
                </IconButton>
                <Box sx={{ p: 7 }}>
                    <Typography variant="h4" gutterBottom>
                        Scoreboard
                    </Typography>
                    <Box sx={{ mt: 4 }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Username</TableCell>
                                    <TableCell>Score</TableCell>
                                    <TableCell>Date</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {scores.map((score, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{score.username}</TableCell>
                                        <TableCell>{score.score}</TableCell>
                                        <TableCell>{new Date(score.date).toLocaleString()}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Box>
                </Box>
            </Box>
        </Container>
    );
};

export default ScoreboardPage;
