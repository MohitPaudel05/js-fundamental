# Frontend Lab — React 19 SPA with Vite

> **2024-ITEX 320 Web Engineering — Assignment 1.2**  
> Kathmandu University, Department of Computer Science & Engineering  
> Student: **Mohit Poudel** (`mohit.poudel24@radiantcollege.edu.np`)

---

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start Vite development server
npm run dev

# 3. Run Oxlint code quality verification
npm run lint

# 4. Create production build
npm run build
```

---

## 📑 Project Structure

```text
src/
├── assets/             # SVG logos and hero banner image
├── components/
│   ├── Layout.jsx      # Root layout with NavLink, Theme toggle, and Auth badge
│   ├── ProtectedRoute.jsx # Guard redirecting unauthenticated users to /login
│   └── UserCard.jsx    # Reusable user presentation component
├── context/
│   ├── AuthContext.jsx # Stub authentication state (user, login, logout)
│   └── ThemeContext.jsx # React 19 direct context syncing localStorage and [data-theme]
├── data/
│   └── users.js        # Realistic mock dataset and lookup functions
├── hooks/
│   ├── useLocalStorage.js # Generic persistent state hook
│   └── useWindowWidth.js  # Effect cleanup demo tracking viewport width
├── pages/
│   ├── Home.jsx        # Landing page with hero banner & feature highlights
│   ├── Login.jsx       # Email sign-in form with redirect return tracking
│   ├── NotFound.jsx    # Custom 404 page with return links
│   ├── Profile.jsx     # Protected route displaying active user profile
│   ├── UserDetail.jsx  # Individual user profile powered by route loader (Bonus)
│   └── Users.jsx       # Directory with persistent useLocalStorage search box
├── App.css             # Theme-aware modern component styles
├── App.jsx             # Data Router (createBrowserRouter) configuration
├── index.css           # Global design tokens, light/dark custom properties
└── main.jsx            # Application bootstrap with StrictMode and Context Providers
```

---

## 🌟 Assignment Deliverables & Highlights

1. **Vite + React 19 Foundation (Part A)**:
   - Configured with React 19 and React Router v7 (`react-router-dom`).
   - Clean modular architecture under `src/`.
2. **Declarative Routing (Part B)**:
   - Layout route with `<Outlet />`.
   - Nested routes: `/`, `/users`, `/users/:id`, `/login`, `/profile`, and `*` (404).
3. **Context Providers (Part C)**:
   - `ThemeContext`: React 19 direct syntax `<ThemeContext value=...>` with dark/light mode toggle.
   - `AuthContext`: Mock auth state with login/logout.
   - `ProtectedRoute`: Guards `/profile` using `<Navigate to="/login" replace />`.
4. **Hooks & Effect Cleanup (Part D)**:
   - `useLocalStorage`: Keeps search terms in `localStorage` across reloads.
   - `useWindowWidth`: Registers `window.addEventListener('resize', ...)` and unregisters it cleanly on unmount.
5. **⭐ Bonus (+2 Marks)**:
   - Route `loader` (`userDetailLoader`) integrated with `createBrowserRouter` on the `/users/:id` route.
6. **Short Answers**:
   - Comprehensive answers for CSR vs. SSR vs. SSG, Hydration, Context limitations, and StrictMode double-invocation in [answers.md](./answers.md).
