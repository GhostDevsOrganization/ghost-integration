import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'; // Import router components
import { Buffer } from 'buffer';
import process from 'process';
import 'react-app-polyfill/stable';
import './index.css';
import InterdimensionalPortal from './components/InterdimensionalPortal';
import LandingPage from './components/LandingPage'; // Import the new LandingPage component
import { ThemeProvider } from './context/ThemeContext'; // Import ThemeProvider
import BlackPortfolioChart from './components/BlackPortfolioChart';

// Debug logging setup
function enableMobileDebugging() {
  const debugPanel = document.getElementById('mobile-debug-panel');
  if (!debugPanel) return;
  
  debugPanel.style.display = 'block';
  
  const originalConsole = {
    log: console.log,
    error: console.error,
    warn: console.warn
  };
  
  console.log = function(...args) {
    originalConsole.log.apply(console, args);
    logToPanel('LOG', ...args);
  };
  
  console.error = function(...args) {
    originalConsole.error.apply(console, args);
    logToPanel('ERROR', ...args);
  };
  
  console.warn = function(...args) {
    originalConsole.warn.apply(console, args);
    logToPanel('WARN', ...args);
  };
  
  window.addEventListener('error', function(e) {
    logToPanel('UNCAUGHT', e.message, 'in', e.filename, 'line', e.lineno);
  });
  
  function logToPanel(level, ...args) {
    const msg = `[${level}] ${args.join(' ')}`;
    const logLine = document.createElement('div');
    logLine.textContent = msg;
    debugPanel.appendChild(logLine);
    
    debugPanel.scrollTop = debugPanel.scrollHeight;
    
    while (debugPanel.children.length > 50) {
      debugPanel.removeChild(debugPanel.firstChild);
    }
  }
}

if (window.location.search.includes('debug=true')) {
  enableMobileDebugging();
}

const root = ReactDOM.createRoot(document.getElementById('root'));

function App() {
  const [showAnalytics, setShowAnalytics] = useState(false);
  const location = useLocation();

  const isPortalRoute = location.pathname.startsWith('/portal');

  return (
    <ThemeProvider>
      <div className="relative">
        {isPortalRoute && (
          null
        )}

        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/portal" element={<InterdimensionalPortal />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

function renderApp() {
  root.render(
    <React.StrictMode>
      <BrowserRouter> {/* BrowserRouter wraps the App */}
        <App />
      </BrowserRouter>
    </React.StrictMode>
  );
}

// --- Beta Access Gate ---
renderApp(); // Bypass all checks and render directly
// --- End Beta Access Gate ---
