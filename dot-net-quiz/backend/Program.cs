using backend.Models;
using backend.Controllers;
using backend.Services;
using System.Text.Json;

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
    
    // Laravel content queries - using mock data instead of external API
    public IEnumerable<LaravelLesson> LaravelLessons(string? topic = null, string? sortBy = null, string? sortOrder = null, int? limit = null, int? offset = null)
    {
        // Mock Laravel lessons data
        var mockLessons = new List<LaravelLesson>
        {
            new LaravelLesson
            {
                Id = 1,
                Topic = "Routing",
                Title = "Basic Routing in Laravel",
                Description = "Learn how to define routes in Laravel applications.",
                CodeExample = "<?php\n// routes/web.php\n\nuse Illuminate\\Support\\Facades\\Route;\n\nRoute::get('/', function () {\n    return view('welcome');\n});\n\nRoute::get('/users', function () {\n    return 'All users';\n});",
                Output = "Route definitions registered successfully"
            },
            new LaravelLesson
            {
                Id = 2,
                Topic = "Routing",
                Title = "Route Parameters",
                Description = "Learn how to capture segments of the URI in Laravel routes.",
                CodeExample = "<?php\n// routes/web.php\n\nuse Illuminate\\Support\\Facades\\Route;\n\nRoute::get('/user/{id}', function ($id) {\n    return 'User '.$id;\n});\n\nRoute::get('/posts/{post}/comments/{comment}', function ($postId, $commentId) {\n    //\n});",
                Output = "Route with parameters registered successfully"
            },
            new LaravelLesson
            {
                Id = 3,
                Topic = "Eloquent ORM",
                Title = "Introduction to Eloquent",
                Description = "Learn how to work with database records using Eloquent ORM.",
                CodeExample = "<?php\n// app/Models/User.php\n\nnamespace App\\Models;\n\nuse Illuminate\\Database\\Eloquent\\Factories\\HasFactory;\nuse Illuminate\\Database\\Eloquent\\Model;\n\nclass User extends Model\n{\n    use HasFactory;\n\n    protected $fillable = [\n        'name',\n        'email',\n        'password',\n    ];\n}",
                Output = "Eloquent model created successfully"
            },
            new LaravelLesson
            {
                Id = 4,
                Topic = "Eloquent ORM",
                Title = "Querying Models",
                Description = "Learn how to retrieve records from the database using Eloquent.",
                CodeExample = "<?php\n// Retrieving models\n\nuse App\\Models\\User;\n\n$users = User::all();\n\n$user = User::find(1);\n\n$users = User::where('active', 1)->orderBy('name')->get();",
                Output = "Users retrieved successfully"
            },
            new LaravelLesson
            {
                Id = 5,
                Topic = "Blade Templates",
                Title = "Blade Basics",
                Description = "Learn how to create dynamic views using Blade templating engine.",
                CodeExample = "<!-- resources/views/welcome.blade.php -->\n\n<!DOCTYPE html>\n<html>\n<head>\n    <title>App Name - @yield('title')</title>\n</head>\n<body>\n    @section('sidebar')\n        This is the master sidebar.\n    @show\n\n    <div class=\"container\">\n        @yield('content')\n    </div>\n</body>\n</html>",
                Output = "Blade template rendered successfully"
            },
            new LaravelLesson
            {
                Id = 6,
                Topic = "Blade Templates",
                Title = "Blade Control Structures",
                Description = "Learn how to use control structures in Blade templates.",
                CodeExample = "@if (count($records) === 1)\n    I have one record!\n@elseif (count($records) > 1)\n    I have multiple records!\n@else\n    I don't have any records!\n@endif\n\n@foreach ($users as $user)\n    <p>This is user {{ $user->id }}</p>\n@endforeach",
                Output = "Blade control structures executed successfully"
            },
            new LaravelLesson
            {
                Id = 7,
                Topic = "Middleware",
                Title = "Creating Middleware",
                Description = "Learn how to create and register custom middleware in Laravel.",
                CodeExample = "<?php\n// app/Http/Middleware/EnsureTokenIsValid.php\n\nnamespace App\\Http\\Middleware;\n\nuse Closure;\n\nclass EnsureTokenIsValid\n{\n    public function handle($request, Closure $next)\n    {\n        if ($request->input('token') !== 'my-secret-token') {\n            return redirect('home');\n        }\n\n        return $next($request);\n    }\n}",
                Output = "Middleware created successfully"
            },
            new LaravelLesson
            {
                Id = 8,
                Topic = "Middleware",
                Title = "Registering Middleware",
                Description = "Learn how to register middleware in Laravel applications.",
                CodeExample = "<?php\n// app/Http/Kernel.php\n\nprotected $routeMiddleware = [\n    // ...\n    'token' => \\App\\Http\\Middleware\\EnsureTokenIsValid::class,\n];\n\n// In routes\nRoute::get('/profile', function () {\n    //\n})->middleware('token');",
                Output = "Middleware registered successfully"
            },
            new LaravelLesson
            {
                Id = 9,
                Topic = "Database",
                Title = "Migrations",
                Description = "Learn how to create and run database migrations in Laravel.",
                CodeExample = "<?php\n// Creating a migration\nphp artisan make:migration create_flights_table\n\n// Migration file\nSchema::create('flights', function (Blueprint $table) {\n    $table->id();\n    $table->string('name');\n    $table->text('description');\n    $table->timestamps();\n});",
                Output = "Migration created and executed successfully"
            },
            new LaravelLesson
            {
                Id = 10,
                Topic = "Database",
                Title = "Seeding Data",
                Description = "Learn how to seed your database with test data in Laravel.",
                CodeExample = "<?php\n// Creating a seeder\nphp artisan make:seeder UsersTableSeeder\n\n// In the seeder\npublic function run()\n{\n    DB::table('users')->insert([\n        'name' => Str::random(10),\n        'email' => Str::random(10).'@gmail.com',\n        'password' => Hash::make('password'),\n    ]);\n}",
                Output = "Database seeded successfully"
            },
            new LaravelLesson
            {
                Id = 11,
                Topic = "Authentication",
                Title = "Laravel Breeze",
                Description = "Learn how to implement authentication using Laravel Breeze.",
                CodeExample = "// Install Laravel Breeze\ncomposer require laravel/breeze --dev\n\n// Install Breeze scaffolding\nphp artisan breeze:install\n\n// Run migrations\nphp artisan migrate",
                Output = "Authentication scaffolding installed successfully"
            },
            new LaravelLesson
            {
                Id = 12,
                Topic = "Authentication",
                Title = "API Authentication",
                Description = "Learn how to authenticate API requests in Laravel.",
                CodeExample = "<?php\n// In routes/api.php\n\nRoute::middleware('auth:sanctum')->get('/user', function (Request $request) {\n    return $request->user();\n});\n\n// In controller\npublic function index(Request $request)\n{\n    return $request->user();\n}",
                Output = "API authentication configured successfully"
            }
        };

        return backend.Services.DataService.ApplyQuery(mockLessons, topic, sortBy, sortOrder, limit, offset);
    }
    
    public IEnumerable<LaravelInterviewQuestion> LaravelInterviewQuestions(string? topic = null, string? sortBy = null, string? sortOrder = null, int? limit = null, int? offset = null)
    {
        // Mock Laravel interview questions data
        var mockQuestions = new List<LaravelInterviewQuestion>
        {
            new LaravelInterviewQuestion
            {
                Id = 1,
                Topic = "Routing",
                Type = "multiple-choice",
                Question = "Which method is used to define a GET route in Laravel?",
                Choices = new string[] { "Route::get()", "Route::post()", "Route::put()", "Route::delete()" },
                CorrectAnswer = 0,
                Explanation = "In Laravel, Route::get() is used to define a GET route. This is the most common HTTP method for retrieving data."
            },
            new LaravelInterviewQuestion
            {
                Id = 2,
                Topic = "Eloquent ORM",
                Type = "multiple-choice",
                Question = "Which method is used to retrieve all records from a model?",
                Choices = new string[] { "Model::all()", "Model::get()", "Model::find()", "Model::first()" },
                CorrectAnswer = 0,
                Explanation = "The all() method retrieves all records from the model's associated database table."
            },
            new LaravelInterviewQuestion
            {
                Id = 3,
                Topic = "Blade Templates",
                Type = "multiple-choice",
                Question = "Which directive is used to extend a Blade layout?",
                Choices = new string[] { "@extends", "@include", "@yield", "@section" },
                CorrectAnswer = 0,
                Explanation = "The @extends directive is used to specify which layout the child view should inherit from."
            },
            new LaravelInterviewQuestion
            {
                Id = 4,
                Topic = "Database",
                Type = "multiple-choice",
                Question = "Which artisan command is used to create a new migration?",
                Choices = new string[] { "php artisan make:migration", "php artisan create:migration", "php artisan generate:migration", "php artisan new:migration" },
                CorrectAnswer = 0,
                Explanation = "The php artisan make:migration command is used to create a new migration file in Laravel."
            },
            new LaravelInterviewQuestion
            {
                Id = 5,
                Topic = "Authentication",
                Type = "multiple-choice",
                Question = "Which middleware is used to authenticate users in Laravel?",
                Choices = new string[] { "auth", "guest", "verified", "throttle" },
                CorrectAnswer = 0,
                Explanation = "The auth middleware is used to ensure that only authenticated users can access certain routes."
            },
            new LaravelInterviewQuestion
            {
                Id = 6,
                Topic = "Routing",
                Type = "multiple-choice",
                Question = "How do you define a route parameter in Laravel?",
                Choices = new string[] { "/user/{id}", "/user/:id", "/user/[id]", "/user/<id>" },
                CorrectAnswer = 0,
                Explanation = "In Laravel, curly braces {} are used to define route parameters."
            },
            new LaravelInterviewQuestion
            {
                Id = 7,
                Topic = "Eloquent ORM",
                Type = "open-ended",
                Question = "What is Eloquent ORM in Laravel?",
                Choices = null,
                CorrectAnswer = null,
                Explanation = "Eloquent ORM is Laravel's implementation of the Active Record pattern. It provides a beautiful, simple ActiveRecord implementation for working with your database. Each database table has a corresponding 'Model' which is used to interact with that table."
            },
            new LaravelInterviewQuestion
            {
                Id = 8,
                Topic = "Blade Templates",
                Type = "multiple-choice",
                Question = "Which Blade directive is used to display data that might be null?",
                Choices = new string[] { "{{ $variable ?? 'default' }}", "{{ $variable ?: 'default' }}", "{{ $variable ? 'default' }}", "{{ $variable | 'default' }}" },
                CorrectAnswer = 0,
                Explanation = "The ?? operator in Blade is the null coalescing operator, which displays the default value if the variable is null."
            },
            new LaravelInterviewQuestion
            {
                Id = 9,
                Topic = "Middleware",
                Type = "open-ended",
                Question = "What is middleware in Laravel?",
                Choices = null,
                CorrectAnswer = null,
                Explanation = "Middleware acts as a filter for HTTP requests entering your application. It can examine the request and decide whether to allow it to proceed or redirect the user somewhere else. Common uses include authentication, CSRF protection, and logging."
            },
            new LaravelInterviewQuestion
            {
                Id = 10,
                Topic = "Database",
                Type = "multiple-choice",
                Question = "Which method is used to run database migrations?",
                Choices = new string[] { "php artisan migrate", "php artisan run:migrations", "php artisan db:migrate", "php artisan execute:migrations" },
                CorrectAnswer = 0,
                Explanation = "The php artisan migrate command is used to run all outstanding migrations."
            },
            new LaravelInterviewQuestion
            {
                Id = 11,
                Topic = "Authentication",
                Type = "multiple-choice",
                Question = "Which Laravel package provides a simple way to add authentication to your application?",
                Choices = new string[] { "Laravel Breeze", "Laravel Cashier", "Laravel Dusk", "Laravel Envoy" },
                CorrectAnswer = 0,
                Explanation = "Laravel Breeze is a simple, minimal implementation of Laravel's authentication features including login, registration, password reset, email verification, and password confirmation."
            },
            new LaravelInterviewQuestion
            {
                Id = 12,
                Topic = "Routing",
                Type = "open-ended",
                Question = "What is route model binding in Laravel?",
                Choices = null,
                CorrectAnswer = null,
                Explanation = "Route model binding provides a convenient way to inject model instances into your routes. Laravel will automatically resolve Eloquent models defined in routes or controller methods whose type-hinted variable names match a route segment name."
            },
            new LaravelInterviewQuestion
            {
                Id = 13,
                Topic = "Eloquent ORM",
                Type = "multiple-choice",
                Question = "Which method is used to create a new record in the database using Eloquent?",
                Choices = new string[] { "Model::create()", "Model::save()", "Model::insert()", "Model::make()" },
                CorrectAnswer = 0,
                Explanation = "The create() method creates and saves a new model instance in a single operation. It requires the $fillable property to be set on the model."
            },
            new LaravelInterviewQuestion
            {
                Id = 14,
                Topic = "Blade Templates",
                Type = "multiple-choice",
                Question = "Which Blade directive is used to include a view?",
                Choices = new string[] { "@include", "@extend", "@yield", "@section" },
                CorrectAnswer = 0,
                Explanation = "The @include directive is used to include another Blade view within the current view."
            },
            new LaravelInterviewQuestion
            {
                Id = 15,
                Topic = "Middleware",
                Type = "multiple-choice",
                Question = "Where are route middleware registered in Laravel?",
                Choices = new string[] { "app/Http/Kernel.php", "routes/web.php", "config/app.php", "app/Providers/AppServiceProvider.php" },
                CorrectAnswer = 0,
                Explanation = "Route middleware are registered in the $routeMiddleware property of the app/Http/Kernel.php file."
            },
            new LaravelInterviewQuestion
            {
                Id = 16,
                Topic = "Database",
                Type = "open-ended",
                Question = "What are Laravel migrations?",
                Choices = null,
                CorrectAnswer = null,
                Explanation = "Migrations are like version control for your database, allowing your team to define and share the application's database schema definition. They are typically paired with Laravel's schema builder to build your application's database schema."
            },
            new LaravelInterviewQuestion
            {
                Id = 17,
                Topic = "Authentication",
                Type = "multiple-choice",
                Question = "Which Laravel feature provides API token authentication?",
                Choices = new string[] { "Laravel Sanctum", "Laravel Passport", "Laravel Breeze", "Laravel Fortify" },
                CorrectAnswer = 0,
                Explanation = "Laravel Sanctum provides a simple way to authenticate single page applications and mobile applications with Laravel. It provides a way to issue API tokens to users."
            },
            new LaravelInterviewQuestion
            {
                Id = 18,
                Topic = "Routing",
                Type = "multiple-choice",
                Question = "Which method is used to define a POST route in Laravel?",
                Choices = new string[] { "Route::post()", "Route::get()", "Route::put()", "Route::patch()" },
                CorrectAnswer = 0,
                Explanation = "Route::post() is used to define a POST route, typically used for creating resources."
            },
            new LaravelInterviewQuestion
            {
                Id = 19,
                Topic = "Eloquent ORM",
                Type = "multiple-choice",
                Question = "How do you define a relationship between two models in Eloquent?",
                Choices = new string[] { "By defining a method that returns a relationship method", "By adding a foreign key column", "By creating a pivot table", "By using the with() method" },
                CorrectAnswer = 0,
                Explanation = "In Eloquent, relationships are defined as methods on your Eloquent model classes. These methods return instances of relationships like hasOne, hasMany, belongsTo, etc."
            },
            new LaravelInterviewQuestion
            {
                Id = 20,
                Topic = "Blade Templates",
                Type = "multiple-choice",
                Question = "Which Blade directive is used to define a section?",
                Choices = new string[] { "@section", "@yield", "@include", "@extends" },
                CorrectAnswer = 0,
                Explanation = "The @section directive is used to define a section of content, while @yield is used to display that content in the layout."
            },
            // Adding 15 more Laravel interview questions to match other modules
            new LaravelInterviewQuestion
            {
                Id = 21,
                Topic = "Validation",
                Type = "multiple-choice",
                Question = "Which method is used to validate request data in Laravel controllers?",
                Choices = new string[] { "$request->validate()", "$this->validate()", "Validator::make()", "All of the above" },
                CorrectAnswer = 3,
                Explanation = "In Laravel, you can validate request data using $request->validate(), $this->validate(), or Validator::make(). All three methods are valid approaches."
            },
            new LaravelInterviewQuestion
            {
                Id = 22,
                Topic = "Events",
                Type = "multiple-choice",
                Question = "Which artisan command generates a new event and listener?",
                Choices = new string[] { "php artisan make:event", "php artisan make:listener", "Both A and B", "php artisan make:event-listener" },
                CorrectAnswer = 2,
                Explanation = "You need to use both php artisan make:event and php artisan make:listener to create an event and its corresponding listener."
            },
            new LaravelInterviewQuestion
            {
                Id = 23,
                Topic = "Queues",
                Type = "multiple-choice",
                Question = "Which method is used to dispatch a job to the queue?",
                Choices = new string[] { "dispatch()", "queue()", "send()", "process()" },
                CorrectAnswer = 0,
                Explanation = "The dispatch() method is used to dispatch a job to the queue in Laravel. You can call it on the job instance or use the dispatch() helper function."
            },
            new LaravelInterviewQuestion
            {
                Id = 24,
                Topic = "Caching",
                Type = "multiple-choice",
                Question = "Which facade is used to interact with the cache in Laravel?",
                Choices = new string[] { "Cache", "Storage", "Session", "Config" },
                CorrectAnswer = 0,
                Explanation = "The Cache facade is used to interact with the cache in Laravel. It provides methods like Cache::get(), Cache::put(), Cache::remember(), etc."
            },
            new LaravelInterviewQuestion
            {
                Id = 25,
                Topic = "Testing",
                Type = "multiple-choice",
                Question = "Which base class should feature tests extend in Laravel?",
                Choices = new string[] { "Tests\\TestCase", "PHPUnit\\Framework\\TestCase", "Tests\\Feature\\TestCase", "Tests\\Unit\\TestCase" },
                CorrectAnswer = 0,
                Explanation = "Feature tests in Laravel should extend the Tests\\TestCase base class, which provides additional testing helpers specific to Laravel applications."
            },
            new LaravelInterviewQuestion
            {
                Id = 26,
                Topic = "Collections",
                Type = "multiple-choice",
                Question = "Which method is used to transform each item in a collection?",
                Choices = new string[] { "map()", "filter()", "reduce()", "each()" },
                CorrectAnswer = 0,
                Explanation = "The map() method is used to transform each item in a collection by applying a callback function to each item and returning a new collection with the transformed items."
            },
            new LaravelInterviewQuestion
            {
                Id = 27,
                Topic = "Artisan",
                Type = "multiple-choice",
                Question = "How do you list all available Artisan commands?",
                Choices = new string[] { "php artisan list", "php artisan help", "php artisan commands", "php artisan show" },
                CorrectAnswer = 0,
                Explanation = "The php artisan list command displays all available Artisan commands along with their descriptions and usage information."
            },
            new LaravelInterviewQuestion
            {
                Id = 28,
                Topic = "Database",
                Type = "multiple-choice",
                Question = "Which method is used to define a foreign key constraint in Laravel migrations?",
                Choices = new string[] { "foreign()", "references()", "on()", "All of the above" },
                CorrectAnswer = 3,
                Explanation = "To define a foreign key constraint, you use a combination of foreign(), references(), and on() methods: $table->foreign('user_id')->references('id')->on('users');"
            },
            new LaravelInterviewQuestion
            {
                Id = 29,
                Topic = "Eloquent ORM",
                Type = "multiple-choice",
                Question = "How do you eager load relationships to avoid the N+1 query problem?",
                Choices = new string[] { "with()", "load()", "join()", "attach()" },
                CorrectAnswer = 0,
                Explanation = "The with() method is used to eager load relationships when querying models to avoid the N+1 query problem. Example: User::with('posts')->get();"
            },
            new LaravelInterviewQuestion
            {
                Id = 30,
                Topic = "Security",
                Type = "multiple-choice",
                Question = "Which middleware is used to prevent CSRF attacks in Laravel?",
                Choices = new string[] { "VerifyCsrfToken", "EncryptCookies", "RedirectIfAuthenticated", "TrimStrings" },
                CorrectAnswer = 0,
                Explanation = "The VerifyCsrfToken middleware is used to prevent CSRF (Cross-Site Request Forgery) attacks by validating CSRF tokens on incoming requests."
            },
            new LaravelInterviewQuestion
            {
                Id = 31,
                Topic = "File Storage",
                Type = "multiple-choice",
                Question = "Which method is used to store uploaded files in Laravel?",
                Choices = new string[] { "$request->file('photo')->store()", "$request->store('photo')", "Storage::save()", "File::upload()" },
                CorrectAnswer = 0,
                Explanation = "The store() method is used to store uploaded files. You can call it on the uploaded file instance: $request->file('photo')->store('images');"
            },
            new LaravelInterviewQuestion
            {
                Id = 32,
                Topic = "Notifications",
                Type = "multiple-choice",
                Question = "Which method is used to send a notification immediately?",
                Choices = new string[] { "notify()", "send()", "queue()", "dispatch()" },
                CorrectAnswer = 0,
                Explanation = "The notify() method is used to send a notification immediately to a notifiable entity (like a user): $user->notify(new InvoicePaid($invoice));"
            },
            new LaravelInterviewQuestion
            {
                Id = 33,
                Topic = "API Resources",
                Type = "multiple-choice",
                Question = "Which artisan command generates a new API resource class?",
                Choices = new string[] { "php artisan make:resource", "php artisan make:api-resource", "php artisan make:json", "php artisan make:transformer" },
                CorrectAnswer = 0,
                Explanation = "The php artisan make:resource command generates a new API resource class that can be used to transform models into JSON responses."
            },
            new LaravelInterviewQuestion
            {
                Id = 34,
                Topic = "Service Container",
                Type = "multiple-choice",
                Question = "Which method is used to bind a class to the service container?",
                Choices = new string[] { "bind()", "register()", "resolve()", "make()" },
                CorrectAnswer = 0,
                Explanation = "The bind() method is used to bind a class or interface to the service container: $this->app->bind('HelpSpot\\Api\\Contracts\\Repository', 'HelpSpot\\Api\\Repositories\\RedisRepository');"
            },
            new LaravelInterviewQuestion
            {
                Id = 35,
                Topic = "Task Scheduling",
                Type = "multiple-choice",
                Question = "Where are scheduled tasks defined in Laravel?",
                Choices = new string[] { "app/Console/Kernel.php", "routes/console.php", "config/app.php", "app/Providers/AppServiceProvider.php" },
                CorrectAnswer = 0,
                Explanation = "Scheduled tasks are defined in the schedule() method of the app/Console/Kernel.php file using the scheduler instance."
            }
        };

        return backend.Services.DataService.ApplyQuery(mockQuestions, topic, sortBy, sortOrder, limit, offset);
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