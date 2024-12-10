"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const startQuiz = () => {
    router.push("/quiz"); // Navigate to the quiz page
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-dark-blue to-black flex flex-col items-center justify-center text-light-green">
      {/* Animated Title */}
      <h1 className="text-5xl font-extrabold mb-6 animate-glow">
        Welcome to QuizApp!
      </h1>

      {/* Subheading with Fade-in Animation */}
      <p className="text-2xl mb-8 animate-fadeIn opacity-0">
        Are you ready to test your knowledge?
      </p>

      {/* Button with Cool Hover Animation */}
      <button
        onClick={startQuiz}
        className="bg-light-green text-dark-blue px-8 py-4 text-xl rounded-lg shadow-lg hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-green-500 transition-transform transform hover:scale-110 animate-fadeIn opacity-0"
        style={{ animationDelay: "1s" }}
      >
        Start Quiz
      </button>
    </main>
  );
}
