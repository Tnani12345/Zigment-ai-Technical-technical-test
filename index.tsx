import React from 'react';
import ReactDOM from 'react-dom'; // Standard for React 17
import './index.css';  // Your global CSS
import App from './App.tsx';  // Your main App component

// React 17: Use ReactDOM.render() to mount the App component
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')  // Ensure this element exists in your HTML
);
