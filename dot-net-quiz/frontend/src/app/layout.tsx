import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ApolloWrapper from '../components/ApolloWrapper';
import Header from '../components/Header';
import { DarkModeProvider } from '../components/DarkModeContext';
import AnimatedBackground from '../components/AnimatedBackground';

// Apollo error/dev messages for development
if (typeof window !== 'undefined' && process.env.NODE_ENV !== 'production') {
  // Dynamically import to avoid including in production bundle
  import('@apollo/client/dev').then(({ loadDevMessages, loadErrorMessages }) => {
    loadDevMessages();
    loadErrorMessages();
  });
}

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fullstack Academy - Learn .NET, Next.js, GraphQL, and Laravel",
  description: "Master .NET, Next.js, GraphQL, and Laravel with step-by-step lessons and interview preparation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 relative`}
      >
        <DarkModeProvider>
          <div className="flex flex-col min-h-screen">
            {/* Animated Background Component */}
            <AnimatedBackground />
            <Header />
            <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 relative">
              <ApolloWrapper>
                {children}
              </ApolloWrapper>
            </main>
            <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 w-full max-w-7xl mx-auto mt-auto relative">
              <div className="py-6 px-4 sm:px-6 lg:px-8">
                <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                  {new Date().getFullYear()} <a href="https://veland.au">Erik Veland</a>. No rights reserved. Go ahead, <a href="https://github.com/ErikVeland/dotNETQuiz" target="_blank" rel="noopener noreferrer">fork and learn</a>!
                </p>
              </div>
            </footer>
          </div>
        </DarkModeProvider>
      </body>
    </html>
  );
}