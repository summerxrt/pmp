
---

```markdown
# 🛠️ Personal Modular Platform (PMP)

A modular, full-stack productivity and security app—**custom-built for personal knowledge, automation, and security tools**.

---

## 🚀 Features

- **Notes & Knowledge Graph** – Create, edit, and relate notes
- **Dashboard** – Custom widgets and overviews
- **Security Tools** – Wrapper for scans, reports, pentesting utilities
- **AI Journal** – Private journaling with AI prompts
- **API Aggregator** – Unified access to 3rd party APIs
- **CV Scanner** – Analyze your resume and profile
- **Linktree** – Personal “link-in-bio” hub

---

## 🏗️ Project Structure
pmp/
├── backend/
│ ├── core/
│ │ ├── init.py
│ │ ├── asgi.py
│ │ ├── settings.py
│ │ ├── urls.py
│ │ └── wsgi.py
│ ├── notes/
│ ├── venv/
│ ├── .gitignore
│ ├── db.sqlite3
│ └── manage.py
├── frontend/
│ ├── node_modules/
│ ├── public/
│ ├── src/
│ │ ├── api/
│ │ │ └── authFetch.js
│ │ ├── assets/
│ │ ├── pages/
│ │ │ ├── AIAggregatorPage.jsx
│ │ │ ├── CVScannerPage.jsx
│ │ │ ├── DashboardPage.jsx
│ │ │ ├── LinktreePage.jsx
│ │ │ ├── LoginPage.jsx
│ │ │ ├── NotesPage.jsx
│ │ │ └── SecurityPage.jsx
│ │ ├── App.css
│ │ ├── App.jsx
│ │ ├── index.css
│ │ └── main.jsx
│ ├── .gitignore
│ ├── eslint.config.js
│ ├── index.html
│ ├── package-lock.json
│ ├── package.json
│ ├── README.md
│ └── vite.config.js
├── .gitignore
└── README.md

---

## ⚙️ Tech Stack

- **Backend:** Django, Django REST Framework, SimpleJWT
- **Frontend:** React (Vite), React Router
- **Database:** SQLite (dev), PostgreSQL (planned for production)
- **Auth:** JWT (access/refresh), secure local storage
- **DevOps:** Docker Compose (planned), GitHub Actions CI/CD (planned)

---

## ⚡ Quickstart

### 1. **Clone the Repo**
```sh
git clone https://github.com/summerxrt/pmp.git
cd pmp
````

### 2. **Backend Setup**

```sh
cd backend
python -m venv venv
# On Windows:
venv\Scripts\activate
# On Mac/Linux:
source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

### 3. **Frontend Setup**

```sh
cd ../frontend
npm install
npm run dev
```

* **Frontend:** [http://localhost:5173](http://localhost:5173)
* **Backend:** [http://127.0.0.1:8000](http://127.0.0.1:8000)

---

## 🔐 Authentication

* **JWT** (via `/api/token/` and `/api/token/refresh/`)
* Tokens stored in localStorage, sent via `Authorization: Bearer`
* All API endpoints require authentication

---

## ✅ Roadmap

* [x] Notes module (CRUD, JWT)
* [x] Modular React routing and Nav
* [ ] Dashboard widgets
* [ ] Security tools integration
* [ ] AI Journal MVP
* [ ] API Aggregator & CV Scanner
* [ ] Docker Compose & GitHub Actions

---

## 🤝 Contributing

PRs and issues welcome—please open an issue to discuss major changes.

---

## 📄 License

MIT License *(add your preferred license if needed)*

---

## 👤 Author

[Remus Timofte](https://github.com/summerxrt)
[summerx.net](https://www.summerx.net)

---

*Let’s build something amazing! 🚦*

````

---

### **How to use:**
- Copy-paste the above into your `README.md` at the project root.
- Run:
  ```sh
  git add README.md
  git commit -m "Add complete README"
  git push
````

---


