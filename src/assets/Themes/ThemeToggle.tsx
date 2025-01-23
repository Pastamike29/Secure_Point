import React from 'react';
import { useColorMode } from './ThemeContext';
import { Box, Typography, Switch } from '@mui/material';

const ThemeToggle: React.FC = () => {
    const { toggleTheme, mode } = useColorMode();

    return (
        <Box display="flex" alignItems="center" gap={1}>
       
            <Switch
                checked={mode === 'dark'}
                onChange={toggleTheme}
                color="primary"
                inputProps={{ 'aria-label': 'theme toggle' }}
            />
        </Box>
    );
};

export default ThemeToggle;
