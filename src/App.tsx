import React, { useState, useEffect } from 'react';
import { Shield, KeyRound, UserPlus, Save, Send, RefreshCw, User, Wallet, AlertCircle, CheckCircle2, Info } from 'lucide-react';
import { loadWIF, createOpReturnTransaction, sendTransaction, getBalance } from './utils/blockchain-sdk';
import GameInterface from './components/GameInterface';
import DemoModeToggle from './components/DemoModeToggle';
import { getDemoMode, enableDemoMode, disableDemoMode } from './utils/demo';
import { toast } from 'sonner';

interface UserData {
  address: string;
  username: string | null;
  isRegistered: boolean;
  balance: number;
  updates: string[];
  transactions: string[];
}

function App() {
  const [wif, setWif] = useState<string>('');
  const [userData, setUserData] = useState<UserData>({
    address: '',
    username: null,
    isRegistered: false,
    balance: 0,
    updates: [],
    transactions: []
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [messageType, setMessageType] = useState<'info' | 'success' | 'error'>('info');
  const [username, setUsername] = useState<string>('');
  const [demoMode, setDemoMode] = useState(getDemoMode());

  // Handle demo mode toggle
  const handleDemoToggle = async () => {
    if (demoMode.enabled) {
      disableDemoMode();
      setDemoMode({ enabled: false, wif: '', address: '', balance: 0 });
      setWif('');
      toast.success('Demo mode disabled');
    } else {
      const config = await enableDemoMode();
      setDemoMode(config);
      setWif(config.wif);
      toast.success('Demo mode enabled');
    }
  };

  // Load WIF key and derive address
  const handleLoadWIF = async () => {
    try {
      setIsLoading(true);
      setMessage('');
      
      const result = await loadWIF(wif);
      
      setUserData(prev => ({
        ...prev,
        address: result.address,
        balance: result.balance
      }));
      
      toast.success(`Address loaded: ${result.address}`);
      
      // Check if address is registered
      const isRegistered = await checkRegistration(result.address);
      if (isRegistered) {
        const username = localStorage.getItem(`username_${result.address}`);
        setUserData(prev => ({
          ...prev,
          isRegistered: true,
          username
        }));
        toast.success(`Welcome back, Agent ${username || 'Unknown'}!`);
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to load WIF');
    } finally {
      setIsLoading(false);
    }
  };

  // Check if address is registered
  const checkRegistration = async (address: string): Promise<boolean> => {
    const registrationTxid = localStorage.getItem(`registration_${address}`);
    return !!registrationTxid;
  };

  // Register new user
  const handleRegister = async () => {
    if (!userData.address) {
      toast.error('Please load your WIF key first');
      return;
    }

    if (!username) {
      toast.error('Please enter a username');
      return;
    }
    
    try {
      setIsLoading(true);
      
      const data = JSON.stringify({
        type: 'registration',
        username,
        timestamp: new Date().toISOString()
      });
      
      const txid = await createOpReturnTransaction(wif, data);
      
      localStorage.setItem(`registration_${userData.address}`, txid);
      localStorage.setItem(`username_${userData.address}`, username);
      
      setUserData(prev => ({
        ...prev,
        isRegistered: true,
        username
      }));
      
      toast.success('Registration successful!');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0f1d] text-gray-100">
      {!userData.address ? (
        <div className="max-w-md mx-auto p-6">
          <div className="text-center mb-8">
            <Shield className="h-16 w-16 text-[#ffc107] mx-auto mb-4" />
            <h1 className="text-3xl font-bold mb-2 gold-text">DGE: 007 GOLDFINGER</h1>
            <p className="text-gray-400">
              Join the Digital Government Efficiency agency and help thwart Goldfinger's plans.
            </p>
          </div>

          <div className="bg-[#0f172a] rounded-lg border border-gray-800 p-6 shadow-lg">
            <DemoModeToggle demoMode={demoMode} onToggle={handleDemoToggle} />
            
            <h2 className="text-xl font-semibold mb-4 flex items-center text-gray-100">
              <KeyRound className="mr-2 text-[#ffc107]" size={20} />
              Agent Authentication
            </h2>
            
            <div className="mb-4">
              <label htmlFor="wif" className="block text-sm font-medium text-gray-300 mb-1">
                WIF (Wallet Import Format)
              </label>
              <input
                type="password"
                id="wif"
                value={wif}
                onChange={(e) => setWif(e.target.value)}
                className="input-field"
                placeholder="Enter your WIF key"
              />
              <p className="mt-1 text-xs text-gray-500">
                Your private key is never sent to any server and is only used locally.
              </p>
            </div>
            
            <button
              onClick={handleLoadWIF}
              disabled={isLoading || !wif}
              className="w-full gold-button"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <span className="loading-spinner mr-2"></span>
                  Loading...
                </span>
              ) : (
                'Access Secure Terminal'
              )}
            </button>
          </div>
        </div>
      ) : !userData.isRegistered ? (
        <div className="max-w-md mx-auto p-6">
          <div className="bg-[#0f172a] rounded-lg border border-gray-800 p-6 shadow-lg">
            <h2 className="text-xl font-semibold mb-4 flex items-center text-gray-100">
              <UserPlus className="mr-2 text-[#ffc107]" size={20} />
              Register as DGE Agent
            </h2>
            
            <div className="mb-4">
              <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-1">
                Agent Codename
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="input-field"
                placeholder="Choose a codename"
              />
              <p className="mt-1 text-xs text-gray-500">
                This name will be stored on the blockchain and cannot be changed.
              </p>
            </div>
            
            <button
              onClick={handleRegister}
              disabled={isLoading || !username}
              className="w-full gold-button"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <span className="loading-spinner mr-2"></span>
                  Registering...
                </span>
              ) : (
                'Register as Agent'
              )}
            </button>
          </div>
        </div>
      ) : (
        <GameInterface
          userData={userData}
          wif={wif}
          demoMode={demoMode}
          onUpdateBalance={async () => {
            const balance = await getBalance();
            setUserData(prev => ({ ...prev, balance }));
          }}
        />
      )}
    </div>
  );
}

export default App;