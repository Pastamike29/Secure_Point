// ResultModal.js
import React from 'react';
import { Box, Button, Typography, Modal } from '@mui/material';

const ResultModal = ({ open, handleClose, score, totalQuestions, handleFinish, handleGotoScoreboard, error }) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={{ 
        position: 'absolute', 
        top: '50%', 
        left: '50%', 
        transform: 'translate(-50%, -50%)', 
        width: 400, 
        bgcolor: 'background.paper', 
        boxShadow: 24, 
        p: 4, 
        borderRadius: 2 
      }}>
        <Typography variant="h4">Quiz Completed!</Typography>
        <Typography variant="h6">
          Your score: {score} / {totalQuestions}
        </Typography>
        {error && (
          <Typography sx={{ color: 'red', mt: 2 }}>{error}</Typography>
        )}
        <Box sx={{ mt: 5 }}>
          <Button variant="contained" onClick={handleFinish} sx={{ mr: 2 }}>
            Homepage
          </Button>
          <Button variant="contained" onClick={handleGotoScoreboard}>
            ScoreBoard
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ResultModal;
