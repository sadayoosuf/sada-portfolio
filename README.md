# Sada Yoosuf — Full-stack Portfolio

A responsive portfolio built with React + Bootstrap and Django REST Framework. It uses an off-white/plum visual system with a code-inspired hero illustration.

## Important content notes
- Social links, email, résumé URL, and project URLs are placeholders until you add your verified links.
- Wipro experience is described as Python automation testing based on the supplied profile. Edit any wording that doesn't match your official role.
- No fabricated metrics, testimonials, client endorsements, or project URLs are included.

## Project structure

```text
sada_portfolio/
├── frontend/       # React + Vite + Bootstrap
└── backend/        # Django + Django REST Framework
```

## 1. Requirements
- Node.js 20+ and npm
- Python 3.11+
- PostgreSQL (optional for local development; SQLite is used by default)

## 2. Run the backend

```bash
cd backend
python -m venv .venv
# Windows:
.venv\Scripts\activate
# macOS/Linux:
source .venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

API endpoints:
- `GET http://127.0.0.1:8000/api/portfolio/`
- `POST http://127.0.0.1:8000/api/contact/`

Contact POST JSON example:
```json
{
  "name": "Recruiter name",
  "email": "recruiter@example.com",
  "subject": "Portfolio enquiry",
  "message": "Hello..."
}
```

To use PostgreSQL, set environment variables before running Django:
- `DB_NAME`
- `DB_USER`
- `DB_PASSWORD`
- `DB_HOST` (e.g. `localhost`)
- `DB_PORT` (e.g. `5432`)

The backend falls back to SQLite if `DB_NAME` is not set.

## 3. Run the frontend

Open a second terminal:

```bash
cd frontend
npm install
```

Copy `.env.example` to `.env` and set:
```env
VITE_API_BASE_URL=http://127.0.0.1:8000/api
```

Then run:
```bash
npm run dev
```

Open the local URL printed by Vite, usually `http://localhost:5173`.

The frontend includes fallback portfolio content, so the site still renders if the API is offline. Contact form submission requires the backend.

## 4. Personalise before publishing

Search the project for `TODO` and replace:
- `YOUR_EMAIL@example.com`
- `https://github.com/sadayoosuf` only if this is your verified GitHub profile URL
- `https://www.linkedin.com/in/sada-yoosuf/` only if this is your verified LinkedIn URL
- `YOUR_RESUME_URL`
- `YOUR_COVET_REPO_URL`, `YOUR_HEALIO_REPO_URL`, `YOUR_AGRO_REPO_URL`, `YOUR_AUTOMATION_REPO_URL`
- Optional live demo links for each project

The GitHub and LinkedIn values above reflect profile handles supplied earlier in the conversation; verify them before launch. A résumé URL can be a public PDF link hosted in your repository or a storage service.

Update project descriptions and experience dates to match your final résumé. The Wipro role is presented as Python Automation Tester / Engineer; adjust the title if your official title differs.

## 5. Create a production build

```bash
cd frontend
npm run build
```

The production bundle is created in `frontend/dist`.

## 6. Deployment overview

### Frontend
Deploy `frontend` to Vercel or Netlify:
- Build command: `npm run build`
- Output directory: `dist`
- Environment variable: `VITE_API_BASE_URL=https://YOUR-BACKEND-DOMAIN/api`

### Backend
Deploy `backend` to Render or another Django-compatible host:
- Build command: `pip install -r requirements.txt && python manage.py collectstatic --noinput && python manage.py migrate`
- Start command: `gunicorn config.wsgi:application`
- Set `SECRET_KEY` to a strong secret, `DEBUG=False`, and `ALLOWED_HOSTS` to your backend hostname.
- Set `CORS_ALLOWED_ORIGINS` to your deployed frontend URL.
- Set `DB_NAME`, `DB_USER`, `DB_PASSWORD`, `DB_HOST`, `DB_PORT` for PostgreSQL.
- Configure a persistent PostgreSQL database and persistent media/storage if you later add uploads.

For production, also configure HTTPS, trusted CSRF origins if using cookie-authenticated admin forms, log monitoring, and a transactional email provider if you want contact form notifications. This starter saves contact messages to the database; it does not email them automatically.

## Security notes
- Never commit `.env`, database passwords, or production secrets.
- Do not use Django's development server in production.
- Set `DEBUG=False` in production.
- Restrict CORS to your own frontend domain.
