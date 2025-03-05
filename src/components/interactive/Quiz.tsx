import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, HelpCircle, AlertTriangle } from 'lucide-react';
import { getDemoMode } from '../../utils/demo';
import { toast } from 'sonner';

interface QuizProps {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  onComplete: (correct: boolean) => void;
}

const Quiz: React.FC<QuizProps> = ({
  question,
  options,
  correctAnswer,
  explanation,
  onComplete
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  
  const handleAnswer = (index: number) => {
    if (selectedAnswer !== null) return; // Prevent multiple answers
    
    setSelectedAnswer(index);
    const correct = index === correctAnswer;
    const demoMode = getDemoMode();
    
    // In demo mode, always show success after a brief delay
    if (demoMode.enabled) {
      setTimeout(() => {
        setShowExplanation(true);
        toast.success('Correct answer! Moving to next step...');
        onComplete(true);
      }, 1000);
    } else {
      // Show explanation after a short delay
      setTimeout(() => {
        setShowExplanation(true);
        onComplete(correct);
      }, 1000);
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#1e293b] rounded-lg border border-gray-700 p-6"
    >
      <div className="flex items-start mb-6">
        <div className="bg-blue-900 p-2 rounded-full mr-3">
          <HelpCircle className="text-blue-400 h-6 w-6" />
        </div>
        <h3 className="text-xl font-semibold text-gray-100">{question}</h3>
      </div>
      
      <div className="space-y-3 mb-6">
        {options.map((option, index) => (
          <motion.button
            key={index}
            className={`w-full text-left p-4 rounded-lg border ${
              selectedAnswer === null
                ? 'bg-[#0f172a] border-gray-700 hover:border-gray-600'
                : selectedAnswer === index
                  ? index === correctAnswer
                    ? 'bg-green-900 border-green-700'
                    : 'bg-red-900 border-red-700'
                  : index === correctAnswer
                    ? 'bg-green-900 border-green-700'
                    : 'bg-[#0f172a] border-gray-700 opacity-50'
            } transition-all`}
            onClick={() => handleAnswer(index)}
            disabled={selectedAnswer !== null}
            whileHover={selectedAnswer === null ? { scale: 1.02 } : {}}
            whileTap={selectedAnswer === null ? { scale: 0.98 } : {}}
          >
            <div className="flex items-center">
              {selectedAnswer !== null && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="mr-3"
                >
                  {index === correctAnswer ? (
                    <CheckCircle2 className="text-green-400 h-5 w-5" />
                  ) : selectedAnswer === index ? (
                    <XCircle className="text-red-400 h-5 w-5" />
                  ) : null}
                </motion.div>
              )}
              <span className={`text-lg ${
                selectedAnswer === null
                  ? 'text-gray-300'
                  : selectedAnswer === index
                    ? index === correctAnswer
                      ? 'text-green-400'
                      : 'text-red-400'
                    : index === correctAnswer
                      ? 'text-green-400'
                      : 'text-gray-500'
              }`}>{option}</span>
            </div>
          </motion.button>
        ))}
      </div>
      
      {showExplanation && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#0f172a] rounded-lg border border-gray-700 p-4"
        >
          <div className="flex items-start">
            <AlertTriangle className="text-[#ffc107] h-5 w-5 mr-2 mt-1" />
            <div>
              <h4 className="text-[#ffc107] font-medium mb-2">Explanation</h4>
              <p className="text-gray-300">{explanation}</p>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Quiz;