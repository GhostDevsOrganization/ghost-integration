import React from 'react';
import ReactDOM from 'react-dom/client';
import { Buffer } from 'buffer';
import process from 'process';
import 'react-app-polyfill/stable';
import './index.css';
import './styles/mobile-fixes.css';
import App from './App'; // Import the main App component
import { ThemeProvider } from './context/ThemeContext.jsx'; // Import ThemeProvider
import MobileResponsiveWrapper from './components/MobileResponsiveWrapper'; // Import MobileResponsiveWrapper
import './mobile-enhancements.js'; // Import mobile enhancements script

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

  console.log = function (...args) {
    originalConsole.log.apply(console, args);
    logToPanel('LOG', ...args);
  };

  console.error = function (...args) {
    originalConsole.error.apply(console, args);
    logToPanel('ERROR', ...args);
  };

  console.warn = function (...args) {
    originalConsole.warn.apply(console, args);
    logToPanel('WARN', ...args);
  };

  window.addEventListener('error', function (e) {
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

function renderApp() {
  root.render(
    <React.StrictMode>
      <ThemeProvider>
        <MobileResponsiveWrapper>
          <App />
        </MobileResponsiveWrapper>
      </ThemeProvider>
    </React.StrictMode>
  );
}

// --- Beta Access Gate ---
renderApp(); // Bypass all checks and render directly
// --- End Beta Access Gate ---
