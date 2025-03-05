import React, { useState } from 'react';
import { FileText, Search, Database, Shield, Lock, Clock, CheckCircle2, AlertTriangle, Share2 } from 'lucide-react';
import { Milestone } from '../types/game';
import SocialShare from './SocialShare';

interface BlockchainExplorerProps {
  playerAddress: string;
  transactions: string[];
  milestones: Milestone[];
}

const BlockchainExplorer: React.FC<BlockchainExplorerProps> = ({ 
  playerAddress, 
  transactions,
  milestones
}) => {
  const [activeTab, setActiveTab] = useState<'transactions' | 'milestones' | 'info'>('transactions');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter transactions based on search query
  const filteredTransactions = transactions.filter(tx => 
    tx.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Filter milestones based on search query
  const filteredMilestones = milestones.filter(milestone => 
    milestone.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    milestone.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (milestone.txid && milestone.txid.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  
  return (
    <div className="bg-[#0f172a] rounded-lg border border-gray-800 overflow-hidden">
      <div className="p-4 border-b border-gray-800 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-gray-100 flex items-center">
            <Database className="text-[#ffc107] mr-2" size={20} />
            BSV Blockchain Explorer
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            Explore your immutable record of achievements and transactions on the Bitcoin SV blockchain
          </p>
        </div>
        <SocialShare 
          title="My BSV Blockchain Explorer - DGE: 007 GOLDFINGER"
          description={`Check out my blockchain record with ${transactions.length} transactions and ${milestones.length} completed milestones in the DGE: 007 GOLDFINGER game.`}
          hashtags={["BlockchainGame", "BSV", "Goldfinger", "BlockchainExplorer"]}
        />
      </div>
      
      <div className="p-4">
        <div className="flex items-center mb-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-500" />
            </div>
            <input
              type="text"
              className="bg-[#1e293b] border border-gray-700 text-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
              placeholder="Search transactions or milestones..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        <div className="flex border-b border-gray-800 mb-4">
          <button
            className={`px-4 py-2 font-medium ${activeTab === 'transactions' ? 'text-[#ffc107] border-b-2 border-[#ffc107]' : 'text-gray-400 hover:text-gray-300'}`}
            onClick={() => setActiveTab('transactions')}
          >
            Transactions
          </button>
          <button
            className={`px-4 py-2 font-medium ${activeTab === 'milestones' ? 'text-[#ffc107] border-b-2 border-[#ffc107]' : 'text-gray-400 hover:text-gray-300'}`}
            onClick={() => setActiveTab('milestones')}
          >
            Milestones
          </button>
          <button
            className={`px-4 py-2 font-medium ${activeTab === 'info' ? 'text-[#ffc107] border-b-2 border-[#ffc107]' : 'text-gray-400 hover:text-gray-300'}`}
            onClick={() => setActiveTab('info')}
          >
            BSV Benefits
          </button>
        </div>
        
        {activeTab === 'transactions' && (
          <div>
            <div className="bg-[#1e293b] rounded-lg border border-gray-700 overflow-hidden">
              <table className="min-w-full divide-y divide-gray-700">
                <thead className="bg-gray-800">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Transaction ID
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Type
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Share
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-[#1e293b] divide-y divide-gray-700">
                  {filteredTransactions.length > 0 ? (
                    filteredTransactions.map((tx, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-300">
                          {tx.substring(0, 16)}...{tx.substring(tx.length - 4)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          {tx.startsWith('opreturn_') ? (
                            <span className="badge badge-blue">OP_RETURN</span>
                          ) : tx.startsWith('send_') ? (
                            <span className="badge badge-green">Payment</span>
                          ) : tx.startsWith('sendopreturn_') ? (
                            <span className="badge badge-purple">Payment + Data</span>
                          ) : (
                            <span className="badge badge-gold">Transaction</span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          <span className="flex items-center text-green-400">
                            <CheckCircle2 size={14} className="mr-1" />
                            Confirmed
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          <SocialShare 
                            title="My BSV Blockchain Transaction"
                            description={`Check out my blockchain transaction (${tx.substring(0, 8)}...) in the DGE: 007 GOLDFINGER game.`}
                            hashtags={["BlockchainGame", "BSV", "Transaction"]}
                          />
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="px-6 py-4 text-center text-sm text-gray-400">
                        {searchQuery ? 'No transactions match your search' : 'No transactions recorded yet'}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            
            <div className="mt-4 bg-[#172038] border border-blue-800 rounded-md p-3">
              <div className="flex items-start">
                <div className="mr-2 mt-0.5">
                  <Shield className="text-blue-400" size={16} />
                </div>
                <div>
                  <p className="text-sm text-blue-400">
                    <strong>Blockchain Security:</strong> All transactions are permanently recorded on the Bitcoin SV blockchain, providing an immutable audit trail of your game progress.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'milestones' && (
          <div>
            <div className="space-y-3">
              {filteredMilestones.length > 0 ? (
                filteredMilestones.map((milestone, index) => (
                  <div key={index} className="bg-[#1e293b] rounded-lg border border-gray-700 p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-gray-200">{milestone.title}</h3>
                        <p className="text-sm text-gray-400 mt-1">{milestone.description}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        {milestone.completed ? (
                          <span className="badge badge-green flex items-center">
                            <CheckCircle2 size={12} className="mr-1" />
                            Completed
                          </span>
                        ) : (
                          <span className="badge badge-orange flex items-center">
                            <Clock size={12} className="mr-1" />
                            Pending
                          </span>
                        )}
                        <SocialShare 
                          title={`Completed: ${milestone.title}`}
                          description={`I completed the "${milestone.title}" milestone in DGE: 007 GOLDFINGER and earned ${milestone.reward} satoshis!`}
                          hashtags={["BlockchainGame", "BSV", "MissionComplete"]}
                        />
                      </div>
                    </div>
                    
                    {milestone.completed && milestone.txid && (
                      <div className="mt-3 pt-3 border-t border-gray-700">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center text-xs text-gray-400">
                            <Lock size={12} className="mr-1" />
                            Blockchain Verification
                          </div>
                          <div className="text-xs font-mono text-gray-500">
                            TXID: {milestone.txid.substring(0, 10)}...{milestone.txid.substring(milestone.txid.length - 6)}
                          </div>
                        </div>
                        
                        {milestone.hash && (
                          <div className="mt-1 flex items-center justify-between">
                            <div className="flex items-center text-xs text-gray-400">
                              <Shield size={12} className="mr-1" />
                              Hash
                            </div>
                            <div className="text-xs font-mono text-gray-500">
                              {milestone.hash.substring(0, 10)}...{milestone.hash.substring(milestone.hash.length - 6)}
                            </div>
                          </div>
                        )}
                        
                        {milestone.timestamp && (
                          <div className="mt-1 flex items-center justify-between">
                            <div className="flex items-center text-xs text-gray-400">
                              <Clock size={12} className="mr-1" />
                              Timestamp
                            </div>
                            <div className="text-xs text-gray-500">
                              {new Date(milestone.timestamp).toLocaleString()}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="bg-[#1e293b] rounded-lg border border-gray-700 p-6 text-center">
                  <FileText className="h-12 w-12 text-gray-500 mx-auto mb-3" />
                  <p className="text-gray-400">
                    {searchQuery ? 'No milestones match your search' : 'No milestones completed yet'}
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    Complete missions to record your achievements on the blockchain
                  </p>
                </div>
              )}
            </div>
            
            <div className="mt-4 bg-[#172038] border border-blue-800 rounded-md p-3">
              <div className="flex items-start">
                <div className="mr-2 mt-0.5">
                  <Shield className="text-blue-400" size={16} />
                </div>
                <div>
                  <p className="text-sm text-blue-400">
                    <strong>Milestone Verification:</strong> Each completed milestone is cryptographically linked to previous milestones, creating a tamper-proof chain of accomplishments.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'info' && (
          <div className="space-y-4">
            <div className="bg-[#1e293b] rounded-lg border border-gray-700 p-4">
              <h3 className="font-medium text-[#ffc107] flex items-center mb-2">
                <Shield className="mr-2" size={18} />
                Why Bitcoin SV for Government Efficiency?
              </h3>
              <p className="text-gray-300 text-sm mb-3">
                Bitcoin SV (BSV) provides the ideal blockchain foundation for government transparency and efficiency initiatives due to its unique capabilities:
              </p>
              
              <div className="space-y-3">
                <div className="bg-[#0f172a] p-3 rounded border border-gray-700">
                  <h4 className="text-blue-400 font-medium mb-1 flex items-center">
                    <Database className="mr-2" size={16} />
                    Unlimited Scaling
                  </h4>
                  <p className="text-gray-400 text-sm">
                    BSV can handle massive transaction volumes (over 50,000 transactions per second) and store large data files directly on-chain, making it suitable for government-scale operations.
                  </p>
                </div>
                
                <div className="bg-[#0f172a] p-3 rounded border border-gray-700">
                  <h4 className="text-green-400 font-medium mb-1 flex items-center">
                    <Shield className="mr-2" size={16} />
                    Immutable Record-Keeping
                  </h4>
                  <p className="text-gray-400 text-sm">
                    Once data is written to the BSV blockchain, it cannot be altered or deleted, ensuring permanent and tamper-proof records of government activities and spending.
                  </p>
                </div>
                
                <div className="bg-[#0f172a] p-3 rounded border border-gray-700">
                  <h4 className="text-yellow-400 font-medium mb-1 flex items-center">
                    <Lock className="mr-2" size={16} />
                    Cryptographic Verification
                  </h4>
                  <p className="text-gray-400 text-sm">
                    Digital signatures and cryptographic proofs allow citizens to verify the authenticity of government records without relying on central authorities.
                  </p>
                </div>
                
                <div className="bg-[#0f172a] p-3 rounded border border-gray-700">
                  <h4 className="text-purple-400 font-medium mb-1 flex items-center">
                    <AlertTriangle className="mr-2" size={16} />
                    Fraud Prevention
                  </h4>
                  <p className="text-gray-400 text-sm">
                    The transparent nature of the blockchain makes fraudulent activities immediately visible, deterring corruption and waste in government spending.
                  </p>
                </div>
                
                <div className="bg-[#0f172a] p-3 rounded border border-gray-700">
                  <h4 className="text-red-400 font-medium mb-1 flex items-center">
                    <Clock className="mr-2" size={16} />
                    Real-Time Auditing
                  </h4>
                  <p className="text-gray-400 text-sm">
                    BSV enables continuous, real-time auditing of government operations, replacing periodic and costly manual audits with automated verification.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-[#1e293b] rounded-lg border border-gray-700 p-4">
              <h3 className="font-medium text-[#ffc107] flex items-center mb-2">
                <Database className="mr-2" size={18} />
                How DGE Uses BSV Blockchain
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="bg-blue-900 text-blue-300 rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">
                    1
                  </div>
                  <div>
                    <h4 className="text-blue-400 font-medium text-sm">Milestone Verification</h4>
                    <p className="text-gray-400 text-sm">
                      Each completed mission is recorded as an OP_RETURN transaction, creating a permanent record of your achievements.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-blue-900 text-blue-300 rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">
                    2
                  </div>
                  <div>
                    <h4 className="text-blue-400 font-medium text-sm">Reward Payments</h4>
                    <p className="text-gray-400 text-sm">
                      Satoshi rewards are sent directly through the blockchain, providing transparent and verifiable compensation.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-blue-900 text-blue-300 rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">
                    3
                  </div>
                  <div>
                    <h4 className="text-blue-400 font-medium text-sm">Cryptographic Identity</h4>
                    <p className="text-gray-400 text-sm">
                      Your BSV address serves as your secure digital identity, eliminating the need for passwords.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-blue-900 text-blue-300 rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">
                    4
                  </div>
                  <div>
                    <h4 className="text-blue-400 font-medium text-sm">Milestone Chaining</h4>
                    <p className="text-gray-400 text-sm">
                      Each milestone links to the previous one via cryptographic hashes, creating an unbreakable chain of accomplishments.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-blue-900 text-blue-300 rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">
                    5
                  </div>
                  <div>
                    <h4 className="text-blue-400 font-medium text-sm">Badge Issuance</h4>
                    <p className="text-gray-400 text-sm">
                      Earned badges are permanently recorded on the blockchain as verifiable credentials.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlockchainExplorer;