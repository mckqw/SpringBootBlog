package com.mhckqw.blog.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mhckqw.blog.model.Comment;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByPostId(Long postId);
}