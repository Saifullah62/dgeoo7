import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, Lightbulb, HelpCircle, CheckCircle2 } from 'lucide-react';

interface PuzzleProps {
  challenge: string;
  instructions: string;
  hint: string;
  solution: string;
  onComplete: () => void;
}

const Puzzle: React.FC<PuzzleProps> = ({
  challenge,
  instructions,
  hint,
  solution,
  onComplete
}) => {
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [attempts, setAttempts] = useState(0);
  
  const handleSolve = () => {
    setShowSolution(true);
    onComplete();
  };
  
  const handleHint = () => {
    setShowHint(true);
    setAttempts(prev => prev + 1);
  };
  
  return (
    <div className="bg-[#1e293b] rounded-lg border border-gray-700 p-6">
      <div className="flex items-start mb-6">
        <div className="bg-purple-900 p-2 rounded-full mr-3">
          <Brain className="text-purple-400 h-6 w-6" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-100 mb-2">{challenge}</h3>
          <p className="text-gray-400">{instructions}</p>
        </div>
      </div>
      
      <div className="space-y-4">
        {!showSolution && (
          <motion.button
            onClick={handleHint}
            className="w-full p-4 bg-[#0f172a] rounded-lg border border-gray-700 hover:border-gray-600 flex items-center justify-center text-gray-300"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={showHint}
          >
            <Lightbulb className="mr-2 h-5 w-5" />
            {showHint ? 'Hint Revealed' : 'Get Hint'}
          </motion.button>
        )}
        
        {showHint && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-yellow-900 bg-opacity-20 rounded-lg border border-yellow-800 p-4"
          >
            <div className="flex items-start">
              <HelpCircle className="text-yellow-400 h-5 w-5 mr-2 mt-1" />
              <div>
                <h4 className="text-yellow-400 font-medium mb-2">Hint</h4>
                <p className="text-gray-300">{hint}</p>
              </div>
            </div>
          </motion.div>
        )}
        
        {!showSolution && (
          <motion.button
            onClick={handleSolve}
            className="w-full py-3 bg-purple-900 rounded-lg border border-purple-700 hover:bg-purple-800 text-purple-200 font-medium"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Solve Puzzle
          </motion.button>
        )}
        
        {showSolution && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-green-900 bg-opacity-20 rounded-lg border border-green-800 p-4"
          >
            <div className="flex items-start">
              <CheckCircle2 className="text-green-400 h-5 w-5 mr-2 mt-1" />
              <div>
                <h4 className="text-green-400 font-medium mb-2">Solution</h4>
                <p className="text-gray-300">{solution}</p>
                {attempts > 0 && (
                  <p className="text-sm text-gray-400 mt-2">
                    Solved with {attempts} hint{attempts !== 1 ? 's' : ''} used
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Puzzle;