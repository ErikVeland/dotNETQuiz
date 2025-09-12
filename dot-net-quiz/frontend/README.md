# Frontend for Fullstack Academy

This is the Next.js frontend for Fullstack Academy that provides a user interface for learning and interview preparation in .NET, Next.js, GraphQL, and Laravel.

## Features

- Responsive design with Tailwind CSS
- GraphQL integration with Apollo Client
- Step-by-step lessons with code examples
- Interactive interview quizzes
- Progress tracking
- Dedicated sections for all four learning modules
- Wider layout to accommodate four modules better

## Technology Stack

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- Apollo Client for GraphQL

## Directory Structure

```
src/
├── app/
│   ├── graphql/
│   ├── interview/
│   ├── lessons/
│   ├── nextjs/
│   ├── laravel/
│   │   ├── lessons/
│   │   └── interview/
│   └── page.tsx
├── components/
└── apolloClient.ts
```

## Laravel Modules

The frontend includes dedicated sections for Laravel content:

### Laravel Lessons
Located in `src/app/laravel/lessons/page.tsx`
- Displays Laravel lessons in a topic-based structure
- Interactive lesson viewer with code examples
- Navigation between lessons

### Laravel Interview
Located in `src/app/laravel/interview/page.tsx`
- Interactive quiz interface for Laravel questions
- Multiple-choice question format
- Immediate feedback with explanations

## Setup Instructions

1. Install Node.js 18+
2. Navigate to the frontend directory
3. Run `npm install` to install dependencies
4. Run `npm run dev` to start the development server

The frontend will start on `http://localhost:3000`

## GraphQL Integration

The frontend uses Apollo Client to communicate with the backend GraphQL API.

### Configuration
- Apollo Client configuration in `src/apolloClient.ts`
- GraphQL queries and mutations in page components

### Queries Used
- `dotNetLessons`, `nextJsLessons`, `graphQLLessons`, `laravelLessons`
- `dotNetInterviewQuestions`, `nextJsInterviewQuestions`, `graphQLInterviewQuestions`, `laravelInterviewQuestions`

### Mutations Used
- `submitAnswer` - Submit answers for questions
- `submitLaravelAnswer` - Submit answers for Laravel questions
- `trackProgress` - Track user progress

## Styling

The application uses Tailwind CSS for styling with a consistent color scheme:
- Blue: .NET content
- Purple: Next.js content
- Pink: GraphQL content
- Red: Laravel content

## Development

### Adding New Pages

To add new pages:
1. Create a new directory in `src/app/`
2. Add a `page.tsx` file with the page content
3. Use Apollo Client hooks for data fetching

### Modifying Styles

To modify styles:
1. Use Tailwind CSS classes in component files
2. For custom styles, modify `src/app/globals.css`

## Testing

To test the application:
1. Start the backend server
2. Start the frontend development server
3. Navigate to `http://localhost:3000`
4. Test all modules including the new Laravel sections

### Testing Laravel Modules

1. Navigate to `/laravel/lessons` to view Laravel lessons
2. Navigate to `/laravel/interview` to take Laravel quizzes
3. Verify that content loads correctly
4. Test quiz functionality with answer submission