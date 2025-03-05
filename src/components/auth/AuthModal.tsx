import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Mail, Lock, User, X, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { toast } from 'sonner';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { signIn, signUp } = useAuthStore();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (mode === 'signin') {
        await signIn(email, password);
        toast.success('Welcome back, agent!');
      } else {
        await signUp(email, password, username);
        toast.success('Welcome to DGE, agent!');
      }
      onClose();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };
  
  if (!isOpen) return null;
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-[#1e293b] rounded-lg border border-gray-800 p-6 w-full max-w-md relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-300"
        >
          <X size={20} />
        </button>
        
        <div className="flex items-center justify-center mb-6">
          <Shield className="text-[#ffc107] h-12 w-12" />
        </div>
        
        <h2 className="text-2xl font-bold text-center text-gray-100 mb-2">
          {mode === 'signin' ? 'Welcome Back, Agent' : 'Join DGE'}
        </h2>
        <p className="text-gray-400 text-center mb-6">
          {mode === 'signin'
            ? 'Access your secure terminal'
            : 'Create your agent profile'}
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-1">
                Agent Codename
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-[#0f172a] border border-gray-700 text-gray-300 text-sm rounded-lg focus:ring-[#ffc107] focus:border-[#ffc107] block w-full pl-10 p-2.5"
                  placeholder="Choose your codename"
                  required
                  minLength={3}
                  maxLength={20}
                />
              </div>
            </div>
          )}
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-[#0f172a] border border-gray-700 text-gray-300 text-sm rounded-lg focus:ring-[#ffc107] focus:border-[#ffc107] block w-full pl-10 p-2.5"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-[#0f172a] border border-gray-700 text-gray-300 text-sm rounded-lg focus:ring-[#ffc107] focus:border-[#ffc107] block w-full pl-10 p-2.5"
                placeholder="Enter your password"
                required
                minLength={8}
              />
            </div>
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full gold-button flex items-center justify-center"
          >
            {loading ? (
              <>
                <span className="loading-spinner mr-2"></span>
                {mode === 'signin' ? 'Authenticating...' : 'Creating Profile...'}
              </>
            ) : (
              mode === 'signin' ? 'Access Terminal' : 'Create Profile'
            )}
          </button>
        </form>
        
        <div className="mt-4 text-center">
          <button
            onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
            className="text-sm text-gray-400 hover:text-gray-300"
          >
            {mode === 'signin'
              ? "Don't have an account? Join DGE"
              : 'Already an agent? Sign in'}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AuthModal;