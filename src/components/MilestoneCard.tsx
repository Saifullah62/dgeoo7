import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircle2, 
  Building, 
  Clock, 
  ArrowRight, 
  Lock, 
  ChevronRight, 
  AlertTriangle, 
  Zap, 
  Brain, 
  FileText, 
  Code, 
  Database, 
  Shield,
  Circle as CircleIcon,
  Target
} from 'lucide-react';
import { Milestone } from '../types/game';
import Quiz from './interactive/Quiz';
import Simulation from './interactive/Simulation';
import SecurityChallenge from './interactive/SecurityChallenge';
import Puzzle from './interactive/Puzzle';
import Investigation from './interactive/Investigation';
import DataAnalysis from './interactive/DataAnalysis';
import DossierViewer from './interactive/DossierViewer';
import DemoTransactionStatus from './DemoTransactionStatus';
import { getDemoMode } from '../utils/demo';
import { toast } from 'sonner';

interface MilestoneCardProps {
  milestone: Milestone;
  onClick: () => void;
  disabled: boolean;
  showVisualEffects?: boolean;
}

const MilestoneCard: React.FC<MilestoneCardProps> = ({ milestone, onClick, disabled, showVisualEffects = false }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [showingTransactions, setShowingTransactions] = useState(false);
  const [milestoneTxid, setMilestoneTxid] = useState<string | null>(null);
  const [rewardTxid, setRewardTxid] = useState<string | null>(null);
  const [showRewardTx, setShowRewardTx] = useState(false);
  
  // Determine if this milestone is the current active one
  const isActive = !milestone.completed && !disabled;
  
  const handleMilestoneComplete = useCallback(async () => {
    if (!isActive || showingTransactions) return;
    
    const demoMode = getDemoMode();
    if (demoMode.enabled) {
      try {
        setShowingTransactions(true);
        // Generate demo transaction IDs
        const mTxid = `demo_tx_${Date.now().toString(36)}`;
        const rTxid = `demo_tx_${Math.random().toString(36).substring(2)}`;
        setMilestoneTxid(mTxid);
        setRewardTxid(rTxid);
      } catch (error) {
        console.error('Error completing milestone:', error);
        toast.error('Failed to complete milestone');
        setShowingTransactions(false);
      }
    } else {
      onClick();
    }
  }, [isActive, showingTransactions, onClick]);
  
  const handleMilestoneConfirmed = useCallback(() => {
    setShowRewardTx(true);
  }, []);
  
  const handleRewardConfirmed = useCallback(() => {
    setShowingTransactions(false);
    onClick();
  }, [onClick]);

  // Get difficulty icon
  const getDifficultyIcon = () => {
    switch(milestone.difficulty) {
      case 'easy':
        return <CircleIcon className="text-green-400 mr-1" size={12} />;
      case 'medium':
        return <CircleIcon className="text-blue-400 mr-1" size={12} />;
      case 'hard':
        return <CircleIcon className="text-orange-400 mr-1" size={12} />;
      case 'expert':
        return <AlertTriangle className="text-red-400 mr-1" size={12} />;
      case 'legendary':
        return <Zap className="text-purple-400 mr-1" size={12} />;
      default:
        return <CircleIcon className="text-gray-400 mr-1" size={12} />;
    }
  };

  // Get interactive content icon
  const getInteractiveIcon = () => {
    if (!milestone.interactiveContent) return null;
    
    switch(milestone.interactiveContent.type) {
      case 'quiz':
        return <Brain className="text-purple-400 mr-1" size={12} />;
      case 'simulation':
        return <Zap className="text-blue-400 mr-1" size={12} />;
      case 'puzzle':
        return <Brain className="text-green-400 mr-1" size={12} />;
      case 'dossier':
        return <FileText className="text-yellow-400 mr-1" size={12} />;
      case 'investigation':
        return <FileText className="text-red-400 mr-1" size={12} />;
      case 'data-analysis':
        return <Database className="text-blue-400 mr-1" size={12} />;
      case 'security-challenge':
        return <Shield className="text-yellow-400 mr-1" size={12} />;
      case 'intelligence-report':
        return <FileText className="text-red-400 mr-1" size={12} />;
      case 'security-audit':
        return <Shield className="text-red-400 mr-1" size={12} />;
      case 'implementation':
        return <Code className="text-blue-400 mr-1" size={12} />;
      case 'mission':
        return <Target className="text-purple-400 mr-1" size={12} />;
      default:
        return <FileText className="text-gray-400 mr-1" size={12} />;
    }
  };
  
  const toggleDetails = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowDetails(!showDetails);
  };
  
  // Render interactive content
  const renderInteractiveContent = () => {
    if (!milestone.interactiveContent) return null;
    
    switch (milestone.interactiveContent.type) {
      case 'quiz':
        return (
          <Quiz
            question={milestone.interactiveContent.question}
            options={milestone.interactiveContent.options}
            correctAnswer={milestone.interactiveContent.correctAnswer}
            explanation={milestone.interactiveContent.explanation}
            onComplete={handleMilestoneComplete}
          />
        );
      case 'simulation':
        return (
          <Simulation
            scenario={milestone.interactiveContent.scenario}
            steps={milestone.interactiveContent.steps}
            outcome={milestone.interactiveContent.outcome}
            onComplete={handleMilestoneComplete}
          />
        );
      case 'security-challenge':
        return (
          <SecurityChallenge
            scenario={milestone.interactiveContent.scenario}
            securityLayers={milestone.interactiveContent.securityLayers}
            discovery={milestone.interactiveContent.discovery}
            onComplete={handleMilestoneComplete}
          />
        );
      case 'puzzle':
        return (
          <Puzzle
            challenge={milestone.interactiveContent.challenge}
            instructions={milestone.interactiveContent.instructions}
            hint={milestone.interactiveContent.hint}
            solution={milestone.interactiveContent.solution}
            onComplete={handleMilestoneComplete}
          />
        );
      case 'investigation':
        return (
          <Investigation
            evidence={milestone.interactiveContent.evidence}
            revelation={milestone.interactiveContent.revelation}
            onComplete={handleMilestoneComplete}
          />
        );
      case 'data-analysis':
        return (
          <DataAnalysis
            dataset={milestone.interactiveContent.dataset}
            anomalies={milestone.interactiveContent.anomalies}
            conclusion={milestone.interactiveContent.conclusion}
            onComplete={handleMilestoneComplete}
          />
        );
      case 'dossier':
        return (
          <DossierViewer
            subject={milestone.interactiveContent.subject}
            details={milestone.interactiveContent.details}
            briefing={milestone.interactiveContent.briefing}
            onComplete={handleMilestoneComplete}
          />
        );
      default:
        return null;
    }
  };
  
  return (
    <div 
      className={`border rounded-lg transition-all ${
        milestone.completed 
          ? 'bg-[#0f2b1d] border-green-800' 
          : isActive
            ? `bg-[#172038] border-[#ffc107] cursor-pointer hover:bg-[#1a2544] ${showVisualEffects ? 'active-milestone-glow' : ''}`
            : 'bg-[#0f172a] border-gray-700 opacity-75'
      }`}
    >
      <div 
        className="p-4"
        onClick={isActive && !showDetails ? handleMilestoneComplete : undefined}
      >
        <div className="flex items-start">
          <div className="mr-3 mt-1">
            {milestone.completed ? (
              <div className="bg-green-900 p-2 rounded-full">
                <CheckCircle2 className="text-green-400" size={18} />
              </div>
            ) : isActive ? (
              <div className={`bg-[#ffc107] p-2 rounded-full ${showVisualEffects ? 'pulse-animation' : 'animate-pulse'}`}>
                <ChevronRight className="text-[#0f172a]" size={18} />
              </div>
            ) : (
              <div className="bg-gray-800 p-2 rounded-full">
                <Lock className="text-gray-500" size={18} />
              </div>
            )}
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h3 className={`font-medium text-lg ${
                milestone.completed ? 'text-green-400' : 
                isActive ? 'text-[#ffc107]' : 'text-gray-500'
              }`}>{milestone.title}</h3>
              <div className="flex items-center">
                {milestone.type === 'agency' ? (
                  <span className="badge badge-blue">
                    <Building size={12} className="mr-1" />
                    Agency
                  </span>
                ) : (
                  <span className="badge badge-purple">
                    <Target size={12} className="mr-1" />
                    Story
                  </span>
                )}
              </div>
            </div>
            
            <p className={`mt-2 ${
              milestone.completed ? 'text-gray-300' : 
              isActive ? 'text-gray-300' : 'text-gray-500'
            }`}>{milestone.description}</p>
            
            <div className="mt-3 flex flex-wrap gap-2">
              {milestone.agency && (
                <span className="badge badge-blue">
                  <Building size={12} className="mr-1" />
                  {milestone.agency}
                </span>
              )}
              
              {milestone.difficulty && (
                <span className={`badge ${
                  milestone.difficulty === 'easy' ? 'badge-green' :
                  milestone.difficulty === 'medium' ? 'badge-blue' :
                  milestone.difficulty === 'hard' ? 'badge-orange' :
                  milestone.difficulty === 'expert' ? 'badge-red' :
                  'badge-purple'
                }`}>
                  {getDifficultyIcon()}
                  {milestone.difficulty.charAt(0).toUpperCase() + milestone.difficulty.slice(1)}
                </span>
              )}
              
              {milestone.interactiveContent && (
                <span className="badge badge-purple">
                  {getInteractiveIcon()}
                  {milestone.interactiveContent.type.charAt(0).toUpperCase() + milestone.interactiveContent.type.slice(1)}
                </span>
              )}
            </div>
            
            <div className="mt-3 flex justify-between items-center">
              <div className="text-sm">
                {milestone.completed && milestone.timestamp ? (
                  <span className="flex items-center text-green-400 text-xs">
                    <Clock size={12} className="mr-1" />
                    Completed on {new Date(milestone.timestamp).toLocaleDateString()}
                  </span>
                ) : isActive ? (
                  <span className="flex items-center text-[#ffc107] text-xs font-medium">
                    <ArrowRight size={12} className="mr-1" />
                    Current Mission
                  </span>
                ) : (
                  <span className="text-gray-500 text-xs">Locked</span>
                )}
              </div>
              <div className="badge badge-gold">
                <Target size={12} className="mr-1" />
                {milestone.reward} satoshis
              </div>
            </div>
            
            {milestone.completed && milestone.txid && (
              <div className="mt-2 text-xs text-gray-500 bg-[#0f172a] p-2 rounded border border-gray-800 font-mono overflow-hidden text-ellipsis">
                <span className="font-medium text-gray-400">TXID:</span> {milestone.txid.substring(0, 16)}...
              </div>
            )}
            
            {milestone.interactiveContent && (
              <div className="mt-3">
                <button
                  onClick={toggleDetails}
                  className="text-xs flex items-center text-blue-400 hover:text-blue-300"
                >
                  {showDetails ? 'Hide Details' : 'Show Mission Details'}
                  <ChevronRight size={12} className={`ml-1 transition-transform ${showDetails ? 'rotate-90' : ''}`} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Show transaction status */}
      {showingTransactions && (
        <div className="px-4 pb-4">
          {milestoneTxid && !showRewardTx && (
            <DemoTransactionStatus
              txid={milestoneTxid}
              type="milestone"
              onConfirmed={handleMilestoneConfirmed}
            />
          )}
          {rewardTxid && showRewardTx && (
            <DemoTransactionStatus
              txid={rewardTxid}
              type="reward"
              amount={milestone.reward}
              onConfirmed={handleRewardConfirmed}
            />
          )}
        </div>
      )}
      
      {/* Interactive Content */}
      {showDetails && milestone.interactiveContent && (
        <div className="px-4 pb-4 pt-2 border-t border-gray-700 mt-2">
          {renderInteractiveContent()}
        </div>
      )}
    </div>
  );
};

export default MilestoneCard;