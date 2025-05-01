package com.mhckqw.blog.controller;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.ai.document.Document;
import org.springframework.ai.vectorstore.SearchRequest;
import org.springframework.ai.vectorstore.VectorStore;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.mhckqw.blog.model.Comment;
import com.mhckqw.blog.model.Post;
import com.mhckqw.blog.service.PostService;
import com.mhckqw.blog.util.VectorStoreUtil;

@CrossOrigin(maxAge = 3600)
@RestController
@RequestMapping("/api/posts")
public class PostController {


    @Autowired
    private final VectorStoreUtil vectorStoreUtil;

    @Autowired
    private PostService postService;

    private final VectorStore vectorStore;

    public PostController(PostService postService, VectorStore vectorStore, VectorStoreUtil vectorStoreUtil) {
        this.postService = postService;
        this.vectorStore = vectorStore;
        this.vectorStoreUtil = vectorStoreUtil;
    }

    @GetMapping
    public Page<Post> getAllPosts(@RequestParam(defaultValue = "0") int page,
                                  @RequestParam(defaultValue = "10") int size) {
        return postService.getAllPosts(PageRequest.of(page, size));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Post> getPostById(@PathVariable Long id) {
        return postService.getPostById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Post createPost(@RequestBody Post post) {
        post.setCreationDate(LocalDateTime.now());

        Post newPost = postService.createPost(post);
        vectorStoreUtil.createOrReplaceDocument(newPost);

        return newPost;
    }

    @PutMapping("/{id}")
    public ResponseEntity<Post> updatePost(@PathVariable Long id, @RequestBody Post post) {
        vectorStoreUtil.createOrReplaceDocument(postService.getPostById(id).orElse(null));
        return postService.updatePost(id, post)
                .map(updatedPost -> {
                    updatedPost.setAuthor(post.getAuthor());
                    if (post.getFeaturedImage() != null) {
                        updatedPost.setFeaturedImage(post.getFeaturedImage());
                    }
                    return ResponseEntity.ok(updatedPost);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePost(@PathVariable Long id) {
        Post post = postService.getPostById(id).orElse(null);
        vectorStoreUtil.deleteDocument(post);

        if (postService.deletePost(id)) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/{postId}/comments")
    public ResponseEntity<Comment> addCommentToPost(@PathVariable Long postId, @RequestBody Comment comment) {
        Comment addedComment = postService.addComment(postId, comment);
        if (addedComment != null) {
            return ResponseEntity.ok(addedComment);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{postId}/comments/{commentId}")
    public ResponseEntity<Comment> updateCommentOnPost(@PathVariable Long postId, @PathVariable Long commentId, @RequestBody Comment comment) {
        return postService.updateComment(postId, commentId, comment)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/tag/{tag}")
    public Page<Post> getPostsByTag(@PathVariable String tag,
                                    @RequestParam(defaultValue = "0") int page,
                                    @RequestParam(defaultValue = "10") int size) {
        return postService.getPostsByTag(tag, PageRequest.of(page, size));
    }

    @GetMapping("/category/{category}")
    public Page<Post> getPostsByCategory(@PathVariable String category,
                                         @RequestParam(defaultValue = "0") int page,
                                         @RequestParam(defaultValue = "10") int size) {
        return postService.getPostsByCategory(category, PageRequest.of(page, size));
    }

    @GetMapping("/search")
    public Page<Post> search(@RequestParam String query, @RequestParam int limit) {
        SearchRequest searchRequest = SearchRequest
                .builder()
                .query(query)
                .topK(limit)
                .build();
        List<Document> searchResults = vectorStore.similaritySearch(searchRequest);
        if (searchResults == null) {
            return Page.empty();
        }

        return searchResults.stream()
                .map(document -> {
                    Map<String, Object> metadata = document.getMetadata();
                    Object postIdObj = metadata.get("post_id");
                    Long postId = null;
                    if (postIdObj != null) {
                        postId = (postIdObj instanceof Integer) ? ((Integer) postIdObj).longValue() : (Long) postIdObj;
                    }
                    return postService.getPostById(postId)
                            .orElse(null);
                })
                .filter(post -> post != null)
                .collect(Collectors.collectingAndThen(Collectors.toList(), 
                        list -> new PageImpl<Post>(list, PageRequest.of(0, limit), list.size())));
    }
}