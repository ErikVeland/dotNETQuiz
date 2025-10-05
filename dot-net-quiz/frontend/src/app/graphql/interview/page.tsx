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
}

interface AnswerResult {
  isCorrect: boolean;
  explanation?: string;
}

const baseUrl = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:5022";
const QUIZ_STORAGE_KEY = "graphql_quiz_state_v1";

const QUESTIONS_QUERY = gql`
  query GraphQLInterviewQuestions {
    graphQLInterviewQuestions {
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
  return text.replace(/\b(GraphQL|query|mutation|schema|resolver|type|field|directive|fragment|operation|API|runtime|parent|args|context|String|Int|Boolean|ID|input|enum|scalar|@include|@skip|fetch|request|response|server|client|execute|return|if|else|for|while|true|false|null)\b/g, '<code class="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono">$1<\/code>');
}

function shuffle<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
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
        stroke="#ec4899"
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
        fill="#ec4899"
        fontWeight="bold"
      >
        {Math.round(percent)}%
      </text>
    </svg>
  );
}

export default function InterviewQuiz() {
  const [questions, setQuestions] = useState<InterviewQuestion[]>([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<AnswerResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [shuffled, setShuffled] = useState(false);
  const router = useRouter();

  const { data, loading: gqlLoading, error: gqlError } = useQuery(QUESTIONS_QUERY);
  const questionsFromGQL: InterviewQuestion[] = data?.graphQLInterviewQuestions ?? [];

  const [submitAnswer] = useMutation(SUBMIT_ANSWER_MUTATION);

  useEffect(() => {
    if (!questionsFromGQL.length) return;
    
    const saved = localStorage.getItem(QUIZ_STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Only restore state if we have the same questions
        if (parsed.questions && parsed.questions.length === questionsFromGQL.length) {
          setQuestions(parsed.questions || []);
          setCurrent(parsed.current || 0);
          setSelected(parsed.selected ?? null);
          setScore(parsed.score || 0);
          setShuffled(true);
          setLoading(false);
          return;
        }
      } catch {}
    }
    
    // Initialize with GraphQL data
    const shuffledQs = shuffle(questionsFromGQL);
    setQuestions(shuffledQs.slice(0, 10));
    setShuffled(true);
    setLoading(false);
  }, [questionsFromGQL]);

  useEffect(() => {
    if (questions.length === 0) return;
    localStorage.setItem(
      QUIZ_STORAGE_KEY,
      JSON.stringify({ questions, current, selected, score })
    );
  }, [questions, current, selected, score]);

  const handleSubmit = async () => {
    if (selected === null) return;
    setFeedback(null);
    // Use Apollo mutation instead of REST
    const { data } = await submitAnswer({
      variables: { questionId: questions[current].id, answerIndex: selected },
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
  if (gqlError || error) return <main className="p-6 text-red-600">Error loading questions.</main>;
  if (!questions.length)
    return <main className="p-6">No questions available.</main>;
  if (current >= questions.length)
    return (
      <main className="min-h-screen p-6 bg-gray-50 text-gray-800 flex flex-col items-center justify-center">
        {score >= 8 ? (
          <div className="w-full max-w-2xl bg-white rounded-lg shadow-2xl border-8 border-pink-200 p-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-16 h-16 border-l-4 border-t-4 border-pink-400 rounded-tl-lg"></div>
            <div className="absolute top-0 right-0 w-16 h-16 border-r-4 border-t-4 border-pink-400 rounded-tr-lg"></div>
            <div className="absolute bottom-0 left-0 w-16 h-16 border-l-4 border-b-4 border-pink-400 rounded-bl-lg"></div>
            <div className="absolute bottom-0 right-0 w-16 h-16 border-r-4 border-b-4 border-pink-400 rounded-br-lg"></div>
            <div className="text-center relative z-10">
              <div className="text-6xl mb-4">🎉</div>
              <h1 className="text-4xl font-bold mb-2 text-pink-800">Certificate of Completion</h1>
              <div className="text-xl text-pink-600 mb-6">GraphQL Interview Quiz</div>
              <div className="bg-gradient-to-r from-green-100 to-pink-100 rounded-lg p-6 mb-6 border border-green-200">
                <div className="text-3xl font-bold text-green-700 mb-2">PASSED!</div>
                <div className="text-lg text-gray-700">Congratulations on completing the quiz successfully</div>
              </div>
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="bg-pink-50 rounded-lg p-4 border border-pink-200">
                  <div className="text-2xl font-bold text-pink-700">{score}</div>
                  <div className="text-sm text-pink-600">Correct Answers</div>
                </div>
                <div className="bg-pink-50 rounded-lg p-4 border border-pink-200">
                  <div className="text-2xl font-bold text-pink-700">{Math.round((score / questions.length) * 100)}%</div>
                  <div className="text-sm text-pink-600">Success Rate</div>
                </div>
              </div>
              <div className="text-sm text-gray-500 mb-6">
                This certificate acknowledges your understanding of key GraphQL concepts and readiness for technical interviews.
              </div>
              <Link 
                href="/" 
                className="inline-block bg-pink-600 text-white px-8 py-3 rounded-lg shadow-lg hover:bg-pink-700 transition-colors duration-150 font-semibold"
                onClick={clearQuizState}
              >
                Return to Home
              </Link>
            </div>
          </div>
        ) : (
          <div className="w-full max-w-xl bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="text-5xl mb-4">📚</div>
            <h1 className="text-3xl font-bold mb-4 text-gray-800">Quiz Complete</h1>
            <div className="bg-orange-50 rounded-lg p-6 mb-6 border border-orange-200">
              <div className="text-2xl font-bold text-orange-700 mb-2">Keep Learning!</div>
              <div className="text-gray-700">You're on the right track, just need a bit more practice</div>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-xl font-bold text-gray-700">{score}</div>
                <div className="text-sm text-gray-600">Correct</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-xl font-bold text-gray-700">{questions.length - score}</div>
                <div className="text-sm text-gray-600">To Review</div>
              </div>
            </div>
            <div className="text-sm text-gray-600 mb-6">
              Score: {score} out of {questions.length} ({Math.round((score / questions.length) * 100)}%)
            </div>
            <div className="space-y-3">
              <Link 
                href="/graphql/lessons" 
                className="block w-full bg-pink-600 text-white px-6 py-3 rounded-lg shadow hover:bg-pink-700 transition-colors duration-150 font-semibold"
              >
                Review Lessons
              </Link>
              <Link 
                href="/" 
                className="block w-full bg-gray-200 text-gray-800 px-6 py-3 rounded-lg shadow hover:bg-gray-300 transition-colors duration-150 font-semibold"
                onClick={clearQuizState}
              >
                Return to Home
              </Link>
              <button
                className="block w-full bg-orange-500 text-white px-6 py-3 rounded-lg shadow hover:bg-orange-600 transition-colors duration-150 font-semibold"
                onClick={() => { clearQuizState(); window.location.reload(); }}
              >
                Try Again
              </button>
            </div>
          </div>
        )}
      </main>
    );

  const q = questions[current];
  const percent = ((current) / questions.length) * 100;

  return (
    <main className="min-h-screen p-6 bg-gray-50 text-gray-800 flex flex-col items-center">
      <div className="w-full max-w-xl bg-white rounded shadow p-6">
        <Link href="/" className="inline-block mb-4 bg-pink-100 text-pink-800 font-semibold py-1 px-2 rounded shadow hover:bg-pink-200 transition-colors duration-150 flex items-center gap-1 text-xs">
          <span className="text-base">←</span> Back to Home
        </Link>
        <h1 className="text-2xl font-bold mb-4 mt-2 text-pink-800">GraphQL Interview Quiz</h1>
        <div className="bg-pink-50 rounded-lg p-4 mb-6 border border-pink-200">
          <div className="flex items-center justify-between">
            <div className="flex flex-col items-center">
              <CircularProgress percent={percent} />
              <div className="text-xs text-pink-600 mt-1 font-medium">Progress</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-2xl font-bold text-pink-700">{score}</div>
              <div className="text-xs text-pink-600 font-medium">Score</div>
              <div className="text-xs text-gray-500 mt-1">out of {questionsFromGQL.length}</div>
            </div>
          </div>
        </div>
        <div className="mb-2 text-pink-600 font-medium">Topic: {q.topic}</div>
        <div className="mb-4 font-semibold text-lg" dangerouslySetInnerHTML={{ __html: `Q${current + 1}: ${formatQuestionText(q.question)}` }} />
        {q.type === "multiple-choice" && q.choices && (
          <ul className="space-y-3 mb-6">
            {q.choices.map((choice, idx) => (
              <li key={idx}>
                <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg border border-gray-200 hover:bg-pink-50 hover:border-pink-300 transition-colors duration-150">
                  <input
                    type="radio"
                    name="choice"
                    value={idx}
                    checked={selected === idx}
                    onChange={() => setSelected(idx)}
                    disabled={!!feedback}
                    className="text-pink-600"
                  />
                  <span className="text-sm" dangerouslySetInnerHTML={{ __html: formatQuestionText(choice) }} />
                </label>
              </li>
            ))}
          </ul>
        )}
        {q.type === "open-ended" && (
          <div className="mb-6 p-4 bg-pink-50 rounded-lg border border-pink-200">
            <div className="text-pink-700 italic text-sm">💭 Think about your answer, then reveal the explanation below</div>
          </div>
        )}
        {!feedback && q.type === "multiple-choice" && (
          <button
            className="w-full bg-pink-600 text-white px-6 py-3 rounded-lg shadow hover:bg-pink-700 disabled:opacity-50 transition-colors duration-150 font-semibold"
            onClick={handleSubmit}
            disabled={selected === null}
          >
            Submit Answer
          </button>
        )}
        {!feedback && q.type === "open-ended" && (
          <button
            className="w-full bg-pink-600 text-white px-6 py-3 rounded-lg shadow hover:bg-pink-700 transition-colors duration-150 font-semibold"
            onClick={async () => {
              const res = await fetch(`${baseUrl}/api/graphql/interviewquestions/submit`, {
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
              <div className={`p-4 rounded-lg mb-4 ${feedback.isCorrect ? "bg-green-100 text-green-800 border border-green-200" : "bg-red-100 text-red-800 border border-red-200"}`}>
                <div className="font-bold text-lg mb-2">
                  {feedback.isCorrect ? "✅ Correct!" : "❌ Incorrect"}
                </div>
              </div>
            )}
            <div className="bg-gray-100 p-4 rounded-lg border border-gray-200">
              <span className="font-semibold text-gray-800">Explanation:</span>
              <div className="mt-2 text-gray-700" dangerouslySetInnerHTML={{ __html: formatQuestionText(feedback.explanation ?? "") }} />
            </div>
            {current < questionsFromGQL.length - 1 && (
              <button
                className="w-full mt-4 bg-pink-600 text-white px-6 py-3 rounded-lg shadow hover:bg-pink-700 transition-colors duration-150 font-semibold"
                onClick={nextQuestion}
              >
                Next Question →
              </button>
            )}
            {current === questionsFromGQL.length - 1 && (
              <button
                className="w-full mt-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow hover:bg-green-700 transition-colors duration-150 font-semibold"
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