import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import App from './App'; // Import your App component
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { UserProvider } from './Components/UserAuthen';

// AppWrapper handles theme management
const AppWrapper = () => {
  const [mode, setMode] = useState<'light' | 'dark'>('light');

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  // Define the theme for both light and dark mode
  const theme = createTheme({
    palette: {
      mode: mode,
      ...(mode === 'dark'
        ? {
            background: {
              default: '#121212', // Dark mode background
              paper: '#121212',
            },
            text: {
              primary: '#ffffff', // Dark mode text color
            },
          }
        : {
            background: {
              default: '#ffffff', // Light mode background
              paper: '#ffffff',
            },
            text: {
              primary: '#000000', // Light mode text color
            },
          }),
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App toggleTheme={toggleTheme} /> {/* Only render App here */}
    </ThemeProvider>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <UserProvider> {/* Make sure UserProvider wraps AppWrapper */}
      <AppWrapper />
    </UserProvider>
  </React.StrictMode>,
  document.getElementById('root') // Ensure that there's an element with id 'root' in your index.html
);
