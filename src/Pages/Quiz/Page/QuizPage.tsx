import React, { useState, useEffect } from 'react';
import {
  Box, Button, Typography, Radio, RadioGroup,
  FormControlLabel, FormControl, Container, IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import FitImage from '../../../Components/FitImage';
import { useUser } from '../../../Login/Component/UserAuthen';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ResultModal from './ResultModal';

interface Quiz {
  id: string;
  question: string;
  options: string[];
  answer: string;
  image: string;
}

const QuizPage = () => {
  const { user } = useUser();
  const [quizData, setQuizData] = useState<Quiz[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const username = user?.username || '';

  // ✅ Fetch Quiz Data from Backend
  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const response = await axios.get<Quiz[]>('http://localhost:5000/getQuizzes');
        setQuizData(response.data);
      } catch (error) {
        console.error('Error fetching quiz data:', error);
        setError('Failed to load quiz questions.');
      }
    };
    fetchQuizData();
  }, []);

  const handleAnswerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedAnswer(event.target.value);
  };

  const handleSubmitScore = async () => {
    if (!user) {
      console.error("User not found");
      return;
    }

    const scoreData = {
      username: user.username,
      score: score,
    };

    try {
      const response = await axios.post('http://localhost:5000/submitQuiz', scoreData, {
        headers: { 'Content-Type': 'application/json' },
      });
      console.log("Quiz score saved:", response.data.message);
    } catch (error) {
      console.error('Error saving score:', error.response?.data.error || error.message);
      setError('Failed to submit score. Please try again later.');
    }
  };

  const handleNextQuestion = () => {
    if (quizData.length === 0) return;

    if (selectedAnswer === quizData[currentQuestion].answer) {
      setScore(score + 1);
    }

    if (currentQuestion + 1 < quizData.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer('');
    } else {
      handleSubmitScore();
      setShowModal(true);
    }
  };

  const handleFinish = () => {
    navigate('/');
  };

  const handleGotoScoreboard = () => {
    navigate('/ScoreBoard');
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ display: 'flex', py: 20, height: '60vh', width: '90vw', position: 'relative' }}>
        <IconButton onClick={handleFinish} sx={{ position: 'absolute', top: 50, right: 20 }}>
          <CloseIcon />
        </IconButton>

        {quizData.length > 0 ? (
          <>
            <Box width="50%">
              <FitImage src={quizData[currentQuestion].image} />
            </Box>

            <Box sx={{ mt: 10, textAlign: 'center', width: '60%' }}>
              <Typography variant="h4" gutterBottom>
                Quiz {currentQuestion + 1} of {quizData.length}
              </Typography>

              {/* ✅ Auto line-breaks for long questions */}
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  whiteSpace: "pre-wrap",  // ✅ Allows text wrapping
                  wordBreak: "break-word", // ✅ Breaks long words
                  maxWidth: "100%",        // ✅ Ensures it fits in the container
                  textAlign: "center",
                }}
              >
                {quizData[currentQuestion].question}
              </Typography>

              <FormControl component="fieldset">
                <RadioGroup value={selectedAnswer} onChange={handleAnswerChange}>
                  {quizData[currentQuestion].options.map((option, index) => (
                    <FormControlLabel key={index} value={option} control={<Radio />} label={option} />
                  ))}
                </RadioGroup>
              </FormControl>

              <Box sx={{ p: 5 }}>
                {currentQuestion + 1 === quizData.length ? (
                  <Button variant='contained' onClick={handleNextQuestion} disabled={!selectedAnswer}>
                    Finish
                  </Button>
                ) : (
                  <Button variant='contained' onClick={handleNextQuestion} disabled={!selectedAnswer}>
                    Next
                  </Button>
                )}
              </Box>
            </Box>
          </>
        ) : (
          <Typography variant="h6" color="error">Loading quiz questions...</Typography>
        )}
      </Box>

      <ResultModal
        open={showModal}
        handleClose={handleCloseModal}
        score={score}
        totalQuestions={quizData.length}
        handleFinish={handleFinish}
        handleGotoScoreboard={handleGotoScoreboard}
        error={error}
      />
    </Container>
  );
};

export default QuizPage;
