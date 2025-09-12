# Laravel Backend for Fullstack Academy

This is the Laravel backend module for Fullstack Academy that provides RESTful API endpoints for Laravel-specific content.

**Note**: Due to environment constraints, this Laravel backend is simulated within the .NET application rather than running as a separate service. The actual Laravel content is served directly from the .NET backend as mock data.

## Features

- RESTful API for Laravel lessons and interview questions (simulated)
- SQLite database structure definition (migrations)
- Eloquent ORM model definitions
- API rate limiting
- JSON response format

## API Endpoints

These endpoints are simulated in the .NET backend and not actually served by this Laravel application:

### Lessons
- `GET /api/laravel/lessons` - List all Laravel lessons
- `GET /api/laravel/lessons/{id}` - Get a specific Laravel lesson

### Interview Questions
- `GET /api/laravel/questions` - List all Laravel interview questions
- `GET /api/laravel/questions/{id}` - Get a specific Laravel interview question
- `POST /api/laravel/questions/{id}/answer` - Submit an answer to a question

### Progress Tracking
- `POST /api/laravel/progress` - Track user progress

## Setup Instructions

In a typical environment with PHP and Laravel installed, you would:

1. Install PHP 8.2+ and Composer
2. Run `composer install` to install dependencies
3. Copy `.env.example` to `.env` and configure your database
4. Run `php artisan key:generate` to generate an application key
5. Run `php artisan migrate` to create database tables
6. Run `php artisan serve` to start the development server

However, in this implementation, the Laravel functionality is simulated in the .NET backend.

## Database Schema

### Laravel Lessons
- id (integer, primary key)
- topic (string, nullable)
- title (string)
- description (text)
- code_example (text) - *Note: This field is named codeExample in the GraphQL API*
- output (text)
- timestamps (created_at, updated_at)

### Laravel Interview Questions
- id (integer, primary key)
- topic (string, nullable)
- type (string, nullable)
- question (text, nullable)
- choices (json, nullable)
- correct_answer (integer, nullable) - *Note: This field is named correctAnswer in the GraphQL API*
- explanation (text, nullable)
- timestamps (created_at, updated_at)

## Implementation Details

Since the development environment did not have PHP/Laravel available, the Laravel functionality was implemented as follows:

1. **Models**: Created Eloquent-like model definitions in the Laravel structure
2. **Migrations**: Defined database schema using Laravel migration format
3. **Controllers**: Created controller skeletons for API endpoints
4. **Routes**: Defined API routes using Laravel routing conventions
5. **Actual Implementation**: All Laravel content is served by the .NET backend as mock data through GraphQL

This approach maintains the architectural integrity of having separate modules while working within the constraints of the available environment.