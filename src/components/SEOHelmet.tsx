import React from 'react';

interface SEOHelmetProps {
  title?: string;
  description?: string;
  imageUrl?: string;
  url?: string;
  keywords?: string[];
}

const SEOHelmet: React.FC<SEOHelmetProps> = ({
  title = "DGE: 007 GOLDFINGER - Blockchain Game",
  description = "Join the Digital Government Efficiency agency and help thwart Goldfinger's plans to cripple the U.S. government with inefficiency. A blockchain-based game demonstrating BSV technology.",
  imageUrl = "https://images.unsplash.com/photo-1518544866330-3b71e71e0d05?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  url = window.location.href,
  keywords = ["blockchain game", "BSV", "Bitcoin SV", "government efficiency", "Goldfinger", "crypto game", "play to earn"]
}) => {
  // This component doesn't render anything visible
  // It's used to dynamically update meta tags based on the current page/state
  // In a real implementation, you would use a library like react-helmet
  
  React.useEffect(() => {
    // Update title
    document.title = title;
    
    // Update meta tags
    const metaTags = {
      'description': description,
      'keywords': keywords.join(', '),
      'og:title': title,
      'og:description': description,
      'og:image': imageUrl,
      'og:url': url,
      'twitter:title': title,
      'twitter:description': description,
      'twitter:image': imageUrl,
      'twitter:url': url
    };
    
    // Update each meta tag
    Object.entries(metaTags).forEach(([name, content]) => {
      // Find existing meta tag
      let metaTag = document.querySelector(`meta[property="${name}"]`) || 
                    document.querySelector(`meta[name="${name}"]`);
      
      // If it exists, update it
      if (metaTag) {
        if (metaTag.hasAttribute('property')) {
          metaTag.setAttribute('content', content);
        } else {
          metaTag.setAttribute('content', content);
        }
      }
    });
    
    // Update canonical URL
    let canonicalTag = document.querySelector('link[rel="canonical"]');
    if (canonicalTag) {
      canonicalTag.setAttribute('href', url);
    }
    
  }, [title, description, imageUrl, url, keywords]);
  
  return null; // This component doesn't render anything visible
};

export default SEOHelmet;