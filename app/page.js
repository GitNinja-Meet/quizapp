"use client"; // Enables client-side interactivity

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const startQuiz = () => {
    router.push("/quiz"); // Navigate to the quiz page
  };

  return (
    <main className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to QuizApp!</h1>
      <p className="text-xl text-gray-700 mb-6">Are you ready to test your knowledge?</p>
      <button
        onClick={startQuiz}
        className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600"
      >
        Start Quiz
      </button>
    </main>
  );
}
