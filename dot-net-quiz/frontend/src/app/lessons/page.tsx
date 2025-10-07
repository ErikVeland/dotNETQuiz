    // If we're loading or have retry attempts, show the enhanced loading component
    if (loading || retryCountRef.current > 0) {
        return (
            <main className="min-h-screen p-6 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
                <div className="max-w-2xl mx-auto">
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
            </main>
        );
    }
    
    // Only show error if it's not a network error (network errors are handled by retry mechanism)
    if (error && !isNetworkError(error)) {
        return (
            <main className="min-h-screen p-6 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
                <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
                    <div className="text-red-600 dark:text-red-400">Error loading lessons.</div>
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
        <div className="w-full p-6">
            {/* Updated container with solid background instead of glass morphism effect */}
            <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
                <Link href="/" className="inline-block mb-4 bg-teal-100 dark:bg-teal-900 text-teal-800 dark:text-teal-200 font-semibold py-1 px-2 rounded shadow hover:bg-teal-200 dark:hover:bg-teal-800 transition-colors duration-150 flex items-center gap-1 text-xs">
                    <span className="text-base">←</span> Back to Home
                </Link>
                <h1 className="text-3xl font-bold mb-6 mt-2 text-teal-700 dark:text-teal-300">Learn .NET Step by Step</h1>

                {/* Topic Overview */}
                {selectedTopic === null && (
                    <div>
                        {topicGroups.map(group => (
                            <div key={group.topic} className="mb-10">
                                <h2 className="text-2xl font-extrabold mb-4 flex items-center gap-2 text-teal-700 dark:text-teal-300">
                                    <span className="inline-block h-8 w-2 rounded bg-teal-500 dark:bg-teal-400 mr-3"></span>
                                    <span className="bg-teal-50 dark:bg-teal-900 px-4 py-2 rounded-lg text-teal-800 dark:text-teal-200 shadow-sm">{group.topic}</span>
                                </h2>
                                <ul className="space-y-2">
                                    {group.lessons.map((lesson, idx) => (
                                        <li
                                            key={lesson.id}
                                            className="bg-gray-100 dark:bg-gray-700 p-4 rounded shadow hover:bg-blue-50 dark:hover:bg-teal-900 cursor-pointer border border-gray-200 dark:border-gray-600"
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
                    // Updated container with solid background instead of glass morphism effect
                    <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-xl shadow-lg space-y-4 mt-4 border border-gray-200 dark:border-gray-600">
                        <button
                            className="w-full mb-4 bg-teal-100 dark:bg-teal-900 text-teal-800 dark:text-teal-200 font-semibold py-1 rounded shadow hover:bg-teal-200 dark:hover:bg-teal-800 transition-colors duration-150 flex items-center justify-center gap-1 text-xs"
                            onClick={() => {
                                setSelectedTopic(null);
                                setSelectedIndex(null);
                            }}
                        >
                            <span className="text-base">←</span> Back to Topic List
                        </button>

                        <div className="flex items-center justify-between mb-2">
                            <span className="font-semibold text-teal-700 dark:text-teal-300">{currentLesson.topic}</span>
                            <span className="text-sm text-gray-600 dark:text-gray-400">Lesson {currentLessonIndex! + 1} of {currentTopicLessons.length}</span>
                        </div>
                        <h2 className="text-2xl font-bold">{currentLesson.title}</h2>
                        <p>{currentLesson.description}</p>

                        <div>
                            <h3 className="font-semibold mt-4">C# Example:</h3>
                            <pre className="bg-white dark:bg-gray-800 p-4 rounded text-sm whitespace-pre-wrap border border-gray-200 dark:border-gray-600">
                                {currentLesson.codeExample}
                            </pre>
                        </div>

                        <div>
                            <h3 className="font-semibold mt-4">Expected Output:</h3>
                            <pre className="bg-black text-white p-4 rounded text-sm whitespace-pre-wrap border border-gray-700 dark:border-gray-600">
                                {currentLesson.output}
                            </pre>
                        </div>

                        <div className="flex justify-between mt-6 gap-4">
                            {/* Previous button (always left) */}
                            {currentLessonIndex! > 0 ? (
                                <button
                                    className="w-1/2 bg-teal-600 dark:bg-teal-700 text-white px-4 py-2 rounded shadow hover:bg-teal-700 dark:hover:bg-teal-600 transition-colors duration-150"
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
                                    className="w-1/2 bg-teal-600 dark:bg-teal-700 text-white px-4 py-2 rounded shadow hover:bg-teal-700 dark:hover:bg-teal-600 transition-colors duration-150"
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
                            <>
                                {isLastCategory ? (
                                    <div className="flex flex-col sm:flex-row gap-4 mt-8">
                                        <Link 
                                            href="/" 
                                            className="flex-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white px-4 py-2 rounded shadow hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 transition-all duration-150 font-semibold text-center"
                                        >
                                            Exit Lessons
                                        </Link>
                                        <Link 
                                            href="/interview" 
                                            className="flex-1 bg-gradient-to-r from-teal-500 via-blue-500 to-indigo-500 text-white px-4 py-2 rounded shadow hover:from-teal-600 hover:via-blue-600 hover:to-indigo-600 transition-all duration-150 font-semibold text-center"
                                        >
                                            Start .NET Quiz
                                        </Link>
                                    </div>
                                ) : (
                                    <button
                                        className="w-full mt-8 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white px-4 py-2 rounded shadow hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 transition-all duration-150 font-semibold"
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
    );
}