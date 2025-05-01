import React, { useEffect } from 'react';
import BlogPostList from '../components/BlogPostList';
import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import authService from '../authService';

const HomePage = () => {
    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        // Check if the user is authenticated
        if (!authService.isAuthenticated()) {
            navigate('/login'); // Redirect to login page if not authenticated
            return;
        }
    }, [navigate]);

    return (
        <Box sx={{ padding: 3 }}>
            <Typography variant="h3" gutterBottom>
                Welcome to the Blog
            </Typography>
            <BlogPostList />
        </Box>
    );
};

export default HomePage;