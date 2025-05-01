import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';
import MDEditor from '@uiw/react-md-editor';

import authService from '../authService';
import API_BASE_URL from '../config';
import { Box, Button, TextField, Typography, Paper } from '@mui/material';

const PostCreatorPage = () => {
    const [searchParams] = useSearchParams();
    const postId = searchParams.get('postId');
    const [title, setTitle] = useState('');
    const [featuredImage, setFeaturedImage] = useState(null);
    const [content, setContent] = useState('');

    useEffect(() => {
        if (postId) {
            authService.fetchWithAuth(`${API_BASE_URL}/posts/${postId}`)
                .then(response => response.json())
                .then(data => {
                    setTitle(data.title);
                    setFeaturedImage(data.featuredImage);
                    setContent(data.content || '');
                })
                .catch(error => console.error('Error fetching post:', error));
        }
    }, [postId]);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setFeaturedImage(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const handleSave = async () => {
        const method = postId ? 'PUT' : 'POST';
        const base = `${API_BASE_URL}/posts`;
        const url = postId ? `${base}/${postId}` : base;

        const sanitizedImage = featuredImage
            ? featuredImage.replace(/^data:image\/[a-zA-Z]+;base64,/, '')
            : null;

        const payload = { title, content, featuredImage: sanitizedImage };

        authService.fetchWithAuth(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        })
            .then(response => {
                if (!response.ok) throw new Error('Failed to save post');
                return response.json();
            })
            .then(data => {
                console.log('Post saved:', data);
            })
            .catch(error => console.error('Error saving post:', error));
    };

    return (
        <Box sx={{ padding: 3 }}>
            <Typography variant="h4" gutterBottom>
                {postId ? 'Edit Post' : 'Create Post'}
            </Typography>
            <TextField
                fullWidth
                label="Post Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                sx={{ marginBottom: 2 }}
            />
            <Paper sx={{ padding: 2, marginBottom: 2 }}>
                <MDEditor
                    value={content}
                    onChange={setContent}
                    height={400}
                />
            </Paper>
            <Box sx={{ marginBottom: 2 }}>
                <Typography variant="subtitle1">Featured Image:</Typography>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                />
                {featuredImage && (
                    <img
                        src={featuredImage}
                        alt="Preview"
                        style={{ maxWidth: '100%', marginTop: 10 }}
                    />
                )}
            </Box>
            <Button variant="contained" color="primary" onClick={handleSave}>
                {postId ? 'Update Post' : 'Create Post'}
            </Button>
        </Box>
    );
};

export default PostCreatorPage;
