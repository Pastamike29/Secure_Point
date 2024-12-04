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
                      // Light mode colors
                      background: {
                          default: '#ffffff', // White background
                          paper: '#f0f0f0', // Light grey paper background
                      },
                      text: {
                          primary: '#000000', // Black text
                      },
                  }
                : {
                      // Dark mode colors
                      background: {
                          default: '#212121', // Dark background (near-black)
                          paper: '#2f2f2f', // Darker grey for paper surfaces
                      },
                      text: {
                          primary: '#ffffff', // White text
                      },
                  }),
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
