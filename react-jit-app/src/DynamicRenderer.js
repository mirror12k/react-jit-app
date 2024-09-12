// src/DynamicRenderer.js
import React from 'react';
import { Box, Typography } from '@mui/material';

const DynamicRenderer = ({ compiledComponent }) => {
  return (
    <Box sx={{ marginTop: 2, padding: 2, border: '1px solid #ccc', borderRadius: '8px' }}>
      {compiledComponent ? React.createElement(compiledComponent(React, React.useState)) : (
        <Typography variant="body1">
          Enter and compile JSX with logic!
        </Typography>
      )}
    </Box>
  );
};

export default DynamicRenderer;
