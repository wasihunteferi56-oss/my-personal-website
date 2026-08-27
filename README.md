# Wasihun Teferi — Personal Portfolio

A full-stack personal portfolio website for **Wasihun Teferi** — Information
Technology student, IT intern, and aspiring full-stack software engineer.

- **Frontend:** React + Vite (React Router, Lucide icons)
- **Backend:** Django + Django REST Framework
- **Database:** SQLite

The site is honest about where Wasihun currently is in his career: it
presents him as a student and developing professional, not a senior
engineer.

---

## Features

- Responsive, dark/light, glassmorphism-accented design
- Sticky navbar with active-section highlighting, mobile menu, theme toggle
- Animated hero with a typing effect and a "terminal" signature visual
- Content-driven pages: Home, About (+ Education), Skills, Experience,
  Projects (with filtering + details modal), Certificates, Contact
- Django REST API backing projects, skills, experience, and certificates
- Working contact form with frontend validation and a Django-backed
  `ContactMessage` model
- Full Django Admin for managing all content without touching code
- Scroll-reveal animations that respect `prefers-reduced-motion`
- SEO meta tags (title, description, Open Graph)

---

## Project Structure

```
portfolio-project/
├── frontend/           React + Vite app
│   └── src/
│       ├── components/ Reusable UI building blocks
│       ├── pages/       Home, About, Skills, Experience, Projects, Certificates, Contact
│       ├── services/    api.js — single source of truth for API calls
│       ├── data/        portfolioData.js — editable static content
│       └── hooks/        useReveal.js — scroll-reveal animation hook
│
├── backend/            Django + DRF app
│   ├── config/          settings.py, urls.py, wsgi.py, asgi.py
│   └── portfolio/       models.py, serializers.py, views.py, urls.py, admin.py
│       └── management/commands/seed_portfolio.py  — seeds real starter content
│
├── README.md
└── .gitignore
```

---

## Backend Setup

```bash
cd backend
python -m venv venv

# Activate the virtual environment
source venv/bin/activate        # macOS/Linux
venv\Scripts\activate           # Windows

pip install -r requirements.txt

python manage.py migrate
python manage.py seed_portfolio   # loads Wasihun's real starter content
python manage.py createsuperuser  # create your admin login
python manage.py runserver
```

The API is now running at `http://127.0.0.1:8000/api/`.
Django Admin is at `http://127.0.0.1:8000/admin/`.

## Frontend Setup

```bash
cd frontend
npm install

# Copy the example env file and adjust if needed
cp .env.example .env

npm run dev
```

The site is now running at `http://localhost:5173`.

> Both servers need to be running at the same time during development:
> Django on port 8000, Vite on port 5173.

---

## API Endpoints

| Method | Endpoint                  | Description                          |
|--------|----------------------------|---------------------------------------|
| GET    | `/api/projects/`           | List all projects (`?category=web` etc. to filter) |
| GET    | `/api/projects/<id>/`      | Full details for one project          |
| GET    | `/api/skills/`              | List all skills                       |
| GET    | `/api/experience/`         | List all experience entries           |
| GET    | `/api/certificates/`       | List all certificates                 |
| POST   | `/api/contact/`             | Submit the contact form               |

Project categories: `web`, `software`, `mobile`, `business`, `entrepreneurship`.

---

## Environment Variables

**frontend/.env**
```
VITE_API_URL=http://127.0.0.1:8000/api
```

**backend** (optional, for production — read via `os.environ` in `settings.py`)
```
DJANGO_SECRET_KEY=replace-with-a-real-secret-key
DJANGO_DEBUG=False
DJANGO_ALLOWED_HOSTS=yourdomain.com
CORS_ALLOWED_ORIGINS=https://yourdomain.com
```

---

## Adding Your Resume

Replace `frontend/public/resume.pdf` with your real resume, keeping the
filename `resume.pdf`. No code changes are needed — every "Download Resume"
button already points to that file.

---

## Managing Content

Almost all content (projects, skills, experience, certificates) lives in
the database and is edited from Django Admin at `/admin/` — no redeploy
needed. Static personal copy (hero text, about paragraphs, social links,
education) lives in `frontend/src/data/portfolioData.js` for quick edits.

---

## Deployment Notes

- **Backend:** Set `DJANGO_DEBUG=False`, set a real `DJANGO_SECRET_KEY`,
  configure `DJANGO_ALLOWED_HOSTS`, and serve with Gunicorn behind Nginx
  (or a platform like Railway/Render). Run `python manage.py collectstatic`.
- **Frontend:** Set `VITE_API_URL` to your deployed API URL, then
  `npm run build` and deploy the `dist/` folder (e.g. Vercel, Netlify,
  GitHub Pages behind a custom domain).
- Update `CORS_ALLOWED_ORIGINS` in the backend to include your deployed
  frontend URL.

## GitHub Workflow

```bash
git init
git add .
git commit -m "Initial commit: portfolio site"
git branch -M main
git remote add origin https://github.com/<your-username>/portfolio.git
git push -u origin main
```
