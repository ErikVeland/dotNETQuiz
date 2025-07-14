# dotNetQuiz

A fullstack learning and interview preparation platform for .NET, Next.js, and GraphQL.

## Overview

dotNetQuiz is an educational web app that helps you master .NET, Next.js, and GraphQL through step-by-step lessons and realistic interview quizzes. It is designed for developers preparing for technical interviews or seeking to deepen their understanding of these technologies.

---

## Features

- **.NET, Next.js, and GraphQL Tracks**: Each with comprehensive lessons and interview quizzes.
- **Step-by-Step Lessons**: 20–30+ lessons per track, each with explanations, code examples, and outputs.
- **Interview Quizzes**: 30–40 questions per track, mixing multiple-choice and open-ended, with instant feedback and explanations.
- **Modern UI**: Built with Next.js, React, and Tailwind CSS.
- **Progress Tracking**: Quiz progress is saved in local storage.
- **Gamification**: Earn certificates for high scores.

---

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **Backend**: ASP.NET Core 9 Web API (C#)
- **API**: RESTful endpoints for lessons and interview questions

---

## Project Structure

```
dotNetQuiz/
  dot-net-quiz/
    backend/         # ASP.NET Core Web API
      Controllers/   # API controllers for .NET, Next.js, GraphQL
      ...
    frontend/        # Next.js frontend app
      src/app/       # App directory with pages for each module
      ...
```

---

## Getting Started

### Prerequisites
- [.NET 9 SDK](https://dotnet.microsoft.com/en-us/download/dotnet/9.0)
- [Node.js 18+](https://nodejs.org/)

### Backend Setup
```bash
cd dot-net-quiz/backend
# Restore dependencies
 dotnet restore
# Run the API (default: http://localhost:5022)
 dotnet run
```

### Frontend Setup
```bash
cd dot-net-quiz/frontend
# Install dependencies
npm install
# Start the Next.js dev server (default: http://localhost:3000)
npm run dev
```

> The frontend expects the backend API to be running at `http://localhost:5022` by default. You can change this with the `NEXT_PUBLIC_API_BASE` environment variable.

---

## API Overview

- **.NET**
  - `GET /api/lessons` — All .NET lessons
  - `GET /api/interviewquestions` — All .NET interview questions
  - `POST /api/interviewquestions/submit` — Submit an answer
- **Next.js**
  - `GET /api/nextjs/lessons` — All Next.js lessons
  - `GET /api/nextjs/interviewquestions` — All Next.js interview questions
  - `POST /api/nextjs/interviewquestions/submit` — Submit an answer
- **GraphQL**
  - `GET /api/graphql/lessons` — All GraphQL lessons
  - `GET /api/graphql/interviewquestions` — All GraphQL interview questions
  - `POST /api/graphql/interviewquestions/submit` — Submit an answer

---

## Contributing

Contributions are welcome! To add new lessons, questions, or features:
1. Fork the repo and create a new branch.
2. Make your changes (see `backend/Controllers` for data, `frontend/src/app` for UI).
3. Submit a pull request with a clear description.

---

## License

MIT
