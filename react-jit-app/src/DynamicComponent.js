// src/DynamicComponent.js
import React, { useState } from 'react';
import InputComponent from './InputComponent';
import DynamicRenderer from './DynamicRenderer';
import { Container } from '@mui/material';

const DynamicComponent = () => {
  const [compiledComponent, setCompiledComponent] = useState(null);

  const handleCompile = (component) => {
    setCompiledComponent(() => component);
  };

  return (
    <Container>
      <InputComponent onCompile={handleCompile} />
      <DynamicRenderer compiledComponent={compiledComponent} />
    </Container>
  );
};

export default DynamicComponent;
