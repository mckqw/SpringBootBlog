import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BlogPost from '../components/BlogPost';
import Comment from '../components/Comment';
import API_BASE_URL from '../config';
import authService from '../authService';
import { Button, TextField, Typography, Box, Paper } from '@mui/material';

const PostPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');

    useEffect(() => {
        if (!authService.isAuthenticated()) {
            navigate('/login');
            return;
        }

        const fetchPost = async () => {
            const response = await authService.fetchWithAuth(`${API_BASE_URL}/posts/${id}`);
            const data = await response.json();
            setPost(data);
            setComments(data.comments || []);
        };

        fetchPost();
    }, [id, navigate]);

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        const response = await authService.fetchWithAuth(`${API_BASE_URL}/posts/${id}/comments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ content: newComment }),
        });

        if (response.ok) {
            const comment = await response.json();
            setComments([...comments, comment]);
            setNewComment('');
        }
    };

    return (
        <Box sx={{ padding: 3 }}>
            {post && <BlogPost post={post} />}
            <Typography variant="h5" gutterBottom>
                Comments
            </Typography>
            <Box>
                {comments.map(comment => (
                    <Paper key={comment.id} sx={{ padding: 2, marginBottom: 2 }}>
                        <Comment comment={comment} />
                    </Paper>
                ))}
            </Box>
            <form onSubmit={handleCommentSubmit}>
                <TextField
                    fullWidth
                    multiline
                    rows={4}
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a comment"
                    required
                    sx={{ marginBottom: 2 }}
                />
                <Button type="submit" variant="contained" color="primary">
                    Submit
                </Button>
            </form>
            <Box sx={{
                display: 'flex',
                justifyContent: 'end'
            }}>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => navigate(`/create-post/?postId=${id}`)}
                    sx={{ 
                        marginY: 2
                    }}
                >
                    Edit Post
                </Button>
            </Box>
        </Box>
    );
};

export default PostPage;