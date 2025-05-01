package com.mhckqw.blog.util;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.ai.document.Document;
import org.springframework.ai.vectorstore.VectorStore;
import org.springframework.stereotype.Component;

import com.mhckqw.blog.model.Post;

@Component
public class VectorStoreUtil {

    private final VectorStore vectorStore;

    // standard constructor
    public VectorStoreUtil(VectorStore vectorStore) {
        this.vectorStore = vectorStore;
    }

    public void deleteDocument(Post post) {
        if (post.getVectorId() != null) {
            List<String> vectorIds = List.of(post.getVectorId());
            vectorStore.delete(vectorIds);
        }
    }

    public List<Document> createOrReplaceDocument(Post post) {
        Map<String, Object> metadata = new HashMap<>();
        metadata.put("title", post.getTitle());
        metadata.put("post_id", post.getId());

        String content = String.join("\n", post.getContent());
        
        if(post.getVectorId() != null) {
            List<String> vectorIds = List.of(post.getVectorId());
            vectorStore.delete(vectorIds);
        }
        
        Document newDocument = new Document(content, metadata);

        post.setVectorId(newDocument.getId());

        List<Document> documents = List.of(newDocument);

        vectorStore.add(documents);

        return documents;
    }
}
