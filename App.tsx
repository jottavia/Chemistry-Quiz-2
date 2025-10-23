
import React, { useState, useCallback } from 'react';
import { QUESTIONS } from './constants/quizData';
import QuestionCard from './components/QuestionCard';
import ResultCard from './components/ResultCard';

const App: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isQuizFinished, setIsQuizFinished] = useState<boolean>(false);

  const handleAnswerSelect = useCallback((answer: string) => {
    if (selectedAnswer !== null) return; // Prevent changing answer

    setSelectedAnswer(answer);
    if (answer === QUESTIONS[currentQuestionIndex].answer) {
      setScore(prevScore => prevScore + 1);
    }
  }, [currentQuestionIndex, selectedAnswer]);

  const handleNextQuestion = useCallback(() => {
    if (currentQuestionIndex < QUESTIONS.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
      setSelectedAnswer(null);
    } else {
      setIsQuizFinished(true);
    }
  }, [currentQuestionIndex]);

  const handleRestartQuiz = useCallback(() => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setIsQuizFinished(false);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <main className="bg-white rounded-2xl shadow-2xl p-6 md:p-10 max-w-3xl w-full transition-all duration-500">
        <header className="mb-6 pb-4 border-b-2 border-slate-200">
          <h1 className="text-2xl md:text-4xl font-extrabold text-center text-blue-700">
            Matter, Elements, and Mixtures Review
          </h1>
          <p className="text-center text-slate-500 mt-2">A Practice Test</p>
        </header>

        {!isQuizFinished ? (
          <QuestionCard
            question={QUESTIONS[currentQuestionIndex]}
            questionNumber={currentQuestionIndex + 1}
            totalQuestions={QUESTIONS.length}
            selectedAnswer={selectedAnswer}
            onAnswerSelect={handleAnswerSelect}
            onNext={handleNextQuestion}
          />
        ) : (
          <ResultCard
            score={score}
            totalQuestions={QUESTIONS.length}
            onRestart={handleRestartQuiz}
          />
        )}
      </main>
      <footer className="text-center mt-6 text-slate-500 text-sm">
        <p>Built with React, TypeScript, and Tailwind CSS.</p>
      </footer>
    </div>
  );
};

export default App;
