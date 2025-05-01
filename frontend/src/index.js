import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { ThemeProvider, CssBaseline } from '@mui/material';
import useCustomTheme from './theme';
import { AuthProvider } from './context/AuthContext';

const root = createRoot(document.getElementById('root'));

const RootComponent = () => {
    const theme = useCustomTheme();

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AuthProvider>
                <App />
            </AuthProvider>
        </ThemeProvider>
    );
};

root.render(
    <React.StrictMode>
        <RootComponent />
    </React.StrictMode>
);
