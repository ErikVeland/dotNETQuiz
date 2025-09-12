"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useQuery, gql } from '@apollo/client';

type Lesson = {
    id: number;
    topic: string;
    title: string;
    description: string;
    codeExample: string;
    output: string;
};

type TopicGroup = {
    topic: string;
    lessons: Lesson[];
};

const LESSONS_QUERY = gql`
  query NextJsLessons {
    nextJsLessons {
      id
      topic
      title
      description
      codeExample
      output
    }
  }
`;

export default function NextJsLessonsPage() {
    const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    const { data, loading, error } = useQuery(LESSONS_QUERY);
    const lessons: Lesson[] = data?.nextJsLessons ?? [];

    // Group lessons by topic
    const topicGroups: TopicGroup[] = Object.values(
        lessons.reduce((acc, lesson) => {
            if (!acc[lesson.topic]) acc[lesson.topic] = { topic: lesson.topic, lessons: [] };
            acc[lesson.topic].lessons.push(lesson);
            return acc;
        }, {} as Record<string, TopicGroup>)
    );

    // If a lesson is selected, find its topic and index
    let currentLesson: Lesson | null = null;
    let currentTopicLessons: Lesson[] = [];
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

    useEffect(() => {
        if (selectedTopic !== null && currentLesson) {
            console.log('--- LESSON DETAIL DEBUG ---');
            console.log('selectedTopic:', selectedTopic);
            console.log('selectedIndex:', selectedIndex);
            console.log('currentLessonIndex:', currentLessonIndex);
            console.log('currentTopicLessons.length:', currentTopicLessons.length);
            console.log('topicGroups.length:', topicGroups.length);
            console.log('nextCategoryTopic:', nextCategoryTopic);
        }
    }, [selectedTopic, selectedIndex, currentLesson, currentLessonIndex, currentTopicLessons.length, topicGroups.length, nextCategoryTopic]);

    if (loading) return <main className="p-6">Loading lessons...</main>;
    if (error) return <main className="p-6 text-red-600 dark:text-red-400">Error loading lessons.</main>;

    return (
        <main className="min-h-screen p-6 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
            <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded shadow p-6">
                <Link href="/" className="inline-block mb-4 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 font-semibold py-1 px-2 rounded shadow hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors duration-150 flex items-center gap-1 text-xs">
                    <span className="text-base">←</span> Back to Home
                </Link>
                <h1 className="text-3xl font-bold mb-6 mt-2 text-purple-700 dark:text-purple-300">Learn Next.js Step by Step</h1>

                {/* Topic Overview */}
                {selectedTopic === null && (
                    <div>
                        {topicGroups.map(group => (
                            <div key={group.topic} className="mb-10">
                                <h2 className="text-2xl font-extrabold mb-4 flex items-center gap-2 text-purple-700 dark:text-purple-300">
                                    <span className="inline-block h-8 w-2 rounded bg-purple-500 dark:bg-purple-400 mr-3"></span>
                                    <span className="bg-purple-50 dark:bg-purple-900 px-4 py-2 rounded-lg text-purple-800 dark:text-purple-200 shadow-sm">{group.topic}</span>
                                </h2>
                                <ul className="space-y-2">
                                    {group.lessons.map((lesson, idx) => (
                                        <li
                                            key={lesson.id}
                                            className="bg-gray-100 dark:bg-gray-700 p-4 rounded shadow hover:bg-purple-50 dark:hover:bg-purple-900 cursor-pointer"
                                            onClick={() => {
                                                setSelectedTopic(group.topic);
                                                setSelectedIndex(idx);
                                            }}
                                        >
                                            {lesson.title}
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
                            className="w-full mb-4 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 font-semibold py-1 rounded shadow hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors duration-150 flex items-center justify-center gap-1 text-xs"
                            onClick={() => {
                                setSelectedTopic(null);
                                setSelectedIndex(null);
                            }}
                        >
                            <span className="text-base">←</span> Back to Topic List
                        </button>

                        <div className="flex items-center justify-between mb-2">
                            <span className="font-semibold text-purple-700 dark:text-purple-300">{currentLesson.topic}</span>
                            <span className="text-sm text-gray-600 dark:text-gray-400">Lesson {currentLessonIndex! + 1} of {currentTopicLessons.length}</span>
                        </div>
                        <h2 className="text-2xl font-bold">{currentLesson.title}</h2>
                        <p>{currentLesson.description}</p>

                        <div>
                            <h3 className="font-semibold mt-4">Next.js Example:</h3>
                            <pre className="bg-white dark:bg-gray-800 p-4 rounded text-sm whitespace-pre-wrap border border-gray-200 dark:border-gray-600">
                                {currentLesson.codeExample}
                            </pre>
                        </div>

                        <div>
                            <h3 className="font-semibold mt-4">Expected Output:</h3>
                            <pre className="bg-black text-white p-4 rounded text-sm whitespace-pre-wrap">
                                {currentLesson.output}
                            </pre>
                        </div>

                        <div className="flex justify-between mt-6 gap-4">
                            {/* Previous button (always left) */}
                            {currentLessonIndex! > 0 ? (
                                <button
                                    className="w-1/2 bg-purple-600 dark:bg-purple-700 text-white px-4 py-2 rounded shadow hover:bg-purple-700 dark:hover:bg-purple-600 transition-colors duration-150"
                                    onClick={() => setSelectedIndex(currentLessonIndex! - 1)}
                                >
                                    {`← ${currentTopicLessons[currentLessonIndex! - 1].title}`}
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
                                    className="w-1/2 bg-purple-600 dark:bg-purple-700 text-white px-4 py-2 rounded shadow hover:bg-purple-700 dark:hover:bg-purple-600 transition-colors duration-150"
                                    onClick={() => setSelectedIndex(currentLessonIndex! + 1)}
                                >
                                    {`${currentTopicLessons[currentLessonIndex! + 1].title} →`}
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
        </main>
    );
}