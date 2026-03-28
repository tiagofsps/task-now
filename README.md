# 🚀 TaskNow

**TaskNow** is a full-stack web application designed to seamlessly connect clients with professional service providers. Whether you need a plumber, an electrician, a carpenter, or a roofer, TaskNow provides a unified, intuitive platform to post service requests, manage advertisements, and facilitate direct communication between users.

---

## 🌟 Key Features

- **User Roles & Authentication**: Secure sign-up and login specialized for both Service Providers and Clients.
- **Service Listings (Anúncios)**: Comprehensive advertisement management allowing providers to showcase their skills and clients to find the exact help they need.
- **Internal Messaging**: Integrated chat and messaging system allowing direct communication between clients and professionals.
- **Categorized Services**: Intuitive filtering and management of different service types (e.g., Plumbing, Electrical, Carpentry).
- **Interactive UI/UX**: A modern, responsive frontend built with React, featuring dynamic carousels, clean modals, and a seamless user journey.
- **Admin & Management Dashboard**: Interfaces for managing users, advertisements, and service categories ensuring the platform remains clean and secure.

---

## 🛠️ Technology Stack

TaskNow adopts a robust, decoupled architecture using an industry-standard modern technology stack:

### Backend
- **Framework**: [Django](https://www.djangoproject.com/) & [Django REST Framework (DRF)](https://www.django-rest-framework.org/)
- **Language**: Python 3
- **Database**: SQLite (Development)
- **Architecture Features**: Robust API endpoint design, Object-Relational Mapping (ORM), session management, and media handling (Pillow).

### Frontend
- **Library**: [React.js](https://reactjs.org/)
- **Language**: JavaScript (ES6+), HTML5, CSS3
- **Architecture Features**: Component-based UI, intuitive state management, responsive flexbox/grid layouts, and seamless asynchronous API integration.

---

## 📂 Project Structure

The repository is modularly structured to separate the client-side presentation from the server-side logic:

- `/backend`: Contains the Django application, API routes, database models (`utilizadores`, `anuncios`, `mensagens`), and server logic.
- `/frontend`: Contains the React application, React components (`src/`), assets, and styling (`index.css`).

---

## 🚀 Getting Started

Follow these instructions to set up the project locally on your machine for development and testing.

### Prerequisites

- Python 3.8+
- Node.js (v14+) & npm
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/tiagofsps/TaskNow.git
cd TaskNow
```

### 2. Backend Setup (Django)

Open your terminal and execute:

```bash
# Navigate to the backend directory
cd backend

# Create a virtual environment
python -m venv venv

# Activate the virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install required Python packages
pip install django djangorestframework pillow django-cors-headers

# Run database migrations to set up the local SQLite database
python manage.py migrate

# Start the Django development server (Defaults to http://localhost:8000)
python manage.py runserver
```

### 3. Frontend Setup (React)

Open a **new terminal window/tab**, and execute:

```bash
# Navigate to the frontend directory
cd frontend

# Install all Node dependencies
npm install

# Start the React development server (Defaults to http://localhost:3000)
npm start
```

---

## 📈 Future Roadmap

- Integration with a PostgreSQL database for production deployment.
- Implementation of a rating and review system for service providers.
- Advanced geographical search and filtering (e.g., "Find services near me").

---

## 📜 License

This project is licensed under the MIT License.
