// src/InputComponent.js
import React, { useState } from 'react';
import * as Babel from '@babel/standalone';
import { Box, Button, TextField, Typography, Alert } from '@mui/material';

const InputComponent = ({ onCompile }) => {
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
  const [error, setError] = useState(null);

  const handleChange = (event) => {
    setInput(event.target.value);
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
      <TextField
        value={input}
        onChange={handleChange}
        placeholder="Enter JSX here..."
        multiline
        rows={10}
        variant="outlined"
        fullWidth
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
