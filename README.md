# DGE: 007 GOLDFINGER - Blockchain-Based Game

This project demonstrates a blockchain-based game where players take on the role of DGE (Digital Government Efficiency) agents. Their mission is to reform inefficient government agencies and thwart the plans of the villain, Goldfinger.

## Features

- **Blockchain Identity**: Users are identified by their BSV address, derived from their private key
- **Cryptographic Authentication**: Login via challenge-response using digital signatures
- **Immutable Data Storage**: Profile updates and game progress stored on the blockchain
- **In-Game Transactions**: Send satoshis with optional metadata
- **Balance Tracking**: View your BSV balance in real-time
- **Milestone System**: Complete tasks tracked on the blockchain using hashes
- **Reward System**: Earn BSV for completing milestones
- **Badge System**: Earn badges for completing mission chains

## Implementation Details

### User Registration
- Associates a username with a BSV address via an OP_RETURN transaction
- Stores the transaction ID for future reference

### User Login
- Authenticates users by verifying a signed challenge against their BSV address
- No passwords to store or manage

### Profile Updates and Game Data Storage
- Stores profile updates or game progress on the blockchain using OP_RETURN transactions
- Creates an immutable history of user activities

### In-Game Transactions
- Allows users to send satoshis to each other with optional metadata
- Records transactions on the blockchain for transparency

### Milestone System
- Milestones are chained together with each milestone's hash linking to the previous one
- Completion of milestones is recorded on the blockchain
- Players earn rewards in BSV for each completed milestone

## SmartLedger SDK Integration

This application integrates with the SmartLedger SDK, which provides the following functionality:

- Loading WIF keys and deriving BSV addresses
- Fetching balance information
- Creating and broadcasting OP_RETURN transactions
- Sending satoshis with optional metadata
- Verifying message signatures

## Security Considerations

- **Private Key Management**: Users must secure their private keys
- **Data Privacy**: OP_RETURN data is publicly visible, so sensitive information should be encrypted
- **Signature Verification**: All signatures are verified to prevent spoofing

## Getting Started

1. Clone this repository
2. Install dependencies with `npm install`
3. Start the development server with `npm run dev`
4. Load your WIF key to begin using the application

## Game Mechanics

### Core Gameplay
The gameplay revolves around a simple, repeatable loop:
1. Choose a Milestone: Players select a task from a list of available milestones tied to government agencies or the story.
2. Complete the Milestone: Players perform a basic action (e.g., solving a puzzle, answering a question, or clicking through a reform simulation).
3. Chain the Milestone: Upon completion, a hash of the milestone is generated and linked to the previous milestone's hash, forming a chain on the blockchain.
4. Earn BSV: Players receive an automatic BSV payment for each milestone completed.
5. Repeat: Players move to the next milestone, building their chain and accumulating rewards.

### Progression and Rewards
- Milestone Chains: Milestones are grouped into chains (e.g., "USPS Reform Chain").
- Levels: Players earn XP per milestone, leveling up to access higher-reward milestones.
- BSV Payments: Direct cash rewards for milestone completion.
- Badges: Earn titles like "DHS Reformer" or "Goldfinger Foe" for completing chains.

## Note

This implementation uses a mock version of the SmartLedger SDK for development purposes. In a production environment, you would use the actual SDK loaded from a CDN.