# User Management Demo App

A simple full-stack web application for managing users, built with Next.js (TypeScript) for the frontend and Spring Boot (Java, MyBatis, PostgreSQL) for the backend.

## Features
- Add, edit, delete users
- Update user active status
- Responsive, modern UI (React + TypeScript + Toast notifications)
- Connects to a Spring Boot backend with PostgreSQL database

## Tech Stack
- **Frontend:** Next.js (TypeScript), React, react-toastify, Roboto font
- **Backend:** Spring Boot, MyBatis
- **Database:** PostgreSQL

## Getting Started

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd <your-repo-folder>
```

### 2. Setup Backend
- Go to `BE/aots-backend`
- Configure your PostgreSQL connection in `application.properties`
- Run migrations if needed (see `schema.sql`)
- Start backend:
```bash
./gradlew bootRun
```

### 3. Setup Frontend
- Go to `frontend`
- Install dependencies:
```bash
npm install
```
- Create a `.env.local` file:
```
NEXT_PUBLIC_API_URL=http://localhost:8080
```
- Start frontend:
```bash
npm run dev
```
- App runs at [http://localhost:3000](http://localhost:3000)

## Usage
- Add a user: Fill in name and email, click "THÊM NGƯỜI DÙNG"
- Edit a user: Click "Chỉnh sửa", update info, click "Lưu"
- Delete a user: Click "Xóa"
- Toggle active status: Edit user, check/uncheck "Hoạt động", save

## Screenshots
[![Screenshot-2025-08-20-174153.png](https://i.postimg.cc/J7d5kn6P/Screenshot-2025-08-20-174153.png)](https://postimg.cc/yWcRqVzZ)

## Notes
- Ensure backend is running before starting frontend
- You can change API URL in `.env.local`
- For demo only, not production ready

## License
MIT
