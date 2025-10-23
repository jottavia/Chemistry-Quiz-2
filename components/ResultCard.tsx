
import React from 'react';
import Button from './Button';

interface ResultCardProps {
  score: number;
  totalQuestions: number;
  onRestart: () => void;
}

const ResultCard: React.FC<ResultCardProps> = ({ score, totalQuestions, onRestart }) => {
  const percentage = Math.round((score / totalQuestions) * 100);
  
  let feedbackMessage = '';
  if (percentage === 100) {
    feedbackMessage = "Perfect Score! You're a science whiz! 🏆";
  } else if (percentage >= 80) {
    feedbackMessage = "Excellent work! You really know your stuff. ✨";
  } else if (percentage >= 60) {
    feedbackMessage = "Good job! A little more practice and you'll be an expert. 👍";
  } else {
    feedbackMessage = "Nice try! Review the material and give it another shot. 📚";
  }

  return (
    <div className="text-center p-8 flex flex-col items-center">
      <h2 className="text-4xl font-bold text-slate-800 mb-2">Quiz Complete!</h2>
      <p className="text-lg text-slate-600 mb-6">{feedbackMessage}</p>
      <div className="bg-slate-100 rounded-full p-6 my-4">
        <p className="text-5xl font-bold text-blue-600">{percentage}%</p>
        <p className="text-slate-700 mt-2 font-medium">
          You answered {score} out of {totalQuestions} questions correctly.
        </p>
      </div>
      <Button onClick={onRestart} variant="secondary" className="mt-8">
        Restart Quiz
      </Button>
    </div>
  );
};

export default ResultCard;
