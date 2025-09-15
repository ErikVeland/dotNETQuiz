# .NET Backend for Fullstack Academy

This is the .NET backend for Fullstack Academy that provides GraphQL API endpoints for all learning modules including .NET, Next.js, GraphQL, Laravel, React, Tailwind CSS, Node.js, and SASS. The backend integrates with a standalone Laravel application structure while serving content through GraphQL.

## Features

- GraphQL API for all learning content (HotChocolate)
- JSON-based data storage
- CORS configuration for frontend communication
- Banana Cake Pop GraphQL UI for development
- Real Laravel integration with standalone Laravel backend structure

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

### React Types
- ReactLesson
- ReactInterviewQuestion

### Tailwind CSS Types
- TailwindLesson
- TailwindInterviewQuestion

### Node.js Types
- NodeLesson
- NodeInterviewQuestion

### SASS Types
- SassLesson
- SassInterviewQuestion

## API Endpoints

### GraphQL Endpoints
- `/graphql` - Main GraphQL endpoint
- `/api` - GraphQL endpoint (backward compatibility)
- `/graphql-ui` - Banana Cake Pop GraphQL UI

### GraphQL Queries
- `dotNetLessons`, `nextJsLessons`, `graphQLLessons`, `laravelLessons`
- `reactLessons`, `tailwindLessons`, `nodeLessons`, `sassLessons`
- `dotNetInterviewQuestions`, `nextJsInterviewQuestions`, `graphQLInterviewQuestions`, `laravelInterviewQuestions`
- `reactInterviewQuestions`, `tailwindInterviewQuestions`, `nodeInterviewQuestions`, `sassInterviewQuestions`

### GraphQL Mutations
- `submitAnswer` - Submit answer for any question
- `submitLaravelAnswer` - Submit answer for Laravel questions
- `submitReactAnswer` - Submit answer for React questions
- `submitTailwindAnswer` - Submit answer for Tailwind questions
- `submitNodeAnswer` - Submit answer for Node.js questions
- `submitSassAnswer` - Submit answer for SASS questions
- `trackProgress` - Track user progress

## Backend Technologies Implementation

### .NET, Next.js, and GraphQL Modules
- Core modules with structured lessons and interview questions

### Laravel Implementation

The backend implements a sophisticated integration pattern where the .NET backend acts as a proxy and GraphQL gateway for the Laravel content while maintaining the actual Laravel application structure:

#### Integration Pattern
1. **Standalone Laravel Backend**: A complete Laravel application with models, controllers, and routes is maintained in the `laravel-backend` directory
2. **JSON Data Files**: The .NET backend stores Laravel content in JSON files (`laravel_lessons.json`, `laravel_questions.json`) that mirror the Laravel database structure
3. **GraphQL Types**: Custom GraphQL types are defined for Laravel content (`LaravelLessonType`, `LaravelInterviewQuestionType`)
4. **Query Resolvers**: GraphQL queries load data from JSON files and expose them through the unified API
5. **Mutation Resolvers**: Answer validation for Laravel questions is handled through a dedicated service

#### Laravel Content
The backend provides real, professional content for:
- 12 Laravel lessons covering Routing, Eloquent ORM, Blade Templates, Middleware, Database, and Authentication
- 35 Laravel interview questions covering core Laravel concepts and advanced topics

#### Data Models
- `LaravelLesson` - Represents a Laravel learning lesson with code examples
- `LaravelInterviewQuestion` - Represents a Laravel interview question with multiple choice or open-ended format

### React, Tailwind CSS, Node.js, and SASS Implementation

The backend also provides comprehensive content for modern frontend technologies:

#### React Content
- 5 React lessons covering Components, Hooks, and Context
- 8 React interview questions covering core React concepts

#### Tailwind CSS Content
Utility-first CSS framework for rapid UI development

#### Node.js Content
- 5 Node.js lessons covering Fundamentals, Express.js, and REST APIs
- 8 Node.js interview questions covering core Node.js concepts

#### SASS Content
CSS preprocessor with variables, nesting, and mixins

#### Data Models
- `ReactLesson`, `ReactInterviewQuestion` - Represents React learning content
- `TailwindLesson`, `TailwindInterviewQuestion` - Represents Tailwind CSS learning content
- `NodeLesson`, `NodeInterviewQuestion` - Represents Node.js learning content
- `SassLesson`, `SassInterviewQuestion` - Represents SASS learning content

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

Test React lessons query:
```bash
curl -X POST -H "Content-Type: application/json" -d '{"query":"{ reactLessons { id title topic } }"}' http://localhost:5022/graphql
```

Test Tailwind lessons query:
```bash
curl -X POST -H "Content-Type: application/json" -d '{"query":"{ tailwindLessons { id title topic } }"}' http://localhost:5022/graphql
```

Test Node.js lessons query:
```bash
curl -X POST -H "Content-Type: application/json" -d '{"query":"{ nodeLessons { id title topic } }"}' http://localhost:5022/graphql
```

Test SASS lessons query:
```bash
curl -X POST -H "Content-Type: application/json" -d '{"query":"{ sassLessons { id title topic } }"}' http://localhost:5022/graphql
```

Test Laravel answer submission:
```bash
curl -X POST -H "Content-Type: application/json" -d '{"query":"mutation { submitLaravelAnswer(questionId: 1, answerIndex: 0) { isCorrect explanation } }"}' http://localhost:5022/graphql
```

Test React answer submission:
```bash
curl -X POST -H "Content-Type: application/json" -d '{"query":"mutation { submitReactAnswer(questionId: 1, answerIndex: 0) { isCorrect explanation } }"}' http://localhost:5022/graphql
```