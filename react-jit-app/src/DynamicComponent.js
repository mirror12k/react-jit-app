import React, { useState } from 'react';
import JSXParser from 'react-jsx-parser';

const DynamicComponent = () => {
  const [input, setInput] = useState('');
  const [jsxString, setJsxString] = useState('');

  const handleChange = (event) => {
    setInput(event.target.value);
  };

  const handleCompile = () => {
    setJsxString(input);
  };

  return (
    <div>
      <h1>Dynamic JSX Compiler</h1>
      <textarea
        value={input}
        onChange={handleChange}
        placeholder="Enter JSX here..."
        rows="10"
        cols="50"
      />
      <br />
      <button onClick={handleCompile}>Compile JSX</button>
      <div style={{ marginTop: '20px' }}>
        <h2>Rendered Output:</h2>
        <JSXParser jsx={jsxString} />
      </div>
    </div>
  );
};

export default DynamicComponent;
