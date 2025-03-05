import { MilestoneChain } from '../types/game';

export const initialMilestoneChains: MilestoneChain[] = [
  {
    id: 'dge-training',
    title: 'DGE Agent Training',
    description: 'Complete your training as a Digital Government Efficiency agent. Learn the ropes of blockchain-based government reform and prepare to face Goldfinger.',
    completed: false,
    unlocked: true,
    backgroundImage: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    milestones: [
      {
        id: 'dge-training-1',
        title: 'Agent Orientation',
        description: 'Learn about the DGE agency and your role as an efficiency agent. The Digital Government Efficiency agency was formed in 2023 to combat wasteful government spending through blockchain technology.',
        type: 'agency',
        agency: 'DGE',
        difficulty: 'easy',
        reward: 1000,
        completed: false,
        interactiveContent: {
          type: 'quiz',
          question: 'What is the primary mission of the DGE?',
          options: [
            'Increase government spending',
            'Combat wasteful government spending through blockchain',
            'Eliminate all government agencies',
            'Promote cryptocurrency adoption'
          ],
          correctAnswer: 1,
          explanation: 'The Digital Government Efficiency (DGE) agency was formed to combat wasteful government spending by leveraging blockchain technology for transparency and accountability.'
        }
      },
      {
        id: 'dge-training-2',
        title: 'Blockchain Basics',
        description: 'Understand how blockchain technology is used for government transparency. The immutable nature of blockchain makes it perfect for tracking government spending and ensuring accountability.',
        type: 'agency',
        agency: 'DGE',
        difficulty: 'medium',
        reward: 1000,
        completed: false,
        interactiveContent: {
          type: 'simulation',
          scenario: 'Blockchain Transaction Verification',
          steps: [
            'Create a digital signature using your private key',
            'Broadcast the transaction to the network',
            'Miners verify the transaction',
            'Transaction is added to the blockchain'
          ],
          outcome: 'You\'ve successfully recorded a transaction on the blockchain. This same technology will be used to track government spending and reforms.'
        }
      },
      {
        id: 'dge-training-3',
        title: 'First Assignment',
        description: 'Receive your first mission briefing about Goldfinger. Intelligence reports indicate that Auric Goldfinger has infiltrated multiple government agencies and is promoting inefficiency to destabilize the economy.',
        type: 'story',
        difficulty: 'hard',
        reward: 5000,
        completed: false,
        interactiveContent: {
          type: 'dossier',
          subject: 'Auric Goldfinger',
          details: [
            { label: 'Real Name', value: 'Auric Goldfinger' },
            { label: 'Alias', value: 'The Efficiency Killer' },
            { label: 'Occupation', value: 'Billionaire, Government Consultant' },
            { label: 'Objective', value: 'Create government waste and inefficiency' },
            { label: 'Motivation', value: 'Profit from economic instability' },
            { label: 'Last Known Location', value: 'Washington D.C.' }
          ],
          briefing: 'Goldfinger has been appointed as a special consultant to multiple government agencies. Under the guise of "modernization," he\'s implementing systems that increase bureaucracy and waste. Your mission is to identify and reform these inefficiencies.'
        }
      }
    ]
  },
  {
    id: 'national-blockchain-summit',
    title: 'National Blockchain Summit',
    description: 'Support the National Blockchain Summit to promote U.S. leadership in blockchain technology. Your advocacy will help ensure blockchain adoption for government efficiency, national security, economic growth, and energy efficiency.',
    completed: false,
    unlocked: true,
    backgroundImage: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    milestones: [
      {
        id: 'nbs-petition',
        title: 'Sign the Summit Petition',
        description: 'Visit the National Blockchain Summit website and sign the petition to support U.S. leadership in blockchain technology. Your signature helps demonstrate public support for blockchain adoption in government.',
        type: 'story',
        difficulty: 'easy',
        reward: 10000,
        completed: false,
        interactiveContent: {
          type: 'mission',
          scenario: 'National Blockchain Summit Petition',
          objectives: [
            'Visit nationalblockchain.org',
            'Review the blockchain adoption proposal',
            'Submit your advocacy statement',
            'Receive blockchain verification of your support'
          ],
          climax: 'Your advocacy statement is permanently recorded on the blockchain, demonstrating how digital civic participation can be verified while preserving privacy.',
          outcome: 'Your support for the National Blockchain Summit has been recorded. This shows how blockchain can create transparent, verifiable records of civic engagement.'
        }
      },
      {
        id: 'nbs-share',
        title: 'Share the Summit',
        description: 'Share information about the National Blockchain Summit on social media or with friends. Spreading awareness helps build momentum for blockchain adoption in government.',
        type: 'story',
        difficulty: 'medium',
        reward: 5000,
        completed: false,
        interactiveContent: {
          type: 'mission',
          scenario: 'Blockchain Advocacy Campaign',
          objectives: [
            'Share the Summit website on social media',
            'Use the hashtag #NationalBlockchainSummit',
            'Demonstrate your share with a screenshot or URL',
            'Receive blockchain verification of your advocacy'
          ],
          climax: 'Your social media advocacy is verified and recorded on the blockchain, showing how digital actions can be validated without compromising privacy.',
          outcome: 'Your advocacy efforts have been recorded, creating a transparent and immutable record of grassroots support for blockchain adoption.'
        }
      },
      {
        id: 'nbs-recruit',
        title: 'Recruit Summit Allies',
        description: 'Recruit friends or colleagues to support the National Blockchain Summit. Expanding the network of advocates strengthens the movement for blockchain adoption.',
        type: 'story',
        difficulty: 'hard',
        reward: 8000,
        completed: false,
        interactiveContent: {
          type: 'mission',
          scenario: 'Blockchain Advocacy Network',
          objectives: [
            'Share your unique referral code',
            'Help new supporters sign the petition',
            'Verify their participation through the blockchain',
            'Earn rewards for growing the network'
          ],
          climax: 'Each new supporter\'s signature is cryptographically linked to your referral, creating a verifiable chain of advocacy while preserving privacy.',
          outcome: 'Your recruitment efforts have expanded the network of blockchain advocates, demonstrating how blockchain can create transparent, verifiable networks of action.'
        }
      },
      {
        id: 'nbs-education',
        title: 'Blockchain Policy Education',
        description: 'Complete an educational module about blockchain policy and government applications. Understanding the policy landscape is crucial for effective advocacy.',
        type: 'agency',
        agency: 'DGE',
        difficulty: 'medium',
        reward: 3000,
        completed: false,
        interactiveContent: {
          type: 'quiz',
          question: 'Which of these is NOT one of the National Blockchain Summit\'s key goals?',
          options: [
            'U.S. leadership in blockchain technology',
            'National security applications',
            'Economic growth through blockchain innovation',
            'Replacing the U.S. dollar with cryptocurrency'
          ],
          correctAnswer: 3,
          explanation: 'The National Blockchain Summit focuses on U.S. leadership, national security, economic growth, and energy efficiency through blockchain technology. It does not advocate replacing the U.S. dollar with cryptocurrency.'
        }
      },
      {
        id: 'nbs-summit-badge',
        title: 'Earn Summit Supporter Badge',
        description: 'Complete all National Blockchain Summit milestones to earn the exclusive Summit Supporter badge. This verifiable credential demonstrates your commitment to blockchain advocacy.',
        type: 'story',
        difficulty: 'legendary',
        reward: 15000,
        completed: false,
        interactiveContent: {
          type: 'implementation',
          system: 'Blockchain Verifiable Credentials',
          features: [
            'Cryptographically secure badge issuance',
            'Immutable record of advocacy achievements',
            'Verifiable by third parties without revealing personal data',
            'Portable digital credential for blockchain advocacy',
            'Proof of contribution to U.S. blockchain leadership'
          ],
          test: 'Your Summit Supporter badge has been cryptographically signed and recorded on the blockchain. This verifiable credential can be used to demonstrate your contribution to blockchain advocacy without revealing personal information. This same technology could be used for government-issued credentials, professional certifications, and more.'
        }
      }
    ]
  },
  {
    id: 'usps-reform',
    title: 'USPS Reform Mission',
    description: 'Improve efficiency at the United States Postal Service. Goldfinger has implemented a deliberately inefficient routing system that wastes millions in fuel and delays mail delivery nationwide.',
    completed: false,
    unlocked: false,
    backgroundImage: 'https://images.unsplash.com/photo-1579412690850-bd41cd0af56c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    milestones: [
      {
        id: 'usps-reform-1',
        title: 'Delivery Route Analysis',
        description: 'Analyze and optimize USPS delivery routes for maximum efficiency. Goldfinger\'s routing algorithm deliberately creates inefficient paths, increasing fuel costs by 34%.',
        type: 'agency',
        agency: 'USPS',
        difficulty: 'medium',
        reward: 1000,
        completed: false,
        interactiveContent: {
          type: 'puzzle',
          challenge: 'Route Optimization',
          instructions: 'Rearrange the delivery sequence to minimize travel distance. The current route requires 15 miles of travel, but can be optimized to just 8 miles.',
          hint: 'Look for the nearest neighbor at each step, but be careful of getting trapped in a suboptimal path.',
          solution: 'By implementing a modified nearest-neighbor algorithm with lookahead, you have reduced the route length by 47%.'
        }
      },
      {
        id: 'usps-reform-2',
        title: 'Package Tracking Upgrade',
        description: 'Implement blockchain-based package tracking system. The current system loses track of 8% of all packages, costing millions in customer service and replacement costs.',
        type: 'agency',
        agency: 'USPS',
        difficulty: 'hard',
        reward: 1000,
        completed: false,
        interactiveContent: {
          type: 'simulation',
          scenario: 'Blockchain Package Tracking',
          steps: [
            'Scan package barcode to create unique digital identifier',
            'Record package handoffs on the blockchain',
            'Verify package location at each checkpoint',
            'Provide real-time tracking to customers'
          ],
          outcome: 'Your blockchain implementation has reduced lost packages by 94% and cut customer service calls by 60%. The immutable record ensures accountability at every step of delivery.'
        }
      },
      {
        id: 'usps-reform-3',
        title: 'Intercept Goldfinger\'s Message',
        description: 'Discover a suspicious package containing Goldfinger\'s plans. While implementing the new tracking system, you\'ve identified a series of packages being routed to known associates of Goldfinger.',
        type: 'story',
        difficulty: 'expert',
        reward: 5000,
        completed: false,
        interactiveContent: {
          type: 'investigation',
          evidence: [
            { type: 'document', name: 'Routing Manifest', content: 'Shows deliberate rerouting of specific packages to avoid security screening' },
            { type: 'photo', name: 'Warehouse Image', content: 'Reveals stockpile of delayed mail containing government checks and time-sensitive documents' },
            { type: 'audio', name: 'Recorded Conversation', content: 'Goldfinger instructing associate to "ensure the Treasury documents arrive after the deadline"' }
          ],
          revelation: 'Goldfinger is deliberately delaying government payments to create public dissatisfaction and economic disruption. His next target appears to be the Treasury Department.'
        }
      }
    ]
  },
  {
    id: 'treasury-audit',
    title: 'Treasury Department Audit',
    description: 'Audit the Treasury Department and uncover Goldfinger\'s infiltration. He\'s manipulating financial systems to create inefficiencies in tax collection and disbursement of funds.',
    completed: false,
    unlocked: false,
    backgroundImage: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    milestones: [
      {
        id: 'treasury-audit-1',
        title: 'Financial Records Review',
        description: 'Review Treasury financial records for discrepancies. Goldfinger has implemented a deliberately complex reconciliation process that delays fund disbursement by an average of 23 days.',
        type: 'agency',
        agency: 'Treasury',
        difficulty: 'hard',
        reward: 1000,
        completed: false,
        interactiveContent: {
          type: 'data-analysis',
          dataset: 'Treasury Disbursements',
          anomalies: [
            'Systematic delays in processing certain categories of payments',
            'Unexplained routing of funds through multiple accounts before reaching destination',
            'Pattern of "technical errors" occurring during high-volume processing periods'
          ],
          conclusion: 'The system has been deliberately designed to create delays while appearing to be normal technical limitations. By streamlining the process, you can reduce payment delays by 87%.'
        }
      },
      {
        id: 'treasury-audit-2',
        title: 'Gold Reserve Verification',
        description: 'Verify the gold reserves at Fort Knox. Rumors suggest Goldfinger may be planning to manipulate gold prices by spreading misinformation about reserve levels.',
        type: 'agency',
        agency: 'Treasury',
        difficulty: 'expert',
        reward: 1000,
        completed: false,
        interactiveContent: {
          type: 'security-challenge',
          scenario: 'Fort Knox Audit',
          securityLayers: [
            'Biometric identification',
            'Multi-signature authorization',
            'Time-locked vault access',
            'Blockchain verification of gold bars'
          ],
          discovery: 'While the gold is secure, you\'ve discovered that Goldfinger has inserted false data into the reporting system, making it appear that reserves are 12% lower than actual holdings. This discrepancy could trigger market panic if published in the upcoming Treasury report.'
        }
      },
      {
        id: 'treasury-audit-3',
        title: 'Uncover Goldfinger\'s Plot',
        description: 'Discover Goldfinger\'s plan to contaminate the gold supply. He\'s developed a chemical compound that appears to degrade gold quality, allowing him to profit from market manipulation.',
        type: 'story',
        difficulty: 'expert',
        reward: 5000,
        completed: false,
        interactiveContent: {
          type: 'intelligence-report',
          intel: [
            { source: 'Intercepted Email', content: 'Instructions for accessing Fort Knox ventilation system' },
            { source: 'Chemical Analysis', content: 'Formula for compound that temporarily discolors gold, making it appear contaminated' },
            { source: 'Financial Records', content: 'Evidence of Goldfinger\'s massive short positions against gold-backed securities' }
          ],
          conclusion: 'Goldfinger plans to create the appearance of contaminated gold reserves, triggering a market panic and collapse in gold prices. He stands to make billions from his short positions. The operation is scheduled to coincide with the next Federal Reserve announcement.'
        }
      },
      {
        id: 'treasury-audit-4',
        title: 'Blockchain Transparency Implementation',
        description: 'Implement a blockchain-based transparency system for Treasury operations. This will create an immutable record of all financial transactions and prevent future manipulation.',
        type: 'agency',
        agency: 'Treasury',
        difficulty: 'expert',
        reward: 2000,
        completed: false,
        interactiveContent: {
          type: 'implementation',
          system: 'Treasury Blockchain Transparency System',
          features: [
            'Real-time recording of all financial transactions',
            'Public verification of Treasury holdings and disbursements',
            'Cryptographic proof of fund origins and destinations',
            'Automated reconciliation with zero delay',
            'Tamper-proof audit trail accessible to oversight committees'
          ],
          test: 'The system successfully processed a simulated month of Treasury operations with 100% accuracy and transparency. Reconciliation time was reduced from 23 days to 3 minutes, and all transactions were publicly verifiable without compromising security.'
        }
      }
    ]
  },
  {
    id: 'fort-knox',
    title: 'Fort Knox Security',
    description: 'Secure Fort Knox against Goldfinger\'s attack. Intelligence indicates he\'s planning to infiltrate the facility during the scheduled maintenance of the security systems.',
    completed: false,
    unlocked: false,
    backgroundImage: 'https://images.unsplash.com/photo-1518544866330-3b71e71e0d05?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    milestones: [
      {
        id: 'fort-knox-1',
        title: 'Security Assessment',
        description: 'Assess Fort Knox security protocols and identify vulnerabilities. Goldfinger has bribed a security consultant to recommend reducing certain security measures during "low-risk" periods.',
        type: 'agency',
        agency: 'DHS',
        difficulty: 'expert',
        reward: 1000,
        completed: false,
        interactiveContent: {
          type: 'security-audit',
          vulnerabilities: [
            { system: 'Perimeter Sensors', issue: 'Scheduled 4-hour maintenance window with reduced coverage' },
            { system: 'Guard Rotation', issue: 'Staff reduction during night shift due to "budget optimization"' },
            { system: 'Camera System', issue: 'Blind spots created by recent "modernization" project' },
            { system: 'Access Control', issue: 'Temporary bypass codes for maintenance workers' }
          ],
          recommendation: 'Implement 24/7 blockchain-verified security logs that cannot be altered, even by system administrators. Add redundant systems during maintenance periods and verify all personnel through multi-factor biometric authentication.'
        }
      },
      {
        id: 'fort-knox-2',
        title: 'Implement Blockchain Security',
        description: 'Implement blockchain-based security measures for Fort Knox. By creating an immutable record of all access events, you can prevent unauthorized entry and detect tampering attempts.',
        type: 'agency',
        agency: 'DHS',
        difficulty: 'expert',
        reward: 1000,
        completed: false,
        interactiveContent: {
          type: 'implementation',
          system: 'Blockchain Security Protocol',
          features: [
            'Immutable access logs recorded on the blockchain',
            'Multi-signature authorization for all vault access',
            'Real-time anomaly detection with AI analysis',
            'Decentralized alarm system resistant to single-point failures',
            'Cryptographic verification of all personnel identities',
            'Tamper-evident seals with blockchain verification'
          ],
          test: 'During a simulated breach attempt, the system successfully identified and blocked unauthorized access, even when the attacker had valid credentials. The blockchain record provided forensic evidence of the attempt that could not be altered.'
        }
      },
      {
        id: 'fort-knox-3',
        title: 'Final Showdown with Goldfinger',
        description: 'Confront Goldfinger and prevent the contamination of the gold supply. He\'s arrived at Fort Knox with a team disguised as maintenance workers, carrying equipment that appears to be for ventilation repair but actually contains his gold-contaminating compound.',
        type: 'story',
        difficulty: 'legendary',
        reward: 10000,
        completed: false,
        interactiveContent: {
          type: 'mission',
          scenario: 'Fort Knox Infiltration',
          objectives: [
            'Identify Goldfinger\'s team among legitimate workers',
            'Secure the gold vault before contamination can begin',
            'Capture evidence of Goldfinger\'s market manipulation scheme',
            'Apprehend Goldfinger before he can escape'
          ],
          climax: 'As Goldfinger realizes his plan has been foiled, he attempts to release the contaminating agent into the air circulation system as a last resort. Using the blockchain security system, you remotely seal the ventilation controls and trap him in the maintenance area. DHS agents move in to make the arrest, finding him with irrefutable evidence of his plot.',
          outcome: 'With Goldfinger in custody and evidence of his financial crimes secured, markets remain stable. The Treasury Department implements your blockchain security and efficiency measures across all operations, saving billions in taxpayer money and setting a new standard for government accountability.'
        }
      },
      {
        id: 'fort-knox-4',
        title: 'Global Blockchain Implementation',
        description: 'Expand the successful Fort Knox blockchain security system to all critical government facilities worldwide. This will create a new standard for security and transparency in government operations.',
        type: 'agency',
        agency: 'DHS',
        difficulty: 'legendary',
        reward: 5000,
        completed: false,
        interactiveContent: {
          type: 'implementation',
          system: 'Global Government Blockchain Security Network',
          features: [
            'Standardized security protocols across all government facilities',
            'Cross-agency coordination and information sharing',
            'Real-time threat detection and response',
            'Immutable audit trails for all security events',
            'Public transparency dashboards for non-sensitive metrics',
            'Automated compliance verification for security standards'
          ],
          test: 'The global implementation has reduced security incidents by 87% across all participating facilities. Audit costs have decreased by 92%, while detection of potential threats has improved by 340%. The system has already prevented three major security breaches that would have gone undetected under previous systems.'
        }
      }
    ]
  },
  {
    id: 'dhs-reform',
    title: 'DHS Efficiency Reform',
    description: 'Modernize the Department of Homeland Security with blockchain-based systems. Goldfinger has created deliberate inefficiencies in emergency response coordination to maximize damage during crises.',
    completed: false,
    unlocked: false,
    backgroundImage: 'https://images.unsplash.com/photo-1569429593410-b498b3fb3387?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    milestones: [
      {
        id: 'dhs-reform-1',
        title: 'Emergency Response Analysis',
        description: 'Analyze DHS emergency response protocols and identify inefficiencies. Goldfinger has introduced unnecessary approval layers that delay critical responses by an average of 47 minutes.',
        type: 'agency',
        agency: 'DHS',
        difficulty: 'hard',
        reward: 1000,
        completed: false,
        interactiveContent: {
          type: 'data-analysis',
          dataset: 'Emergency Response Times',
          anomalies: [
            'Multiple redundant approval requirements for emergency deployments',
            'Deliberate routing of communications through overloaded channels',
            'Resource allocation systems that prioritize bureaucratic compliance over response speed',
            'Artificial delays in information sharing between agencies'
          ],
          conclusion: 'The current system has been deliberately designed to slow emergency response while maintaining plausible deniability. By implementing a blockchain-based approval and coordination system, you can reduce response times by 82% while maintaining all necessary oversight.'
        }
      },
      {
        id: 'dhs-reform-2',
        title: 'Blockchain Coordination System',
        description: 'Implement a blockchain-based emergency coordination system. This will create transparent, real-time resource allocation and eliminate unnecessary delays in crisis response.',
        type: 'agency',
        agency: 'DHS',
        difficulty: 'expert',
        reward: 2000,
        completed: false,
        interactiveContent: {
          type: 'implementation',
          system: 'Emergency Response Blockchain Network',
          features: [
            'Real-time resource tracking and allocation',
            'Multi-agency coordination with zero communication delay',
            'Smart contracts for automatic resource deployment based on event parameters',
            'Immutable audit trail of all decisions and actions',
            'Decentralized command structure resistant to communication disruptions',
            'Transparent public dashboard for affected communities'
          ],
          test: 'During a simulated natural disaster, the system coordinated response across 17 agencies with an average deployment time of 4.3 minutes, compared to the previous average of 51 minutes. All resources were optimally allocated based on real-time needs assessment.'
        }
      },
      {
        id: 'dhs-reform-3',
        title: 'Uncover Sabotage Attempt',
        description: 'Discover and neutralize Goldfinger\'s attempt to sabotage the new blockchain system. He\'s planted operatives within the IT department to introduce vulnerabilities during implementation.',
        type: 'story',
        difficulty: 'legendary',
        reward: 5000,
        completed: false,
        interactiveContent: {
          type: 'investigation',
          evidence: [
            { type: 'code', name: 'System Modification', content: 'Subtle changes to the blockchain validation protocol that would allow selective transaction manipulation' },
            { type: 'email', name: 'Encrypted Communication', content: 'Instructions from Goldfinger to his operative detailing how to create a "backdoor" in the system' },
            { type: 'access log', name: 'Unusual System Access', content: 'Pattern of late-night access to core system components by unauthorized personnel' },
            { type: 'personnel file', name: 'False Credentials', content: 'Recently hired "security consultant" with fabricated background and references' }
          ],
          revelation: 'Goldfinger has attempted to compromise the blockchain system by inserting a sophisticated backdoor that would allow him to manipulate emergency response during critical situations. His ultimate goal is to cause catastrophic failures that would discredit blockchain technology and restore the inefficient systems he exploited.'
        }
      },
      {
        id: 'dhs-reform-4',
        title: 'National Crisis Prevention',
        description: 'Use the new blockchain system to prevent a coordinated attack planned by Goldfinger. He\'s orchestrated a series of infrastructure disruptions timed to overwhelm traditional response capabilities.',
        type: 'story',
        difficulty: 'legendary',
        reward: 10000,
        completed: false,
        interactiveContent: {
          type: 'mission',
          scenario: 'Coordinated Infrastructure Attack',
          objectives: [
            'Detect early warning signs across multiple systems',
            'Coordinate preventative measures across federal, state, and local agencies',
            'Deploy resources to critical infrastructure before attacks occur',
            'Capture evidence of Goldfinger\'s involvement for prosecution',
            'Demonstrate the effectiveness of blockchain-based government systems'
          ],
          climax: 'As Goldfinger\'s operatives begin their synchronized attacks on power grids, water treatment facilities, and transportation systems, your blockchain coordination system instantly identifies the pattern and deploys countermeasures. The transparent, real-time nature of the system allows for unprecedented coordination between agencies, neutralizing threats before they can cause significant damage.',
          outcome: 'The attack is thwarted with minimal disruption, and Goldfinger\'s entire network is exposed through the blockchain\'s immutable evidence trail. The success of the system leads to its adoption as the new standard for critical infrastructure protection nationwide, permanently eliminating the inefficiencies Goldfinger exploited.'
        }
      }
    ]
  }
];