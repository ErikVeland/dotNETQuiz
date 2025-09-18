using backend.Models;
using backend.Controllers;
using backend.Services;
using System.Text.Json;
using System.IO;
using System.Collections.Generic;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy => policy.WithOrigins(
                "http://localhost:3000",
                "https://fullstackacademy.onrender.com",
                "https://fullstack-academy.onrender.com")
                        .AllowAnyHeader()
                        .AllowAnyMethod()
                        .AllowCredentials());
});

// Add authorization services
builder.Services.AddAuthorization();

// Removed REST controllers and Swagger in favor of GraphQL

// Enhanced GraphQL server configuration
builder.Services.AddGraphQLServer()
    .AddQueryType<Query>()
    .AddMutationType<Mutation>()
    .AddType<backend.GraphQL.LessonType>()
    .AddType<backend.GraphQL.InterviewQuestionType>()
    .AddType<backend.GraphQL.AnswerResultType>()
    .AddType<backend.GraphQL.ProgressResultType>()
    .AddType<backend.GraphQL.LaravelLessonType>()
    .AddType<backend.GraphQL.LaravelInterviewQuestionType>()
    // React GraphQL types
    .AddType<backend.GraphQL.ReactLessonType>()
    .AddType<backend.GraphQL.ReactInterviewQuestionType>()
    // Tailwind GraphQL types
    .AddType<backend.GraphQL.TailwindLessonType>()
    .AddType<backend.GraphQL.TailwindInterviewQuestionType>()
    // Node.js GraphQL types
    .AddType<backend.GraphQL.NodeLessonType>()
    .AddType<backend.GraphQL.NodeInterviewQuestionType>()
    // SASS GraphQL types
    .AddType<backend.GraphQL.SassLessonType>()
    .AddType<backend.GraphQL.SassInterviewQuestionType>()
    .ModifyRequestOptions(opt => opt.IncludeExceptionDetails = true);

var app = builder.Build();

app.UseHttpsRedirection();
app.UseCors("AllowFrontend");
app.UseAuthorization();
// Removed REST controller mapping
app.MapGraphQL("/api"); // Map GraphQL to /api for backward compatibility
app.MapGraphQL("/graphql"); // Keep original GraphQL endpoint

// Configure Banana Cake Pop with a default query
app.MapBananaCakePop("/graphql-ui");

// Health check endpoint
app.MapGet("/api/health", () => Results.Ok(new { status = "healthy", timestamp = DateTime.UtcNow }));

app.Run();

// Configure JSON serializer options for camelCase to PascalCase conversion
public static class JsonSerializerOptionsConfig
{
    public static readonly JsonSerializerOptions Options = new JsonSerializerOptions
    {
        PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
        PropertyNameCaseInsensitive = true
    };
}

// GraphQL Query type using DataService
public class Query {
    private readonly backend.Services.DataService _dataService = backend.Services.DataService.Instance;

    public IEnumerable<Lesson> DotNetLessons(string? topic = null, string? sortBy = null, string? sortOrder = null, int? limit = null, int? offset = null)
        => backend.Services.DataService.ApplyQuery(_dataService.DotNetLessons, topic, sortBy, sortOrder, limit, offset);
    
    public IEnumerable<Lesson> NextJsLessons(string? topic = null, string? sortBy = null, string? sortOrder = null, int? limit = null, int? offset = null)
        => backend.Services.DataService.ApplyQuery(_dataService.NextJsLessons, topic, sortBy, sortOrder, limit, offset);
    
    public IEnumerable<Lesson> GraphQLLessons(string? topic = null, string? sortBy = null, string? sortOrder = null, int? limit = null, int? offset = null)
        => backend.Services.DataService.ApplyQuery(_dataService.GraphQLLessons, topic, sortBy, sortOrder, limit, offset);
    
    public IEnumerable<InterviewQuestion> DotNetInterviewQuestions(string? topic = null, string? sortBy = null, string? sortOrder = null, int? limit = null, int? offset = null)
        => backend.Services.DataService.ApplyQuery(_dataService.DotNetInterviewQuestions, topic, sortBy, sortOrder, limit, offset);
    
    public IEnumerable<InterviewQuestion> NextJsInterviewQuestions(string? topic = null, string? sortBy = null, string? sortOrder = null, int? limit = null, int? offset = null)
        => backend.Services.DataService.ApplyQuery(_dataService.NextJsInterviewQuestions, topic, sortBy, sortOrder, limit, offset);
    
    public IEnumerable<InterviewQuestion> GraphQLInterviewQuestions(string? topic = null, string? sortBy = null, string? sortOrder = null, int? limit = null, int? offset = null)
        => backend.Services.DataService.ApplyQuery(_dataService.GraphQLInterviewQuestions, topic, sortBy, sortOrder, limit, offset);
    
    // Laravel content queries - loading from JSON files
    public IEnumerable<LaravelLesson> LaravelLessons(string? topic = null, string? sortBy = null, string? sortOrder = null, int? limit = null, int? offset = null)
    {
        // Load Laravel lessons from JSON file
        var jsonPath = System.IO.Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "Data", "laravel_lessons.json");
        if (!File.Exists(jsonPath))
        {
            // Return empty collection if file not found
            return new List<LaravelLesson>();
        }

        var jsonContent = File.ReadAllText(jsonPath);
        var lessons = System.Text.Json.JsonSerializer.Deserialize<List<LaravelLesson>>(jsonContent, JsonSerializerOptionsConfig.Options);
        
        return backend.Services.DataService.ApplyQuery(lessons ?? new List<LaravelLesson>(), topic, sortBy, sortOrder, limit, offset);
    }
    
    public IEnumerable<LaravelInterviewQuestion> LaravelInterviewQuestions(string? topic = null, string? sortBy = null, string? sortOrder = null, int? limit = null, int? offset = null)
    {
        // Load Laravel interview questions from JSON file
        var jsonPath = System.IO.Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "Data", "laravel_questions.json");
        if (!File.Exists(jsonPath))
        {
            // Return empty collection if file not found
            return new List<LaravelInterviewQuestion>();
        }

        var jsonContent = File.ReadAllText(jsonPath);
        var questions = System.Text.Json.JsonSerializer.Deserialize<List<LaravelInterviewQuestion>>(jsonContent, JsonSerializerOptionsConfig.Options);
        
        return backend.Services.DataService.ApplyQuery(questions ?? new List<LaravelInterviewQuestion>(), topic, sortBy, sortOrder, limit, offset);
    }
    
    // React content queries
    public IEnumerable<ReactLesson> ReactLessons(string? topic = null, string? sortBy = null, string? sortOrder = null, int? limit = null, int? offset = null)
    {
        // Load React lessons from JSON file
        var jsonPath = System.IO.Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "Data", "react_lessons.json");
        if (!File.Exists(jsonPath))
        {
            // Return empty collection if file not found
            return new List<ReactLesson>();
        }

        var jsonContent = File.ReadAllText(jsonPath);
        var lessons = System.Text.Json.JsonSerializer.Deserialize<List<ReactLesson>>(jsonContent, JsonSerializerOptionsConfig.Options);
        
        return backend.Services.DataService.ApplyQuery(lessons ?? new List<ReactLesson>(), topic, sortBy, sortOrder, limit, offset);
    }
    
    public IEnumerable<ReactInterviewQuestion> ReactInterviewQuestions(string? topic = null, string? sortBy = null, string? sortOrder = null, int? limit = null, int? offset = null)
    {
        // Load React interview questions from JSON file
        var jsonPath = System.IO.Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "Data", "react_questions.json");
        if (!File.Exists(jsonPath))
        {
            // Return empty collection if file not found
            return new List<ReactInterviewQuestion>();
        }

        var jsonContent = File.ReadAllText(jsonPath);
        var questions = System.Text.Json.JsonSerializer.Deserialize<List<ReactInterviewQuestion>>(jsonContent, JsonSerializerOptionsConfig.Options);
        
        return backend.Services.DataService.ApplyQuery(questions ?? new List<ReactInterviewQuestion>(), topic, sortBy, sortOrder, limit, offset);
    }
    
    // Tailwind content queries
    public IEnumerable<TailwindLesson> TailwindLessons(string? topic = null, string? sortBy = null, string? sortOrder = null, int? limit = null, int? offset = null)
    {
        // Load Tailwind lessons from JSON file
        var jsonPath = System.IO.Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "Data", "tailwind_lessons.json");
        if (!File.Exists(jsonPath))
        {
            // Return empty collection if file not found
            return new List<TailwindLesson>();
        }

        var jsonContent = File.ReadAllText(jsonPath);
        var lessons = System.Text.Json.JsonSerializer.Deserialize<List<TailwindLesson>>(jsonContent, JsonSerializerOptionsConfig.Options);
        
        return backend.Services.DataService.ApplyQuery(lessons ?? new List<TailwindLesson>(), topic, sortBy, sortOrder, limit, offset);
    }
    
    public IEnumerable<TailwindInterviewQuestion> TailwindInterviewQuestions(string? topic = null, string? sortBy = null, string? sortOrder = null, int? limit = null, int? offset = null)
    {
        // Load Tailwind interview questions from JSON file
        var jsonPath = System.IO.Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "Data", "tailwind_questions.json");
        if (!File.Exists(jsonPath))
        {
            // Return empty collection if file not found
            return new List<TailwindInterviewQuestion>();
        }

        var jsonContent = File.ReadAllText(jsonPath);
        var questions = System.Text.Json.JsonSerializer.Deserialize<List<TailwindInterviewQuestion>>(jsonContent, JsonSerializerOptionsConfig.Options);
        
        return backend.Services.DataService.ApplyQuery(questions ?? new List<TailwindInterviewQuestion>(), topic, sortBy, sortOrder, limit, offset);
    }
    
    // Node.js content queries
    public IEnumerable<NodeLesson> NodeLessons(string? topic = null, string? sortBy = null, string? sortOrder = null, int? limit = null, int? offset = null)
    {
        // Load Node lessons from JSON file
        var jsonPath = System.IO.Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "Data", "node_lessons.json");
        if (!File.Exists(jsonPath))
        {
            // Return empty collection if file not found
            return new List<NodeLesson>();
        }

        var jsonContent = File.ReadAllText(jsonPath);
        var lessons = System.Text.Json.JsonSerializer.Deserialize<List<NodeLesson>>(jsonContent, JsonSerializerOptionsConfig.Options);
        
        return backend.Services.DataService.ApplyQuery(lessons ?? new List<NodeLesson>(), topic, sortBy, sortOrder, limit, offset);
    }
    
    public IEnumerable<NodeInterviewQuestion> NodeInterviewQuestions(string? topic = null, string? sortBy = null, string? sortOrder = null, int? limit = null, int? offset = null)
    {
        // Load Node interview questions from JSON file
        var jsonPath = System.IO.Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "Data", "node_questions.json");
        if (!File.Exists(jsonPath))
        {
            // Return empty collection if file not found
            return new List<NodeInterviewQuestion>();
        }

        var jsonContent = File.ReadAllText(jsonPath);
        var questions = System.Text.Json.JsonSerializer.Deserialize<List<NodeInterviewQuestion>>(jsonContent, JsonSerializerOptionsConfig.Options);
        
        return backend.Services.DataService.ApplyQuery(questions ?? new List<NodeInterviewQuestion>(), topic, sortBy, sortOrder, limit, offset);
    }
    
    // SASS content queries
    public IEnumerable<SassLesson> SassLessons(string? topic = null, string? sortBy = null, string? sortOrder = null, int? limit = null, int? offset = null)
    {
        // Load SASS lessons from JSON file
        var jsonPath = System.IO.Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "Data", "sass_lessons.json");
        if (!File.Exists(jsonPath))
        {
            // Return empty collection if file not found
            return new List<SassLesson>();
        }

        var jsonContent = File.ReadAllText(jsonPath);
        var lessons = System.Text.Json.JsonSerializer.Deserialize<List<SassLesson>>(jsonContent, JsonSerializerOptionsConfig.Options);
        
        return backend.Services.DataService.ApplyQuery(lessons ?? new List<SassLesson>(), topic, sortBy, sortOrder, limit, offset);
    }
    
    public IEnumerable<SassInterviewQuestion> SassInterviewQuestions(string? topic = null, string? sortBy = null, string? sortOrder = null, int? limit = null, int? offset = null)
    {
        // Load SASS interview questions from JSON file
        var jsonPath = System.IO.Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "Data", "sass_questions.json");
        if (!File.Exists(jsonPath))
        {
            // Return empty collection if file not found
            return new List<SassInterviewQuestion>();
        }

        var jsonContent = File.ReadAllText(jsonPath);
        var questions = System.Text.Json.JsonSerializer.Deserialize<List<SassInterviewQuestion>>(jsonContent, JsonSerializerOptionsConfig.Options);
        
        return backend.Services.DataService.ApplyQuery(questions ?? new List<SassInterviewQuestion>(), topic, sortBy, sortOrder, limit, offset);
    }
}

public class Mutation {
    private readonly backend.Services.DataService _dataService = backend.Services.DataService.Instance;

    public AnswerResult SubmitAnswer(int questionId, int answerIndex)
    {
        return _dataService.ValidateAnswer(questionId, answerIndex);
    }

    public ProgressResult TrackProgress(int userId, int lessonId, string module)
    {
        return _dataService.TrackProgress(userId, lessonId, module);
    }
    
    // Laravel answer submission - using DataService validation
    public AnswerResult SubmitLaravelAnswer(int questionId, int answerIndex)
    {
        return _dataService.ValidateLaravelAnswer(questionId, answerIndex);
    }
    
    // React answer submission
    public AnswerResult SubmitReactAnswer(int questionId, int answerIndex)
    {
        return _dataService.ValidateReactAnswer(questionId, answerIndex);
    }
    
    // Tailwind answer submission
    public AnswerResult SubmitTailwindAnswer(int questionId, int answerIndex)
    {
        return _dataService.ValidateTailwindAnswer(questionId, answerIndex);
    }
    
    // Node.js answer submission
    public AnswerResult SubmitNodeAnswer(int questionId, int answerIndex)
    {
        return _dataService.ValidateNodeAnswer(questionId, answerIndex);
    }
    
    // SASS answer submission
    public AnswerResult SubmitSassAnswer(int questionId, int answerIndex)
    {
        return _dataService.ValidateSassAnswer(questionId, answerIndex);
    }
}