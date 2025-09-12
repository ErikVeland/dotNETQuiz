# Fullstack Academy - Fullstack Learning & Interview Trainer

## Project Overview

Fullstack Academy is a full-stack educational platform designed to help developers learn and prepare for interviews in .NET, Next.js, GraphQL, and Laravel. The application provides structured learning resources and realistic interview practice with instant feedback.

## Features

- **Learning Tracks**: Comprehensive lessons for .NET, Next.js, GraphQL, and Laravel
- **Step-by-Step Lessons**: Code examples with expected outputs
- **Interview Quizzes**: Multiple-choice and open-ended questions
- **Progress Tracking**: Local storage-based progress tracking
- **Gamification**: Certificate rewards for completed modules
- **Modern UI**: Built with Next.js, React, and Tailwind CSS
- **Responsive Design**: Adapts to different screen sizes with a wider layout for better module visibility

## Technology Stack

### Frontend
- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- Apollo Client for GraphQL integration

### Backend
- ASP.NET Core 9 Web API (C#)
- GraphQL API (HotChocolate)
- In-memory data storage

## System Architecture

The application follows a full-stack architecture with a Next.js frontend and ASP.NET Core Web API backend, communicating via a GraphQL API.

```
┌─────────────────┐    GraphQL API    ┌──────────────────┐
│   Next.js       │ ◄───────────────► │  ASP.NET Core    │
│   Frontend      │                   │  Web API (.NET)  │
│                 │                   │                  │
│ ┌─────────────┐ │                   │ ┌──────────────┐ │
│ │   React     │ │                   │ │ GraphQL      │ │
│ │ Components  │ │                   │ │ (HotChocolate)│ │
│ └─────────────┘ │                   │ └──────────────┘ │
│                 │                   │                  │
│ ┌─────────────┐ │                   │ ┌──────────────┐ │
│ │ Apollo      │ │                   │ │ Data Models  │ │
│ │ Client      │ │                   │ │ & Services   │ │
│ └─────────────┘ │                   │ └──────────────┘ │
└─────────────────┘                   └──────────────────┘
```

## Directory Structure

```
dotNetQuiz/
├── dot-net-quiz/
│   ├── backend/
│   │   ├── Controllers/
│   │   ├── GraphQL/
│   │   ├── Models/
│   │   ├── Services/
│   │   └── Program.cs
│   └── frontend/
│       ├── src/
│       │   ├── app/
│       │   │   ├── graphql/
│       │   │   ├── interview/
│       │   │   ├── lessons/
│       │   │   ├── nextjs/
│       │   │   ├── laravel/
│       │   │   └── page.tsx
│       │   ├── components/
│       │   └── apolloClient.ts
│       └── package.json
├── laravel-backend/ (simulated Laravel structure)
└── README.md
```

## Laravel Modules Implementation

Since the system environment did not have PHP/Laravel installed, a simulated approach was implemented:

1. **Backend Integration**: Laravel content is served directly from the .NET backend as mock data
2. **GraphQL Schema**: Added LaravelLesson and LaravelInterviewQuestion types to the GraphQL schema
3. **Frontend Components**: Created dedicated pages for Laravel lessons and interview questions

### Laravel Content Structure

#### Laravel Lessons
- Routing fundamentals
- Eloquent ORM basics
- Blade templating
- Database migrations
- Authentication concepts

#### Laravel Interview Questions
- Multiple-choice questions covering core Laravel concepts
- Topics include Routing, Eloquent ORM, Blade Templates, Database, and Authentication

## API Endpoints

All data is accessed through GraphQL queries and mutations:

### Queries
- `dotNetLessons`, `nextJsLessons`, `graphQLLessons`, `laravelLessons`
- `dotNetInterviewQuestions`, `nextJsInterviewQuestions`, `graphQLInterviewQuestions`, `laravelInterviewQuestions`

### Mutations
- `submitAnswer` (for all modules)
- `submitLaravelAnswer` (Laravel-specific)
- `trackProgress`

## Setup Instructions

### Prerequisites
- .NET 9 SDK
- Node.js 18+

### Backend Setup
```bash
cd dot-net-quiz/backend
dotnet restore
dotnet run
```

The backend will start on `http://localhost:5022`

### Frontend Setup
```bash
cd dot-net-quiz/frontend
npm install
npm run dev
```

The frontend will start on `http://localhost:3000`

## Development Workflow

1. **Backend Development**: Modify C# files in the backend directory
2. **Frontend Development**: Modify TypeScript/React files in the frontend directory
3. **GraphQL Schema**: Changes to the GraphQL schema require updates to both the backend types and frontend queries

## Deployment

### Frontend
```bash
npm run build
```

### Backend
```bash
dotnet publish
```

The application expects the backend API at `http://localhost:5022` by default (configurable via environment variables).

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a pull request

## License

This project is licensed under the MIT License.

## Troubleshooting

### Common Issues

1. **Port Conflicts**: If ports 5022 or 3000 are in use, the applications will automatically select available ports
2. **GraphQL Schema Errors**: Ensure all GraphQL types are properly registered in Program.cs
3. **CORS Issues**: CORS policies are configured for localhost development

### Testing GraphQL Endpoints

Test Laravel lessons query:
```bash
curl -X POST -H "Content-Type: application/json" -d '{"query":"{ laravelLessons { id title topic } }"}' http://localhost:5022/graphql
```

Test Laravel interview questions query:
```bash
curl -X POST -H "Content-Type: application/json" -d '{"query":"{ laravelInterviewQuestions { id question topic } }"}' http://localhost:5022/graphql
```

Test Laravel answer submission:
```bash
curl -X POST -H "Content-Type: application/json" -d '{"query":"mutation { submitLaravelAnswer(questionId: 1, answerIndex: 0) { isCorrect explanation } }"}' http://localhost:5022/graphql
```