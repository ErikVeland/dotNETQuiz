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
        policy => policy.WithOrigins("http://localhost:3000", "http://localhost:3001", "http://localhost:3002")
                        .AllowAnyHeader()
                        .AllowAnyMethod());
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

app.Run();

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
        var lessons = System.Text.Json.JsonSerializer.Deserialize<List<LaravelLesson>>(jsonContent);
        
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
        var questions = System.Text.Json.JsonSerializer.Deserialize<List<LaravelInterviewQuestion>>(jsonContent);
        
        return backend.Services.DataService.ApplyQuery(questions ?? new List<LaravelInterviewQuestion>(), topic, sortBy, sortOrder, limit, offset);
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
}