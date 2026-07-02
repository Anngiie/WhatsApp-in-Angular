# WhatsApp Clone

A WhatsApp Web clone built with **Angular 19**, **Node.js**, **Express**, and **SQLite**.

---

## Before & After

This project started as a frontend-only prototype with mock authentication. It's now rebuilt with a real backend.

| **Original (v1)** | **Current (v2)** |
|---|---|
| <img width="400" alt="Original" src="https://user-images.githubusercontent.com/36802997/189771454-7e3370bb-8baf-49e3-b955-cc56e3f014d3.png"> | <img width="400" alt="Current" src="whatsapp_new.png"> |

### What changed

| Feature | Before | After |
|---|---|---|
| **Authentication** | Mock — any username/password worked | JWT + bcrypt + SQLite |
| **Database** | None — state lost on refresh | SQLite — users persist between sessions |
| **Registration** | No form | Email, username, password with validation |
| **Login** | Username only | Email **or** username |
| **Routing** | Broken — no `<router-outlet>` | Fixed with route guards |
| **User avatar** | External service (pravatar.cc) | Colored circle with initial |
| **Unread badges** | None | Per-chat count badges + nav dot indicator |
| **Backend** | None | Express REST API |

---

## Features

- Register & login with JWT authentication
- Chat sidebar with search and filters (All, Unread, Groups)
- Unread message badges with 99+ cap
- Text messages with emoji picker
- File and image attachment support
- Initial-based user avatar with deterministic colors
- Settings page with profile editing, privacy toggles, and notification preferences
- Chats, Calls, Status, Channels, Communities navigation

---

## How to Run

```bash
npm install
npm start
```

Open `http://localhost:4200` and click **Register** to create an account.

---

## API

| Method | Endpoint | Auth | Purpose |
|---|---|---|---|
| POST | `/api/auth/register` | No | Create account |
| POST | `/api/auth/login` | No | Sign in (email or username) |
| GET | `/api/auth/me` | JWT | Get current user |
| PUT | `/api/auth/profile` | JWT | Update display name / about |
