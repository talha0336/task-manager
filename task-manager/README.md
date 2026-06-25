# ✅ TaskFlow — MERN Stack Task Manager

A full-stack task management web application built with the **MERN stack** (MongoDB, Express.js, React.js, Node.js). Features JWT authentication, full CRUD operations, priority/status filtering, and a clean responsive UI.

## 🚀 Live Demo
- Frontend: [your-netlify-link.netlify.app]
- Backend API: [your-render-link.onrender.com]

## ✨ Features
- 🔐 JWT-based user authentication (Register / Login / Logout)
- ✅ Create, Read, Update, Delete tasks
- 🎯 Set task priority (Low / Medium / High)
- 📊 Task status tracking (Pending / In Progress / Completed)
- 📅 Due date with overdue alerts
- 🔍 Filter by status, priority; sort by date/priority
- 📈 Stats dashboard (total, pending, in-progress, completed)
- 📱 Fully responsive design

## 🛠️ Tech Stack
| Layer | Technology |
|---|---|
| Frontend | React.js, React Router v6, Axios, CSS Modules |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas, Mongoose ODM |
| Auth | JWT (JSON Web Tokens), bcryptjs |
| Deployment | Netlify (frontend), Render (backend) |
| Version Control | Git, GitHub |

## 📁 Project Structure
```
task-manager/
├── backend/
│   ├── controllers/      # Route logic
│   ├── middleware/       # JWT auth middleware
│   ├── models/           # Mongoose schemas (User, Task)
│   ├── routes/           # Express API routes
│   └── server.js         # Entry point
└── frontend/
    └── src/
        ├── api/          # Axios instance & API calls
        ├── components/   # Reusable UI components
        ├── context/      # React Context (AuthContext)
        └── pages/        # Login, Register, Dashboard
```

## ⚡ Getting Started

### Prerequisites
- Node.js v18+
- MongoDB Atlas account (free tier)

### Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Fill in MONGO_URI and JWT_SECRET in .env
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
npm start
```

## 🔗 API Endpoints
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | /api/auth/register | Register user | ❌ |
| POST | /api/auth/login | Login user | ❌ |
| GET | /api/auth/me | Get current user | ✅ |
| GET | /api/tasks | Get all tasks (with filters) | ✅ |
| POST | /api/tasks | Create task | ✅ |
| GET | /api/tasks/:id | Get single task | ✅ |
| PUT | /api/tasks/:id | Update task | ✅ |
| DELETE | /api/tasks/:id | Delete task | ✅ |
| GET | /api/tasks/stats | Get task stats | ✅ |

## 👨‍💻 Author
**[Your Name]** — Computer Engineering Student, Shree LR Tiwari College of Engineering  
GitHub: [@yourusername](https://github.com/yourusername)
