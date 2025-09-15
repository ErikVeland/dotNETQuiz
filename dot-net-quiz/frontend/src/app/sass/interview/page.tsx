'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { gql, useQuery } from '@apollo/client';

const GET_SASS_QUESTIONS = gql`
  query GetSassInterviewQuestions {
    sassInterviewQuestions {
      id
      topic
      type
      question
      choices
      correctAnswer
      explanation
    }
  }
`;

interface SassInterviewQuestion {
  id: number;
  topic?: string | null;
  type?: string | null;
  question?: string | null;
  choices?: string[] | null;
  correctAnswer?: number | null;
  explanation?: string | null;
}

export default function SassInterviewPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [shuffledQuestions, setShuffledQuestions] = useState<SassInterviewQuestion[]>([]);
  
  const { loading, error, data } = useQuery(GET_SASS_QUESTIONS);

  useEffect(() => {
    if (data?.sassInterviewQuestions) {
      // Shuffle questions randomly
      const shuffled = [...data.sassInterviewQuestions].sort(() => Math.random() - 0.5);
      setShuffledQuestions(shuffled);
    }
  }, [data]);

  const formatCode = (text: string | undefined | null) => {
    if (!text) return text;
    return text.replace(/`([^`]+)`/g, '<code className="bg-pink-100 text-pink-800 px-1 py-0.5 rounded text-sm">$1</code>');
  };

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...userAnswers, answerIndex];
    setUserAnswers(newAnswers);

    if (currentQuestionIndex < shuffledQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResults(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setShowResults(false);
    
    // Reshuffle questions
    if (data?.sassInterviewQuestions) {
      const shuffled = [...data.sassInterviewQuestions].sort(() => Math.random() - 0.5);
      setShuffledQuestions(shuffled);
    }
  };

  if (loading) return <div className="flex justify-center items-center h-screen">Loading SASS interview questions...</div>;
  if (error) return <div className="flex justify-center items-center h-screen text-red-500">Error loading questions. Please try again later.</div>;
  if (!shuffledQuestions.length) return <div className="flex justify-center items-center h-screen">No questions available.</div>;

  const currentQuestion = shuffledQuestions[currentQuestionIndex];
  const score = userAnswers.reduce((acc, answer, index) => {
    return acc + (answer === shuffledQuestions[index].correctAnswer ? 1 : 0);
  }, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <Link href="/sass" className="text-pink-600 hover:text-pink-800 font-medium flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to SASS
          </Link>
          <h1 className="text-3xl font-bold text-pink-800">SASS Interview Quiz</h1>
        </div>

        {!showResults ? (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="flex justify-between items-center mb-6">
              <span className="bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-sm font-medium">
                Question {currentQuestionIndex + 1} of {shuffledQuestions.length}
              </span>
              <span className="text-gray-500 text-sm">
                Topic: {currentQuestion.topic}
              </span>
            </div>

            <div 
              className="text-xl mb-8 text-gray-800"
              dangerouslySetInnerHTML={{ 
                __html: formatCode(currentQuestion.question) || '' 
              }}
            />

            {currentQuestion.choices && (
              <div className="space-y-4">
                {currentQuestion.choices.map((choice, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(index)}
                    className="w-full text-left p-4 rounded-lg border border-pink-200 hover:border-pink-400 hover:bg-pink-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50"
                  >
                    <div className="flex items-center">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center mr-4">
                        <span className="text-pink-800 font-medium">{String.fromCharCode(65 + index)}</span>
                      </div>
                      <span 
                        className="text-gray-700"
                        dangerouslySetInnerHTML={{ 
                          __html: formatCode(choice) || '' 
                        }}
                      />
                    </div>
                  </button>
                ))}
              </div>
            )}

            {currentQuestion.type === 'open-ended' && (
              <div className="mt-6">
                <textarea 
                  className="w-full p-4 border border-pink-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  rows={4}
                  placeholder="Type your answer here..."
                ></textarea>
                <button
                  onClick={() => handleAnswer(-1)}
                  className="mt-4 bg-pink-600 hover:bg-pink-700 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-200"
                >
                  Submit Answer
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-pink-800 mb-6">Quiz Results</h2>
            
            <div className="text-center mb-8">
              <div className="inline-block bg-pink-100 rounded-full p-6 mb-4">
                <span className="text-4xl font-bold text-pink-800">{score}</span>
                <span className="text-xl text-pink-600">/{shuffledQuestions.length}</span>
              </div>
              <p className="text-lg text-gray-700">
                You scored {score} out of {shuffledQuestions.length} questions correctly
              </p>
              <p className="text-gray-600 mt-2">
                {score === shuffledQuestions.length ? 'Perfect! You\'re a SASS expert! 🎉' : 
                 score >= shuffledQuestions.length * 0.8 ? 'Great job! You know your SASS well! 👍' : 
                 score >= shuffledQuestions.length * 0.6 ? 'Good effort! Keep learning! 💪' : 
                 'Keep practicing to improve your SASS skills! 📚'}
              </p>
            </div>

            <div className="space-y-6">
              {shuffledQuestions.map((question, index) => (
                <div 
                  key={question.id} 
                  className={`p-4 rounded-lg border ${
                    userAnswers[index] === question.correctAnswer 
                      ? 'bg-green-50 border-green-200' 
                      : 'bg-red-50 border-red-200'
                  }`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-medium text-gray-800">
                      <span className="mr-2">{index + 1}.</span>
                      <span dangerouslySetInnerHTML={{ __html: formatCode(question.question) || '' }} />
                    </h3>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      userAnswers[index] === question.correctAnswer 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {userAnswers[index] === question.correctAnswer ? 'Correct' : 'Incorrect'}
                    </span>
                  </div>
                  
                  {userAnswers[index] !== question.correctAnswer && (
                    <div className="mb-3">
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Your answer:</span>{' '}
                        <span className="text-red-600">
                          {question.choices && userAnswers[index] >= 0 
                            ? question.choices[userAnswers[index]] 
                            : 'No answer provided'}
                        </span>
                      </p>
                    </div>
                  )}
                  
                  <div className="mb-3">
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Correct answer:</span>{' '}
                      <span className="text-green-600">
                        {question.choices && question.correctAnswer !== null 
                          ? question.choices[question.correctAnswer] 
                          : 'N/A'}
                      </span>
                    </p>
                  </div>
                  
                  {question.explanation && (
                    <div className="text-sm text-gray-700 bg-pink-50 p-3 rounded">
                      <span className="font-medium">Explanation:</span> {question.explanation}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="flex justify-center mt-8">
              <button
                onClick={resetQuiz}
                className="bg-pink-600 hover:bg-pink-700 text-white font-medium py-3 px-8 rounded-lg transition-colors duration-200 flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                </svg>
                Retake Quiz
              </button>
            </div>
          </div>
        )}

        <div className="text-center text-gray-600 text-sm">
          <p>Test your SASS knowledge with these interview questions. Good luck!</p>
        </div>
      </div>
    </div>
  );
}