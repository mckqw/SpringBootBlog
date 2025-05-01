package com.mhckqw.blog.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.mhckqw.blog.model.Comment;
import com.mhckqw.blog.model.Post;
import com.mhckqw.blog.repository.CommentRepository;
import com.mhckqw.blog.repository.PostRepository;

@Service
public class PostService {

    private final PostRepository postRepository;
    private final CommentRepository commentRepository;

    @Autowired
    public PostService(PostRepository postRepository, CommentRepository commentRepository) {
        this.postRepository = postRepository;
        this.commentRepository = commentRepository;
    }

    public Post createPost(Post post) {
        if (post.getCreationDate() == null) {
            post.setCreationDate(LocalDateTime.ofEpochSecond(0, 0, java.time.ZoneOffset.UTC)); // Set to UNIX base time
        }
        return postRepository.save(post);
    }

    public Optional<Post> getPostById(Long id) {
        return postRepository.findById(id);
    }

    public Page<Post> getAllPosts(Pageable pageable) {
        return postRepository.findAll(pageable);
    }

    public Page<Post> getPostsByTag(String tag, Pageable pageable) {
        return postRepository.findByTagsContaining(tag, pageable);
    }

    public Page<Post> getPostsByCategory(String category, Pageable pageable) {
        return postRepository.findByCategory(category, pageable);
    }

    public Comment addComment(Long postId, Comment comment) {
        Post post = postRepository.findById(postId)
            .orElseThrow(() -> new IllegalArgumentException("Post not found with id: " + postId));
        comment.setPost(post);
        return commentRepository.save(comment);
    }

    public List<Comment> getCommentsByPostId(Long postId) {
        return commentRepository.findByPostId(postId);
    }

    public Optional<Post> updatePost(Long id, Post post) {
        return postRepository.findById(id).map(existingPost -> {
            existingPost.setTitle(post.getTitle());
            existingPost.setContent(post.getContent());
            existingPost.setTags(post.getTags());
            existingPost.setAuthor(post.getAuthor());
            existingPost.setFeaturedImage(post.getFeaturedImage());
            return postRepository.save(existingPost);
        });
    }

    public boolean deletePost(Long id) {
        if (postRepository.existsById(id)) {
            postRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public Optional<Comment> updateComment(Long postId, Long commentId, Comment comment) {
        return commentRepository.findById(commentId).map(existingComment -> {
            existingComment.setContent(comment.getContent());
            return commentRepository.save(existingComment);
        });
    }
}