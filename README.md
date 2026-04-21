
Project Overview
This is a simple email sending system where:
Users can send emails (single or multiple)
CC & BCC are supported
File attachments are supported
Email data is stored in PostgreSQL

How to run the project
1. Database (PostgreSQL)
Create a database in PostgreSQL (Important step):
CREATE DATABASE Assignment;
2. Backend Setup
cd backend
npm install
npm run dev

3. Frontend Setup
cd frontend
npm install
npm run dev

Required environment variables
I have created both development and production environments, 
but they are currently the same. The configuration is already defined in the .env file.
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



How It Works
User fills the form (React)
Request goes to backend API
Backend sends email using Nodemailer
Email logs are stored in PostgreSQL
Success/Error message shown on UI
Notes
Run backend: npm run dev
Run frontend: npm run dev
PostgreSQL database must be created manually

