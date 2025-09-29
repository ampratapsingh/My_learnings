
# 📘 Docker - Beginner’s Guide

## 🚀 What is Docker?

Docker is a **platform for building, running, and managing applications inside containers**.
It helps developers package applications with everything they need (code, libraries, dependencies) so they run consistently **anywhere** – on your laptop, server, or cloud.

---

## 🧩 Key Concepts

### 1. **Images**

* An **image** is like a **blueprint** for a container.
* It contains the app + dependencies + configuration.
* Example: `python:3.10`, `nginx:latest`.
* You can build your own images with a **Dockerfile**.

👉 Command examples:

```bash
docker pull nginx        # Download image from Docker Hub
docker images            # List images
```

---

### 2. **Containers**

* A **container** is a **running instance** of an image.
* It’s lightweight, isolated, and can be started/stopped easily.

👉 Commands:

```bash
docker run nginx              # Run container from nginx image
docker ps                     # List running containers
docker stop <container_id>    # Stop container
docker rm <container_id>      # Remove container
```

---

### 3. **Dockerfile**

* A **text file** that defines how to build an image.
* Example:

```dockerfile
# Use base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy files
COPY . .

# Install dependencies
RUN npm install

# Start app
CMD ["node", "index.js"]
```

👉 Build and run:

```bash
docker build -t my-node-app .
docker run -p 3000:3000 my-node-app
```

---

### 4. **Docker Hub**

* A **cloud registry** of Docker images (like GitHub for code).
* You can pull official or community images.
  👉 Example: `docker pull mysql`

---

### 5. **Volumes**

* Volumes allow **data persistence** (data won’t disappear when container stops).
* Useful for databases, logs, configs.

👉 Example:

```bash
docker run -v mydata:/var/lib/mysql mysql
```

---

### 6. **Networks**

* Containers can talk to each other using networks.
* Docker creates a **bridge network** by default.

👉 Example:

```bash
docker network create mynetwork
docker run --network=mynetwork myapp
```

---

### 7. **Docker Compose**

* A tool to define and run **multi-container applications** with a YAML file.
* Example (`docker-compose.yml`):

```yaml
version: "3"
services:
  app:
    build: .
    ports:
      - "3000:3000"
  db:
    image: mysql
    environment:
      MYSQL_ROOT_PASSWORD: example
```

👉 Run:

```bash
docker-compose up
```

---

## ⚡ Common Commands Cheat Sheet

| Command                     | Description                 |
| --------------------------- | --------------------------- |
| `docker pull <image>`       | Download image              |
| `docker images`             | List images                 |
| `docker run <image>`        | Run container               |
| `docker ps`                 | List running containers     |
| `docker stop <id>`          | Stop container              |
| `docker rm <id>`            | Remove container            |
| `docker exec -it <id> bash` | Enter container shell       |
| `docker build -t name .`    | Build image from Dockerfile |
| `docker logs <id>`          | Show container logs         |

---

## 🎯 Why Docker?

* **Consistency**: Runs the same everywhere.
* **Isolation**: Keeps apps separate.
* **Efficiency**: Uses fewer resources than VMs.
* **Portability**: Works across OS & cloud.
* **Scalability**: Easily deploy multiple containers.

---

## 🛠️ Real-World Use Cases

* Running databases (MySQL, MongoDB, PostgreSQL).
* Deploying web apps (Node.js, Python, Java, etc.).
* Microservices architecture.
* CI/CD pipelines.
* Testing apps in isolated environments.

---

## 📌 Quick Example: Running a Node.js App

1. Write `Dockerfile`:

```dockerfile
FROM node:18
WORKDIR /app
COPY . .
RUN npm install
CMD ["npm", "start"]
```

2. Build & run:

```bash
docker build -t myapp .
docker run -p 4000:4000 myapp
```

Your app is live on `http://localhost:4000` 🎉

---

