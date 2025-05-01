import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box, Link, Alert } from '@mui/material';
import { AuthContext } from '../context/AuthContext';

const LoginPage = () => {
    const [isRegister, setIsRegister] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const { login, register } = useContext(AuthContext);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(''); // Clear previous errors
        const result = await login(username, password); // Ensure `login` returns the result

        if (result?.error) { // Safely access `error` property
            setError(result.error);
        } else {
            navigate('/');
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setError(''); // Clear previous errors
        const result = await register(username, password, email); // Ensure `register` returns the result

        if (result?.error) { // Safely access `error` property
            setError(result.error);
        } else {
            navigate('/');
        }
    };

    return (
        <Container maxWidth="sm">
            <Box 
                sx={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center', 
                    mt: 8 
                }}
            >
                <Typography variant="h4" component="h1" gutterBottom>
                    {isRegister ? 'Register' : 'Login'}
                </Typography>
                {error && <Alert severity="error" sx={{ marginBottom: 2 }}>{error}</Alert>}
                <Box 
                    component="form" 
                    onSubmit={isRegister ? handleRegister : handleLogin} 
                    sx={{ mt: 2, width: '100%' }}
                >
                    <TextField
                        label="Username"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <TextField
                        label="Password"
                        type="password"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    {isRegister && (
                        <TextField
                            label="Email"
                            type="email"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    )}
                    <Button 
                        type="submit" 
                        variant="contained" 
                        color="primary" 
                        fullWidth 
                        sx={{ mt: 2 }}
                    >
                        {isRegister ? 'Register' : 'Login'}
                    </Button>
                </Box>
                <Link 
                    component="button" 
                    variant="body2" 
                    onClick={() => setIsRegister(!isRegister)} 
                    sx={{ mt: 2 }}
                >
                    {isRegister ? 'Already have an account? Login' : "Don't have an account? Register"}
                </Link>
            </Box>
        </Container>
    );
};

export default LoginPage;