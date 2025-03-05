import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, X, ChevronRight } from 'lucide-react';
import { useGameStore, Tutorial as TutorialType } from '../store/gameStore';

interface TutorialProps {
  onComplete?: () => void;
}

const Tutorial: React.FC<TutorialProps> = ({ onComplete }) => {
  const {
    tutorials,
    currentTutorialId,
    completeTutorial,
    skipTutorial,
    tutorialEnabled
  } = useGameStore();
  
  if (!tutorialEnabled || !currentTutorialId) return null;
  
  const currentTutorial = tutorials.find(t => t.id === currentTutorialId);
  if (!currentTutorial) return null;
  
  const handleComplete = () => {
    completeTutorial(currentTutorialId);
    if (onComplete) onComplete();
  };
  
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="fixed bottom-4 right-4 max-w-sm bg-[#1e293b] rounded-lg border border-gray-700 shadow-lg"
      >
        <div className="p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center">
              <HelpCircle className="text-[#ffc107] h-5 w-5 mr-2" />
              <h3 className="text-lg font-semibold text-gray-100">
                {currentTutorial.title}
              </h3>
            </div>
            <button
              onClick={skipTutorial}
              className="text-gray-400 hover:text-gray-300"
            >
              <X size={20} />
            </button>
          </div>
          
          <p className="text-gray-300 mb-4">
            {currentTutorial.content}
          </p>
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-400">
              Step {currentTutorial.order} of {tutorials.length}
            </span>
            
            <motion.button
              onClick={handleComplete}
              className="flex items-center px-4 py-2 bg-[#ffc107] text-[#0f172a] rounded-lg font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {currentTutorial.requiredForProgress ? 'Continue' : 'Got it'}
              <ChevronRight className="ml-1 h-4 w-4" />
            </motion.button>
          </div>
        </div>
        
        <div className="bg-[#0f172a] rounded-b-lg overflow-hidden">
          <div className="h-1 bg-gray-700">
            <motion.div
              className="h-full bg-[#ffc107]"
              initial={{ width: 0 }}
              animate={{ 
                width: `${(currentTutorial.order / tutorials.length) * 100}%` 
              }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Tutorial;