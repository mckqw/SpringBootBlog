# Blog Application

This project is a full-stack blog application built with Spring Boot as the backend and ReactJS as the frontend. The application allows users to create blog posts, add comments, and categorize posts by tags or categories. It is containerized using Docker and includes plans for user authentication, automated Docker image builds with GitHub Actions, and potential cloud deployment.

## Features

- **Create Blog Posts**: Users can create new blog posts with titles, content, and tags.
- **Add Comments**: Users can comment on blog posts.
- **Categorize Posts**: Posts can be categorized by tags or categories for better organization.
- **Complex Search Tools**: The application implements a vectorized database with advanced search capabilities.
- **User Authentication**: Plans to implement user authentication for secure access to certain features.

## Technologies Used

- **Backend**: Spring Boot, JPA, H2 Database (or any other relational database)
- **Frontend**: ReactJS, Axios for API calls
- **Containerization**: Docker
- **CI/CD**: GitHub Actions for automated builds
- **Deployment**: Potential cloud deployment options (e.g., AWS, Heroku)

## Project Structure

```
blog-application
├── backend
│   ├── src
│   │   ├── main
│   │   │   ├── java
│   │   │   │   └── com
│   │   │   │       └── mhckqw
│   │   │   │           └── blog
│   │   │   │               ├── BlogApplication.java
│   │   │   │               ├── controller
│   │   │   │               │   └── PostController.java
│   │   │   │               ├── model
│   │   │   │               │   ├── Post.java
│   │   │   │               │   └── Comment.java
│   │   │   │               ├── repository
│   │   │   │               │   ├── PostRepository.java
│   │   │   │               │   └── CommentRepository.java
│   │   │   │               └── service
│   │   │   │                   └── PostService.java
│   │   │   └── resources
│   │   │       ├── application.properties
│   │   │       └── data.sql
│   ├── Dockerfile
│   ├── pom.xml
│   └── README.md
├── frontend
│   ├── public
│   │   └── index.html
│   ├── src
│   │   ├── components
│   │   │   ├── BlogPost.js
│   │   │   ├── Comment.js
│   │   │   └── Navbar.js
│   │   ├── pages
│   │   │   ├── HomePage.js
│   │   │   ├── PostPage.js
│   │   │   └── LoginPage.js
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   ├── Dockerfile
│   └── README.md
├── docker-compose.yml
├── .github
│   └── workflows
│       └── docker-image.yml
└── README.md
```

## Getting Started

1. Clone the repository.
2. Navigate to the `backend` directory and build the backend application using Maven.
3. Navigate to the `frontend` directory and install the dependencies using npm.
4. Use Docker to build and run the application.
5. Access the application in your web browser.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.