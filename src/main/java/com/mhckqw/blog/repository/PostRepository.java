package com.mhckqw.blog.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.mhckqw.blog.model.Post;

public interface PostRepository extends JpaRepository<Post, Long>, JpaSpecificationExecutor<Post> {
    List<Post> findByTagsContaining(String tag);
    List<Post> findByCategory(String category);
    Page<Post> findByTagsContaining(String tag, Pageable pageable);
    Page<Post> findByCategory(String category, Pageable pageable);
}