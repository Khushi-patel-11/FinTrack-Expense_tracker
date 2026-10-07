# FinTrack - Expense Tracker

A full-stack Expense Tracker web application built with Django (backend) and React (frontend).

## Features

- User authentication and secure login
- Add, edit, and delete expenses with categories
- Monthly and category-wise budget tracking
- Pie chart and trend chart visualizations
- Savings and overspending insights
- Predict next month's expenses
- Responsive dashboard with light and dark mode support

## Tech Stack

- **Frontend:** React, Tailwind CSS
- **Backend:** Django, Django REST Framework
- **Database:** SQLite 
- **Visualization:** Chart.js (via React wrappers)


## Getting Started

### Prerequisites

- Node.js & npm
- Python 3.9+
- pip

### Backend Setup

1. Navigate to the backend folder:
   ```sh
   cd ex_backend
   ```
2. Install dependencies:
   ```sh
   pip install -r requirements.txt
   ```
3. Set up environment variables (create a `.env` file for secrets like email credentials).
4. Run migrations:
   ```sh
   python manage.py migrate
   ```
5. Start the server:
   ```sh
   python manage.py runserver
   ```

### Frontend Setup

1. Navigate to the frontend folder:
   ```sh
   cd ex_frontend/receipt-insight-frontend-main
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the React app:
   ```sh
   npm run dev
   ```

### Usage

- Register or log in.
- Add expenses manually or via receipt upload.
- View charts and savings insights on the dashboard.
- Set monthly/category budgets.

## Folder Structure

```
expense_tracker/
├── ex_backend/           # Django backend
│   ├── ex_django/        # Django project settings
│   └── expenses/         # Expense app
├── ex_frontend/
│   └── receipt-insight-frontend-main/  # React frontend
```

## Security & Privacy

- Sensitive files (models, credentials, etc.) are excluded via `.gitignore`.




