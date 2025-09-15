# Shared Data Structure

This document defines the consistent data structures used across all modules in the Fullstack Academy platform.

## Lesson Structure

All lessons across modules follow this structure:

```json
{
  "id": 1,
  "topic": "String",
  "title": "String",
  "description": "String",
  "content": "String",
  "codeExample": "String",
  "output": "String",
  "difficulty": "String" // Beginner, Intermediate, or Advanced
}
```

## Question Structure

All quiz questions across modules follow this structure:

```json
{
  "id": 1,
  "topic": "String",
  "type": "String", // multiple-choice, true-false, coding, etc.
  "question": "String",
  "choices": [
    "String",
    "String",
    "String",
    "String"
  ],
  "correctAnswer": 0, // Index of correct choice for multiple-choice
  "explanation": "String"
}
```

## Implementation Guidelines

1. All modules must use these exact field names and data types
2. The `difficulty` field must only use the values: "Beginner", "Intermediate", or "Advanced"
3. The `type` field in questions should be consistent across modules
4. IDs should be unique integers within each data file
5. Topic names should be consistent across modules when referring to the same concept

## Benefits

1. Consistent API responses across all modules
2. Easier data migration and synchronization
3. Simplified progress tracking across modules
4. Uniform data validation rules
5. Easier testing and debugging