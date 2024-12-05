"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

export default function QuizPage() {
  const { topic } = useParams(); // Get the topic from the URL
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [loading, setLoading] = useState(true);

  // Map topics to Open Trivia DB category IDs
  const topicCategoryMap = {
    sports: 21, // Sports category
    food: 17, // Food (Science & Nature as an example)
    "general-knowledge": 9, // General Knowledge category
    facts: 23, // History as an example for facts
  };

  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      try {
        const category = topicCategoryMap[topic];
        const response = await fetch(
          `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=easy&type=multiple`
        );

        // Validate response
        if (!response.ok) {
          throw new Error("Failed to fetch questions");
        }

        const data = await response.json();

        // Check if results exist
        if (!data.results || data.results.length === 0) {
          throw new Error("No questions found for this topic");
        }

        // Format questions
        const formattedQuestions = data.results.map((item) => ({
          question: item.question,
          options: [...item.incorrect_answers, item.correct_answer].sort(() => Math.random() - 0.5),
          correctAnswer: item.correct_answer,
        }));

        setQuestions(formattedQuestions);
      } catch (error) {
        console.error("Error fetching questions:", error);
        alert("An error occurred while fetching quiz questions. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [topic]);

  const handleAnswer = (selectedOption) => {
    if (selectedOption === questions[currentQuestionIndex]?.correctAnswer) {
      setScore((prevScore) => prevScore + 1);
    }

    const nextQuestion = currentQuestionIndex + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestionIndex(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowScore(false);
  };

  if (loading) {
    return <p className="text-center text-gray-700">Loading questions...</p>;
  }

  if (!questions.length) {
    return <p className="text-center text-red-500">No questions available for this topic.</p>;
  }

  return (
    <main className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      {showScore ? (
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4 text-green-600">
            You scored {score} out of {questions.length}
          </h1>
          <button
            onClick={restartQuiz}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600"
          >
            Restart Quiz
          </button>
        </div>
      ) : (
        <div className="w-full max-w-2xl text-center">
          <h2 className="text-2xl font-bold mb-4 text-purple-700">
            {topic.toUpperCase()} Quiz: Question {currentQuestionIndex + 1} of {questions.length}
          </h2>
          <p
            className="mb-6 text-lg text-gray-800 font-semibold"
            dangerouslySetInnerHTML={{ __html: questions[currentQuestionIndex]?.question }}
          ></p>
          <div className="grid gap-4">
            {questions[currentQuestionIndex]?.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option)}
                className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
