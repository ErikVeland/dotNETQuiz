using backend.Models;
using backend.Controllers;
using System.Text.Json;

namespace backend.Services
{
    public class DataService
    {
        // Singleton instance to hold all data
        private static readonly DataService _instance = new DataService();
        public static DataService Instance => _instance;

        // Data collections
        public IEnumerable<Lesson> DotNetLessons => LessonsController.Lessons;
        public IEnumerable<Lesson> NextJsLessons => NextJsLessonsController.Lessons;
        public IEnumerable<Lesson> GraphQLLessons => GraphQLLessonsController.Lessons;
        public IEnumerable<InterviewQuestion> DotNetInterviewQuestions => InterviewQuestionsController.Questions;
        public IEnumerable<InterviewQuestion> NextJsInterviewQuestions => NextJsInterviewQuestionsController.Questions;
        public IEnumerable<InterviewQuestion> GraphQLInterviewQuestions => GraphQLInterviewQuestionsController.Questions;

        // Helper methods
        public static IEnumerable<T> ApplyQuery<T>(IEnumerable<T> items, string? topic, string? sortBy, string? sortOrder, int? limit, int? offset)
        {
            var query = items;
            if (!string.IsNullOrEmpty(topic))
            {
                var prop = typeof(T).GetProperty("Topic");
                if (prop != null)
                    query = query.Where(x => (prop.GetValue(x)?.ToString() ?? "").Equals(topic, StringComparison.OrdinalIgnoreCase));
            }
            if (!string.IsNullOrEmpty(sortBy))
            {
                var prop = typeof(T).GetProperty(sortBy);
                if (prop != null)
                {
                    query = (sortOrder?.ToLower() == "desc")
                        ? query.OrderByDescending(x => prop.GetValue(x))
                        : query.OrderBy(x => prop.GetValue(x));
                }
            }
            if (offset.HasValue) query = query.Skip(offset.Value);
            if (limit.HasValue) query = query.Take(limit.Value);
            return query;
        }

        // Answer validation
        public AnswerResult ValidateAnswer(int questionId, int answerIndex)
        {
            // Try to find the question in any collection
            var question = DotNetInterviewQuestions.FirstOrDefault(q => q.Id == questionId) ?? 
                           NextJsInterviewQuestions.FirstOrDefault(q => q.Id == questionId) ?? 
                           GraphQLInterviewQuestions.FirstOrDefault(q => q.Id == questionId);

            if (question == null)
                return new AnswerResult { IsCorrect = false, Explanation = "Question not found." };

            bool isCorrect = question.Type == "open-ended" || 
                            (question.CorrectAnswer.HasValue && answerIndex == question.CorrectAnswer.Value);

            return new AnswerResult
            {
                IsCorrect = isCorrect,
                Explanation = question.Explanation
            };
        }

        // Laravel answer validation
        public AnswerResult ValidateLaravelAnswer(int questionId, int answerIndex)
        {
            // Mock Laravel questions with correct answers
            var mockQuestions = new Dictionary<int, int>
            {
                { 1, 0 },  // Routing question
                { 2, 0 },  // Eloquent question
                { 3, 0 },  // Blade question
                { 4, 0 },  // Database question
                { 5, 0 },  // Authentication question
                { 6, 0 },  // Routing parameter question
                { 8, 0 },  // Blade null coalescing question
                { 10, 0 }, // Database migrate question
                { 11, 0 }, // Authentication package question
                { 13, 0 }, // Eloquent create question
                { 14, 0 }, // Blade include question
                { 15, 0 }, // Middleware registration question
                { 17, 0 }, // API authentication question
                { 18, 0 }, // POST route question
                { 19, 0 }, // Eloquent relationship question
                { 20, 0 }  // Blade section question
            };

            bool isCorrect = mockQuestions.ContainsKey(questionId) && mockQuestions[questionId] == answerIndex;
            
            // Provide specific explanations based on question ID
            string explanation = "This is a mock response for demonstration purposes.";
            switch (questionId)
            {
                case 1:
                    explanation = "In Laravel, Route::get() is used to define a GET route. This is the most common HTTP method for retrieving data.";
                    break;
                case 2:
                    explanation = "The all() method retrieves all records from the model's associated database table.";
                    break;
                case 3:
                    explanation = "The @extends directive is used to specify which layout the child view should inherit from.";
                    break;
                case 4:
                    explanation = "The php artisan make:migration command is used to create a new migration file in Laravel.";
                    break;
                case 5:
                    explanation = "The auth middleware is used to ensure that only authenticated users can access certain routes.";
                    break;
                case 6:
                    explanation = "In Laravel, curly braces {} are used to define route parameters.";
                    break;
                case 7:
                    explanation = "Eloquent ORM is Laravel's implementation of the Active Record pattern. It provides a beautiful, simple ActiveRecord implementation for working with your database. Each database table has a corresponding 'Model' which is used to interact with that table.";
                    break;
                case 8:
                    explanation = "The ?? operator in Blade is the null coalescing operator, which displays the default value if the variable is null.";
                    break;
                case 9:
                    explanation = "Middleware acts as a filter for HTTP requests entering your application. It can examine the request and decide whether to allow it to proceed or redirect the user somewhere else. Common uses include authentication, CSRF protection, and logging.";
                    break;
                case 10:
                    explanation = "The php artisan migrate command is used to run all outstanding migrations.";
                    break;
                case 11:
                    explanation = "Laravel Breeze is a simple, minimal implementation of Laravel's authentication features including login, registration, password reset, email verification, and password confirmation.";
                    break;
                case 12:
                    explanation = "Route model binding provides a convenient way to inject model instances into your routes. Laravel will automatically resolve Eloquent models defined in routes or controller methods whose type-hinted variable names match a route segment name.";
                    break;
                case 13:
                    explanation = "The create() method creates and saves a new model instance in a single operation. It requires the $fillable property to be set on the model.";
                    break;
                case 14:
                    explanation = "The @include directive is used to include another Blade view within the current view.";
                    break;
                case 15:
                    explanation = "Route middleware are registered in the $routeMiddleware property of the app/Http/Kernel.php file.";
                    break;
                case 16:
                    explanation = "Migrations are like version control for your database, allowing your team to define and share the application's database schema definition. They are typically paired with Laravel's schema builder to build your application's database schema.";
                    break;
                case 17:
                    explanation = "Laravel Sanctum provides a simple way to authenticate single page applications and mobile applications with Laravel. It provides a way to issue API tokens to users.";
                    break;
                case 18:
                    explanation = "Route::post() is used to define a POST route, typically used for creating resources.";
                    break;
                case 19:
                    explanation = "In Eloquent, relationships are defined as methods on your Eloquent model classes. These methods return instances of relationships like hasOne, hasMany, belongsTo, etc.";
                    break;
                case 20:
                    explanation = "The @section directive is used to define a section of content, while @yield is used to display that content in the layout.";
                    break;
                default:
                    explanation = "This is a mock response for demonstration purposes.";
                    break;
            }

            return new AnswerResult
            {
                IsCorrect = isCorrect,
                Explanation = explanation
            };
        }

        // Progress tracking
        public ProgressResult TrackProgress(int userId, int lessonId, string module)
        {
            // In-memory demo: just echo back the input
            return new ProgressResult { UserId = userId, LessonId = lessonId, Module = module, Status = "completed" };
        }
    }
}