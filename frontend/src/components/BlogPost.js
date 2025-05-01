import { Box, CardMedia } from '@mui/material';
import React from 'react';
import authService from '../authService';
import MDEditor from '@uiw/react-md-editor';

const BlogPost = ({ post }) => {

    const imageSrc = post?.featuredImage ? `data:image/png;base64,${post.featuredImage}` : '/image_placeholder.png';
    
    const isAuthenticated = authService.isAuthenticated();
    const username = isAuthenticated ? authService.getUsername() : null;
    
    return (
        <div className="blog-post">
            <h1>{post.title}</h1>
            <CardMedia
                    component="img"
                    height="auto"
                    image={imageSrc}
                    alt={post.title}
                />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '1em' }}>
                <p className='author'>{`Created by: ${username}`}</p>
                <p className='creation-date'>{new Date(post.creationDate).toLocaleDateString()}</p>
            </Box>
            <MDEditor.Markdown source={post.content} />
            <div className="tags">
                {post.tags && post.tags.map((tag, index) => (
                    <span key={index} className="tag">{tag}</span>
                ))}
            </div>
        </div>
    );
};

export default BlogPost;