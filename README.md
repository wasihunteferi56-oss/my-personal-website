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
You can manage your website through the Django Admin Dashboard as well as local configuration files.

1. Django Admin Dashboard (Dynamic Content)
You can manage all dynamic content (Projects, Skills, Experience, Certificates, and Contact Form submissions) directly from the Django Admin Panel without touching any code.

Admin URL: http://127.0.0.1:8000/admin/
Username: admin
Password: admin123 (You can change this password inside the admin panel anytime under Users)
What you can manage inside the Admin Panel:
Section	Capabilities
Projects	Add new projects, update descriptions, tech stacks, GitHub/Live links, categories, and mark projects as featured.
Skills	Add new technical skills, set proficiency levels (0–100%), and organize them into categories.
Experience	Update your roles, companies, locations, dates, and bullet-point responsibilities.
Certificates	Upload and manage certifications, issue dates, and credentials.
Contact Messages	View, search, and mark incoming messages sent by visitors through your website contact form.
2. Static Content & Bio Edits
For personal bio details, hero text, social media links, and education history:

File Location: 
frontend/src/data/portfolioData.js
Edit this file to update:
Hero tagline & introduction
About Me paragraphs
Social links (GitHub, LinkedIn, Email, Telegram)
Education details (Degree, Institution, GPA, Coursework)
3. Replacing Your Resume
To update your downloadable resume:

Save your new resume PDF file as resume.pdf.
Replace the file at: 
frontend/public/resume.pdf
.
All "Download Resume" buttons on the website will automatically point to the updated file.
4. Creating Additional Admin Users
If you want to create a custom superuser account from the terminal, run:

powershell


# From the backend directory
cd backend
.\venv\Scripts\python.exe manage.py createsuperuser
11:12 AM

Here is a complete, step-by-step guide to push your website to GitHub and host it live on Vercel or Netlify (along with backend deployment options on Render).

📌 STEP 1: Push Your Code to GitHub
1.1 Create a New Repository on GitHub
Go to github.com/new and log in to your account.
Enter a repository name (e.g., wasihun-portfolio).
Set visibility to Public or Private.
Do NOT initialize with a README, .gitignore, or License (your project already has them).
Click Create repository.
1.2 Initialize Git and Push from Terminal
Open your terminal inside the project root folder (c:\Users\hp\Desktop\portfolio-project) and run:

bash


# 1. Initialize Git repository
git init
# 2. Add all project files
git add .
# 3. Create your initial commit
git commit -m "Initial commit: Wasihun Teferi Portfolio website & admin panel"
# 4. Rename main branch
git branch -M main
# 5. Connect your local project to GitHub (Replace <YOUR-GITHUB-USERNAME> with your real username)
git remote add origin https://github.com/<YOUR-GITHUB-USERNAME>/wasihun-portfolio.git
# 6. Push code to GitHub
git push -u origin main
🌐 STEP 2: Host Frontend on Vercel (Recommended)
Vercel provides free, high-performance static hosting with automatic HTTPS and instant deployment on git push.

2.1 Deploy to Vercel
Go to vercel.com and click Sign Up / Log In with your GitHub account.
Click Add New... ➔ Project.
Select your wasihun-portfolio repository and click Import.
Configure the Project Settings:
Framework Preset: Vite
Root Directory: Click Edit and select frontend.
Build Command: npm run build (Default)
Output Directory: dist (Default)
Environment Variables (Expand tab):
Name: VITE_API_URL
Value: http://127.0.0.1:8000/api (or your live backend URL once deployed)
Click Deploy.
🎉 Vercel will build your site and give you a live link like https://wasihun-portfolio.vercel.app!

🌐 STEP 3: Host Frontend on Netlify (Alternative Option)
Netlify is another top-tier free host for Vite/React applications.

3.1 Deploy to Netlify
Go to netlify.com and log in with your GitHub account.
Click Add new site ➔ Import an existing project.
Select GitHub and authorize access to your wasihun-portfolio repository.
Set Build Settings:
Base directory: frontend
Build command: npm run build
Publish directory: frontend/dist
Click Environment variables ➔ Add variable:
Key: VITE_API_URL
Value: http://127.0.0.1:8000/api (or your live backend URL)
Click Deploy wasihun-portfolio.
🎉 Netlify will provide a live link like https://wasihun-portfolio.netlify.app!

⚙️ STEP 4: Deploying Django Backend to Render (Free Tier)
Since Vercel & Netlify host frontends, your Django API and Admin Panel can be hosted for free on Render or Railway.

4.1 Deploying to Render
Create a free account on render.com.
Click New + ➔ Web Service.
Connect your GitHub repository wasihun-portfolio.
Configure settings:
Root Directory: backend
Environment: Python 3
Build Command:
bash


pip install -r requirements.txt && python manage.py migrate && python manage.py seed_portfolio
Start Command:
bash


gunicorn config.wsgi:application
Add Environment Variables on Render:
DJANGO_SECRET_KEY: (Generate any secret string)
DJANGO_DEBUG: False
CORS_ALLOWED_ORIGINS: https://wasihun-portfolio.vercel.app (Your Vercel or Netlify site URL)
Click Create Web Service.
Once Render finishes deploying, copy your backend URL (e.g., https://wasihun-portfolio-api.onrender.com) and update VITE_API_URL in your Vercel/Netlify environment settings!

🔄 Summary Checklist
Component	Platform	Environment Variable	Output URL Example
Frontend (React)	Vercel / Netlify	VITE_API_URL=https://<your-backend>.onrender.com/api	https://wasihun-portfolio.vercel.app
Backend (Django)	Render / Railway	CORS_ALLOWED_ORIGINS=https://wasihun-portfolio.vercel.app	https://wasihun-portfolio.onrender.com


THINGS TO ADD 
-PERSONAL PROFILE PHOTO ON ABOUT PAGE
-CERTIFICATES WITH IMAGE