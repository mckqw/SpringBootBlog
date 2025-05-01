# Blog Application

This project is a full-stack blog application built with Spring Boot as the backend and ReactJS as the frontend. The application allows users to create blog posts, add comments, and categorize posts by tags or categories. It is containerized using Docker and includes user authentication, automated Docker image builds with GitHub Actions, and potential cloud deployment.

## Features

- **User Authentication**: Secure access to certain features.
- **Create Blog Posts**: Users can create new blog posts with titles, content, and tags.
- **Add Comments**: Users can comment on blog posts.
- **Categorization**: Posts can be categorized by tags for better organization.
- **Advanced Search**: Vectorized database with advanced search capabilities.

## Technologies Used

- **Backend**: Spring Boot, JPA, PostgreSQL
- **Frontend**: ReactJS, Axios for API calls
- **Containerization**: Docker
- **CI/CD**: GitHub Actions for automated builds
- **AI Integration**: ONNX-based transformer models and Chroma vector store

## Project Structure

```
SpringBootBlog
├── backend
│   ├── src/main/java/com/mhckqw/blog
│   │   ├── BlogApplication.java
│   │   ├── controller
│   │   ├── model
│   │   ├── repository
│   │   └── service
│   ├── src/main/resources
│   │   ├── application.yml
│   │   └── data.sql
│   └── build.gradle
├── frontend
│   ├── public
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
├── app/cache
├── docker-compose.yml
└── README.md
```

## Getting Started

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd SpringBootBlog
   ```

2. Build the backend application using Gradle:
   ```bash
   ./gradlew clean build
   ```

3. Generate private and public keys:
   ```bash
   cd src/main/resources
   ./generate_keys.sh
   ```
   Make sure that the private key is named `app.key` and the public key `app.pub`

4. Navigate to the `frontend` directory and install the dependencies using npm:
   ```bash
   cd ../../frontend
   npm install
   ```

5. Download the `model.onnx` file:
   ```bash
   wget https://huggingface.co/intfloat/e5-small-v2/resolve/main/model.onnx -P ./app/cache
   ```

6. Use Docker to build and run the application:
   ```bash
   docker-compose up --build
   ```

7. Access the application in your web browser at `http://localhost:3000`.