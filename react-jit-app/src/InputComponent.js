// src/InputComponent.js
import React, { useState } from 'react';
import * as Babel from '@babel/standalone';
import { Box, Button, Typography, Alert } from '@mui/material';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { oneDark } from '@codemirror/theme-one-dark';

const InputComponent = ({ onCompile }) => {
  const [input, setInput] = useState(`
return () => {
  const [state, setState] = useState('Initial state');
  const [clickCount, setclickCount] = useState(0);

  const handleClick = () => {
    setState('State changed by dynamic logic');
    setclickCount(1 + clickCount);
  };

  return (
    <div>
      <h1>Hello world!</h1>
      <p>{state}</p>
      <p>Clicked {clickCount} times!</p>
      <button onClick={handleClick}>Change State</button>
    </div>
  );
};
`);
  const [error, setError] = useState(null);

  const handleChange = (value) => {
    setInput(value);
  };

  const handleCompile = () => {
    try {
      const transformedCode = Babel.transform(
        `
(function(React, useState) {
  ${input}
});
        `,
        { presets: ['react'] }
      ).code;

      const dynamicComponent = eval(transformedCode);

      onCompile(dynamicComponent);
      setError(null);
    } catch (err) {
      setError('Error compiling JSX: ' + err.message);
    }
  };

  return (
    <Box sx={{ padding: 2, border: '1px solid #ccc', borderRadius: '8px', marginTop: 2 }}>
      <Typography variant="h5" gutterBottom>
        Dynamic JSX Compiler
      </Typography>
      <CodeMirror
        value={input}
        extensions={[javascript()]}
        theme={oneDark}
        onChange={(value) => handleChange(value)}
        options={{
          lineNumbers: true,
          tabSize: 2,
          mode: 'jsx',
        }}
      />
      <Button variant="contained" color="primary" onClick={handleCompile} sx={{ marginTop: 2 }}>
        Compile JSX
      </Button>
      {error && (
        <Alert severity="error" sx={{ marginTop: 2 }}>
          {error}
        </Alert>
      )}
    </Box>
  );
};

export default InputComponent;
