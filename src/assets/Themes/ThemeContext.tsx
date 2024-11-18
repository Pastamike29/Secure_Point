import React, { createContext, useContext, useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const ColorModeContext = createContext({
     toggleTheme: () => { },
     mode: 'light',
});

export const useColorMode = () => useContext(ColorModeContext);

export default function ToggleColorMode({ children }) {
     const [mode, setMode] = useState<'light' | 'dark'>('dark');

     const colorMode = {
          toggleTheme: () => {
               setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'dark'));
          },
          mode,
     };

     const theme = createTheme({
          typography: {
               fontFamily: '"IBM Plex Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
          },
          palette: {
               mode,
               ...(mode === 'light'
                    ? {
                         // Light mode colors
                         background: {
                              default: '#ffffff',  // White background
                              paper: '#f0f0f0',    // Light grey paper background
                         },
                         text: {
                              primary: '#000000',  // Black text
                         },
                    }
                    : {
                         // Dark mode colors
                         background: {
                              default: '#212121',  // Dark background (near-black)
                              paper: '#2f2f2f',    // Darker grey for paper surfaces
                         },
                         text: {
                              primary: '#ffffff',  // White text
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
