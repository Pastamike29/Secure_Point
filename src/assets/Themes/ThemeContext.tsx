import React, { createContext, useContext, useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Define the context value structure
interface ColorModeContextType {
    toggleTheme: () => void;
    mode: 'light' | 'dark';
}

// Create the ColorMode context
const ColorModeContext = createContext<ColorModeContextType>({
    toggleTheme: () => {},
    mode: 'light',
});

// Custom hook for consuming the context
export const useColorMode = () => useContext(ColorModeContext);

// Theme Provider Component
export default function ToggleColorMode({ children }: { children: React.ReactNode }) {
    const [mode, setMode] = useState<'light' | 'dark'>('dark');

    const colorMode: ColorModeContextType = {
        toggleTheme: () => {
            setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
        },
        mode,
    };

    const theme = createTheme({
        typography: {
            fontFamily:
                '"IBM Plex Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
        },
        palette: {
            mode,
            ...(mode === 'light'
                ? {
                      // Light Mode Colors
                      background: {
                          default: '#ffff', // Light soft background
                          paper: '#dcdcdc', // Slightly darker surface (card or box)
                      },
                      text: {
                          primary: '#003366', // Dark blue for headings and main text
                          secondary: '#555555', // Medium gray for secondary text
                      },
                      action: {
                          active: '#ff8800', // Orange for highlights or active items
                      },
                  }
                : {
                      // Dark Mode Colors
                      background: {
                          default: '#212121', // Dark background
                          paper: '#2f2f2f', // Darker gray for paper
                      },
                      text: {
                          primary: '#ffffff', // White text
                          secondary: '#bdbdbd', // Light gray for secondary text
                      },
                  }),
        },
        components: {
            MuiOutlinedInput: {
                styleOverrides: {
                    root: {
                        '& fieldset': {
                            borderColor: 'grey', // Default border color
                        },
                        '&:hover fieldset': {
                            borderColor: '#90caf9', // Hover border color
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: '#42a5f5', // Focused border color
                        },
                    },
                },
            },
        },
    });

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}
