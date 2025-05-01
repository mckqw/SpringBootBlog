import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import { useMemo } from 'react';
import { useMediaQuery } from '@mui/material';

const useCustomTheme = () => {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

    const theme = useMemo(() => {
        const baseTheme = createTheme({
            palette: {
                mode: prefersDarkMode ? 'dark' : 'light',
                primary: {
                    main: '#1976d2', // Pascal blue
                },
                secondary: {
                    main: '#6d4c41', // Pascal brown
                },
                background: {
                    default: prefersDarkMode ? '#121212' : '#ffffff', // Dark grey or white
                    paper: prefersDarkMode ? '#1e1e1e' : '#f5f5f5', // Slightly lighter grey or light grey
                },
                text: {
                    primary: prefersDarkMode ? '#e0e0e0' : '#212121', // Light grey or dark grey
                    secondary: prefersDarkMode ? '#bdbdbd' : '#757575', // Grey shades
                },
            },
            typography: {
                fontFamily: 'Roboto, Arial, sans-serif',
            },
        });

        return responsiveFontSizes(baseTheme);
    }, [prefersDarkMode]);

    return theme;
};

export default useCustomTheme;
