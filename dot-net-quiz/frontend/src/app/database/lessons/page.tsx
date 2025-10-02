"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useQuery, gql } from '@apollo/client';
import TechnologyUtilizationBox from '../../../components/TechnologyUtilizationBox';
import EnhancedLoadingComponent from '../../../components/EnhancedLoadingComponent';
import BreadcrumbNavigation from '../../../components/BreadcrumbNavigation';

type DatabaseLesson = {
    id: number;
    topic: string;
    title: string;
    description: string;
    codeExample: string;
    output: string;
};

type TopicGroup = {
    topic: string;
    lessons: DatabaseLesson[];
};

const DATABASE_LESSONS_QUERY = gql`
  query DatabaseLessons {
    databaseLessons {
      id
      topic
      title
      description
      codeExample
      output
    }
  }
`;

export default function DatabaseLessonsPage() {
    const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const retryCountRef = useRef(0);

    const { data, loading, error, refetch } = useQuery(DATABASE_LESSONS_QUERY, {
        onError: (error) => {
            // Increment retry counter for network errors
            if (isNetworkError(error)) {
                retryCountRef.current += 1;
            }
        }
    });
    
    // Reset retry count on successful load
    useEffect(() => {
        if (data && !loading) {
            retryCountRef.current = 0;
        }
    }, [data, loading]);

    const lessons: DatabaseLesson[] = data?.databaseLessons ?? [];

    // Group lessons by topic
    const topicGroups: TopicGroup[] = Object.values(
        lessons.reduce((acc, lesson) => {
            if (!acc[lesson.topic]) acc[lesson.topic] = { topic: lesson.topic, lessons: [] };
            acc[lesson.topic].lessons.push(lesson);
            return acc;
        }, {} as Record<string, TopicGroup>)
    );

    // If a lesson is selected, find its topic and index
    let currentLesson: DatabaseLesson | null = null;
    let currentTopicLessons: DatabaseLesson[] = [];
    let currentLessonIndex: number | null = null;
    let isLastCategory = false;
    let nextCategoryTopic: string | null = null;
    if (selectedTopic !== null && selectedIndex !== null) {
        currentTopicLessons = topicGroups.find(tg => tg.topic === selectedTopic)?.lessons ?? [];
        currentLesson = currentTopicLessons[selectedIndex] ?? null;
        currentLessonIndex = selectedIndex;
        // Find the next topic (cycle to first if at end)
        const currentTopicIdx = topicGroups.findIndex(tg => tg.topic === selectedTopic);
        isLastCategory = currentTopicIdx === topicGroups.length - 1;
        nextCategoryTopic = topicGroups[(currentTopicIdx + 1) % topicGroups.length]?.topic ?? null;
    }

    // Helper function to determine if an error is a network error
    const isNetworkError = (error: any): boolean => {
        return !!error && (
            error.message?.includes('Failed to fetch') ||
            error.message?.includes('NetworkError') ||
            error.message?.includes('ECONNREFUSED') ||
            error.message?.includes('timeout') ||
            error.networkError
        );
    };

    // If we're loading or have retry attempts, show the enhanced loading component
    if (loading || retryCountRef.current > 0) {
        return (
            <div className="w-full p-6">
                <div className="max-w-4xl mx-auto">
                    <EnhancedLoadingComponent 
                        retryCount={retryCountRef.current} 
                        maxRetries={30} 
                        error={error}
                        onRetry={() => {
                            retryCountRef.current = 0;
                            refetch();
                        }}
                    />
                </div>
            </div>
        );
    }
    
    if (error && !isNetworkError(error)) {
        return (
            <main className="p-6">
                <div className="max-w-4xl mx-auto bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
                    <div className="text-red-600 dark:text-red-400">Error loading Database lessons.</div>
                    <button 
                        className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors duration-200"
                        onClick={() => window.location.reload()}
                    >
                        Try Again
                    </button>
                </div>
            </main>
        );
    }

    return (
        // Updated container with glass morphism effect
        <div className="w-full p-6">
            <div className="max-w-4xl mx-auto">
                <BreadcrumbNavigation />
                
                {/* Updated container with glass morphism effect */}
                <div className="glass-morphism rounded-xl p-6">
                    <Link href="/" className="inline-block mb-4 glass-button text-xs">
                        <span className="text-base">←</span> Back to Home
                    </Link>
                    <h1 className="text-3xl font-bold mb-6 mt-2 text-white">Learn Databases & Data Modelling Step by Step</h1>

                    {/* Topic Overview */}
                    {selectedTopic === null && (
                        <div>
                            {topicGroups.map(group => (
                                <div key={group.topic} className="mb-10">
                                    <h2 className="text-2xl font-extrabold mb-4 flex items-center gap-2 text-white">
                                        <span className="inline-block h-8 w-2 rounded bg-purple-500 mr-3"></span>
                                        <span className="glass-morphism px-4 py-2 rounded-lg text-white shadow-sm">{group.topic}</span>
                                    </h2>
                                    <ul className="space-y-2">
                                        {group.lessons.map((lesson, idx) => (
                                            <li
                                                key={lesson.id}
                                                className="glass-morphism p-4 rounded shadow hover:bg-white/10 cursor-pointer transition-colors duration-150"
                                                onClick={() => {
                                                    setSelectedTopic(group.topic);
                                                    setSelectedIndex(idx);
                                                }}
                                            >
                                                <div className="font-semibold text-white">{lesson.title}</div>
                                                <p className="text-white/80 mt-1 text-sm">{lesson.description}</p>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                            <TechnologyUtilizationBox 
                                technology="Databases" 
                                explanation="In this Databases module, database concepts are being used to build the entire user interface. Database components manage the state and rendering of the lesson content and quiz questions." 
                            />
                        </div>
                    )}

                    {/* Lesson Detail View */}
                    {selectedTopic !== null && currentLesson && (
                        // Updated container with glass morphism effect
                        <div className="glass-morphism p-6 rounded-xl space-y-4 mt-4">
                            <button
                                className="w-full mb-4 glass-button text-xs"
                                onClick={() => {
                                    setSelectedTopic(null);
                                    setSelectedIndex(null);
                                }}
                            >
                                <span className="text-base">←</span> Back to Topic List
                            </button>

                            <div className="flex items-center justify-between mb-2">
                                <span className="font-semibold text-white">{currentLesson.topic}</span>
                                <span className="text-sm text-white/80">Lesson {currentLessonIndex! + 1} of {currentTopicLessons.length}</span>
                            </div>
                            <h2 className="text-2xl font-bold text-white">{currentLesson.title}</h2>
                            <p className="text-white/90">{currentLesson.description}</p>

                            <div>
                                <h3 className="font-semibold mt-4 text-white">SQL Example:</h3>
                                <pre className="glass-morphism p-4 rounded text-sm whitespace-pre-wrap overflow-x-auto">
                                    <code className="text-white">{currentLesson.codeExample}</code>
                                </pre>
                            </div>

                            <div>
                                <h3 className="font-semibold mt-4 text-white">Expected Output:</h3>
                                <pre className="glass-morphism bg-black/30 text-white p-4 rounded text-sm whitespace-pre-wrap overflow-x-auto">
                                    {currentLesson.output}
                                </pre>
                            </div>

                            <TechnologyUtilizationBox 
                                technology="Databases" 
                                explanation="In this Databases module, database concepts are being used to build the entire user interface. Database components manage the state and rendering of the lesson content and quiz questions." 
                            />

                            <div className="flex justify-between mt-6 gap-4">
                                {/* Previous button (always left) */}
                                {currentLessonIndex! > 0 ? (
                                    <button
                                        className="w-1/2 glass-button"
                                        onClick={() => setSelectedIndex(currentLessonIndex! - 1)}
                                    >
                                        <span className="mr-2">←</span> {currentTopicLessons[currentLessonIndex! - 1].title}
                                    </button>
                                ) : (
                                    <button
                                        className="w-1/2 glass-button opacity-50 cursor-not-allowed"
                                        disabled
                                    >
                                        &nbsp;
                                    </button>
                                )}
                                {/* Next button (always right) */}
                                {currentLessonIndex! < currentTopicLessons.length - 1 ? (
                                    <button
                                        className="w-1/2 glass-button flex items-center justify-end"
                                        onClick={() => setSelectedIndex(currentLessonIndex! + 1)}
                                    >
                                        {currentTopicLessons[currentLessonIndex! + 1].title} <span className="ml-2">→</span>
                                    </button>
                                ) : (
                                    <button
                                        className="w-1/2 glass-button opacity-50 cursor-not-allowed"
                                        disabled
                                    >
                                        &nbsp;
                                    </button>
                                )}
                            </div>
                            {currentLessonIndex === currentTopicLessons.length - 1 && topicGroups.length > 1 && (
                                <>
                                    {isLastCategory ? (
                                        <div className="flex flex-col sm:flex-row gap-4 mt-8">
                                            <Link 
                                                href="/" 
                                                className="flex-1 glass-button-success text-center"
                                            >
                                                Exit Lessons
                                            </Link>
                                            <Link 
                                                href="/database/interview" 
                                                className="flex-1 glass-button-warning text-center"
                                            >
                                                Start Database Quiz
                                            </Link>
                                        </div>
                                    ) : (
                                        <button
                                            className="w-full mt-8 glass-button"
                                            onClick={() => {
                                                setSelectedTopic(nextCategoryTopic);
                                                setSelectedIndex(0);
                                            }}
                                        >
                                            Next Category: {nextCategoryTopic} →
                                        </button>
                                    )}
                                </>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}