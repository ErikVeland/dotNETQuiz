using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("api/graphql/lessons")]
public class GraphQLLessonsController : ControllerBase
{
    private static readonly List<Lesson> Lessons = new()
    {
        new Lesson { Id = 1, Topic = "Basics", Title = "What is GraphQL?", Description = "GraphQL is a query language for APIs and a runtime for executing those queries.", CodeExample = "# Example query\n{\n  user(id: \"1\") {\n    name\n    email\n  }\n}", Output = "Returns the user's name and email." },
        new Lesson { Id = 2, Topic = "Schemas", Title = "Defining a Schema", Description = "A schema defines types, queries, and mutations in GraphQL.", CodeExample = "type User {\n  id: ID!\n  name: String!\n}\ntype Query {\n  user(id: ID!): User\n}", Output = "Defines a User type and a query to fetch a user by ID." },
        new Lesson { Id = 3, Topic = "Types", Title = "Scalar Types", Description = "GraphQL has built-in scalar types like String, Int, Boolean, ID, and Float.", CodeExample = "type Product {\n  id: ID!\n  price: Float!\n  name: String!\n}", Output = "Defines a Product type with scalar fields." },
        new Lesson { Id = 4, Topic = "Types", Title = "Enums and Input Types", Description = "Use enums for fixed sets and input types for arguments.", CodeExample = "enum Role { ADMIN USER }\ninput UserInput { name: String! }", Output = "Defines an enum and an input type." },
        new Lesson { Id = 5, Topic = "Queries", Title = "Writing Queries", Description = "Queries specify exactly what data you want from the API.", CodeExample = "{\n  allUsers {\n    id\n    name\n  }\n}", Output = "Returns a list of users with their IDs and names." },
        new Lesson { Id = 6, Topic = "Queries", Title = "Query Variables", Description = "Use variables to make queries dynamic.", CodeExample = "query getUser($id: ID!) { user(id: $id) { name } }", Output = "Query with variable for user ID." },
        new Lesson { Id = 7, Topic = "Queries", Title = "Fragments", Description = "Fragments allow you to reuse parts of queries.", CodeExample = "fragment userFields on User { id name }", Output = "Reusable query parts." },
        new Lesson { Id = 8, Topic = "Mutations", Title = "Writing Mutations", Description = "Mutations modify data on the server.", CodeExample = "mutation { addUser(name: \"Alice\") { id name } }", Output = "Adds a user named Alice." },
        new Lesson { Id = 9, Topic = "Mutations", Title = "Input Types in Mutations", Description = "Use input types for mutation arguments.", CodeExample = "mutation { updateUser(input: { id: \"1\", name: \"Bob\" }) { id name } }", Output = "Updates user with id 1." },
        new Lesson { Id = 10, Topic = "Subscriptions", Title = "Real-time with Subscriptions", Description = "Subscriptions enable real-time updates.", CodeExample = "subscription { messageAdded { id content } }", Output = "Receives new messages in real time." },
        new Lesson { Id = 11, Topic = "Resolvers", Title = "What is a Resolver?", Description = "Resolvers provide the instructions for turning a GraphQL operation into data.", CodeExample = "const resolvers = { Query: { user: (parent, args, context) => getUserById(args.id) } };", Output = "Defines a resolver for the user query." },
        new Lesson { Id = 12, Topic = "Resolvers", Title = "Field-level Resolvers", Description = "Each field can have its own resolver.", CodeExample = "User: { posts: (parent) => getPostsByUser(parent.id) }", Output = "Resolves posts for a user." },
        new Lesson { Id = 13, Topic = "Arguments & Context", Title = "Using Arguments", Description = "Arguments allow queries and mutations to be dynamic.", CodeExample = "user(id: ID!): User", Output = "Fetches user by ID." },
        new Lesson { Id = 14, Topic = "Arguments & Context", Title = "Context Object", Description = "Context provides per-request state to resolvers.", CodeExample = "context: { user, db }", Output = "Access user and db in resolvers." },
        new Lesson { Id = 15, Topic = "Error Handling", Title = "Handling Errors", Description = "Throw errors in resolvers to return GraphQL errors.", CodeExample = "throw new Error('Not found')", Output = "Returns a GraphQL error." },
        new Lesson { Id = 16, Topic = "Directives", Title = "Built-in Directives", Description = "@include and @skip control field inclusion.", CodeExample = "{ user { name @include(if: $showName) } }", Output = "Conditionally includes name field." },
        new Lesson { Id = 17, Topic = "Pagination", Title = "Pagination Patterns", Description = "Use limit/offset or cursor-based pagination.", CodeExample = "users(limit: 10, offset: 0)", Output = "Returns first 10 users." },
        new Lesson { Id = 18, Topic = "Authentication", Title = "Authentication in GraphQL", Description = "Use context to pass user info and check auth in resolvers.", CodeExample = "context: { user }", Output = "Checks user in resolver." },
        new Lesson { Id = 19, Topic = "Tooling", Title = "GraphQL Tooling", Description = "Use Apollo, Relay, GraphiQL, Playground for development.", CodeExample = "import { ApolloServer } from 'apollo-server'", Output = "Sets up Apollo Server." },
        new Lesson { Id = 20, Topic = "Federation", Title = "Schema Federation", Description = "Combine multiple GraphQL services into one API.", CodeExample = "extend type User @key(fields: 'id')", Output = "Federated user type." },
        new Lesson { Id = 21, Topic = "Best Practices", Title = "Best Practices & Security", Description = "Naming, documentation, avoiding N+1, securing endpoints.", CodeExample = "# Use descriptive names, document schema", Output = "Well-designed, secure API." }
    };

    [HttpGet]
    public ActionResult<IEnumerable<Lesson>> GetAll()
    {
        if (Lessons == null || Lessons.Count == 0)
        {
            return StatusCode(500, "No lessons available.");
        }
        return Ok(Lessons);
    }

    [HttpGet("{id}")]
    public ActionResult<Lesson> Get(int id)
    {
        var lesson = Lessons.FirstOrDefault(l => l.Id == id);
        return lesson == null ? NotFound() : Ok(lesson);
    }
}
// Reuse Lesson model from LessonsController if possible. 