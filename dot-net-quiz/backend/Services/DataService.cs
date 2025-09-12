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
            // Load Laravel questions from JSON file
            var jsonPath = System.IO.Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "Data", "laravel_questions.json");
            if (!File.Exists(jsonPath))
            {
                return new AnswerResult 
                { 
                    IsCorrect = false, 
                    Explanation = "Question data not found." 
                };
            }

            var jsonContent = File.ReadAllText(jsonPath);
            var questions = System.Text.Json.JsonSerializer.Deserialize<List<LaravelInterviewQuestion>>(jsonContent);
            
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
    }
}