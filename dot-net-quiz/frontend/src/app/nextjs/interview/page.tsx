"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useQuery, gql, useMutation } from '@apollo/client';

interface InterviewQuestion {
  id: number;
  topic: string;
  type: string;
  question: string;
  choices?: string[];
  correctAnswer?: number;
  explanation?: string;
  choiceOrder?: number[]; // Track the order of choices after shuffling
}

interface AnswerResult {
  isCorrect: boolean;
  explanation?: string;
}

const baseUrl = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:5022";
const QUIZ_STORAGE_KEY = "nextjs_quiz_state_v1";

const QUESTIONS_QUERY = gql`
  query NextJsInterviewQuestions {
    nextJsInterviewQuestions {
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

const SUBMIT_ANSWER_MUTATION = gql`
  mutation SubmitAnswer($questionId: Int!, $answerIndex: Int!) {
    submitAnswer(questionId: $questionId, answerIndex: $answerIndex) {
      isCorrect
      explanation
    }
  }
`;

function formatQuestionText(text: string) {
  return text.replace(/\b(Next\.js|App Router|Pages Router|getStaticProps|getServerSideProps|getInitialProps|useEffect|Vercel|Image|API Route|middleware|dynamic route|SSR|SSG|props|handler|POST|NEXT_PUBLIC_|env|React|component|props|state|build|deploy|route|layout|static|server|client|fetch|export|import|async|await|function|const|let|var|return|if|else|for|while|true|false|null)\b/g, '<code class="bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded text-sm font-mono">$1<\/code>');
}

function shuffle<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Update the shuffle function to track choice order
function shuffleQuestionChoices(question: InterviewQuestion): InterviewQuestion {
  // If no choices or only one choice, return as is
  if (!question.choices || question.choices.length <= 1) {
    return question;
  }
  
  // Create an array of indices and shuffle them
  const indices = question.choices.map((_, index) => index);
  const shuffledIndices = shuffle(indices);
  
  return {
    ...question,
    choiceOrder: shuffledIndices
  };
}

function CircularProgress({ percent }: { percent: number }) {
  const radius = 32;
  const stroke = 6;
  const normalizedRadius = radius - stroke / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percent / 100) * circumference;
  return (
    <svg height={radius * 2} width={radius * 2} className="block mx-auto">
      <circle
        stroke="#e5e7eb"
        fill="transparent"
        strokeWidth={stroke}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
      <circle
        stroke="#a78bfa"
        fill="transparent"
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={circumference + " " + circumference}
        style={{ strokeDashoffset, transition: "stroke-dashoffset 0.5s" }}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dy="0.3em"
        fontSize="1.1em"
        fill="#a78bfa"
        fontWeight="bold"
      >
        {Math.round(percent)}%
      </text>
    </svg>
  );
}

export default function InterviewQuiz() {
  const [shuffledQuestions, setShuffledQuestions] = useState<InterviewQuestion[]>([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<AnswerResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [shuffled, setShuffled] = useState(false);
  const router = useRouter();

  const { data, loading: gqlLoading, error: gqlError } = useQuery(QUESTIONS_QUERY);
  const gqlQuestions: InterviewQuestion[] = data?.nextJsInterviewQuestions ?? [];

  const [submitAnswer] = useMutation(SUBMIT_ANSWER_MUTATION);

  useEffect(() => {
    const saved = localStorage.getItem(QUIZ_STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setShuffledQuestions(parsed.questions || []);
        setCurrent(parsed.current || 0);
        setSelected(parsed.selected ?? null);
        setScore(parsed.score || 0);
        setShuffled(true);
        setLoading(false);
        return;
      } catch {}
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (gqlQuestions.length > 0 && !shuffled) {
      // Shuffle both questions and choices within each question
      const shuffledQs = shuffle(gqlQuestions).map(q => shuffleQuestionChoices(q));
      setShuffledQuestions(shuffledQs.slice(0, 10));
      setShuffled(true);
    }
  }, [gqlQuestions, shuffled]);

  useEffect(() => {
    if (shuffledQuestions.length === 0) return;
    localStorage.setItem(
      QUIZ_STORAGE_KEY,
      JSON.stringify({ questions: shuffledQuestions, current, selected, score })
    );
  }, [shuffledQuestions, current, selected, score]);

  const handleSubmit = async () => {
    if (selected === null) return;
    setFeedback(null);
    
    // Map the selected display index back to the original index
    let originalSelectedIndex = selected;
    if (q.choiceOrder && q.correctAnswer !== undefined) {
      // The selected index is the display index, we need the original index
      originalSelectedIndex = q.choiceOrder[selected];
    }
    
    // Use Apollo mutation instead of REST
    const { data } = await submitAnswer({
      variables: { questionId: shuffledQuestions[current].id, answerIndex: originalSelectedIndex },
      optimisticResponse: {
        submitAnswer: {
          isCorrect: false, // Optimistic default
          explanation: 'Checking...',
          __typename: 'AnswerResult',
        },
      },
    });
    setFeedback(data.submitAnswer);
    if (data.submitAnswer.isCorrect) setScore((s) => s + 1);
  };

  const nextQuestion = () => {
    setSelected(null);
    setFeedback(null);
    setCurrent((c) => c + 1);
  };

  const clearQuizState = () => {
    localStorage.removeItem(QUIZ_STORAGE_KEY);
  };

  if (gqlLoading || loading) return <main className="p-6">Loading questions...</main>;
  if (gqlError) return <main className="p-6 text-red-600 dark:text-red-400">Error loading questions.</main>;
  if (!shuffledQuestions.length)
    return <main className="p-6">No questions available.</main>;
  if (current >= shuffledQuestions.length)
    return (
      <main className="min-h-screen p-6 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 flex flex-col items-center justify-center">
        {score >= 8 ? (
          <div className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-lg shadow-2xl border-8 border-purple-200 dark:border-purple-900 p-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-16 h-16 border-l-4 border-t-4 border-purple-400 dark:border-purple-600 rounded-tl-lg"></div>
            <div className="absolute top-0 right-0 w-16 h-16 border-r-4 border-t-4 border-purple-400 dark:border-purple-600 rounded-tr-lg"></div>
            <div className="absolute bottom-0 left-0 w-16 h-16 border-l-4 border-b-4 border-purple-400 dark:border-purple-600 rounded-bl-lg"></div>
            <div className="absolute bottom-0 right-0 w-16 h-16 border-r-4 border-b-4 border-purple-400 dark:border-purple-600 rounded-br-lg"></div>
            <div className="text-center relative z-10">
              <div className="text-6xl mb-4">🎉</div>
              <h1 className="text-4xl font-bold mb-2 text-purple-800 dark:text-purple-300">Certificate of Completion</h1>
              <div className="text-xl text-purple-600 dark:text-purple-400 mb-6">Next.js Interview Quiz</div>
              <div className="bg-gradient-to-r from-green-100 dark:from-green-900/30 to-purple-100 dark:to-purple-900/30 rounded-lg p-6 mb-6 border border-green-200 dark:border-green-800">
                <div className="text-3xl font-bold text-green-700 dark:text-green-300 mb-2">PASSED!</div>
                <div className="text-lg text-gray-700 dark:text-gray-300">Congratulations on completing the quiz successfully</div>
              </div>
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="bg-purple-50 dark:bg-purple-900/30 rounded-lg p-4 border border-purple-200 dark:border-purple-800">
                  <div className="text-2xl font-bold text-purple-700 dark:text-purple-300">{score}</div>
                  <div className="text-sm text-purple-600 dark:text-purple-400">Correct Answers</div>
                </div>
                <div className="bg-purple-50 dark:bg-purple-900/30 rounded-lg p-4 border border-purple-200 dark:border-purple-800">
                  <div className="text-2xl font-bold text-purple-700 dark:text-purple-300">{Math.round((score / shuffledQuestions.length) * 100)}%</div>
                  <div className="text-sm text-purple-600 dark:text-purple-400">Success Rate</div>
                </div>
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                This certificate acknowledges your understanding of key Next.js concepts and readiness for technical interviews.
              </div>
              <Link 
                href="/" 
                className="inline-block bg-purple-600 dark:bg-purple-700 text-white px-8 py-3 rounded-lg shadow-lg hover:bg-purple-700 dark:hover:bg-purple-600 transition-colors duration-150 font-semibold"
                onClick={clearQuizState}
              >
                Return to Home
              </Link>
            </div>
          </div>
        ) : (
          <div className="w-full max-w-xl bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
            <div className="text-5xl mb-4">📚</div>
            <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-200">Quiz Complete</h1>
            <div className="bg-orange-50 dark:bg-orange-900/30 rounded-lg p-6 mb-6 border border-orange-200 dark:border-orange-800">
              <div className="text-2xl font-bold text-orange-700 dark:text-orange-300 mb-2">Keep Learning!</div>
              <div className="text-gray-700 dark:text-gray-300">You're on the right track, just need a bit more practice</div>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <div className="text-xl font-bold text-gray-700 dark:text-gray-200">{score}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Correct</div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <div className="text-xl font-bold text-gray-700 dark:text-gray-200">{shuffledQuestions.length - score}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">To Review</div>
              </div>
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-6">
              Score: {score} out of {shuffledQuestions.length} ({Math.round((score / shuffledQuestions.length) * 100)}%)
            </div>
            <div className="space-y-3">
              <Link 
                href="/nextjs/lessons" 
                className="block w-full bg-purple-600 dark:bg-purple-700 text-white px-6 py-3 rounded-lg shadow hover:bg-purple-700 dark:hover:bg-purple-600 transition-colors duration-150 font-semibold"
              >
                Review Lessons
              </Link>
              <Link 
                href="/" 
                className="block w-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-6 py-3 rounded-lg shadow hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-150 font-semibold"
                onClick={clearQuizState}
              >
                Return to Home
              </Link>
              <button
                className="block w-full bg-orange-500 dark:bg-orange-600 text-white px-6 py-3 rounded-lg shadow hover:bg-orange-600 dark:hover:bg-orange-700 transition-colors duration-150 font-semibold"
                onClick={() => { clearQuizState(); window.location.reload(); }}
              >
                Try Again
              </button>
            </div>
          </div>
        )}
      </main>
    );

  const q = shuffledQuestions[current];
  const percent = ((current) / shuffledQuestions.length) * 100;

  // Get the choices in the correct display order
  const getDisplayChoices = () => {
    if (!q.choices) return [];
    if (!q.choiceOrder) return q.choices;
    
    // Return choices in the shuffled order
    return q.choiceOrder.map(index => q.choices[index]);
  };
  
  // Get the correct answer index in the display order
  const getDisplayCorrectAnswerIndex = () => {
    if (q.correctAnswer === undefined) return -1;
    if (!q.choiceOrder) return q.correctAnswer;
    
    // Find where the original correct answer is in the shuffled order
    return q.choiceOrder.indexOf(q.correctAnswer);
  };

  return (
    <main className="min-h-screen p-6 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 flex flex-col items-center">
      <div className="w-full max-w-xl bg-white dark:bg-gray-800 rounded shadow p-6">
        <Link href="/" className="inline-block mb-4 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 font-semibold py-1 px-2 rounded shadow hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors duration-150 flex items-center gap-1 text-xs">
          <span className="text-base">←</span> Back to Home
        </Link>
        <h1 className="text-2xl font-bold mb-4 mt-2 text-purple-800 dark:text-purple-300">Next.js Interview Quiz</h1>
        <div className="bg-purple-50 dark:bg-purple-900/30 rounded-lg p-4 mb-6 border border-purple-200 dark:border-purple-800">
          <div className="flex items-center justify-between">
            <div className="flex flex-col items-center">
              <CircularProgress percent={percent} />
              <div className="text-xs text-purple-600 dark:text-purple-400 mt-1 font-medium">Progress</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-2xl font-bold text-purple-700 dark:text-purple-300">{score}</div>
              <div className="text-xs text-purple-600 dark:text-purple-400 font-medium">Score</div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">out of {shuffledQuestions.length}</div>
            </div>
          </div>
        </div>
        <div className="mb-2 text-purple-600 dark:text-purple-400 font-medium">Topic: {q.topic}</div>
        <div className="mb-4 font-semibold text-lg" dangerouslySetInnerHTML={{ __html: `Q${current + 1}: ${formatQuestionText(q.question)}` }} />
        {/* Multiple choice */}
        {q.type === "multiple-choice" && q.choices && (
          <ul className="space-y-3">
            {getDisplayChoices().map((choice, displayIndex) => (
              <li key={displayIndex}>
                <label
                  className={`flex items-start p-4 border rounded-lg cursor-pointer transition-colors ${
                    selected === displayIndex
                      ? "border-purple-300 dark:border-purple-600 bg-purple-50 dark:bg-purple-900/30"
                      : "border-gray-200 dark:border-gray-700 hover:border-purple-200 dark:hover:border-purple-500"
                  }`}
                >
                  <input
                    type="radio"
                    name={`question-${q.id}`}
                    value={displayIndex}
                    checked={selected === displayIndex}
                    onChange={() => setSelected(displayIndex)}
                    className="mt-1 mr-3 h-4 w-4 text-purple-600 dark:text-purple-400 focus:ring-purple-500"
                  />
                  <span className="text-gray-800 dark:text-gray-200" dangerouslySetInnerHTML={{ __html: formatQuestionText(choice) }} />
                </label>
              </li>
            ))}
          </ul>
        )}
        {q.type === "open-ended" && (
          <div className="mb-6 p-4 bg-purple-50 dark:bg-purple-900/30 rounded-lg border border-purple-200 dark:border-purple-800">
            <div className="text-purple-700 dark:text-purple-300 italic text-sm">💭 Think about your answer, then reveal the explanation below</div>
          </div>
        )}
        {!feedback && q.type === "multiple-choice" && (
          <button
            className="w-full bg-purple-600 dark:bg-purple-700 text-white px-6 py-3 rounded-lg shadow hover:bg-purple-700 dark:hover:bg-purple-600 disabled:opacity-50 transition-colors duration-150 font-semibold"
            onClick={handleSubmit}
            disabled={selected === null}
          >
            Submit Answer
          </button>
        )}
        {!feedback && q.type === "open-ended" && (
          <button
            className="w-full bg-purple-600 dark:bg-purple-700 text-white px-6 py-3 rounded-lg shadow hover:bg-purple-700 dark:hover:bg-purple-600 transition-colors duration-150 font-semibold"
            onClick={async () => {
              const res = await fetch(`${baseUrl}/api/nextjs/interviewquestions/submit`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  questionId: q.id,
                  answerIndex: 0,
                }),
              });
              const data = await res.json();
              setFeedback(data);
              if (data.isCorrect) setScore((s) => s + 1);
            }}
          >
            Show Explanation
          </button>
        )}
        {feedback && (
          <div className="mt-6">
            {q.type === "multiple-choice" && (
              <div className={`p-4 rounded-lg mb-4 ${feedback.isCorrect ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 border border-green-200 dark:border-green-800" : "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 border border-red-200 dark:border-red-800"}`}>
                <div className="font-bold text-lg mb-2">
                  {feedback.isCorrect ? "✅ Correct!" : "❌ Incorrect"}
                </div>
              </div>
            )}
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
              <span className="font-semibold text-gray-800 dark:text-gray-200">Explanation:</span>
              <div className="mt-2 text-gray-700 dark:text-gray-300" dangerouslySetInnerHTML={{ __html: formatQuestionText(feedback.explanation ?? "") }} />
            </div>
            {current < shuffledQuestions.length - 1 && (
              <button
                className="w-full mt-4 bg-purple-600 dark:bg-purple-700 text-white px-6 py-3 rounded-lg shadow hover:bg-purple-700 dark:hover:bg-purple-600 transition-colors duration-150 font-semibold"
                onClick={nextQuestion}
              >
                Next Question →
              </button>
            )}
            {current === shuffledQuestions.length - 1 && (
              <button
                className="w-full mt-4 bg-green-600 dark:bg-green-700 text-white px-6 py-3 rounded-lg shadow hover:bg-green-700 dark:hover:bg-green-600 transition-colors duration-150 font-semibold"
                onClick={nextQuestion}
              >
                Finish Quiz 🎉
              </button>
            )}
          </div>
        )}
      </div>
    </main>
  );
}