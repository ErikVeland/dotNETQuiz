"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useQuery, gql } from '@apollo/client';

type LaravelLesson = {
    id: number;
    topic: string;
    title: string;
    description: string;
    codeExample: string;
    output: string;
};

type TopicGroup = {
    topic: string;
    lessons: LaravelLesson[];
};

const LARAVEL_LESSONS_QUERY = gql`
  query LaravelLessons {
    laravelLessons {
      id
      topic
      title
      description
      codeExample
      output
    }
  }
`;

export default function LaravelLessonsPage() {
    const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    const { data, loading, error } = useQuery(LARAVEL_LESSONS_QUERY);
    const lessons: LaravelLesson[] = data?.laravelLessons ?? [];

    // Group lessons by topic
    const topicGroups: TopicGroup[] = Object.values(
        lessons.reduce((acc, lesson) => {
            if (!acc[lesson.topic]) acc[lesson.topic] = { topic: lesson.topic, lessons: [] };
            acc[lesson.topic].lessons.push(lesson);
            return acc;
        }, {} as Record<string, TopicGroup>)
    );

    // If a lesson is selected, find its topic and index
    let currentLesson: LaravelLesson | null = null;
    let currentTopicLessons: LaravelLesson[] = [];
    let currentLessonIndex: number | null = null;
    let nextCategoryTopic: string | null = null;
    if (selectedTopic !== null && selectedIndex !== null) {
        currentTopicLessons = topicGroups.find(tg => tg.topic === selectedTopic)?.lessons ?? [];
        currentLesson = currentTopicLessons[selectedIndex] ?? null;
        currentLessonIndex = selectedIndex;
        // Find the next topic (cycle to first if at end)
        const currentTopicIdx = topicGroups.findIndex(tg => tg.topic === selectedTopic);
        nextCategoryTopic = topicGroups[(currentTopicIdx + 1) % topicGroups.length]?.topic ?? null;
    }

    if (loading) return <main className="p-6">Loading Laravel lessons...</main>;
    if (error) return <main className="p-6 text-red-600 dark:text-red-400">Error loading Laravel lessons.</main>;

    return (
        <div className="w-full p-6">
            <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded shadow p-6">
                <Link href="/" className="inline-block mb-4 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 font-semibold py-1 px-2 rounded shadow hover:bg-red-200 dark:hover:bg-red-800 transition-colors duration-150 flex items-center gap-1 text-xs">
                    <span className="text-base">←</span> Back to Home
                </Link>
                <h1 className="text-3xl font-bold mb-6 mt-2 text-red-700 dark:text-red-300">Learn Laravel Step by Step</h1>

                {/* Topic Overview */}
                {selectedTopic === null && (
                    <div>
                        {topicGroups.map(group => (
                            <div key={group.topic} className="mb-10">
                                <h2 className="text-2xl font-extrabold mb-4 flex items-center gap-2 text-red-700 dark:text-red-300">
                                    <span className="inline-block h-8 w-2 rounded bg-red-500 dark:bg-red-400 mr-3"></span>
                                    <span className="bg-red-50 dark:bg-red-900 px-4 py-2 rounded-lg text-red-800 dark:text-red-200 shadow-sm">{group.topic}</span>
                                </h2>
                                <ul className="space-y-2">
                                    {group.lessons.map((lesson, idx) => (
                                        <li
                                            key={lesson.id}
                                            className="bg-gray-100 dark:bg-gray-700 p-4 rounded shadow hover:bg-red-50 dark:hover:bg-red-900 cursor-pointer transition-colors duration-150"
                                            onClick={() => {
                                                setSelectedTopic(group.topic);
                                                setSelectedIndex(idx);
                                            }}
                                        >
                                            <div className="font-semibold text-red-700 dark:text-red-300">{lesson.title}</div>
                                            <p className="text-gray-600 dark:text-gray-300 mt-1 text-sm">{lesson.description}</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                )}

                {/* Lesson Detail View */}
                {selectedTopic !== null && currentLesson && (
                    <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded shadow space-y-4 mt-4">
                        <button
                            className="w-full mb-4 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 font-semibold py-1 rounded shadow hover:bg-red-200 dark:hover:bg-red-800 transition-colors duration-150 flex items-center justify-center gap-1 text-xs"
                            onClick={() => {
                                setSelectedTopic(null);
                                setSelectedIndex(null);
                            }}
                        >
                            <span className="text-base">←</span> Back to Topic List
                        </button>

                        <div className="flex items-center justify-between mb-2">
                            <span className="font-semibold text-red-700 dark:text-red-300">{currentLesson.topic}</span>
                            <span className="text-sm text-gray-600 dark:text-gray-400">Lesson {currentLessonIndex! + 1} of {currentTopicLessons.length}</span>
                        </div>
                        <h2 className="text-2xl font-bold">{currentLesson.title}</h2>
                        <p className="text-gray-700 dark:text-gray-300">{currentLesson.description}</p>

                        <div>
                            <h3 className="font-semibold mt-4 text-red-700 dark:text-red-300">PHP Example:</h3>
                            <pre className="bg-white dark:bg-gray-800 p-4 rounded text-sm whitespace-pre-wrap border border-gray-200 dark:border-gray-600 overflow-x-auto">
                                <code>{currentLesson.codeExample}</code>
                            </pre>
                        </div>

                        <div>
                            <h3 className="font-semibold mt-4 text-red-700 dark:text-red-300">Expected Output:</h3>
                            <pre className="bg-black text-white p-4 rounded text-sm whitespace-pre-wrap overflow-x-auto">
                                {currentLesson.output}
                            </pre>
                        </div>

                        <div className="flex justify-between mt-6 gap-4">
                            {/* Previous button (always left) */}
                            {currentLessonIndex! > 0 ? (
                                <button
                                    className="w-1/2 bg-red-600 dark:bg-red-700 text-white px-4 py-2 rounded shadow hover:bg-red-700 dark:hover:bg-red-600 transition-colors duration-150 flex items-center"
                                    onClick={() => setSelectedIndex(currentLessonIndex! - 1)}
                                >
                                    <span className="mr-2">←</span> {currentTopicLessons[currentLessonIndex! - 1].title}
                                </button>
                            ) : (
                                <button
                                    className="w-1/2 bg-gray-300 dark:bg-gray-600 text-gray-400 dark:text-gray-400 px-4 py-2 rounded shadow cursor-not-allowed"
                                    disabled
                                >
                                    &nbsp;
                                </button>
                            )}
                            {/* Next button (always right) */}
                            {currentLessonIndex! < currentTopicLessons.length - 1 ? (
                                <button
                                    className="w-1/2 bg-red-600 dark:bg-red-700 text-white px-4 py-2 rounded shadow hover:bg-red-700 dark:hover:bg-red-600 transition-colors duration-150 flex items-center justify-end"
                                    onClick={() => setSelectedIndex(currentLessonIndex! + 1)}
                                >
                                    {currentTopicLessons[currentLessonIndex! + 1].title} <span className="ml-2">→</span>
                                </button>
                            ) : (
                                <button
                                    className="w-1/2 bg-gray-300 dark:bg-gray-600 text-gray-400 dark:text-gray-400 px-4 py-2 rounded shadow cursor-not-allowed"
                                    disabled
                                >
                                    &nbsp;
                                </button>
                            )}
                        </div>
                        {currentLessonIndex === currentTopicLessons.length - 1 && topicGroups.length > 1 && (
                            <button
                                className="w-full mt-8 bg-blue-600 dark:bg-blue-700 text-white px-4 py-2 rounded shadow hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-150 font-semibold"
                                onClick={() => {
                                    setSelectedTopic(nextCategoryTopic);
                                    setSelectedIndex(0);
                                }}
                            >
                                Next Category: {nextCategoryTopic} →
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}