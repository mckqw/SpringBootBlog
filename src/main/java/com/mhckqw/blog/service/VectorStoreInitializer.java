package com.mhckqw.blog.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import com.mhckqw.blog.repository.PostRepository;
import com.mhckqw.blog.util.VectorStoreUtil;

@Component
class VectorStoreInitializer implements ApplicationRunner {

    @Autowired
    private final VectorStoreUtil vectorStoreUtil;

    private final PostRepository postRepository;

    // standard constructor
    public VectorStoreInitializer(
        PostRepository postRepository,
        VectorStoreUtil vectorStoreUtil
    ) {
        this.postRepository = postRepository;
        this.vectorStoreUtil = vectorStoreUtil;
    }

    @Override
    public void run(ApplicationArguments args) {
        postRepository
          .findAll()
          .stream()
          .map(post -> vectorStoreUtil.createOrReplaceDocument(post));
    }
}