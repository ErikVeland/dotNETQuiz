using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("api/nextjs/interviewquestions")]
public class NextJsInterviewQuestionsController : ControllerBase
{
    private static readonly List<InterviewQuestion> Questions = new()
    {
        new InterviewQuestion { Id = 1, Topic = "Project Structure", Type = "multiple-choice", Question = "Which folder contains static assets in a Next.js project?", Choices = new[]{"/public","/static","/assets","/pages"}, CorrectAnswer = 0, Explanation = "/public is used for static assets." },
        new InterviewQuestion { Id = 2, Topic = "Pages Router", Type = "multiple-choice", Question = "What is the default file for the home page in the Pages Router?", Choices = new[]{"index.js","home.js","main.js","app.js"}, CorrectAnswer = 0, Explanation = "index.js in /pages is the default home page." },
        new InterviewQuestion { Id = 3, Topic = "App Router", Type = "multiple-choice", Question = "What file defines the root layout in the App Router?", Choices = new[]{"layout.js","_app.js","root.js","main.js"}, CorrectAnswer = 0, Explanation = "layout.js defines the root layout in /app." },
        new InterviewQuestion { Id = 4, Topic = "Routing", Type = "multiple-choice", Question = "How do you create a dynamic route in the Pages Router?", Choices = new[]{"[param].js","{param}.js","_param.js","param.js"}, CorrectAnswer = 0, Explanation = "[param].js creates a dynamic route." },
        new InterviewQuestion { Id = 5, Topic = "Routing", Type = "multiple-choice", Question = "What does [...slug].js represent?", Choices = new[]{"Catch-all route","Static route","API route","Middleware"}, CorrectAnswer = 0, Explanation = "[...slug].js is a catch-all route." },
        new InterviewQuestion { Id = 6, Topic = "Routing", Type = "open-ended", Question = "How do you create nested routes in the App Router?", Choices = null, CorrectAnswer = null, Explanation = "By creating nested folders and page.js files in /app." },
        new InterviewQuestion { Id = 7, Topic = "Data Fetching", Type = "multiple-choice", Question = "Which function is used for static generation in the Pages Router?", Choices = new[]{"getStaticProps","getServerSideProps","getInitialProps","useEffect"}, CorrectAnswer = 0, Explanation = "getStaticProps is for static generation." },
        new InterviewQuestion { Id = 8, Topic = "Data Fetching", Type = "multiple-choice", Question = "Which function is used for server-side rendering in the Pages Router?", Choices = new[]{"getServerSideProps","getStaticProps","getInitialProps","useEffect"}, CorrectAnswer = 0, Explanation = "getServerSideProps is for SSR." },
        new InterviewQuestion { Id = 9, Topic = "Data Fetching", Type = "open-ended", Question = "What is the difference between getStaticProps and getServerSideProps?", Choices = null, CorrectAnswer = null, Explanation = "getStaticProps runs at build time, getServerSideProps runs on each request." },
        new InterviewQuestion { Id = 10, Topic = "Data Fetching", Type = "multiple-choice", Question = "Which hook is commonly used for client-side data fetching?", Choices = new[]{"useEffect","useState","useMemo","useCallback"}, CorrectAnswer = 0, Explanation = "useEffect is used for client-side fetching." },
        new InterviewQuestion { Id = 11, Topic = "API Routes", Type = "multiple-choice", Question = "Where do you place API route files in the Pages Router?", Choices = new[]{"/pages/api","/api","/src/api","/app/api"}, CorrectAnswer = 0, Explanation = "API routes go in /pages/api." },
        new InterviewQuestion { Id = 12, Topic = "API Routes", Type = "open-ended", Question = "How do you create a GET endpoint in the App Router?", Choices = null, CorrectAnswer = null, Explanation = "Export a GET function from a route.js file in /app/api." },
        new InterviewQuestion { Id = 13, Topic = "Layouts", Type = "multiple-choice", Question = "What is the purpose of layout.js in the App Router?", Choices = new[]{"Defines persistent layout","Handles API routes","Configures middleware","Defines static assets"}, CorrectAnswer = 0, Explanation = "layout.js defines persistent layouts." },
        new InterviewQuestion { Id = 14, Topic = "Templates", Type = "open-ended", Question = "What is a template.js file used for in the App Router?", Choices = null, CorrectAnswer = null, Explanation = "template.js provides a per-route template for nested routes." },
        new InterviewQuestion { Id = 15, Topic = "Client/Server Components", Type = "multiple-choice", Question = "How do you mark a component as a client component?", Choices = new[]{"'use client'","'use server'","export default","import React"}, CorrectAnswer = 0, Explanation = "'use client' at the top marks a client component." },
        new InterviewQuestion { Id = 16, Topic = "Static Assets", Type = "multiple-choice", Question = "How do you reference an image in the public folder?", Choices = new[]{"/logo.png","public/logo.png","./logo.png","/static/logo.png"}, CorrectAnswer = 0, Explanation = "Use /logo.png for public assets." },
        new InterviewQuestion { Id = 17, Topic = "Image Optimization", Type = "multiple-choice", Question = "Which component is used for optimized images?", Choices = new[]{"<Image>","<img>","<OptimizedImage>","<NextImage>"}, CorrectAnswer = 0, Explanation = "<Image> from 'next/image' is used." },
        new InterviewQuestion { Id = 18, Topic = "CSS & Styling", Type = "multiple-choice", Question = "Which file extension is used for CSS modules?", Choices = new[]{".module.css",".css",".scss",".style.css"}, CorrectAnswer = 0, Explanation = ".module.css is for CSS modules." },
        new InterviewQuestion { Id = 19, Topic = "CSS & Styling", Type = "open-ended", Question = "How do you use Tailwind CSS in a Next.js project?", Choices = null, CorrectAnswer = null, Explanation = "Install Tailwind, configure tailwind.config.js, and import the CSS in your app." },
        new InterviewQuestion { Id = 20, Topic = "Environment Variables", Type = "multiple-choice", Question = "Which prefix exposes env vars to the browser?", Choices = new[]{"NEXT_PUBLIC_","REACT_APP_","PUBLIC_","CLIENT_"}, CorrectAnswer = 0, Explanation = "NEXT_PUBLIC_ exposes env vars to the browser." },
        new InterviewQuestion { Id = 21, Topic = "Middleware", Type = "multiple-choice", Question = "What is the purpose of middleware.js?", Choices = new[]{"Run code before requests","Define layouts","Handle errors","Optimize images"}, CorrectAnswer = 0, Explanation = "middleware.js runs code before requests." },
        new InterviewQuestion { Id = 22, Topic = "Authentication", Type = "open-ended", Question = "How can you implement authentication in Next.js?", Choices = null, CorrectAnswer = null, Explanation = "Use NextAuth.js, custom JWT, or integrate with OAuth providers." },
        new InterviewQuestion { Id = 23, Topic = "Deployment", Type = "multiple-choice", Question = "Which platform is recommended for deploying Next.js?", Choices = new[]{"Vercel","Netlify","Heroku","AWS"}, CorrectAnswer = 0, Explanation = "Vercel is the recommended platform." },
        new InterviewQuestion { Id = 24, Topic = "Performance", Type = "multiple-choice", Question = "Which feature helps optimize images automatically?", Choices = new[]{"next/image","next/optimize","img tag","ImageOptimizer"}, CorrectAnswer = 0, Explanation = "next/image optimizes images." },
        new InterviewQuestion { Id = 25, Topic = "Performance", Type = "open-ended", Question = "How does code splitting work in Next.js?", Choices = null, CorrectAnswer = null, Explanation = "Each page is automatically code-split; only the code for the current page is loaded." },
        new InterviewQuestion { Id = 26, Topic = "Error Handling", Type = "multiple-choice", Question = "How do you create a custom error page in the Pages Router?", Choices = new[]{"_error.js","error.js","404.js","customError.js"}, CorrectAnswer = 0, Explanation = "_error.js is used for custom error pages." },
        new InterviewQuestion { Id = 27, Topic = "Error Handling", Type = "multiple-choice", Question = "How do you create a 404 page?", Choices = new[]{"404.js","_error.js","notfound.js","error404.js"}, CorrectAnswer = 0, Explanation = "404.js is used for custom 404 pages." },
        new InterviewQuestion { Id = 28, Topic = "Internationalization", Type = "open-ended", Question = "How do you enable i18n in Next.js?", Choices = null, CorrectAnswer = null, Explanation = "Configure i18n in next.config.js with locales and defaultLocale." },
        new InterviewQuestion { Id = 29, Topic = "ISR", Type = "multiple-choice", Question = "What does ISR stand for?", Choices = new[]{"Incremental Static Regeneration","Instant Server Rendering","Internal Static Routing","Incremental Server Rendering"}, CorrectAnswer = 0, Explanation = "ISR is Incremental Static Regeneration." },
        new InterviewQuestion { Id = 30, Topic = "ISR", Type = "open-ended", Question = "How do you enable ISR for a page?", Choices = null, CorrectAnswer = null, Explanation = "Return a revalidate property from getStaticProps." },
        new InterviewQuestion { Id = 31, Topic = "Preview Mode", Type = "multiple-choice", Question = "What is Preview Mode used for?", Choices = new[]{"Previewing draft content","Testing middleware","Optimizing images","Debugging API routes"}, CorrectAnswer = 0, Explanation = "Preview Mode lets you preview draft content." },
        new InterviewQuestion { Id = 32, Topic = "Advanced Features", Type = "multiple-choice", Question = "What is an Edge Function?", Choices = new[]{"Runs code at the edge","Optimizes images","Handles errors","Defines layouts"}, CorrectAnswer = 0, Explanation = "Edge Functions run code at the edge for low latency." },
        new InterviewQuestion { Id = 33, Topic = "Testing", Type = "open-ended", Question = "How do you test a Next.js component?", Choices = null, CorrectAnswer = null, Explanation = "Use Jest and React Testing Library to render and test components." },
        new InterviewQuestion { Id = 34, Topic = "App Router", Type = "multiple-choice", Question = "Which file is required in every folder in the App Router?", Choices = new[]{"page.js","index.js","main.js","route.js"}, CorrectAnswer = 0, Explanation = "page.js is required in every route folder." },
        new InterviewQuestion { Id = 35, Topic = "App Router", Type = "open-ended", Question = "What are React Server Components and how are they used in Next.js?", Choices = null, CorrectAnswer = null, Explanation = "Server Components run on the server by default in the App Router, enabling better performance and data fetching." }
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

// Reuse InterviewQuestion, AnswerSubmission, and AnswerResult models from InterviewQuestionsController if possible. 