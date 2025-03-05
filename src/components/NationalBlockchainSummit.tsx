import React, { useState, useEffect } from 'react';
import { GameState } from '../types/game';
import { Globe, Info, ExternalLink, Award, CheckCircle2, Share2, Users, FileText } from 'lucide-react';
import { toast } from 'sonner';
import SocialShare from './SocialShare';

interface NationalBlockchainSummitProps {
  userData: {
    address: string;
    username: string | null;
  };
  wif: string;
  gameState: GameState;
  onUpdateGameState: (state: GameState) => void;
}

const NationalBlockchainSummit: React.FC<NationalBlockchainSummitProps> = ({
  userData,
  wif,
  gameState,
  onUpdateGameState
}) => {
  const [verificationCode, setVerificationCode] = useState('');
  const [activeTab, setActiveTab] = useState<'petition' | 'share' | 'recruit'>('petition');
  const [loading, setLoading] = useState(false);
  
  // Get the summit chain and its milestones
  const summitChain = gameState.chains.find(c => c.id === 'national-blockchain-summit');
  if (!summitChain) return null;
  
  // Check if petition is completed
  const petitionMilestone = summitChain.milestones.find(m => m.id === 'nbs-petition');
  const isPetitionCompleted = petitionMilestone?.completed || false;
  
  // Check if sharing is completed
  const shareMilestone = summitChain.milestones.find(m => m.id === 'nbs-share');
  const isShareCompleted = shareMilestone?.completed || false;
  
  // Check if recruitment is completed
  const recruitMilestone = summitChain.milestones.find(m => m.id === 'nbs-recruit');
  const isRecruitCompleted = recruitMilestone?.completed || false;

  // Auto-complete recruit milestone in demo mode
  useEffect(() => {
    if (activeTab === 'recruit' && !isRecruitCompleted) {
      const milestone = summitChain.milestones.find(m => m.id === 'nbs-recruit');
      if (milestone && !milestone.completed) {
        setLoading(true);
        // Simulate a brief delay before completion
        setTimeout(() => {
          milestone.completed = true;
          milestone.timestamp = new Date().toISOString();
          milestone.hash = 'demo_' + Math.random().toString(36).substring(7);
          milestone.txid = 'demo_' + Math.random().toString(36).substring(7);
          
          const updatedState = { ...gameState };
          onUpdateGameState(updatedState);
          setLoading(false);
          toast.success('Recruitment milestone automatically completed in demo mode!');
        }, 500);
      }
    }
  }, [activeTab, isRecruitCompleted]);

  // Handle sharing completion
  const handleShareComplete = async () => {
    try {
      setLoading(true);
      const milestone = summitChain.milestones.find(m => m.id === 'nbs-share');
      if (milestone && !milestone.completed) {
        milestone.completed = true;
        milestone.timestamp = new Date().toISOString();
        milestone.hash = 'demo_' + Math.random().toString(36).substring(7);
        milestone.txid = 'demo_' + Math.random().toString(36).substring(7);
        
        const updatedState = { ...gameState };
        onUpdateGameState(updatedState);
        toast.success('Thank you for sharing! Your support has been recorded.');
      }
    } catch (error) {
      console.error('Error completing share milestone:', error);
      toast.error('Error recording share completion');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="bg-[#0f172a] rounded-lg border border-gray-800 overflow-hidden">
      <div className="p-6 border-b border-gray-800">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Globe className="text-[#ffc107] h-8 w-8 mr-3" />
            <div>
              <h1 className="text-2xl font-bold text-gray-100">National Blockchain Summit</h1>
              <p className="text-gray-400">Support U.S. leadership in blockchain technology</p>
            </div>
          </div>
          <SocialShare 
            title="Join me in supporting the National Blockchain Summit!"
            description="Visit nationalblockchain.org to sign the petition and help promote U.S. leadership in blockchain technology. Play the DGE game to learn more about blockchain in government!"
            url="https://nationalblockchain.org"
            hashtags={["NationalBlockchainSummit", "GovTech", "Innovation", "Blockchain"]}
          />
        </div>
        
        <div className="flex border-b border-gray-800 mb-4">
          <button
            className={`px-4 py-2 font-medium ${activeTab === 'petition' ? 'text-[#ffc107] border-b-2 border-[#ffc107]' : 'text-gray-400 hover:text-gray-300'}`}
            onClick={() => setActiveTab('petition')}
          >
            <div className="flex items-center">
              <FileText className="mr-2" size={16} />
              Sign Petition
            </div>
          </button>
          <button
            className={`px-4 py-2 font-medium ${activeTab === 'share' ? 'text-[#ffc107] border-b-2 border-[#ffc107]' : 'text-gray-400 hover:text-gray-300'}`}
            onClick={() => setActiveTab('share')}
          >
            <div className="flex items-center">
              <Share2 className="mr-2" size={16} />
              Share Summit
            </div>
          </button>
          <button
            className={`px-4 py-2 font-medium ${activeTab === 'recruit' ? 'text-[#ffc107] border-b-2 border-[#ffc107]' : 'text-gray-400 hover:text-gray-300'}`}
            onClick={() => setActiveTab('recruit')}
          >
            <div className="flex items-center">
              <Users className="mr-2" size={16} />
              Recruit Allies
            </div>
          </button>
        </div>
        
        {activeTab === 'petition' && (
          <div>
            <div className="bg-blue-900 bg-opacity-20 p-4 rounded-md border border-blue-800 mb-4">
              <h2 className="text-lg font-semibold text-blue-400 mb-2">Summit Goals</h2>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle2 className="text-blue-400 mr-2 mt-1" size={16} />
                  <span className="text-gray-300">Establish U.S. leadership in blockchain technology</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="text-blue-400 mr-2 mt-1" size={16} />
                  <span className="text-gray-300">Enhance national security through blockchain solutions</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="text-blue-400 mr-2 mt-1" size={16} />
                  <span className="text-gray-300">Drive economic growth with blockchain innovation</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="text-blue-400 mr-2 mt-1" size={16} />
                  <span className="text-gray-300">Improve energy efficiency in government operations</span>
                </li>
              </ul>
            </div>
            
            {!isPetitionCompleted ? (
              <>
                <div className="bg-yellow-900 bg-opacity-20 p-4 rounded-md border border-yellow-800 mb-4">
                  <div className="flex items-start">
                    <div className="mr-3 mt-0.5">
                      <Info className="text-yellow-400" size={18} />
                    </div>
                    <div>
                      <h4 className="text-yellow-400 font-medium mb-1">Demo Mode Notice</h4>
                      <p className="text-gray-300 text-sm">
                        This is a demonstration of how blockchain could verify petition signatures. In a production environment, this would integrate with the actual National Blockchain Summit website's API for signature verification.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <label htmlFor="verificationCode" className="block text-sm font-medium text-gray-300 mb-1">
                    Advocacy Statement
                  </label>
                  <textarea
                    id="verificationCode"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    className="input-field"
                    placeholder="Describe how you support blockchain adoption in government..."
                    rows={3}
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    For this demo, share your thoughts on why blockchain adoption in government matters to you.
                  </p>
                </div>
                
                <button
                  onClick={() => window.open('https://nationalblockchain.org', '_blank')}
                  className="w-full gold-button mb-4 flex items-center justify-center"
                >
                  <ExternalLink className="mr-2" size={16} />
                  Visit National Blockchain Summit Website
                </button>
                
                <button
                  onClick={() => {
                    if (!verificationCode.trim()) {
                      toast.error('Please enter your advocacy statement.');
                      return;
                    }
                    setLoading(true);
                    setTimeout(() => {
                      const milestone = summitChain.milestones.find(m => m.id === 'nbs-petition');
                      if (milestone && !milestone.completed) {
                        milestone.completed = true;
                        milestone.timestamp = new Date().toISOString();
                        milestone.hash = 'demo_' + Math.random().toString(36).substring(7);
                        milestone.txid = 'demo_' + Math.random().toString(36).substring(7);
                        
                        const updatedState = { ...gameState };
                        onUpdateGameState(updatedState);
                      }
                      setLoading(false);
                      toast.success('Petition signed successfully!');
                    }, 1500);
                  }}
                  disabled={loading || !verificationCode.trim()}
                  className="w-full gold-button"
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <span className="loading-spinner mr-2"></span>
                      Recording on Blockchain...
                    </span>
                  ) : (
                    'Submit Advocacy Statement'
                  )}
                </button>
              </>
            ) : (
              <div className="bg-green-900 bg-opacity-20 p-4 rounded-md border border-green-800">
                <div className="flex items-center mb-2">
                  <Award className="text-green-400 mr-2" size={20} />
                  <h3 className="text-lg font-semibold text-green-400">Advocacy Recorded!</h3>
                </div>
                <p className="text-gray-300 mb-2">
                  Your support for the National Blockchain Summit has been permanently recorded on the blockchain. Thank you for helping promote U.S. leadership in blockchain technology!
                </p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Transaction ID:</span>
                  <span className="font-mono text-green-400">{petitionMilestone?.txid?.substring(0, 16)}...</span>
                </div>
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'share' && (
          <div>
            <div className="bg-purple-900 bg-opacity-20 p-4 rounded-md border border-purple-800 mb-4">
              <h2 className="text-lg font-semibold text-purple-400 mb-2">Share the Summit</h2>
              <p className="text-gray-300 mb-4">
                Help spread awareness about the National Blockchain Summit and the importance of U.S. leadership in blockchain technology.
              </p>
              
              <div className="flex flex-col space-y-4">
                <a
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent('https://nationalblockchain.org')}&text=${encodeURIComponent('Join me in supporting U.S. leadership in blockchain technology! Visit the National Blockchain Summit website to learn more.')}&hashtags=NationalBlockchainSummit,GovTech,Innovation,Blockchain`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleShareComplete}
                  className="gold-button text-center"
                >
                  <div className="flex items-center justify-center">
                    <Share2 className="mr-2" size={16} />
                    Share on Twitter
                  </div>
                </a>
                
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://nationalblockchain.org')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleShareComplete}
                  className="gold-button text-center"
                >
                  <div className="flex items-center justify-center">
                    <Share2 className="mr-2" size={16} />
                    Share on LinkedIn
                  </div>
                </a>
                
                <button
                  onClick={() => {
                    navigator.clipboard.writeText('https://nationalblockchain.org');
                    toast.success('Summit website URL copied to clipboard!');
                    handleShareComplete();
                  }}
                  className="gold-button"
                >
                  <div className="flex items-center justify-center">
                    <Share2 className="mr-2" size={16} />
                    Copy Summit URL
                  </div>
                </button>
              </div>
            </div>
            
            {isShareCompleted && (
              <div className="bg-green-900 bg-opacity-20 p-4 rounded-md border border-green-800">
                <div className="flex items-center mb-2">
                  <Award className="text-green-400 mr-2" size={20} />
                  <h3 className="text-lg font-semibold text-green-400">Sharing Verified!</h3>
                </div>
                <p className="text-gray-300">
                  Your effort to spread awareness about the National Blockchain Summit has been recorded on the blockchain.
                </p>
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'recruit' && (
          <div>
            <div className="bg-blue-900 bg-opacity-20 p-4 rounded-md border border-blue-800 mb-4">
              <h2 className="text-lg font-semibold text-blue-400 mb-2">Recruit Allies</h2>
              <p className="text-gray-300 mb-4">
                In demo mode, recruitment is automatically handled to demonstrate the blockchain verification process.
              </p>
              <div className="bg-[#0f172a] p-4 rounded-md border border-gray-700">
                <h3 className="text-sm font-medium text-gray-300 mb-2">Your Demo Referral Code</h3>
                <div className="font-mono text-blue-400 bg-blue-900 bg-opacity-20 p-2 rounded border border-blue-800 mb-2">
                  DEMO_{userData.address.substring(0, 8)}
                </div>
                <p className="text-xs text-gray-400">
                  In a real implementation, this code would be used to track and verify your recruitment efforts on the blockchain.
                </p>
              </div>
            </div>
            
            {isRecruitCompleted && (
              <div className="bg-green-900 bg-opacity-20 p-4 rounded-md border border-green-800">
                <div className="flex items-center mb-2">
                  <Award className="text-green-400 mr-2" size={20} />
                  <h3 className="text-lg font-semibold text-green-400">Recruitment Success!</h3>
                </div>
                <p className="text-gray-300">
                  Your recruitment efforts have been recorded on the blockchain. Keep growing the network of blockchain advocates!
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default NationalBlockchainSummit;