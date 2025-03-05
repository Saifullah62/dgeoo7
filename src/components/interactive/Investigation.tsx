import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, FileText, Image, Mic, AlertTriangle, CheckCircle2 } from 'lucide-react';

interface Evidence {
  type: 'document' | 'photo' | 'audio';
  name: string;
  content: string;
}

interface InvestigationProps {
  evidence: Evidence[];
  revelation: string;
  onComplete: () => void;
}

const Investigation: React.FC<InvestigationProps> = ({
  evidence,
  revelation,
  onComplete
}) => {
  const [examinedEvidence, setExaminedEvidence] = useState<Set<number>>(new Set());
  const [showRevelation, setShowRevelation] = useState(false);
  
  const handleExamineEvidence = (index: number) => {
    const newExamined = new Set(examinedEvidence);
    newExamined.add(index);
    setExaminedEvidence(newExamined);
    
    // If all evidence has been examined, show the revelation
    if (newExamined.size === evidence.length) {
      setTimeout(() => {
        setShowRevelation(true);
        onComplete();
      }, 1000);
    }
  };
  
  const getEvidenceIcon = (type: string) => {
    switch (type) {
      case 'document':
        return <FileText className="h-5 w-5" />;
      case 'photo':
        return <Image className="h-5 w-5" />;
      case 'audio':
        return <Mic className="h-5 w-5" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };
  
  return (
    <div className="bg-[#1e293b] rounded-lg border border-gray-700 p-6">
      <div className="flex items-start mb-6">
        <div className="bg-red-900 p-2 rounded-full mr-3">
          <Search className="text-red-400 h-6 w-6" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-100 mb-2">Investigation Evidence</h3>
          <p className="text-gray-400 text-sm">
            Examine each piece of evidence carefully to uncover the truth.
          </p>
        </div>
      </div>
      
      <div className="space-y-4 mb-6">
        {evidence.map((item, index) => (
          <motion.button
            key={index}
            className={`w-full text-left p-4 rounded-lg border ${
              examinedEvidence.has(index)
                ? 'bg-blue-900 border-blue-700'
                : 'bg-[#0f172a] border-gray-700 hover:border-gray-600'
            } transition-all`}
            onClick={() => handleExamineEvidence(index)}
            whileHover={!examinedEvidence.has(index) ? { scale: 1.02 } : {}}
            whileTap={!examinedEvidence.has(index) ? { scale: 0.98 } : {}}
          >
            <div className="flex items-start">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                examinedEvidence.has(index)
                  ? 'bg-blue-800 text-blue-300'
                  : 'bg-gray-800 text-gray-400'
              }`}>
                {getEvidenceIcon(item.type)}
              </div>
              <div>
                <div className="flex items-center">
                  <span className={`text-sm font-medium ${
                    examinedEvidence.has(index) ? 'text-blue-300' : 'text-gray-400'
                  }`}>
                    {item.type.toUpperCase()}
                  </span>
                  {examinedEvidence.has(index) && (
                    <CheckCircle2 className="text-blue-400 h-4 w-4 ml-2" />
                  )}
                </div>
                <h4 className={`font-medium mb-1 ${
                  examinedEvidence.has(index) ? 'text-blue-200' : 'text-gray-300'
                }`}>{item.name}</h4>
                <AnimatePresence>
                  {examinedEvidence.has(index) && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="text-sm text-gray-400"
                    >
                      {item.content}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.button>
        ))}
      </div>
      
      {showRevelation && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-900 bg-opacity-20 rounded-lg border border-red-800 p-4"
        >
          <div className="flex items-start">
            <AlertTriangle className="text-red-400 h-5 w-5 mr-2 mt-1" />
            <div>
              <h4 className="text-red-400 font-medium mb-2">Investigation Complete</h4>
              <p className="text-gray-300">{revelation}</p>
            </div>
          </div>
        </motion.div>
      )}
      
      <div className="mt-4 bg-[#0f172a] rounded-lg border border-gray-700 p-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-400">Evidence Examined:</span>
          <span className="text-blue-400 font-medium">
            {examinedEvidence.size} / {evidence.length}
          </span>
        </div>
        <div className="mt-2 h-1.5 bg-gray-700 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-blue-500"
            initial={{ width: 0 }}
            animate={{ width: `${(examinedEvidence.size / evidence.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>
    </div>
  );
};

export default Investigation;