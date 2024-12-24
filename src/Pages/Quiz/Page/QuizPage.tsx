import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Container,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close'; // Import the close icon
import FitImage from '../../../Components/FitImage';
import { useUser } from '../../../Login/Component/UserAuthen';
import choices from '../components/choices';
import axios from 'axios'; // Import Axios
import { useNavigate } from 'react-router-dom';
import ResultModal from './ResultModal'; // Import the new ResultModal component

const QuizPage = () => {
  const { user } = useUser(); // Get the logged-in user from context
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [showModal, setShowModal] = useState(false); // Track if the result modal should be shown
  const [error, setError] = useState(''); // To track any errors

  const navigate = useNavigate();
  const username = user || ''; // Default to empty string if user is not logged in

  useEffect(() => {
    console.log('Logged in username:', username); // Log the username being used
  }, [username]);

  const handleAnswerChange = (event) => {
    setSelectedAnswer(event.target.value);
  };

  const handleSubmitScore = async () => {
    if (!user) {
      console.error("User not found");
      return;
    }


    const scoreData = {
      username: user.username,
      score: score, // Use actual score
    };

    try {
      const response = await axios.post('http://localhost:5000/submitQuiz', scoreData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log("Data being sent:", scoreData);

      console.log('Quiz score saved:', response.data.message);
    } catch (error) {
      console.error('Error saving score:', error.response?.data.error || error.message);
      setError('Failed to submit score. Please try again later.');
    }
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === choices[currentQuestion].answer) {
      setScore(score + 1);
    }

    if (currentQuestion + 1 < choices.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer('');
    } else {
      handleSubmitScore(); // Submit the score when the last question is reached
      setShowModal(true);  // Show the result modal when quiz is completed
    }
  };

  const handleFinish = () => {
    navigate('/'); // Navigate to homepage
  };

  const handleGotoScoreboard = () => {
    navigate('/ScoreBoard'); // Navigate to scoreboard
  };

  const handleCloseModal = () => {
    setShowModal(false); // Close the modal when finished
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ display: 'flex', py: 20, height: '60vh', width: '90vw', position: 'relative' }}>

        {/* Close Button at the Top-Right Corner */}
        <IconButton
          onClick={handleFinish} // Navigates back to the homepage
          sx={{ position: 'absolute', top: 50, right: 20 }}
        >
          <CloseIcon />
        </IconButton>

        {/* Conditionally render the image only when the quiz is not finished */}
        
          <Box>
            <Box width="40%">
              <FitImage src={choices[currentQuestion].image} /> {/* Dynamic image */}
            </Box>
          </Box>
        

        <Box sx={{ mt: 10, textAlign: 'center', width: '60%' }}>
          <Box>
            <Typography variant="h4" gutterBottom>
              Quiz {currentQuestion + 1} of {choices.length}
            </Typography>
            <Typography variant="h6" gutterBottom>
              {choices[currentQuestion].question}
            </Typography>
            <FormControl component="fieldset">
              <RadioGroup value={selectedAnswer} onChange={handleAnswerChange}>
                {choices[currentQuestion].options.map((option, index) => (
                  <FormControlLabel
                    key={index}
                    value={option}
                    control={<Radio />}
                    label={option}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </Box>
          <Box sx={{ p: 5 }}>
            {currentQuestion + 1 === choices.length ? (
              // Show "Finish" button only when on the last question
              <Button variant='contained' onClick={handleNextQuestion} disabled={!selectedAnswer}>
                Finish
              </Button>
            ) : (
              // Show "Next" button for other questions
              <Button variant='contained' onClick={handleNextQuestion} disabled={!selectedAnswer}>
                Next
              </Button>
            )}
          </Box>
        </Box>
      </Box>

      {/* Result Modal */}
      <ResultModal
        open={showModal}
        handleClose={handleCloseModal}
        score={score}
        totalQuestions={choices.length}
        handleFinish={handleFinish}
        handleGotoScoreboard={handleGotoScoreboard}
        error={error}
      />
    </Container>
  );
};

export default QuizPage;
