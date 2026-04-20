# 🚀 Task Management App (Weekly Planner)

A modern fullstack task management application designed for developers to manage weekly learning or project plans (Week 1–3) with structured daily tasks, progress tracking, and financial-style summaries.

---

## 📌 Features

### ✅ Core Features

* Weekly planning system (Week-based structure)
* Daily task breakdown (Day 1–7)
* Task CRUD (Create, Read, Update, Delete)
* Kanban board (Drag & Drop)
* Authentication (Register & Login with JWT)
* Protected routes (middleware)
* Dashboard summary (progress tracking)

### 📊 Task Management

* Assign tasks to specific days
* Add categories/tags (Backend, Frontend, DB, etc.)
* Set priority (Low, Medium, High)
* Subtasks checklist
* Status tracking:

  * Backlog
  * In Progress
  * Done

### 🔍 Filtering & Search

* Filter by:

  * Day (Day 1–7)
  * Category
  * Status
* Search tasks by keyword
* Sort by priority or date

### 📈 Dashboard

* Weekly progress bar
* Total tasks vs completed tasks
* Summary view per week

---

## 🧱 Tech Stack

### Backend

* Language: Go (Golang)
* Framework: Fiber / Gin
* Database: PostgreSQL
* ORM / Query: sqlx / GORM (optional)
* Auth: JWT
* Password Hashing: bcrypt

### Frontend

* Framework: Next.js
* Styling: Tailwind CSS
* State Management: React Hooks / Zustand (optional)

---

## 📂 Project Structure

```bash
.
├── backend/
│   ├── cmd/                # App entry point
│   ├── internal/           # Business logic
│   │   ├── handler/        # HTTP handlers
│   │   ├── service/        # Use cases
│   │   ├── repository/     # DB queries
│   │   └── model/          # Structs
│   ├── pkg/                # Shared utilities
│   ├── migrations/         # DB migrations
│   ├── .env
│   └── main.go
│
├── frontend/
│   ├── app/                # Next.js app router
│   ├── components/         # UI components
│   ├── services/           # API calls
│   └── styles/
│
└── README.md
```

---

## ⚙️ Installation & Setup

### 1. Clone Repository

```bash
git clone https://github.com/your-username/task-management-app.git
cd task-management-app
```

---

### 2. Backend Setup

#### Install dependencies

```bash
cd backend
go mod tidy
```

#### Setup environment variables

Create `.env` file:

```env
PORT=8080
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=yourpassword
DB_NAME=taskdb
JWT_SECRET=your_secret_key
```

#### Run database (PostgreSQL)

Using Docker:

```bash
docker run --name postgres \
  -e POSTGRES_PASSWORD=yourpassword \
  -p 5432:5432 \
  -d postgres
```

#### Run migrations

```bash
migrate up
```

#### Start server

```bash
go run cmd/main.go
```

Server will run at:

```
http://localhost:8080
```

---

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend will run at:

```
http://localhost:3000
```

---

## 🔐 API Endpoints

### Auth

| Method | Endpoint  | Description   |
| ------ | --------- | ------------- |
| POST   | /register | Register user |
| POST   | /login    | Login user    |

---

### Tasks

| Method | Endpoint   | Description   |
| ------ | ---------- | ------------- |
| GET    | /tasks     | Get all tasks |
| POST   | /tasks     | Create task   |
| PUT    | /tasks/:id | Update task   |
| DELETE | /tasks/:id | Delete task   |

---

### Summary

| Method | Endpoint | Description             |
| ------ | -------- | ----------------------- |
| GET    | /summary | Get weekly summary data |

---

## 🧠 Data Model (Simplified)

### User

```json
{
  "id": "uuid",
  "email": "string",
  "password": "hashed"
}
```

### Task

```json
{
  "id": "uuid",
  "title": "string",
  "description": "string",
  "day": 1,
  "status": "backlog | in_progress | done",
  "priority": "low | medium | high",
  "category": "backend | frontend | db",
  "user_id": "uuid"
}
```

---

## 🎯 Roadmap

### Week 1

* Backend core
* Auth system
* Task CRUD
* Basic frontend

### Week 2

* Drag & drop (Kanban)
* Advanced filtering
* UI improvements

### Week 3

* Realtime updates (WebSocket)
* Notifications
* Performance optimization

---

## 🧪 Testing

* Use Postman / Thunder Client for API testing
* Unit test (Go testing)
* Integration test (optional)

---

## 📸 Screens (Planned)

* Dashboard
* Kanban board
* Task modal
* Weekly view

---

## 🤝 Contributing

1. Fork repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Open Pull Request

---

## 📄 License

MIT License

---

## 💡 Inspiration

Built for structured learning & productivity, inspired by:

* Notion
* Trello
* Linear

---

## 👨‍💻 Author

Your Name
GitHub: https://github.com/Arroziqi

---
