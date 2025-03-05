import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart2, AlertTriangle, CheckCircle2, Search } from 'lucide-react';

interface DataAnalysisProps {
  dataset: string;
  anomalies: string[];
  conclusion: string;
  onComplete: () => void;
}

const DataAnalysis: React.FC<DataAnalysisProps> = ({
  dataset,
  anomalies,
  conclusion,
  onComplete
}) => {
  const [discoveredAnomalies, setDiscoveredAnomalies] = useState<Set<number>>(new Set());
  const [showConclusion, setShowConclusion] = useState(false);
  
  const handleDiscoverAnomaly = (index: number) => {
    const newDiscovered = new Set(discoveredAnomalies);
    newDiscovered.add(index);
    setDiscoveredAnomalies(newDiscovered);
    
    // If all anomalies are discovered, show conclusion
    if (newDiscovered.size === anomalies.length) {
      setTimeout(() => {
        setShowConclusion(true);
        onComplete();
      }, 1000);
    }
  };
  
  return (
    <div className="bg-[#1e293b] rounded-lg border border-gray-700 p-6">
      <div className="flex items-start mb-6">
        <div className="bg-blue-900 p-2 rounded-full mr-3">
          <BarChart2 className="text-blue-400 h-6 w-6" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-100 mb-2">Data Analysis</h3>
          <p className="text-gray-400">Analyzing dataset: {dataset}</p>
        </div>
      </div>
      
      <div className="space-y-4 mb-6">
        {anomalies.map((anomaly, index) => (
          <motion.button
            key={index}
            className={`w-full text-left p-4 rounded-lg border ${
              discoveredAnomalies.has(index)
                ? 'bg-red-900 border-red-700'
                : 'bg-[#0f172a] border-gray-700 hover:border-gray-600'
            } transition-all`}
            onClick={() => handleDiscoverAnomaly(index)}
            whileHover={!discoveredAnomalies.has(index) ? { scale: 1.02 } : {}}
            whileTap={!discoveredAnomalies.has(index) ? { scale: 0.98 } : {}}
          >
            <div className="flex items-start">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                discoveredAnomalies.has(index)
                  ? 'bg-red-800 text-red-300'
                  : 'bg-gray-800 text-gray-400'
              }`}>
                {discoveredAnomalies.has(index) ? (
                  <AlertTriangle className="h-5 w-5" />
                ) : (
                  <Search className="h-5 w-5" />
                )}
              </div>
              <div>
                <p className={`${
                  discoveredAnomalies.has(index) ? 'text-red-300' : 'text-gray-300'
                }`}>{anomaly}</p>
                {discoveredAnomalies.has(index) && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-sm text-red-400 mt-2"
                  >
                    Anomaly detected and verified
                  </motion.p>
                )}
              </div>
            </div>
          </motion.button>
        ))}
      </div>
      
      <div className="mt-4 bg-[#0f172a] rounded-lg border border-gray-700 p-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-400">Anomalies Detected:</span>
          <span className="text-red-400 font-medium">
            {discoveredAnomalies.size} / {anomalies.length}
          </span>
        </div>
        <div className="mt-2 h-1.5 bg-gray-700 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-red-500"
            initial={{ width: 0 }}
            animate={{ width: `${(discoveredAnomalies.size / anomalies.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>
      
      {showConclusion && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 bg-blue-900 bg-opacity-20 rounded-lg border border-blue-800 p-4"
        >
          <div className="flex items-start">
            <CheckCircle2 className="text-blue-400 h-5 w-5 mr-2 mt-1" />
            <div>
              <h4 className="text-blue-400 font-medium mb-2">Analysis Complete</h4>
              <p className="text-gray-300">{conclusion}</p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default DataAnalysis;