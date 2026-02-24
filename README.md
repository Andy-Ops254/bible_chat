#  Bible App

A full-stack Bible application that provides daily scripture readings and emotion-based spiritual encouragement through an interactive chatbot.

Built with React, Flask, and PostgreSQL.

---

##  Overview

Bible App allows users to:

- Register and securely log in
- Receive a dynamically generated Daily Bible Reading
- Chat with an emotion-aware bot that responds with:
  - A relevant scripture (NKJV)
  - A comforting message based on detected emotion

All Bible data is hosted locally and served from a PostgreSQL database for performance and reliability.

---

##  Tech Stack

### Frontend
- React
- JavaScript
- CSS (modal backdrop blur & scroll lock functionality)

### Backend
- Python
- Flask
- RESTful API architecture

### Database
- PostgreSQL

---

##  Authentication

- Secure user registration
- Login system
- Protected routes (Daily Reading page accessible only after login)
- Modal-based authentication UI:
  - Background blur
  - Scroll lock
  - Event propagation control

---

##  Daily Reading System

### Bible Data
- Seeded from `bible.api`
- New King James Version (NKJV)
- Books, chapters, and verses stored locally in PostgreSQL

### Daily Verse Algorithm

1. January 1st (hardcoded base date) is used as a reference point.
2. The system calculates:
   - Days elapsed from January 1st to today.
3. The total is modulo-divided (%) by the total number of verses.
4. The resulting index determines the verse of the day.
5. Chapters and verses tables are joined to return a complete scripture response.

This ensures:
- A new verse every day
- Automatic cycling once all verses are exhausted

---

##  Emotion-Based Chatbot

The chatbot provides scripture-based encouragement depending on how a user feels.

### How It Works

- `emotion_verses.py` contains:
  - Emotion categories
  - Associated scripture references
- When a user submits text:
  1. The system detects emotional keywords.
  2. It matches them to predefined emotion objects.
  3. If matches exist, a verse is selected using `random.choice()`.
  4. A scripture and comfort message are returned.
  5. The interaction is logged in the database.

### Emotion Log Stored

Each log includes:
- Detected emotion
- Scripture reference
- Full verse text
- Timestamp
- Auto-generated ID

---

##  Project Structure (Example)

```
/backend
    app.py
    models.py
    emotion_verses.py
    requirements.txt

/frontend
    /src
    package.json
```

---

##  Local Development Setup

### 1️ Clone Repository

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

---

##  Backend Setup (Flask)

### Create Virtual Environment

```bash
python -m venv venv
```

Activate:

**Windows**
```bash
venv\Scripts\activate
```

**Mac/Linux**
```bash
source venv/bin/activate
```

### Install Dependencies

```bash
pip install -r requirements.txt
```

### Configure Database

1. Create a PostgreSQL database.
2. Update your database URI in the Flask configuration.

Example:

```python
SQLALCHEMY_DATABASE_URI = "postgresql+psycopg2://postgres:Rimoney@localhost:5432/bible_chat"
```

### Run Migrations / Seed Database (if applicable)

Seed Bible data before starting the server.

### Start Server

```bash
python3 app.py
```

Backend runs on:
```
http://127.0.0.1:5555
```

---

##  Frontend Setup (React)

Navigate to frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start development server:

```bash
npm start
```

Frontend runs on:
```
http://localhost:3000
```

---

##  Security & Design Considerations

- Backend-controlled verse fetching
- Emotion logging stored securely
- Scroll-lock modal behavior prevents UI misuse
- Clean separation of frontend and backend responsibilities
- Database normalization (books, chapters, verses separated)

---

##  License

MIT License

Copyright (c) 2026 Andrew R. Waruiru

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

---

##  Author

Andrew R. Waruiru  
Nairobi, Kenya  

---

