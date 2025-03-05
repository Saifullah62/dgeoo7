import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Database, CheckCircle2, Zap, Lock, Shield, Clock } from 'lucide-react';
import { DemoTransaction } from '../types/game';
import { toast } from 'sonner';

interface DemoTransactionStatusProps {
  txid: string;
  type: DemoTransaction['type'];
  amount?: number;
  onConfirmed: () => void;
}

const DemoTransactionStatus: React.FC<DemoTransactionStatusProps> = ({
  txid,
  type,
  amount,
  onConfirmed
}) => {
  const [status, setStatus] = useState<'pending' | 'confirming' | 'confirmed'>('pending');
  const [step, setStep] = useState(1);
  
  useEffect(() => {
    // Simulate blockchain transaction steps
    const steps = [
      {
        delay: 500,
        action: () => {
          setStep(2);
          setStatus('confirming');
          toast.info('Transaction broadcasted to the blockchain network', {
            description: 'Your action is being permanently recorded.'
          });
        }
      },
      {
        delay: 1500,
        action: () => {
          setStep(3);
          toast.info('Transaction verified by network nodes', {
            description: 'Multiple nodes have validated your transaction.'
          });
        }
      },
      {
        delay: 2500,
        action: () => {
          setStep(4);
          setStatus('confirmed');
          toast.success('Transaction confirmed and recorded', {
            description: 'Your achievement is now permanently stored on the blockchain.'
          });
          onConfirmed();
        }
      }
    ];

    // Execute each step
    steps.forEach((step, index) => {
      setTimeout(step.action, step.delay);
    });

    return () => {
      // Cleanup timeouts if component unmounts
      steps.forEach((_, index) => clearTimeout(index));
    };
  }, [onConfirmed]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#1e293b] rounded-lg border border-gray-700 p-4"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center">
          <Database className="text-[#ffc107] mr-2" size={16} />
          <span className="text-gray-300 font-medium">
            {type === 'milestone' ? 'Recording Achievement' :
             type === 'reward' ? 'Processing Reward' :
             'Issuing Badge'}
          </span>
        </div>
        <div className="flex items-center">
          {status === 'pending' ? (
            <span className="flex items-center text-[#ffc107]">
              <Zap className="animate-pulse mr-1" size={14} />
              Broadcasting
            </span>
          ) : status === 'confirming' ? (
            <span className="flex items-center text-blue-400">
              <Shield className="animate-pulse mr-1" size={14} />
              Verifying
            </span>
          ) : (
            <span className="flex items-center text-green-400">
              <CheckCircle2 className="mr-1" size={14} />
              Confirmed
            </span>
          )}
        </div>
      </div>

      <div className="space-y-3 mb-4">
        <div className={`flex items-center ${step >= 1 ? 'text-[#ffc107]' : 'text-gray-500'}`}>
          <Zap size={14} className="mr-2" />
          <span className="text-sm">Broadcasting to blockchain network</span>
        </div>
        
        <div className={`flex items-center ${step >= 2 ? 'text-blue-400' : 'text-gray-500'}`}>
          <Shield size={14} className="mr-2" />
          <span className="text-sm">Verifying transaction integrity</span>
        </div>
        
        <div className={`flex items-center ${step >= 3 ? 'text-purple-400' : 'text-gray-500'}`}>
          <Lock size={14} className="mr-2" />
          <span className="text-sm">Creating permanent record</span>
        </div>
        
        <div className={`flex items-center ${step >= 4 ? 'text-green-400' : 'text-gray-500'}`}>
          <CheckCircle2 size={14} className="mr-2" />
          <span className="text-sm">Transaction confirmed</span>
        </div>
      </div>
      
      <div className="bg-[#0f172a] rounded p-3 mb-3">
        <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
          <span>Transaction ID:</span>
          <span className="font-mono">{txid}</span>
        </div>
        {amount && (
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span>Amount:</span>
            <span className="text-[#ffc107]">{amount} satoshis</span>
          </div>
        )}
      </div>

      <div className="bg-blue-900 bg-opacity-20 rounded p-3 border border-blue-800">
        <div className="flex items-start">
          <Clock className="text-blue-400 mr-2 mt-1" size={14} />
          <p className="text-xs text-gray-300">
            {type === 'milestone' 
              ? 'Your achievement is being permanently recorded on the blockchain. This creates an immutable record that can be verified by anyone.'
              : type === 'reward'
              ? 'Your reward is being processed through the blockchain. This demonstrates how blockchain enables instant, secure micropayments.'
              : 'Your badge is being issued as a verifiable credential on the blockchain, similar to how government credentials could be issued.'}
          </p>
        </div>
      </div>

      <div className="mt-3 h-1.5 bg-gray-700 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-[#ffc107] to-[#ff8f00]"
          initial={{ width: 0 }}
          animate={{ width: `${(step / 4) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.div>
  );
};

export default DemoTransactionStatus;