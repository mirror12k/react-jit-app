// src/DynamicComponent.js
import React, { useState } from 'react';
import InputComponent from './InputComponent';
import DynamicRenderer from './DynamicRenderer';

const DynamicComponent = () => {
  const [compiledComponent, setCompiledComponent] = useState(null);

  const handleCompile = (component) => {
    setCompiledComponent(() => component);
  };

  return (
    <div>
      <InputComponent onCompile={handleCompile} />
      <DynamicRenderer compiledComponent={compiledComponent} />
    </div>
  );
};

export default DynamicComponent;
