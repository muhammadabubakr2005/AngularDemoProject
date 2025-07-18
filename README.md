# Advanced User Management Panel

A role-based user management system built with Angular. This application allows Admin users to perform full CRUD operations on user data and provides Viewer users with read-only access. Integrated with a mock backend and secured with route guards.

---

## Description

This project is designed as a complete demonstration of key Angular features:
- Reactive forms with multi-step validation
- External table integration for pagination, search, and filtering
- Soft delete and trash view logic
- Role-based access control (RBAC)
- Route protection and mock login with session persistence
- JSON-server integration for a mock backend

It serves as an ideal learning tool for developers seeking to build advanced CRUD-based applications with role management and client-side validation.

---

## Getting Started

### Dependencies

* Node.js (v14 or above)
* Angular CLI (v15 or above)
* npm
* json-server (for mock backend)

### Installing

1. **Clone the Repository**

```bash
git clone https://github.com/muhammadabubakr2005/AngularDemoProject
```

2. **Install Frontend Dependencies**

```bash
npm install
```
3. **Install JSON Server Globally**

```bash
npm install -g json-server
```

4. **Executing Program**
Start the Mock Backend

```bash
npx json-server --watch db.json --port 3000
```

5. **Start the Angular App**

```bash
ng serve
```

6. **Visit the Application**

Open in browser:
http://localhost:4200

## Version History

### 0.2 – Development Version (`dev` branch)
- All Features discussed above in description

### 0.1 – Initial Release (`main` branch)
- First Commit