import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, CheckCircle2, RotateCcw, AlertTriangle } from 'lucide-react';

interface SimulationProps {
  scenario: string;
  steps: string[];
  outcome: string;
  onComplete: () => void;
}

const Simulation: React.FC<SimulationProps> = ({
  scenario,
  steps,
  outcome,
  onComplete
}) => {
  const [currentStep, setCurrentStep] = useState(-1);
  const [completed, setCompleted] = useState(false);
  const [showOutcome, setShowOutcome] = useState(false);
  
  useEffect(() => {
    if (currentStep >= steps.length) {
      setCompleted(true);
      setTimeout(() => {
        setShowOutcome(true);
        onComplete();
      }, 1000);
    }
  }, [currentStep, steps.length, onComplete]);
  
  const handleStart = () => {
    setCurrentStep(0);
  };
  
  const handleNextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };
  
  const handleReset = () => {
    setCurrentStep(-1);
    setCompleted(false);
    setShowOutcome(false);
  };
  
  return (
    <div className="bg-[#1e293b] rounded-lg border border-gray-700 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-100">{scenario}</h3>
        {completed && (
          <motion.button
            onClick={handleReset}
            className="text-gray-400 hover:text-gray-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <RotateCcw size={20} />
          </motion.button>
        )}
      </div>
      
      {currentStep === -1 ? (
        <motion.button
          onClick={handleStart}
          className="w-full py-4 bg-[#0f172a] rounded-lg border border-gray-700 hover:border-gray-600 flex items-center justify-center text-[#ffc107] font-medium"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Play size={20} className="mr-2" />
          Start Simulation
        </motion.button>
      ) : (
        <div className="space-y-4">
          <div className="relative pt-2">
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-700">
              <motion.div
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-[#ffc107]"
                initial={{ width: 0 }}
                animate={{ width: `${(currentStep / steps.length) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
          
          <div className="space-y-4">
            <AnimatePresence mode="wait">
              {steps.map((step, index) => (
                index <= currentStep && (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className={`flex items-start p-4 rounded-lg ${
                      index === currentStep
                        ? 'bg-blue-900 bg-opacity-50 border border-blue-700'
                        : 'bg-[#0f172a] border border-gray-700'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                      index === currentStep
                        ? 'bg-blue-700 text-blue-200'
                        : 'bg-green-900 text-green-400'
                    }`}>
                      {index === currentStep ? (
                        <span className="text-sm font-medium">{index + 1}</span>
                      ) : (
                        <CheckCircle2 size={16} />
                      )}
                    </div>
                    <p className={`flex-1 ${
                      index === currentStep ? 'text-blue-200' : 'text-gray-300'
                    }`}>{step}</p>
                  </motion.div>
                )
              ))}
            </AnimatePresence>
          </div>
          
          {!completed && (
            <motion.button
              onClick={handleNextStep}
              className="w-full py-3 bg-blue-900 rounded-lg border border-blue-700 hover:bg-blue-800 text-blue-200 font-medium"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Next Step
            </motion.button>
          )}
          
          {showOutcome && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 bg-green-900 bg-opacity-50 rounded-lg border border-green-700 p-4"
            >
              <div className="flex items-start">
                <AlertTriangle className="text-green-400 h-5 w-5 mr-2 mt-1" />
                <div>
                  <h4 className="text-green-400 font-medium mb-2">Simulation Complete</h4>
                  <p className="text-gray-300">{outcome}</p>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
};

export default Simulation;