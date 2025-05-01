import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardMedia, CardContent, Typography } from '@mui/material';

const PostCarouselSlide = ({ post }) => {
    const { id, title, excerpt, creationDate, featuredImage } = post;
    const imageSrc = featuredImage ? `data:image/png;base64,${featuredImage}` : '/image_placeholder.png';

    return (
        <Card sx={{ margin: 2 }}>
            <Link to={`/post/${id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <CardMedia
                    component="img"
                    height="200"
                    image={imageSrc}
                    alt={title}
                />
                <CardContent>
                    <Typography variant="h5" gutterBottom>
                        {title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        {excerpt}
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                        {new Date(creationDate).toLocaleDateString()}
                    </Typography>
                </CardContent>
            </Link>
        </Card>
    );
};

export default PostCarouselSlide;
