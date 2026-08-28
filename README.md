# 🏠 Bengaluru Home Price Predictor

A beginner-friendly Machine Learning web application that predicts
the estimated price of a residential property in Bengaluru based on
area, BHK, bathrooms, and location.

The project combines a Machine Learning model with a Flask backend,
SQLite database, and a responsive HTML/CSS/JavaScript frontend.

---

## 🚀 Features

- 🏠 Bengaluru home price prediction
- 🤖 Machine Learning based price estimation
- 📍 Multiple Bengaluru locations
- 🔐 User registration and login
- 🔒 Session-based authentication
- 🔑 Password hashing
- 📊 Personal prediction history
- 👤 User profile
- 📖 About page
- 📱 Responsive frontend
- ⚡ REST API based backend

---

## 🛠️ Tech Stack

### Frontend

- HTML5
- CSS3
- JavaScript

### Backend

- Python
- Flask
- Flask-CORS

### Machine Learning

- NumPy
- Scikit-learn
- Linear Regression

### Database

- SQLite

---

## 📁 Project Structure

```text
bengaluru-home-price-predictor/
│
├── frontend/
│   ├── home.html
│   ├── home.css
│   ├── home.js
│   │
│   ├── index.html
│   ├── index.css
│   │
│   ├── signup.html
│   │
│   ├── dashboard.html
│   ├── dashboard.css
│   ├── dashboard.js
│   │
│   ├── history.html
│   ├── history.css
│   ├── history.js
│   │
│   ├── profile.html
│   ├── profile.css
│   ├── profile.js
│   │
│   ├── about.html
│   ├── about.css
│   ├── about.js
│   │
│   ├── bg.svg
│   │
│   └── js/
│       ├── auth.js
│       └── signup.js
│
├── model/
│
├── server/
│   ├── artifacts/
│   ├── database.py
│   ├── requirement.txt
│   ├── server.py
│   └── util.py
│
├── .gitignore
└── README.md