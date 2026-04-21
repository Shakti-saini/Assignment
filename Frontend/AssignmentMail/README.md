🔹 1. Database (PostgreSQL)

Create a database in PostgreSQL:

CREATE DATABASE Assignment;
🔹 2. Backend Setup
cd backend
npm install
npm run dev

Create a .env file:

PORT = 2001
DB_HOST = "localhost"
DB_USER = "postgres"
PASSWORD ="Welcome@1"
DB = "Assignment"
DBPORT = 5432
DEV_DB_HOST = "localhost"
DEV_PASSWORD = "Welcome@1"
DBDIALECT = "postgres"
SECRET_KEY ="!@#$%^&*()_++"
EMAIL_USER ="aryasaini2525@gmail.com"
EMAIL_PASS ="qsnnzcjapuknvmly"

EMAIL_USER ="aryasaini2525@gmail.com"
EMAIL_PASS ="qsnnzcjapuknvmly"
🔹 3. Frontend Setup
cd frontend
npm install
npm run dev

Frontend will run on:

http://localhost:5173
⚡ How It Works
User fills the form (React)
Request goes to backend API
Backend sends email using Nodemailer
Email logs are stored in PostgreSQL
Success/Error message shown on UI
📌 Notes
Run backend: npm run dev
Run frontend: npm run dev
PostgreSQL database must be created manually