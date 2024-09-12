// src/DynamicComponent.js
import React, { useState } from 'react';
import * as Babel from '@babel/standalone';

const DynamicComponent = () => {
  const [input, setInput] = useState(`
  return (props) => {
    const [state, setState] = useState('Initial state');

    const handleClick = () => {
      setState('State changed by dynamic logic');
    };

    return (
      <div>
        <h1>Hello world!</h1>
        <p>{state}</p>
        <button onClick={handleClick}>Change State</button>
      </div>
    );
  };
`);
  const [compiledComponent, setCompiledComponent] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (event) => {
    setInput(event.target.value);
  };

  const handleCompile = () => {
    try {
      // Transpile the JSX into JavaScript
      const transformedCode = Babel.transform(
        `
(function(React, useState) {
  ${input}
});
        `,
        { presets: ['react'] }
      ).code;

      // Evaluate the transformed JavaScript code and get the component
      const dynamicComponent = eval(transformedCode);

      // Set the evaluated component as the compiled component
      setCompiledComponent(() => dynamicComponent);
      setError(null);
    } catch (err) {
      setError('Error compiling JSX: ' + err.message);
    }
  };

  return (
    <div>
      <h1>Dynamic JSX Compiler with Logic</h1>
      <textarea
        value={input}
        onChange={handleChange}
        placeholder="Enter JSX here..."
        rows="10"
        cols="50"
      />
      <br />
      <button onClick={handleCompile}>Compile JSX</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div style={{ marginTop: '20px' }}>
        <h2>Rendered Output:</h2>
        {compiledComponent ? React.createElement(compiledComponent(React, useState)) : <p>Enter and compile JSX with logic!</p>}
      </div>
    </div>
  );
};

export default DynamicComponent;
