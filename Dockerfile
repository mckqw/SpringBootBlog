# Use an official Gradle runtime as a parent image
FROM gradle:8.13-jdk23

# Set the working directory in the container
WORKDIR /app

# Copy the Maven/Gradle build files and source code
COPY . .

RUN ./gradlew --refresh-dependencies

# Build the Spring Boot application
RUN ./gradlew clean build -x test

ENV JAVA_TOOL_OPTIONS -agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=*:9251

# COPY build/libs/*.jar app.jar

# Expose the port the app runs on
EXPOSE 8080
EXPOSE 9251

# Run the Spring Boot application
CMD ["java", "-jar", "build/libs/blog-0.0.1-SNAPSHOT.jar"]