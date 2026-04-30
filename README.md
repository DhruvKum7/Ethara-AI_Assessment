
# 🚀 EtharaFlow – Team Task Manager

A full-stack Team Task Management application built for the Ethara AI Full-Stack Assessment.

## 🌐 Live Links

- Frontend Live URL: https://ethara-ai-assessment-1.onrender.com/dashboard
- Backend Live API: https://ethara-ai-assessment-lf1a.onrender.com/api
- GitHub Repository: https://github.com/DhruvKum7/Ethara-AI_Assessment

## 📌 Project Overview

EtharaFlow is a role-based team task manager where users can create projects, assign tasks, and track project progress through a clean dashboard.

The project follows a SOLID-based layered backend architecture and connects a React frontend with a Node.js/Express backend and MongoDB Atlas database.

## ✨ Features

- User Signup and Login
- JWT Authentication
- Project Management
- Task Creation
- Task Assignment
- Task Status Tracking
- Dashboard Analytics
- Role-based Access Control
- MongoDB Relationships
- REST API Integration
- Frontend and Backend Deployment Ready

## 🧠 About Ethara AI Alignment

EtharaFlow is designed around modern AI-product engineering values such as:

- Scalable workflow management
- Clean API-first architecture
- Automation-ready task tracking
- Team productivity improvement
- Data-driven dashboard insights
- Future-ready structure for AI-powered task recommendations

## 🛠 Tech Stack

### Frontend

- React.js
- Vite
- Tailwind CSS
- Axios
- React Router DOM

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt.js
- dotenv
- CORS

### Deployment

- Backend: Render
- Frontend: Render / Railway
- Database: MongoDB Atlas

## 📁 Folder Structure

```txt
Ethara-AI_Assessment
│
├── backend
│   ├── src
│   │   ├── config
│   │   ├── controllers
│   │   ├── middleware
│   │   ├── models
│   │   ├── repositories
│   │   ├── routes
│   │   ├── services
│   │   ├── utils
│   │   └── app.js
│   │
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── frontend
│   ├── src
│   │   ├── pages
│   │   ├── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── package.json
│   └── .env
│
└── README.md
```





## 👉 This will render perfectly on GitHub (no merging issue).

If you want, next I can give:
- 🔥 **final polished README (top 1% level)**
- 🎥 **2 min demo script (interviewer-ready)**





## 🧱 SOLID Architecture

The backend is structured using clean layered architecture:

Routes → Controllers → Services → Repositories → Models

## SOLID Principles Used
Single Responsibility Principle
Each layer has one clear responsibility.
Open/Closed Principle
New features can be added without changing existing logic heavily.
Liskov Substitution Principle
Repository and service layers follow predictable behavior.
Interface Segregation Principle
Modules expose only focused and required methods.
Dependency Inversion Principle
Controllers depend on services, not directly on database models.
⚙️ Backend Setup
cd backend
npm install

## Create .env file inside backend:

MONGO_URI=your_mongodb_atlas_url
JWT_SECRET=your_jwt_secret

Run backend locally:

npm run dev

## Backend will run on:

http://localhost:5001
⚙️ Frontend Setup
cd frontend
npm install

Create .env file inside frontend:

VITE_API_URL=https://your-backend-url/api

Run frontend locally:

npm run dev

Frontend will run on:

http://localhost:5173
## 🔐 API Endpoints
Auth
POST /api/auth/signup
POST /api/auth/login
Projects
POST /api/projects
GET /api/projects
Tasks
POST /api/tasks
GET /api/tasks
PATCH /api/tasks/:id/status
Dashboard
GET /api/dashboard
## 🧪 API Testing Flow
1. Signup
{
  "name": "Dhruv",
  "email": "admin@test.com",
  "password": "123456",
  "role": "admin"
}
2. Login
{
  "email": "admin@test.com",
  "password": "123456"
}
3. Create Project
{
  "title": "EtharaFlow Assessment",
  "description": "Full-stack task manager",
  "memberEmails": []
}
4. Create Task
{
  "title": "Build Backend APIs",
  "description": "Create authentication, project and task APIs",
  "project": "project_id_here",
  "assignedTo": "user_id_here",
  "priority": "high",
  "dueDate": "2026-05-05"
}
## 🚀 Deployment Process
Backend Deployment on Render
Create new Web Service
Connect GitHub repository
Set root directory:
backend
Build command:
npm install
Start command:
npm start
Add environment variables:
MONGO_URI=your_mongodb_atlas_url
JWT_SECRET=your_jwt_secret
Frontend Deployment
Create new Static Site
Connect GitHub repository
Set root directory:
frontend
Build command:
npm install && npm run build
Publish directory:
dist
Add environment variable:
VITE_API_URL=https://your-backend-url/api
## ⚠️ Challenges Faced

During development, several real-world issues were handled:

MongoDB Atlas connection error
IP whitelist issue in MongoDB Atlas
Wrong MongoDB password encoding issue
Postman body not sending JSON correctly
Port conflict on local system
Railway dynamic port binding issue
Vite and Node.js version compatibility issue
Frontend and backend API URL mismatch
Environment variable mismatch between local and deployed versions
GitHub push conflict due to remote repository already having files
## ✅ Solutions Applied
Fixed MongoDB URI format
Added IP access in MongoDB Atlas
Used encoded password for MongoDB connection
Configured JSON body parsing correctly
Used environment variables for production setup
Separated backend and frontend deployment
Used Render for backend deployment
Added VITE_API_URL for frontend API management
Followed clean GitHub workflow
## 🎯 Key Learnings
Full-stack project structure
REST API design
Authentication with JWT
MongoDB relationships
Role-based access control
Deployment on Render/Railway
Frontend-backend integration
Debugging real deployment issues
Working with environment variables
## 📊 Dashboard Features

The dashboard tracks:

Total tasks
Pending tasks
In-progress tasks
Completed tasks
Overdue tasks
## 👨‍💻 Author

Dhruv Kumar

## GitHub: https://github.com/DhruvKum7
## LinkedIn: https://linkedin.com/in/dhruv-kumar-dk
## 📌 Final Note

EtharaFlow was developed as a full-stack assessment project under a strict timeline.
The project focuses on clean architecture, REST API development, authentication, task management, dashboard analytics, and production deployment.
