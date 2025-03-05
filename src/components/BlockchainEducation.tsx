import React from 'react';
import { Database, Shield, Lock, Clock, CheckCircle2, AlertTriangle, FileText, Zap, Layers } from 'lucide-react';

const BlockchainEducation: React.FC = () => {
  return (
    <div className="bg-[#0f172a] rounded-lg border border-gray-800 overflow-hidden">
      <div className="p-4 border-b border-gray-800">
        <h2 className="text-xl font-bold text-gray-100 flex items-center">
          <Database className="text-[#ffc107] mr-2" size={20} />
          BSV Blockchain: Government Efficiency Revolution
        </h2>
        <p className="text-gray-400 text-sm mt-1">
          Learn how Bitcoin SV blockchain technology can transform government operations
        </p>
      </div>
      
      <div className="p-6">
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-[#ffc107] mb-4 flex items-center">
            <Shield className="mr-2" size={20} />
            The Problem: Government Inefficiency
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-[#1e293b] p-4 rounded-lg border border-gray-700">
              <h4 className="font-medium text-red-400 mb-2 flex items-center">
                <AlertTriangle className="mr-2" size={16} />
                Lack of Transparency
              </h4>
              <p className="text-gray-300 text-sm">
                Government spending is often opaque, with limited public visibility into how taxpayer money is allocated and used.
              </p>
            </div>
            
            <div className="bg-[#1e293b] p-4 rounded-lg border border-gray-700">
              <h4 className="font-medium text-red-400 mb-2 flex items-center">
                <AlertTriangle className="mr-2" size={16} />
                Fraud and Waste
              </h4>
              <p className="text-gray-300 text-sm">
                The U.S. government loses billions annually to fraud, waste, and improper payments due to inadequate tracking systems.
              </p>
            </div>
            
            <div className="bg-[#1e293b] p-4 rounded-lg border border-gray-700">
              <h4 className="font-medium text-red-400 mb-2 flex items-center">
                <AlertTriangle className="mr-2" size={16} />
                Costly Auditing
              </h4>
              <p className="text-gray-300 text-sm">
                Traditional auditing is expensive, time-consuming, and often occurs too late to prevent misuse of funds.
              </p>
            </div>
            
            <div className="bg-[#1e293b] p-4 rounded-lg border border-gray-700">
              <h4 className="font-medium text-red-400 mb-2 flex items-center">
                <AlertTriangle className="mr-2" size={16} />
                Data Silos
              </h4>
              <p className="text-gray-300 text-sm">
                Government agencies operate in silos with incompatible systems, preventing efficient information sharing.
              </p>
            </div>
          </div>
        </div>
        
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-[#ffc107] mb-4 flex items-center">
            <Database className="mr-2" size={20} />
            The Solution: Bitcoin SV Blockchain
          </h3>
          
          <div className="bg-[#1e293b] p-5 rounded-lg border border-gray-700 mb-6">
            <p className="text-gray-300">
              Bitcoin SV (BSV) is uniquely positioned to solve government efficiency challenges through its enterprise-grade blockchain capabilities. Unlike other blockchain platforms, BSV offers unlimited scaling, micropayments, and data storage capabilities that make it ideal for government-scale applications.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-[#1e293b] p-4 rounded-lg border border-gray-700">
              <h4 className="font-medium text-green-400 mb-2 flex items-center">
                <Layers className="mr-2" size={16} />
                Unlimited Scaling
              </h4>
              <p className="text-gray-300 text-sm">
                BSV can process over 50,000 transactions per second and store terabytes of data, making it suitable for government-scale operations.
              </p>
            </div>
            
            <div className="bg-[#1e293b] p-4 rounded-lg border border-gray-700">
              <h4 className="font-medium text-green-400 mb-2 flex items-center">
                <Lock className="mr-2" size={16} />
                Immutable Records
              </h4>
              <p className="text-gray-300 text-sm">
                Once data is written to the BSV blockchain, it cannot be altered or deleted, ensuring permanent and tamper-proof government records.
              </p>
            </div>
            
            <div className="bg-[#1e293b] p-4 rounded-lg border border-gray-700">
              <h4 className="font-medium text-green-400 mb-2 flex items-center">
                <Zap className="mr-2" size={16} />
                Micropayments
              </h4>
              <p className="text-gray-300 text-sm">
                BSV enables transactions as small as fractions of a cent, allowing for precise fund allocation and real-time payments.
              </p>
            </div>
          </div>
        </div>
        
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-[#ffc107] mb-4 flex items-center">
            <FileText className="mr-2" size={20} />
            Real-World Applications
          </h3>
          
          <div className="space-y-4">
            <div className="bg-[#1e293b] p-4 rounded-lg border border-gray-700">
              <h4 className="font-medium text-blue-400 mb-2">Treasury Department</h4>
              <p className="text-gray-300 text-sm mb-3">
                BSV blockchain can revolutionize how the Treasury Department tracks and disburses funds:
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle2 className="text-green-400 mr-2 mt-0.5" size={14} />
                  <span className="text-gray-300 text-sm">Real-time tracking of all government spending with public visibility</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="text-green-400 mr-2 mt-0.5" size={14} />
                  <span className="text-gray-300 text-sm">Automated reconciliation of accounts, eliminating manual errors</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="text-green-400 mr-2 mt-0.5" size={14} />
                  <span className="text-gray-300 text-sm">Cryptographic verification of fund transfers between agencies</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-[#1e293b] p-4 rounded-lg border border-gray-700">
              <h4 className="font-medium text-blue-400 mb-2">Postal Service</h4>
              <p className="text-gray-300 text-sm mb-3">
                The USPS could leverage BSV blockchain to transform package tracking and delivery:
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle2 className="text-green-400 mr-2 mt-0.5" size={14} />
                  <span className="text-gray-300 text-sm">Immutable tracking records for every package from origin to destination</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="text-green-400 mr-2 mt-0.5" size={14} />
                  <span className="text-gray-300 text-sm">Smart contracts that automatically process insurance claims for lost packages</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="text-green-400 mr-2 mt-0.5" size={14} />
                  <span className="text-gray-300 text-sm">Optimized routing algorithms with transparent performance metrics</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-[#1e293b] p-4 rounded-lg border border-gray-700">
              <h4 className="font-medium text-blue-400 mb-2">Homeland Security</h4>
              <p className="text-gray-300 text-sm mb-3">
                DHS could enhance security while maintaining transparency through BSV blockchain:
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle2 className="text-green-400 mr-2 mt-0.5" size={14} />
                  <span className="text-gray-300 text-sm">Tamper-proof access logs for sensitive facilities like Fort Knox</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="text-green-400 mr-2 mt-0.5" size={14} />
                  <span className="text-gray-300 text-sm">Cryptographically verified identity credentials that prevent forgery</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="text-green-400 mr-2 mt-0.5" size={14} />
                  <span className="text-gray-300 text-sm">Transparent procurement processes with built-in audit trails</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold text-[#ffc107] mb-4 flex items-center">
            <Clock className="mr-2" size={20} />
            The Future of Government
          </h3>
          
          <div className="bg-blue-900 bg-opacity-20 p-5 rounded-lg border border-blue-800">
            <p className="text-gray-300 mb-4">
              A government built on BSV blockchain would fundamentally transform the relationship between citizens and their government:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-[#0f172a] p-3 rounded border border-gray-700">
                <h4 className="font-medium text-green-400 mb-1">Radical Transparency</h4>
                <p className="text-gray-400 text-sm">
                  Citizens could track every dollar from tax collection to expenditure in real-time, creating unprecedented accountability.
                </p>
              </div>
              
              <div className="bg-[#0f172a] p-3 rounded border border-gray-700">
                <h4 className="font-medium text-green-400 mb-1">Fraud Elimination</h4>
                <p className="text-gray-400 text-sm">
                  The immutable nature of blockchain would make fraud immediately detectable, saving billions in taxpayer money.
                </p>
              </div>
              
              <div className="bg-[#0f172a] p-3 rounded border border-gray-700">
                <h4 className="font-medium text-green-400 mb-1">Automated Compliance</h4>
                <p className="text-gray-400 text-sm">
                  Smart contracts could enforce spending rules automatically, ensuring funds are used as intended.
                </p>
              </div>
              
              <div className="bg-[#0f172a] p-3 rounded border border-gray-700">
                <h4 className="font-medium text-green-400 mb-1">Citizen Empowerment</h4>
                <p className="text-gray-400 text-sm">
                  Direct visibility into government operations would empower citizens to hold officials accountable.
                </p>
              </div>
            </div>
            
            <p className="text-blue-400 font-medium mt-4">
              The Digital Government Efficiency (DGE) agency's mission is to make this vision a reality, creating a more transparent, efficient, and accountable government through BSV blockchain technology.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlockchainEducation;