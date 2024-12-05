"use client";

import { useRouter } from "next/navigation";

const topics = [
  { id: "sports", name: "Sports" },
  { id: "food", name: "Food" },
  { id: "general-knowledge", name: "General Knowledge" },
  { id: "facts", name: "Facts" },
];

export default function Home() {
  const router = useRouter();

  const startQuiz = (topic) => {
    router.push(`/quiz/${topic}`); // Navigate to the selected quiz topic
  };

  return (
    <main className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold mb-6">Choose a Quiz Topic</h1>
      <div className="grid gap-4">
        {topics.map((topic) => (
          <button
            key={topic.id}
            onClick={() => startQuiz(topic.id)}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600"
          >
            {topic.name}
          </button>
        ))}
      </div>
    </main>
  );
}
