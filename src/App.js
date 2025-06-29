// Fixed App.js - Remove duplicate BrowserRouter
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import React, { useState, useEffect, useCallback, lazy, Suspense } from 'react';

function App() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <main className={`flex-1 ${'pt-0'} bg-white dark:bg-black transition-colors duration-200`}>
      </main>
    </div>
  );
}

export default App;