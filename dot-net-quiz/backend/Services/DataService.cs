using backend.Models;
using backend.Controllers;
using System.Text.Json;
using System.IO;
using System.Collections.Generic;
using System.Linq;

namespace backend.Services
{
    public class DataService
    {
        // Singleton instance to hold all data
        private static readonly DataService _instance = new DataService();
        public static DataService Instance => _instance;

        public DataService()
        {
            LoadReactData();
            LoadTailwindData();
            LoadNodeData();
            LoadSassData();
        }

        // Data collections
        public IEnumerable<Lesson> DotNetLessons => LessonsController.Lessons;
        public IEnumerable<Lesson> NextJsLessons => NextJsLessonsController.Lessons;
        public IEnumerable<Lesson> GraphQLLessons => GraphQLLessonsController.Lessons;
        public IEnumerable<InterviewQuestion> DotNetInterviewQuestions => InterviewQuestionsController.Questions;
        public IEnumerable<InterviewQuestion> NextJsInterviewQuestions => NextJsInterviewQuestionsController.Questions;
        public IEnumerable<InterviewQuestion> GraphQLInterviewQuestions => GraphQLInterviewQuestionsController.Questions;

        // React data collections
        public IEnumerable<ReactLesson> ReactLessons { get; private set; } = new List<ReactLesson>();
        public IEnumerable<ReactInterviewQuestion> ReactInterviewQuestions { get; private set; } = new List<ReactInterviewQuestion>();
        
        // Tailwind data collections
        public IEnumerable<TailwindLesson> TailwindLessons { get; private set; } = new List<TailwindLesson>();
        public IEnumerable<TailwindInterviewQuestion> TailwindInterviewQuestions { get; private set; } = new List<TailwindInterviewQuestion>();
        
        // Node.js data collections
        public IEnumerable<NodeLesson> NodeLessons { get; private set; } = new List<NodeLesson>();
        public IEnumerable<NodeInterviewQuestion> NodeInterviewQuestions { get; private set; } = new List<NodeInterviewQuestion>();
        
        // SASS data collections
        public IEnumerable<SassLesson> SassLessons { get; private set; } = new List<SassLesson>();
        public IEnumerable<SassInterviewQuestion> SassInterviewQuestions { get; private set; } = new List<SassInterviewQuestion>();

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
            // Load Laravel questions from JSON file
            var jsonPath = System.IO.Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "Data", "laravel_questions.json");
            if (!System.IO.File.Exists(jsonPath))
            {
                return new AnswerResult 
                { 
                    IsCorrect = false, 
                    Explanation = "Question data not found." 
                };
            }

            var jsonContent = System.IO.File.ReadAllText(jsonPath);
            var questions = System.Text.Json.JsonSerializer.Deserialize<List<LaravelInterviewQuestion>>(jsonContent, new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
                PropertyNameCaseInsensitive = true
            });
            
            var question = questions?.FirstOrDefault(q => q.Id == questionId);
            if (question == null)
            {
                return new AnswerResult 
                { 
                    IsCorrect = false, 
                    Explanation = "Question not found." 
                };
            }

            bool isCorrect = question.Type == "open-ended" || 
                            (question.CorrectAnswer.HasValue && answerIndex == question.CorrectAnswer.Value);

            return new AnswerResult
            {
                IsCorrect = isCorrect,
                Explanation = question.Explanation
            };
        }

        // Progress tracking
        public ProgressResult TrackProgress(int userId, int lessonId, string module)
        {
            // In-memory demo: just echo back the input
            return new ProgressResult { UserId = userId, LessonId = lessonId, Module = module, Status = "completed" };
        }

        // Load React data from JSON files
        private void LoadReactData()
        {
            try
            {
                var lessonsPath = System.IO.Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "Data", "react_lessons.json");
                if (System.IO.File.Exists(lessonsPath))
                {
                    var lessonsJson = System.IO.File.ReadAllText(lessonsPath);
                    ReactLessons = System.Text.Json.JsonSerializer.Deserialize<List<ReactLesson>>(lessonsJson, new JsonSerializerOptions
                    {
                        PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
                        PropertyNameCaseInsensitive = true
                    }) ?? new List<ReactLesson>();
                }

                var questionsPath = System.IO.Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "Data", "react_questions.json");
                if (System.IO.File.Exists(questionsPath))
                {
                    var questionsJson = System.IO.File.ReadAllText(questionsPath);
                    ReactInterviewQuestions = System.Text.Json.JsonSerializer.Deserialize<List<ReactInterviewQuestion>>(questionsJson, new JsonSerializerOptions
                    {
                        PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
                        PropertyNameCaseInsensitive = true
                    }) ?? new List<ReactInterviewQuestion>();
                }
            }
            catch (Exception ex)
            {
                // Log error or handle as needed
                Console.WriteLine($"Error loading React data: {ex.Message}");
            }
        }

        // Load Tailwind data from JSON files
        private void LoadTailwindData()
        {
            try
            {
                var lessonsPath = System.IO.Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "Data", "tailwind_lessons.json");
                if (System.IO.File.Exists(lessonsPath))
                {
                    var lessonsJson = System.IO.File.ReadAllText(lessonsPath);
                    TailwindLessons = System.Text.Json.JsonSerializer.Deserialize<List<TailwindLesson>>(lessonsJson, new JsonSerializerOptions
                    {
                        PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
                        PropertyNameCaseInsensitive = true
                    }) ?? new List<TailwindLesson>();
                }

                var questionsPath = System.IO.Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "Data", "tailwind_questions.json");
                if (System.IO.File.Exists(questionsPath))
                {
                    var questionsJson = System.IO.File.ReadAllText(questionsPath);
                    TailwindInterviewQuestions = System.Text.Json.JsonSerializer.Deserialize<List<TailwindInterviewQuestion>>(questionsJson, new JsonSerializerOptions
                    {
                        PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
                        PropertyNameCaseInsensitive = true
                    }) ?? new List<TailwindInterviewQuestion>();
                }
            }
            catch (Exception ex)
            {
                // Log error or handle as needed
                Console.WriteLine($"Error loading Tailwind data: {ex.Message}");
            }
        }

        // Load Node.js data from JSON files
        private void LoadNodeData()
        {
            try
            {
                var lessonsPath = System.IO.Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "Data", "node_lessons.json");
                if (System.IO.File.Exists(lessonsPath))
                {
                    var lessonsJson = System.IO.File.ReadAllText(lessonsPath);
                    NodeLessons = System.Text.Json.JsonSerializer.Deserialize<List<NodeLesson>>(lessonsJson, new JsonSerializerOptions
                    {
                        PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
                        PropertyNameCaseInsensitive = true
                    }) ?? new List<NodeLesson>();
                }

                var questionsPath = System.IO.Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "Data", "node_questions.json");
                if (System.IO.File.Exists(questionsPath))
                {
                    var questionsJson = System.IO.File.ReadAllText(questionsPath);
                    NodeInterviewQuestions = System.Text.Json.JsonSerializer.Deserialize<List<NodeInterviewQuestion>>(questionsJson, new JsonSerializerOptions
                    {
                        PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
                        PropertyNameCaseInsensitive = true
                    }) ?? new List<NodeInterviewQuestion>();
                }
            }
            catch (Exception ex)
            {
                // Log error or handle as needed
                Console.WriteLine($"Error loading Node.js data: {ex.Message}");
            }
        }

        // Load SASS data from JSON files
        private void LoadSassData()
        {
            try
            {
                var lessonsPath = System.IO.Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "Data", "sass_lessons.json");
                if (System.IO.File.Exists(lessonsPath))
                {
                    var lessonsJson = System.IO.File.ReadAllText(lessonsPath);
                    SassLessons = System.Text.Json.JsonSerializer.Deserialize<List<SassLesson>>(lessonsJson, new JsonSerializerOptions
                    {
                        PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
                        PropertyNameCaseInsensitive = true
                    }) ?? new List<SassLesson>();
                }

                var questionsPath = System.IO.Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "Data", "sass_questions.json");
                if (System.IO.File.Exists(questionsPath))
                {
                    var questionsJson = System.IO.File.ReadAllText(questionsPath);
                    SassInterviewQuestions = System.Text.Json.JsonSerializer.Deserialize<List<SassInterviewQuestion>>(questionsJson, new JsonSerializerOptions
                    {
                        PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
                        PropertyNameCaseInsensitive = true
                    }) ?? new List<SassInterviewQuestion>();
                }
            }
            catch (Exception ex)
            {
                // Log error or handle as needed
                Console.WriteLine($"Error loading SASS data: {ex.Message}");
            }
        }

        // React answer validation
        public AnswerResult ValidateReactAnswer(int questionId, int answerIndex)
        {
            var question = ReactInterviewQuestions.FirstOrDefault(q => q.Id == questionId);
            if (question == null)
            {
                return new AnswerResult 
                { 
                    IsCorrect = false, 
                    Explanation = "Question not found." 
                };
            }

            bool isCorrect = question.Type == "open-ended" || 
                            (question.CorrectAnswer.HasValue && answerIndex == question.CorrectAnswer.Value);

            return new AnswerResult
            {
                IsCorrect = isCorrect,
                Explanation = question.Explanation
            };
        }

        // Tailwind answer validation
        public AnswerResult ValidateTailwindAnswer(int questionId, int answerIndex)
        {
            var question = TailwindInterviewQuestions.FirstOrDefault(q => q.Id == questionId);
            if (question == null)
            {
                return new AnswerResult 
                { 
                    IsCorrect = false, 
                    Explanation = "Question not found." 
                };
            }

            bool isCorrect = question.Type == "open-ended" || 
                            (question.CorrectAnswer.HasValue && answerIndex == question.CorrectAnswer.Value);

            return new AnswerResult
            {
                IsCorrect = isCorrect,
                Explanation = question.Explanation
            };
        }

        // Node.js answer validation
        public AnswerResult ValidateNodeAnswer(int questionId, int answerIndex)
        {
            var question = NodeInterviewQuestions.FirstOrDefault(q => q.Id == questionId);
            if (question == null)
            {
                return new AnswerResult 
                { 
                    IsCorrect = false, 
                    Explanation = "Question not found." 
                };
            }

            bool isCorrect = question.Type == "open-ended" || 
                            (question.CorrectAnswer.HasValue && answerIndex == question.CorrectAnswer.Value);

            return new AnswerResult
            {
                IsCorrect = isCorrect,
                Explanation = question.Explanation
            };
        }

        // SASS answer validation
        public AnswerResult ValidateSassAnswer(int questionId, int answerIndex)
        {
            var question = SassInterviewQuestions.FirstOrDefault(q => q.Id == questionId);
            if (question == null)
            {
                return new AnswerResult 
                { 
                    IsCorrect = false, 
                    Explanation = "Question not found." 
                };
            }

            bool isCorrect = question.Type == "open-ended" || 
                            (question.CorrectAnswer.HasValue && answerIndex == question.CorrectAnswer.Value);

            return new AnswerResult
            {
                IsCorrect = isCorrect,
                Explanation = question.Explanation
            };
        }
    }
}