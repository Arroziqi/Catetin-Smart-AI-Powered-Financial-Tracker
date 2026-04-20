# 🚀 Catetin Backend

Core API service for **Catetin – Smart AI-Powered Financial Tracker**. Built with Go and Fiber, focusing on high performance and modular architecture.

---

## 🛠 Tech Stack

- **Language:** [Go (Golang)](https://go.dev/)
- **Framework:** [Fiber v2](https://gofiber.io/)
- **Database:** [PostgreSQL](https://www.postgresql.org/)
- **ORM:** [GORM](https://gorm.io/)
- **Auth:** [JWT (JSON Web Token)](https://jwt.io/)
- **Documentation:** [Swagger / Swag](https://github.com/swaggo/swag)
- **Hot Reload:** [Air](https://github.com/cosmtrek/air)

---

## 📂 Project Structure

```bash
backend/
├── cmd/                # Application entry points
│   └── main.go         # Main entry point
├── docs/               # Swagger documentation (generated)
├── internal/           # Private application and library code
│   ├── middleware/     # Fiber middlewares (Auth, Logging, etc.)
│   ├── modules/        # Feature-based modules
│   │   ├── auth/       # Authentication logic
│   │   ├── transaction/# Transaction management
│   │   └── ...         # Other modules
│   └── platform/       # Shared platform components (DB, Logger)
├── .env                # Environment variables
├── Makefile            # Automation commands
└── Dockerfile          # Production container
```

---

## ⚙️ Getting Started

### 1. Prerequisites
- Go 1.21+
- PostgreSQL
- Air (for development)

### 2. Setup Environment
Copy the example environment file and update your credentials:
```bash
cp .example.env .env
```

### 3. Install Dependencies
```bash
go mod tidy
```

### 4. Run Development Server
Using Air (recommended):
```bash
air
```
Or standard Go run:
```bash
go run cmd/main.go
```

### 5. API Documentation
Once running, access Swagger UI at:
`http://localhost:8080/swagger/index.html` (port depends on `.env`)

---

## 🧪 Commands

- `make build`: Build the binary
- `make test`: Run unit tests
- `make swag`: Regenerate swagger documentation

---

## 📄 License
This project is licensed under the MIT License.
