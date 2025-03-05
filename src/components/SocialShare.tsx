import React, { useState } from 'react';
import { Share2, Twitter, Facebook, Linkedin, Link, Check, Copy, Mail } from 'lucide-react';

interface SocialShareProps {
  title?: string;
  description?: string;
  url?: string;
  hashtags?: string[];
}

const SocialShare: React.FC<SocialShareProps> = ({
  title = "DGE: 007 GOLDFINGER - Blockchain Game",
  description = "Join the Digital Government Efficiency agency and help thwart Goldfinger's plans to cripple the U.S. government with inefficiency. A blockchain-based game demonstrating blockchain technology.",
  url = window.location.href,
  hashtags = ["BlockchainGame", "GovTech", "CryptoGaming"]
}) => {
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copied, setCopied] = useState(false);
  
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description);
  const encodedHashtags = encodeURIComponent(hashtags.join(','));
  
  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}&hashtags=${encodedHashtags}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}&summary=${encodedDescription}`,
    email: `mailto:?subject=${encodedTitle}&body=${encodedDescription}%0A%0A${encodedUrl}`
  };
  
  const toggleShareMenu = () => {
    setShowShareMenu(!showShareMenu);
    setCopied(false);
  };
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  
  return (
    <div className="relative">
      <button
        onClick={toggleShareMenu}
        className="flex items-center px-3 py-1.5 rounded text-sm font-medium bg-[#1e293b] text-gray-300 border border-gray-700 hover:bg-[#263548]"
        aria-label="Share this game"
      >
        <Share2 className="mr-1.5" size={16} />
        Share
      </button>
      
      {showShareMenu && (
        <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-[#0f172a] border border-gray-800 z-10">
          <div className="py-1 rounded-md bg-[#0f172a] shadow-xs">
            <div className="px-4 py-2 text-sm text-gray-300 border-b border-gray-800">
              Share this game
            </div>
            
            <a
              href={shareLinks.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-[#1e293b]"
            >
              <Twitter className="mr-3 text-blue-400" size={16} />
              Twitter
            </a>
            
            <a
              href={shareLinks.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-[#1e293b]"
            >
              <Facebook className="mr-3 text-blue-600" size={16} />
              Facebook
            </a>
            
            <a
              href={shareLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-[#1e293b]"
            >
              <Linkedin className="mr-3 text-blue-500" size={16} />
              LinkedIn
            </a>
            
            <a
              href={shareLinks.email}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-[#1e293b]"
            >
              <Mail className="mr-3 text-gray-400" size={16} />
              Email
            </a>
            
            <button
              onClick={copyToClipboard}
              className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-[#1e293b]"
            >
              {copied ? (
                <>
                  <Check className="mr-3 text-green-500" size={16} />
                  <span className="text-green-500">Copied!</span>
                </>
              ) : (
                <>
                  <Link className="mr-3 text-gray-400" size={16} />
                  Copy link
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SocialShare;