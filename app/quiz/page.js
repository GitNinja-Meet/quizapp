"use client";

import { useRouter } from "next/navigation";

const topics = [
  { id: "sports", name: "Sports" },
  { id: "food", name: "Food" },
  { id: "general-knowledge", name: "General Knowledge" },
  { id: "facts", name: "Facts" },
];

export default function QuizTopics() {
  const router = useRouter();

  const startQuiz = (topic) => {
    router.push(`/quiz/${topic}`); // Navigate to the selected quiz topic
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-dark-blue to-blue-700 flex flex-col items-center justify-center text-light-green">
      <h1 className="text-4xl font-bold mb-6 animate-pulse">
        Choose a Quiz Topic
      </h1>
      <div className="grid gap-6">
        {topics.map((topic) => (
          <button
            key={topic.id}
            onClick={() => startQuiz(topic.id)}
            className="bg-light-green text-dark-blue px-6 py-3 rounded-lg hover:scale-105 transition-transform duration-200 shadow-lg"
          >
            {topic.name}
          </button>
        ))}
      </div>
    </main>
  );
}
