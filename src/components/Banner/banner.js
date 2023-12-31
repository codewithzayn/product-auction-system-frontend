import React from 'react';

const Banner = () => {
  return (
    <div style={{ 
      
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'center', 
      alignItems: 'center' 
    }}>
      <h1 style={{ 
        fontSize: '4rem', 
        fontWeight: 'bold', 
        color: '#fff', 
        textShadow: '2px 2px #000' 
      }}>Your Title</h1>
      <p style={{ 
        fontSize: '1.5rem', 
        color: '#fff', 
        textShadow: '1px 1px #000' 
      }}>Your Subtitle</p>
    </div>
  );
};

export default Banner;
