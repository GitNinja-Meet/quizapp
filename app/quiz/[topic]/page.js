"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function QuizPage() {
  const params = useParams();
  const topic = params?.topic || "general-knowledge";

  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [timeLeft, setTimeLeft] = useState(10);

  useEffect(() => {
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setScore(0);
    setLoading(true);
    setError("");
    setTimeLeft(10);

    const fetchQuestions = async () => {
      try {
        const response = await fetch(
          `https://opentdb.com/api.php?amount=10&category=${getCategoryId(
            topic
          )}&type=multiple`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch questions");
        }

        const data = await response.json();

        if (!data.results || data.results.length === 0) {
          throw new Error("No questions found");
        }

        const formattedQuestions = data.results.map((q) => ({
          question: q.question,
          options: shuffle([...q.incorrect_answers, q.correct_answer]),
          correctAnswer: q.correct_answer,
        }));

        setQuestions(formattedQuestions);
      } catch (err) {
        setError("Failed to load questions. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [topic]);

  const getCategoryId = (topic) => {
    const categories = {
      sports: 21,
      "general-knowledge": 9,
      food: 17,
      facts: 23,
    };
    return categories[topic] || 9;
  };

  const shuffle = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  const handleAnswer = (answer) => {
    if (answer === questions[currentQuestionIndex].correctAnswer) {
      setScore((prev) => prev + 1);
    }

    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setTimeLeft(10); // Reset timer for the next question
    } else {
      setTimeLeft(0); // Stop timer when quiz ends
    }
  };

  const restartQuiz = () => {
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setScore(0);
    setTimeLeft(10);
    setLoading(true);
    setError("");
    setTimeout(() => {
      location.reload();
    }, 200);
  };

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && currentQuestionIndex < questions.length) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setTimeLeft(10); // Move to the next question automatically
    }
  }, [timeLeft, currentQuestionIndex, questions.length]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-blue-800 text-green-300">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-blue-800 text-red-500">
        {error}
      </div>
    );
  }

  if (currentQuestionIndex >= questions.length) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-blue-800 text-green-300">
        <h1 className="text-4xl font-bold mb-4">
          You scored {score} out of {questions.length}
        </h1>
        <button
          onClick={restartQuiz}
          className="bg-green-500 text-blue-900 px-4 py-2 rounded-lg mt-4"
        >
          Restart Quiz
        </button>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-800 text-green-300">
      <h1 className="text-4xl font-bold mb-6">Quiz on {topic}</h1>
      <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg max-w-xl">
        <h2 className="mb-4">
          Question {currentQuestionIndex + 1} of {questions.length}:{" "}
          {currentQuestion.question}
        </h2>
        <div className="mb-4">
          <span className="text-yellow-300">Time Left: {timeLeft}s</span>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(option)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
