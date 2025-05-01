import React from 'react';

const Comment = ({ comment }) => {
    return (
        <div className="comment">
            <h4>{comment.author}</h4>
            <p>{comment.content}</p>
        </div>
    );
};

export default Comment;