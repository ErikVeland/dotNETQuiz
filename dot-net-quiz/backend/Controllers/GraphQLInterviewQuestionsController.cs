using Microsoft.AspNetCore.Mvc;
using backend.Models;

namespace backend.Controllers;

[ApiController]
[Route("api/graphql/interviewquestions")]
public class GraphQLInterviewQuestionsController : ControllerBase
{
    public static readonly List<InterviewQuestion> Questions = new()
    {
        new InterviewQuestion { Id = 1, Topic = "Basics", Type = "multiple-choice", Question = "What is GraphQL?", Choices = new[]{"A query language for APIs","A database","A frontend framework","A NoSQL database"}, CorrectAnswer = 0, Explanation = "GraphQL is a query language for APIs and a runtime for executing those queries." },
        new InterviewQuestion { Id = 2, Topic = "Schemas", Type = "multiple-choice", Question = "What does a GraphQL schema define?", Choices = new[]{"Types, queries, mutations","Database tables","Frontend components","REST endpoints"}, CorrectAnswer = 0, Explanation = "A schema defines types, queries, and mutations." },
        new InterviewQuestion { Id = 3, Topic = "Types", Type = "multiple-choice", Question = "Which of the following is NOT a built-in GraphQL scalar type?", Choices = new[]{"String","Int","Date","Boolean"}, CorrectAnswer = 2, Explanation = "Date is not a built-in scalar type." },
        new InterviewQuestion { Id = 4, Topic = "Types", Type = "open-ended", Question = "What is an enum type in GraphQL?", Choices = null, CorrectAnswer = null, Explanation = "An enum is a special type that restricts a field to a set of allowed values." },
        new InterviewQuestion { Id = 5, Topic = "Queries", Type = "multiple-choice", Question = "Which keyword is used to fetch data in GraphQL?", Choices = new[]{"get","fetch","query","retrieve"}, CorrectAnswer = 2, Explanation = "The 'query' keyword is used to fetch data." },
        new InterviewQuestion { Id = 6, Topic = "Queries", Type = "open-ended", Question = "How do you use variables in a GraphQL query?", Choices = null, CorrectAnswer = null, Explanation = "Define variables in the query and pass them as arguments." },
        new InterviewQuestion { Id = 7, Topic = "Queries", Type = "multiple-choice", Question = "What is a fragment in GraphQL?", Choices = new[]{"Reusable part of a query","A mutation","A subscription","A resolver"}, CorrectAnswer = 0, Explanation = "Fragments allow you to reuse parts of queries." },
        new InterviewQuestion { Id = 8, Topic = "Mutations", Type = "multiple-choice", Question = "What is a mutation in GraphQL?", Choices = new[]{"A way to modify data","A way to fetch data","A way to define types","A way to create a query"}, CorrectAnswer = 0, Explanation = "A mutation is used to modify data on the server." },
        new InterviewQuestion { Id = 9, Topic = "Mutations", Type = "open-ended", Question = "How do you pass arguments to a mutation?", Choices = null, CorrectAnswer = null, Explanation = "Use input types or arguments in the mutation definition." },
        new InterviewQuestion { Id = 10, Topic = "Subscriptions", Type = "multiple-choice", Question = "What is the purpose of subscriptions in GraphQL?", Choices = new[]{"Real-time updates","Batching queries","Authentication","Pagination"}, CorrectAnswer = 0, Explanation = "Subscriptions enable real-time updates." },
        new InterviewQuestion { Id = 11, Topic = "Resolvers", Type = "multiple-choice", Question = "What is a resolver?", Choices = new[]{"A function that resolves a field's value","A database connection","A query string","A mutation type"}, CorrectAnswer = 0, Explanation = "A resolver is a function that resolves the value for a field." },
        new InterviewQuestion { Id = 12, Topic = "Resolvers", Type = "open-ended", Question = "How do field-level resolvers work?", Choices = null, CorrectAnswer = null, Explanation = "Each field can have its own resolver function." },
        new InterviewQuestion { Id = 13, Topic = "Arguments & Context", Type = "multiple-choice", Question = "What is the context object used for?", Choices = new[]{"Per-request state","Schema definition","Query batching","Error handling"}, CorrectAnswer = 0, Explanation = "Context provides per-request state to resolvers." },
        new InterviewQuestion { Id = 14, Topic = "Arguments & Context", Type = "open-ended", Question = "How do you access arguments in a resolver?", Choices = null, CorrectAnswer = null, Explanation = "Arguments are passed as the second parameter to the resolver function." },
        new InterviewQuestion { Id = 15, Topic = "Error Handling", Type = "multiple-choice", Question = "How do you return an error from a resolver?", Choices = new[]{"Throw an Error","Return null","Return false","Return an error object"}, CorrectAnswer = 0, Explanation = "Throw an Error to return a GraphQL error." },
        new InterviewQuestion { Id = 16, Topic = "Error Handling", Type = "open-ended", Question = "What happens if a resolver throws an error?", Choices = null, CorrectAnswer = null, Explanation = "The error is returned in the errors array of the GraphQL response." },
        new InterviewQuestion { Id = 17, Topic = "Directives", Type = "multiple-choice", Question = "What does the @include directive do?", Choices = new[]{"Conditionally includes a field","Skips a field","Defines a fragment","Batches queries"}, CorrectAnswer = 0, Explanation = "@include conditionally includes a field." },
        new InterviewQuestion { Id = 18, Topic = "Directives", Type = "multiple-choice", Question = "What is the purpose of @skip?", Choices = new[]{"Skips a field","Includes a field","Defines a fragment","Batches queries"}, CorrectAnswer = 0, Explanation = "@skip conditionally skips a field." },
        new InterviewQuestion { Id = 19, Topic = "Pagination", Type = "multiple-choice", Question = "Which pattern is commonly used for pagination?", Choices = new[]{"Cursor-based","Random","Directives","Fragments"}, CorrectAnswer = 0, Explanation = "Cursor-based pagination is common in GraphQL." },
        new InterviewQuestion { Id = 20, Topic = "Pagination", Type = "open-ended", Question = "How do you implement offset-based pagination?", Choices = null, CorrectAnswer = null, Explanation = "Use limit and offset arguments in the query." },
        new InterviewQuestion { Id = 21, Topic = "Authentication", Type = "multiple-choice", Question = "How is authentication typically handled in GraphQL?", Choices = new[]{"Using context","Using fragments","Using directives","Using enums"}, CorrectAnswer = 0, Explanation = "Authentication info is passed via context." },
        new InterviewQuestion { Id = 22, Topic = "Authentication", Type = "open-ended", Question = "How do you restrict access to a mutation?", Choices = null, CorrectAnswer = null, Explanation = "Check user permissions in the resolver using context." },
        new InterviewQuestion { Id = 23, Topic = "Tooling", Type = "multiple-choice", Question = "Which tool is commonly used for developing GraphQL APIs?", Choices = new[]{"Apollo Server","Express","MongoDB","React"}, CorrectAnswer = 0, Explanation = "Apollo Server is a popular GraphQL tool." },
        new InterviewQuestion { Id = 24, Topic = "Tooling", Type = "multiple-choice", Question = "What is GraphiQL?", Choices = new[]{"An in-browser IDE for GraphQL","A database","A frontend framework","A mutation"}, CorrectAnswer = 0, Explanation = "GraphiQL is an in-browser IDE for GraphQL." },
        new InterviewQuestion { Id = 25, Topic = "Federation", Type = "multiple-choice", Question = "What is schema federation?", Choices = new[]{"Combining multiple GraphQL services","Batching queries","Defining fragments","Paginating results"}, CorrectAnswer = 0, Explanation = "Federation combines multiple GraphQL services." },
        new InterviewQuestion { Id = 26, Topic = "Best Practices", Type = "open-ended", Question = "What is the N+1 problem in GraphQL?", Choices = null, CorrectAnswer = null, Explanation = "N+1 is when a resolver makes a separate DB call for each item, leading to inefficiency." },
        new InterviewQuestion { Id = 27, Topic = "Best Practices", Type = "multiple-choice", Question = "How can you avoid the N+1 problem?", Choices = new[]{"Use DataLoader","Use fragments","Use directives","Use enums"}, CorrectAnswer = 0, Explanation = "DataLoader batches and caches DB requests." },
        new InterviewQuestion { Id = 28, Topic = "Security", Type = "multiple-choice", Question = "Which is a security best practice for GraphQL APIs?", Choices = new[]{"Validate input","Expose all fields","Disable authentication","Allow introspection in prod"}, CorrectAnswer = 0, Explanation = "Always validate input to prevent attacks." },
        new InterviewQuestion { Id = 29, Topic = "Security", Type = "open-ended", Question = "How do you prevent excessive query depth?", Choices = null, CorrectAnswer = null, Explanation = "Limit query depth using validation rules or plugins." },
        new InterviewQuestion { Id = 30, Topic = "Batching", Type = "multiple-choice", Question = "What is query batching?", Choices = new[]{"Combining multiple queries in one request","Paginating results","Defining fragments","Using directives"}, CorrectAnswer = 0, Explanation = "Batching combines multiple queries in one request." },
        new InterviewQuestion { Id = 31, Topic = "Batching", Type = "open-ended", Question = "How does DataLoader help with batching?", Choices = null, CorrectAnswer = null, Explanation = "DataLoader batches and caches requests to avoid N+1." },
        new InterviewQuestion { Id = 32, Topic = "Testing", Type = "multiple-choice", Question = "Which tool is used for testing GraphQL APIs?", Choices = new[]{"Jest","GraphiQL","Apollo Server","React"}, CorrectAnswer = 0, Explanation = "Jest can be used for testing GraphQL APIs." },
        new InterviewQuestion { Id = 33, Topic = "Testing", Type = "open-ended", Question = "How do you test a resolver function?", Choices = null, CorrectAnswer = null, Explanation = "Call the resolver with mock arguments and context, and assert the result." },
        new InterviewQuestion { Id = 34, Topic = "Subscriptions", Type = "multiple-choice", Question = "What protocol is commonly used for GraphQL subscriptions?", Choices = new[]{"WebSockets","HTTP","REST","gRPC"}, CorrectAnswer = 0, Explanation = "WebSockets are used for subscriptions." },
        new InterviewQuestion { Id = 35, Topic = "Fragments", Type = "open-ended", Question = "How do fragments help in large queries?", Choices = null, CorrectAnswer = null, Explanation = "Fragments allow you to reuse parts of queries, making them more maintainable." }
    };

    [HttpGet]
    public ActionResult<IEnumerable<InterviewQuestion>> GetAll()
    {
        return Ok(Questions);
    }

    [HttpGet("by-topic/{topic}")]
    public ActionResult<IEnumerable<InterviewQuestion>> GetByTopic(string topic)
    {
        var filtered = Questions.Where(q => q.Topic != null && q.Topic.Equals(topic, StringComparison.OrdinalIgnoreCase)).ToList();
        return Ok(filtered);
    }

    [HttpPost("submit")] // expects { questionId, answerIndex }
    public ActionResult<AnswerResult> SubmitAnswer([FromBody] AnswerSubmission submission)
    {
        var question = Questions.FirstOrDefault(q => q.Id == submission.QuestionId);
        if (question == null)
            return NotFound();
        bool isCorrect = question.Type == "open-ended" || (question.CorrectAnswer.HasValue && submission.AnswerIndex == question.CorrectAnswer.Value);
        return Ok(new AnswerResult
        {
            IsCorrect = isCorrect,
            Explanation = question.Explanation
        });
    }
} 