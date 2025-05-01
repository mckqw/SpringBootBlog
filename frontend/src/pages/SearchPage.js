import React, { useState, useEffect, useCallback, memo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import BlogPostList from '../components/BlogPostList';
import API_BASE_URL from '../config';
import authService from '../authService';
import { Box, Typography, TextField, Button } from '@mui/material';

const MemoizedBlogPostList = memo(BlogPostList);

const SearchPage = () => {
    const [searchParams] = useSearchParams();
    const [searchText, setSearchText] = useState(searchParams.get('query') || '');
    const [searchQuery, setSearchQuery] = useState(searchParams.get('query') || '');
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchSearchResults = useCallback(async (searchQuery) => {
        console.log("searching for: ", searchQuery);
        try {
            const response = await authService.fetchWithAuth(`${API_BASE_URL}/posts/search?query=${searchQuery}&limit=10`);
            if (response.ok) {
                const data = await response.json();
                setPosts(data.content || []);
            }
        } catch (error) {
            console.error('Error fetching search results:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (searchQuery) {
            fetchSearchResults(searchQuery);
        } else {
            setLoading(false);
        }
    }, [searchQuery]);

    const handleSearch = () => {
        // Update the URL with the new search query
        window.history.pushState({}, '', `/search?query=${searchText}`);

        setSearchQuery(searchText);
    };

    return (
        <Box sx={{ padding: 3 }}>
            <Typography variant="h4" gutterBottom>
                Search
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, marginBottom: 3 }}>
                <TextField
                    fullWidth
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleSearch();
                        }
                    }}
                    placeholder="Enter search query"
                />
                <Button variant="contained" color="primary" onClick={handleSearch}>
                    Search
                </Button>
            </Box>
            <Typography variant="h5" gutterBottom>
                Search Results for "{searchQuery}"
            </Typography>
            {loading ? (
                <Typography>Loading...</Typography>
            ) : posts.length > 0 ? (
                <MemoizedBlogPostList posts={posts} />
            ) : (
                <Typography>No results found.</Typography>
            )}
        </Box>
    );
};

export default SearchPage;
