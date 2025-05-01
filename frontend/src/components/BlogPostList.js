import React, { useState, useEffect, useMemo } from 'react';
import { fetchWithAuth } from '../authService';
import API_BASE_URL from '../config';
import PostCarouselSlide from './PostCarouselSlide';
import { Box, Button, Typography } from '@mui/material';

const BlogPostList = ({ posts: externalPosts }) => {
    const [posts, setPosts] = useState(externalPosts || []);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);

    const postsToDisplay = useMemo(() => externalPosts?.length ? externalPosts : posts, [externalPosts, posts, page, totalPages]);

    console.log('externalPosts :>> ', externalPosts);
    console.log('postsToDisplay :>> ', postsToDisplay);

    useEffect(() => {
        if (!externalPosts) {
            console.log('fetch posts');
            const fetchPosts = async () => {
                const response = await fetchWithAuth(`${API_BASE_URL}/posts`, {}, { page, size: 10 });
                if (!response.ok) {
                    return;
                }
                const data = await response.json();
                setPosts(data.content);
                setTotalPages(data.totalPages);
            };

            fetchPosts();
        }
    }, [page, externalPosts]);

    const handleNextPage = () => {
        if (page < totalPages - 1) setPage(page + 1);
    };

    const handlePreviousPage = () => {
        if (page > 0) setPage(page - 1);
    };

    return (
        <Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                {postsToDisplay.map((post) => (
                    <PostCarouselSlide post={post} />
                ))}
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 2 }}>
                <Button variant="contained" onClick={handlePreviousPage} disabled={page === 0}>
                    Previous
                </Button>
                <Typography>
                    Page {page + 1} of {totalPages}
                </Typography>
                <Button variant="contained" onClick={handleNextPage} disabled={page === totalPages - 1}>
                    Next
                </Button>
            </Box>
        </Box>
    );
};

export default BlogPostList;
