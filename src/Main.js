import React from 'react';
import './Main.css'; // Create this CSS file for styling

const Main = () => {
  return (
    <div className="main-container">
      <h1>AI-Powered Video <span className="highlight">Accessible to All!</span></h1>
      <p>
        ZioNotes is the generative AI-powered accessible video platform that makes the information contained within video and audio content accessible for everyone, including those with visual, hearing, and neurological disabilities. ZioNotes promotes discovery, search, navigation, engagement, retention, and knowledge transfer for everyone. It is a game-changer for people with disabilities and a key component in digital transformation to bridge the digital divide and allow everyone access to digital information so they can live a more inclusive and rewarding life.
      </p>
      <a href="https://calendly.com/jeff_ziotag" target="_blank" rel="noopener noreferrer" className="cta-button">
        Free Assessment
      </a>
    </div>
  );
};

export default Main;
