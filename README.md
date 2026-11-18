# 🚀 TaskNow

**TaskNow** is a full-stack web application designed to seamlessly connect clients with professional service providers. Whether you need a plumber, an electrician, a carpenter, or a roofer, TaskNow provides a unified, intuitive platform to post service requests, manage advertisements, and facilitate direct communication between users.

---

## 🛠️ Technology Stack

TaskNow adopts a modern, containerized architecture:

- **Frontend**: [React.js](https://reactjs.org/) (Client-side UI)
- **Backend**: [Django](https://www.djangoproject.com/) & [Django REST Framework (DRF)](https://www.django-rest-framework.org/)
- **Database**: [PostgreSQL](https://www.postgresql.org/) (Data storage)
- **Orchestration**: [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/)

---

## 🚀 Quick Start

The entire project is containerized, making it easy to set up with a single command.

### Prerequisites

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

### 1. Clone the Repository

```bash
git clone https://github.com/tiagofsps/TaskNow.git
cd TaskNow
```

### 2. Launch the Application

Run the following command to build the images, start the containers, and initialize the database:

```bash
docker-compose up --build
```

**Wait, what's happening?**
- **PostgreSQL** starts and initializes.
- **Django** automatically runs migrations and seeds the initial data (Users, Districts, etc.) from `datadump.json`.
- **React** starts the development server with hot-reload enabled.

### 3. Access the Services

- **Frontend**: [http://localhost:3000](http://localhost:3000)
- **Backend API**: [http://localhost:8000](http://localhost:8000)
- **Django Admin**: [http://localhost:8000/admin](http://localhost:8000/admin)

---

## 📂 Project Structure

- `/backend`: Django project files, API routes, and database models.
- `/frontend`: React application using isolated dependencies for consistent development.
- `docker-compose.yml`: Orchestration file for the frontend, backend, and db services.
- `entrypoint.sh`: Automated startup script for database initialization and seeding.

---

## 🌟 Key Features

- **User Roles**: Sign-up and login specialized for both Service Providers and Clients.
- **Service Listings**: Comprehensive advertisement management for providers.
- **Direct Messaging**: Integrated chat system for real-time communication.
- **Automated Setup**: One-command initialization with smart data seeding.

---

## 📜 License

This project is licensed under the MIT License.
