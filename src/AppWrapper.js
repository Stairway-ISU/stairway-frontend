// AppWrapper.js
import React from 'react';
import App from './App';
import { ThemeProvider } from './contexts/ThemeContext';
import { BrowserRouter } from 'react-router-dom';

function AppWrapper() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <div className="min-h-screen bg-white dark:bg-black transition-colors duration-200">
          <App />
        </div>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default AppWrapper;