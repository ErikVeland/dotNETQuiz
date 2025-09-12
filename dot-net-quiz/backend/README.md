# .NET Backend for Fullstack Academy

This is the .NET backend for Fullstack Academy that provides GraphQL API endpoints for all learning modules including .NET, Next.js, GraphQL, and Laravel.

## Features

- GraphQL API for all learning content (HotChocolate)
- In-memory data storage
- CORS configuration for frontend communication
- Banana Cake Pop GraphQL UI for development
- Simulated Laravel content (due to environment constraints)

## GraphQL Schema

The backend implements a GraphQL schema with the following types:

### Core Types
- Lesson
- InterviewQuestion
- AnswerResult
- ProgressResult

### Laravel Types
- LaravelLesson
- LaravelInterviewQuestion

## API Endpoints

### GraphQL Endpoints
- `/graphql` - Main GraphQL endpoint
- `/api` - GraphQL endpoint (backward compatibility)
- `/graphql-ui` - Banana Cake Pop GraphQL UI

### GraphQL Queries
- `dotNetLessons`, `nextJsLessons`, `graphQLLessons`, `laravelLessons`
- `dotNetInterviewQuestions`, `nextJsInterviewQuestions`, `graphQLInterviewQuestions`, `laravelInterviewQuestions`

### GraphQL Mutations
- `submitAnswer` - Submit answer for any question
- `submitLaravelAnswer` - Submit answer for Laravel questions
- `trackProgress` - Track user progress

## Laravel Implementation

Due to environment constraints (missing PHP/Laravel), the Laravel functionality is implemented as mock data directly in the .NET backend rather than as a separate Laravel service.

### Laravel Content
The backend provides mock data for:
- 5 Laravel lessons covering Routing, Eloquent ORM, and Blade Templates
- 5 Laravel interview questions covering core Laravel concepts

### Data Models
- `LaravelLesson` - Represents a Laravel learning lesson
- `LaravelInterviewQuestion` - Represents a Laravel interview question

## Setup Instructions

1. Install .NET 9 SDK
2. Navigate to the backend directory
3. Run `dotnet restore` to install dependencies
4. Run `dotnet run` to start the development server

The backend will start on `http://localhost:5022`

## Development

### Adding New Content

To add new content for any module:
1. Add new data to the appropriate collection in DataService or directly in the Query methods
2. Ensure the data matches the existing model structure

### Extending GraphQL Schema

To extend the GraphQL schema:
1. Create new types in the GraphQL directory
2. Register the types in Program.cs
3. Add new query or mutation methods in the Query or Mutation classes

## Testing GraphQL Endpoints

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