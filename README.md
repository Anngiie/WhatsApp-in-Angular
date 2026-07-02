# WhatsApp Clone

A WhatsApp Web clone built with **Angular 19**, **Node.js**, **Express**, and **SQLite**.

---

## Screenshot

<img width="800" alt="WhatsApp Clone — Current Version" src="whatsapp_new.png">

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | Angular 19, TypeScript, SCSS |
| **Backend** | Node.js + Express |
| **Database** | SQLite (via better-sqlite3) |
| **Auth** | JWT + bcrypt password hashing |
| **Dev tools** | Angular CLI, concurrently, proxy |

---

## Features

- **Register / Login** — create an account with email, username, and password. Login with either email or username.
- **JWT authentication** — token stored in localStorage, attached to every request via HTTP interceptor
- **Password security** — bcrypt-hashed, never stored in plain text
- **Chat sidebar** — conversation list with search and filters (All, Unread, Groups)
- **Unread badges** — per-conversation message count badges (99+ for large numbers) + green dot indicator in nav bar
- **Message sending** — text messages with emoji picker and file/image attachment support
- **User avatars** — colored circle with the user's initial; conversation/channel contacts get random avatars
- **Settings page** — profile editing (display name, about), privacy controls, notification preferences
- **Navigation** — sidebar nav for Chats, Calls, Status, Channels, Communities, Settings, and Profile

---

## Architecture

```
Angular (:4200)  ──proxy──►  Express (:3000)  ──►  SQLite (server/data/)
      │                            │
  JWT in localStorage         bcrypt hashing
  AuthInterceptor             CORS middleware
```

### API Endpoints

| Method | Endpoint | Auth | Purpose |
|---|---|---|---|
| POST | `/api/auth/register` | No | Create a new account |
| POST | `/api/auth/login` | No | Sign in (by email or username) |
| GET | `/api/auth/me` | JWT | Get current user profile |
| PUT | `/api/auth/profile` | JWT | Update display name and about |
| GET | `/api/health` | No | Server health check |

---

## What's New (vs Original)

| Feature | Before | After |
|---|---|---|
| **Authentication** | Mock — any username/password | Real JWT + bcrypt + SQLite |
| **Database** | None — state lost on refresh | SQLite — users persist |
| **Registration** | No form | Email + username + password with validation |
| **Login** | Username only | Email **or** username |
| **Routing** | Broken — no `<router-outlet>` | Fixed — route guards, proper navigation |
| **Avatars** | All external (pravatar.cc) | User: initial circle; contacts: random images |
| **Unread badges** | None | Count badges + nav indicator dot |
| **Backend** | None | Express REST API |

---

## How to Run

```bash
npm install      # installs Angular + server dependencies
npm start        # launches both Angular (:4200) and Express (:3000)
```

Open `http://localhost:4200` — click **Register** to create your first account.

---

## Original Version

> This project was originally generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.0.2 as a frontend-only prototype with mock authentication and no backend.

<img width="500" alt="WhatsApp Clone — Original" src="https://user-images.githubusercontent.com/36802997/189771454-7e3370bb-8baf-49e3-b955-cc56e3f014d3.png">
