
import React from 'react';
import { Question } from '../types';
import Button from './Button';

interface QuestionCardProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  selectedAnswer: string | null;
  onAnswerSelect: (answer: string) => void;
  onNext: () => void;
}

const Choice: React.FC<{
  text: string;
  isSelected: boolean;
  isCorrect: boolean;
  isRevealed: boolean;
  onClick: () => void;
}> = ({ text, isSelected, isCorrect, isRevealed, onClick }) => {
  const getChoiceClasses = () => {
    const base = 'border-2 rounded-lg p-4 text-left w-full transition-all duration-300 font-medium cursor-pointer text-slate-700';
    if (!isRevealed) {
      return `${base} border-slate-300 bg-white hover:bg-blue-50 hover:border-blue-400`;
    }
    if (isCorrect) {
      return `${base} border-green-500 bg-green-100 text-green-800 cursor-default`;
    }
    if (isSelected && !isCorrect) {
      return `${base} border-red-500 bg-red-100 text-red-800 cursor-default`;
    }
    return `${base} border-slate-300 bg-slate-50 text-slate-500 cursor-default`;
  };

  return (
    <button onClick={onClick} disabled={isRevealed} className={getChoiceClasses()}>
      {text}
    </button>
  );
};

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  questionNumber,
  totalQuestions,
  selectedAnswer,
  onAnswerSelect,
  onNext,
}) => {
  const isAnswered = selectedAnswer !== null;
  const isCorrect = selectedAnswer === question.answer;

  return (
    <div>
      <div className="mb-6">
        <p className="text-sm font-semibold text-blue-600">Question {questionNumber} of {totalQuestions}</p>
        <h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-2">{question.text}</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {question.choices.map((choice) => (
          <Choice
            key={choice}
            text={choice}
            isSelected={selectedAnswer === choice}
            isCorrect={question.answer === choice}
            isRevealed={isAnswered}
            onClick={() => onAnswerSelect(choice)}
          />
        ))}
      </div>

      <div className="mt-6 min-h-[2.5rem] flex items-center justify-between">
        {isAnswered && (
          <div className={`text-lg font-bold ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
            {isCorrect ? '✅ Correct!' : `❌ Incorrect. The right answer is: ${question.answer}`}
          </div>
        )}
        <div className="flex-grow"></div>
        <Button onClick={onNext} disabled={!isAnswered}>
          {questionNumber === totalQuestions ? 'Finish' : 'Next Question ▶'}
        </Button>
      </div>
    </div>
  );
};

export default QuestionCard;
