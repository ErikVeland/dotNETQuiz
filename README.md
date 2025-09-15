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
┌─────────────────┐    GraphQL API    ┌────────────────────┐
│   Next.js       │ ◄───────────────► │  ASP.NET Core      │
│   Frontend      │                   │  Web API (.NET)    │
│                 │                   │                    │
│ ┌─────────────┐ │                   │ ┌────────────────┐ │
│ │   React     │ │                   │ │ GraphQL        │ │
│ │ Components  │ │                   │ │ (HotChocolate) │ │
│ └─────────────┘ │                   │ └────────────────┘ │
│                 │                   │                    │
│ ┌─────────────┐ │                   │ ┌────────────────┐ │
│ │ Apollo      │ │                   │ │ Data Models    │ │
│ │ Client      │ │                   │ │ & Services     │ │
│ └─────────────┘ │                   │ └────────────────┘ │
└─────────────────┘                   └────────────────────┘
```

## Directory Structure

```
dotNetQuiz/
├── dot-net-quiz/
│   ├── backend/
│   │   ├── Controllers/
│   │   ├── Data/ (JSON files with Laravel content)
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
├── laravel-backend/ (complete Laravel application structure)
└── README.md
```

## Laravel Modules Implementation

The application features a real, structured Laravel integration with:

1. **Standalone Laravel Backend**: A complete Laravel application structure with models, controllers, and routes
2. **GraphQL Integration**: Laravel content is seamlessly integrated into the .NET GraphQL API
3. **Data Synchronization**: Laravel content is stored as JSON files in the .NET backend but maintains the Laravel data structure

### Laravel Content Structure

#### Laravel Lessons
- Routing fundamentals (Basic Routing, Route Parameters)
- Eloquent ORM basics (Introduction to Eloquent, Querying Models)
- Blade templating (Blade Basics, Blade Control Structures)
- Middleware (Creating Middleware, Registering Middleware)
- Database (Migrations, Seeding Data)
- Authentication (Laravel Breeze, API Authentication)

#### Laravel Interview Questions
- 35 professional multiple-choice and open-ended questions covering core Laravel concepts
- Topics include Routing, Eloquent ORM, Blade Templates, Database, Authentication, Middleware, Queues, Caching, Testing, and more

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
