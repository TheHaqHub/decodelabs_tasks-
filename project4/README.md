# Project 4 — Frontend & Backend Integration

A full-stack web application that integrates an HTML/CSS/JS frontend with the Node.js + SQLite backend from Project 3.

## Tech Stack
- HTML5, CSS3, Vanilla JavaScript
- fetch() API with async/await
- Connects to Project 3 REST API (localhost:3000)

## Features
- View all users dynamically loaded from backend
- Add new users via form with validation
- Delete users with instant UI update
- Error handling for network and server failures

## How to Run

**Step 1 — Start the backend (Project 3):**
```bash
cd ../project3
npm start
```

**Step 2 — Open the frontend:**
Just open `index.html` in your browser. No install needed.

## Key Concepts Used
- IPO Architecture (Input → Process → Output)
- async/await for non-blocking requests
- response.ok check before parsing JSON
- DOM manipulation with textContent (XSS-safe)
- Graceful error handling with try/catch