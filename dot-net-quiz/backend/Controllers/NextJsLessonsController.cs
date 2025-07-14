using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("api/nextjs/lessons")]
public class NextJsLessonsController : ControllerBase
{
    private static readonly List<Lesson> Lessons = new()
    {
        // Project Structure & Setup
        new Lesson { Id = 1, Topic = "Project Structure", Title = "Next.js Project Structure", Description = "Understand the default folders and files in a Next.js project.", CodeExample = "/pages, /public, /styles, next.config.js", Output = "Organized project layout." },
        new Lesson { Id = 2, Topic = "Pages Router", Title = "Pages Router Basics", Description = "How the /pages directory works for routing.", CodeExample = "// pages/about.js\nexport default function About() { return <div>About</div>; }", Output = "Renders the About page at /about." },
        new Lesson { Id = 3, Topic = "App Router", Title = "App Router Basics", Description = "How the /app directory enables advanced routing and layouts.", CodeExample = "// app/page.js\nexport default function Home() { return <main>Home</main>; }", Output = "Renders the Home page at /." },
        new Lesson { Id = 4, Topic = "Routing", Title = "Dynamic Routing (Pages)", Description = "Create dynamic routes using square brackets.", CodeExample = "// pages/posts/[id].js\nexport default function Post({ params }) { return <div>{params.id}</div>; }", Output = "Displays the post id from the URL." },
        new Lesson { Id = 5, Topic = "Routing", Title = "Catch-all & Optional Catch-all Routes", Description = "Use [...slug].js and [[...slug]].js for flexible routing.", CodeExample = "// pages/docs/[...slug].js", Output = "Matches /docs/a, /docs/a/b, etc." },
        new Lesson { Id = 6, Topic = "Routing", Title = "Nested Routing (App Router)", Description = "Create nested folders in /app for nested routes.", CodeExample = "// app/dashboard/settings/page.js", Output = "Renders /dashboard/settings." },
        new Lesson { Id = 7, Topic = "Data Fetching", Title = "getStaticProps (SSG)", Description = "Fetch data at build time for static generation.", CodeExample = "export async function getStaticProps() { return { props: { data: 'hello' } } }", Output = "Provides props to the page at build time." },
        new Lesson { Id = 8, Topic = "Data Fetching", Title = "getServerSideProps (SSR)", Description = "Fetch data on each request for server-side rendering.", CodeExample = "export async function getServerSideProps() { return { props: { data: 'hello' } } }", Output = "Provides props to the page on each request." },
        new Lesson { Id = 9, Topic = "Data Fetching", Title = "Client-side Fetching", Description = "Use fetch, SWR, or React Query for client-side data fetching.", CodeExample = "useEffect(() => { fetch('/api/data').then(...) }, [])", Output = "Fetches data on the client." },
        new Lesson { Id = 10, Topic = "API Routes", Title = "Creating API Endpoints (Pages)", Description = "API routes are created under /pages/api.", CodeExample = "// pages/api/hello.js\nexport default function handler(req, res) { res.status(200).json({ name: 'John' }); }", Output = "{ name: 'John' }" },
        new Lesson { Id = 11, Topic = "API Routes", Title = "API Endpoints (App Router)", Description = "API routes in /app/api with route handlers.", CodeExample = "// app/api/hello/route.js\nexport async function GET() { return Response.json({ name: 'John' }); }", Output = "{ name: 'John' }" },
        new Lesson { Id = 12, Topic = "Layouts", Title = "Layouts in App Router", Description = "Use layout.js for persistent layouts.", CodeExample = "// app/layout.js\nexport default function Layout({ children }) { return <html><body>{children}</body></html>; }", Output = "Wraps all pages in the layout." },
        new Lesson { Id = 13, Topic = "Templates", Title = "Templates in App Router", Description = "Use template.js for per-route templates.", CodeExample = "// app/dashboard/template.js", Output = "Provides a template for dashboard routes." },
        new Lesson { Id = 14, Topic = "Client/Server Components", Title = "Client vs Server Components", Description = "Use 'use client' for client components; server by default.", CodeExample = "'use client'\nexport default function Button() { ... }", Output = "Button is a client component." },
        new Lesson { Id = 15, Topic = "Static Assets", Title = "Serving Static Files", Description = "Use the /public folder for static assets.", CodeExample = "/public/logo.png", Output = "Accessible at /logo.png." },
        new Lesson { Id = 16, Topic = "Image Optimization", Title = "Using the Image Component", Description = "The <Image> component from 'next/image' optimizes images automatically.", CodeExample = "import Image from 'next/image'\n<Image src='/logo.png' width={100} height={100} alt='Logo' />", Output = "Renders an optimized image." },
        new Lesson { Id = 17, Topic = "CSS & Styling", Title = "CSS Modules", Description = "Use .module.css files for locally scoped CSS.", CodeExample = "import styles from './Home.module.css'\n<div className={styles.container}></div>", Output = "Applies scoped styles." },
        new Lesson { Id = 18, Topic = "CSS & Styling", Title = "Tailwind CSS", Description = "Integrate Tailwind for utility-first styling.", CodeExample = "<div className='bg-blue-500 text-white'>Hello</div>", Output = "Styled with Tailwind." },
        new Lesson { Id = 19, Topic = "CSS & Styling", Title = "Styled-components", Description = "Use styled-components for CSS-in-JS.", CodeExample = "import styled from 'styled-components'\nconst Button = styled.button`color: red;`", Output = "Button with red text." },
        new Lesson { Id = 20, Topic = "Environment Variables", Title = "Using Environment Variables", Description = "NEXT_PUBLIC_ prefix exposes env vars to the browser.", CodeExample = "process.env.NEXT_PUBLIC_API_URL", Output = "Accesses public env variable." },
        new Lesson { Id = 21, Topic = "Middleware", Title = "Middleware in Next.js", Description = "Run code before a request is completed.", CodeExample = "// middleware.js\nexport function middleware(req) { ... }", Output = "Runs on every request." },
        new Lesson { Id = 22, Topic = "Authentication", Title = "Authentication Strategies", Description = "Use NextAuth.js or custom JWT for authentication.", CodeExample = "import { getSession } from 'next-auth/react'", Output = "Handles user sessions." },
        new Lesson { Id = 23, Topic = "Deployment", Title = "Deploying to Vercel", Description = "Vercel is the recommended platform for Next.js.", CodeExample = "vercel --prod", Output = "Deploys to Vercel." },
        new Lesson { Id = 24, Topic = "Performance", Title = "Performance Optimization", Description = "Use built-in analytics, image optimization, and code splitting.", CodeExample = "next build", Output = "Optimized production build." },
        new Lesson { Id = 25, Topic = "Error Handling", Title = "Custom Error Pages", Description = "Create _error.js or error.js for custom error handling.", CodeExample = "// pages/_error.js\nexport default function Error({ statusCode }) { ... }", Output = "Custom error page." },
        new Lesson { Id = 26, Topic = "Internationalization", Title = "i18n in Next.js", Description = "Configure i18n in next.config.js for multi-language support.", CodeExample = "i18n: { locales: ['en', 'fr'], defaultLocale: 'en' }", Output = "Supports multiple languages." },
        new Lesson { Id = 27, Topic = "ISR", Title = "Incremental Static Regeneration (ISR)", Description = "Update static content after deployment.", CodeExample = "getStaticProps({ revalidate: 10 })", Output = "Revalidates every 10 seconds." },
        new Lesson { Id = 28, Topic = "Preview Mode", Title = "Preview Mode", Description = "Preview draft content before publishing.", CodeExample = "res.setPreviewData({})", Output = "Enables preview mode." },
        new Lesson { Id = 29, Topic = "Advanced Features", Title = "Edge Functions", Description = "Run code at the edge for low latency.", CodeExample = "export const config = { runtime: 'edge' }", Output = "Runs at the edge." },
        new Lesson { Id = 30, Topic = "Testing", Title = "Testing Next.js Apps", Description = "Use Jest and React Testing Library for testing.", CodeExample = "import { render } from '@testing-library/react'", Output = "Renders component for testing." }
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