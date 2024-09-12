// src/DynamicRenderer.js
import React from 'react';

const DynamicRenderer = ({ compiledComponent }) => {
  return (
    <div style={{ marginTop: '20px' }}>
      <h2>Rendered Output:</h2>
      {compiledComponent ? React.createElement(compiledComponent(React, React.useState)) : <p>Enter and compile JSX with logic!</p>}
    </div>
  );
};

export default DynamicRenderer;
