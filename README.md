# 📋 Task Manager Frontend

A modern and responsive Task Management application built with **React + Vite**, featuring a beautiful UI, reusable components, task statistics, filtering, pagination, and seamless integration with the Task Manager Backend API.

---

# 🚀 Features

- ✨ Modern Glassmorphism UI
- 📱 Fully Responsive Design
- ➕ Create New Tasks
- ✏️ Edit Existing Tasks
- 🗑️ Delete Tasks
- 📊 Task Statistics Dashboard
- 🔍 Search Tasks
- 🎯 Filter by Status & Priority
- 📄 Pagination Support
- 🔔 Toast Notifications
- 🌐 REST API Integration
- ⚡ Axios Request & Response Interceptors
- 🎨 Animated Hero Section
- 🧩 Reusable Components
- 🛡️ Error Handling

---

# 🛠️ Tech Stack

| Technology      | Purpose            |
| --------------- | ------------------ |
| React 19        | Frontend Framework |
| Vite            | Build Tool         |
| Axios           | API Requests       |
| React Hot Toast | Notifications      |
| React Icons     | Icons              |
| Date-fns        | Date Formatting    |
| CSS             | Styling            |

---

# 📁 Project Structure

```
frontend/
│
├── public/
│
├── src/
│   ├── components/
│   │     ├── Hero.jsx
│   │     ├── TaskCard.jsx
│   │     ├── TaskForm.jsx
│   │     ├── TaskList.jsx
│   │     └── TaskStats.jsx
│   │
│   ├── hooks/
│   │     └── useTasks.js
│   │
│   ├── services/
│   │     └── api.js
│   │
│   ├── styles/
│   │
│   ├── App.jsx
│   ├── main.jsx
│   ├── App.css
│   └── index.css
│
├── .env
├── package.json
└── README.md
```

---

# ⚙️ Installation

Clone the repository

```bash
git clone <repository-url>
```

Move into frontend

```bash
cd frontend
```

Install dependencies

```bash
npm install
```

Start development server

```bash
npm run dev
```

The application will run on

```
http://localhost:5173
```

---

# 🔑 Environment Variables

Create a `.env` file in the project root.

```env
VITE_API_URL=http://localhost:5000/api
```

---

# 📦 Main Components

## Hero

Displays

- Animated landing section
- Project introduction
- Feature badges
- Scroll animation

---

## TaskForm

Responsible for

- Creating tasks
- Updating tasks
- Form validation
- Sending API requests

---

## TaskCard

Displays a single task.

Features

- Status Badge
- Priority Badge
- Due Date
- Tags
- Edit Button
- Delete Button
- Expand Description
- Toggle Completion

---

## TaskList

Responsible for

- Showing all tasks
- Filtering
- Searching
- Pagination
- Edit Modal
- Empty State
- Loading Skeleton

---

## TaskStats

Displays

- Total Tasks
- Pending Tasks
- In Progress Tasks
- Completed Tasks

---

# 🪝 Custom Hook

## useTasks()

Handles all business logic.

Includes

- Fetch Tasks
- Create Task
- Update Task
- Delete Task
- Bulk Delete
- Pagination
- Statistics
- Filters
- Loading State
- Error State

Returns

```javascript
{
  (tasks,
    loading,
    error,
    pagination,
    stats,
    filters,
    createTask,
    updateTask,
    deleteTask,
    bulkDeleteTasks,
    updateFilters,
    changePage,
    refetch,
    refreshStats);
}
```

---

# 🌐 API Layer

All backend communication is handled through

```
src/services/api.js
```

Implemented APIs

| Method | Endpoint           | Description     |
| ------ | ------------------ | --------------- |
| GET    | /tasks             | Get Tasks       |
| GET    | /tasks/:id         | Get Single Task |
| POST   | /tasks             | Create Task     |
| PUT    | /tasks/:id         | Update Task     |
| DELETE | /tasks/:id         | Delete Task     |
| DELETE | /tasks/bulk/delete | Bulk Delete     |
| GET    | /tasks/stats       | Task Statistics |
| GET    | /health            | Health Check    |

---

# 🔄 Axios Features

The application uses Axios Interceptors.

### Request Interceptor

- Logs outgoing requests
- Adds common headers

### Response Interceptor

Handles

- Network Errors
- Timeout Errors
- Backend Validation Errors
- Displays Toast Notifications
- Logs API Responses

---

# 📊 State Management

The application uses React Hooks.

```
useState
```

For

- Tasks
- Loading
- Error
- Pagination
- Filters
- Statistics
- Form State

```
useEffect
```

For

- Initial Fetch
- Refetch on Filter Change

```
useCallback
```

For

- Optimized API Calls
- Preventing unnecessary re-renders

---

# 🔎 Filtering

Supported filters

- Search
- Status
- Priority

Example

```
Pending + High Priority
```

or

```
Completed Tasks
```

---

# 📄 Pagination

Supports

- Previous Page
- Next Page
- Current Page Indicator
- Total Pages

---

# 🎨 UI Features

- Glassmorphism Cards
- Gradient Backgrounds
- Floating Animations
- Responsive Layout
- Animated Buttons
- Smooth Hover Effects
- Responsive Grid
- Gradient Typography
- Beautiful Toast Notifications

---

# 🔔 Notifications

React Hot Toast is used for

- Task Created
- Task Updated
- Task Deleted
- Bulk Delete
- API Errors
- Network Errors
- Timeout Errors

---

# 🛡️ Error Handling

The frontend gracefully handles

- Backend Errors
- Validation Errors
- API Timeout
- Network Failure
- Invalid Responses
- Missing Task ID
- Empty Results

---

# 📱 Responsive Design

Optimized for

- Desktop
- Laptop
- Tablet
- Mobile Devices

---

# 📦 Available Scripts

Start Development

```bash
npm run dev
```

Build Production

```bash
npm run build
```

Preview Production Build

```bash
npm run preview
```

Lint

```bash
npm run lint
```

---

# 🔮 Future Improvements

- User Authentication
- Dark Mode
- Drag & Drop Tasks
- Task Categories
- Calendar View
- Due Date Notifications
- File Attachments
- Offline Support
- Real-time Updates using WebSockets
- Unit Testing
- Infinite Scrolling

---

# 🤝 Backend Dependency

This frontend requires the Task Manager Backend API.

Default Backend URL

```
http://localhost:5000/api
```

Ensure the backend server is running before starting the frontend.

---

# 👨‍💻 Author

**Harsh Kumar Mishra**

Full Stack Developer

---
