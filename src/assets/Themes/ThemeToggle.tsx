import React from 'react';
import { useColorMode } from './ThemeContext';
import { Box, Button, Typography } from '@mui/material';

const ThemeToggle: React.FC = () => {
     const { toggleTheme, mode } = useColorMode();

     return (
          <Box display="flex" alignItems="center">
          
               <Button
                    variant="contained"
                    color="primary"
                    onClick={toggleTheme}
               >
                     Theme
               </Button>
          </Box>
     );
};

export default ThemeToggle;
