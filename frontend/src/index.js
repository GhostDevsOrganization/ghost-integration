import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'; // Import router components
import { Buffer } from 'buffer';
import process from 'process';
import 'react-app-polyfill/stable';
import './index.css';
import './styles/mobile-fixes.css';
import InterdimensionalPortal from './components/InterdimensionalPortal';
import LandingPage from './components/LandingPage'; // Import the new LandingPage component
import TokenSwappingPage from './components/TokenSwappingPage'; // Import TokenSwappingPage
import MultiWalletSupportPage from './components/MultiWalletSupportPage'; // Import MultiWalletSupportPage
import AdvancedAnalyticsPage from './components/AdvancedAnalyticsPage'; // Import AdvancedAnalyticsPage
import CrossChainCompatibilityPage from './components/CrossChainCompatibilityPage'; // Import CrossChainCompatibilityPage
import LearnPage from './components/LearnPage'; // Import LearnPage
import BlogPage from './components/BlogPage'; // Import BlogPage
import ArticlePage from './components/ArticlePage'; // Import ArticlePage
import IconComparison from './components/IconComparison'; // Import IconComparison
import QuantumSwapEngineTest from './components/QuantumSwapEngineTest'; // Import QuantumSwapEngineTest
import AdvancedPortal from './components/AdvancedPortal'; // Import AdvancedPortal
import EnhancedRadarPortalPage from './components/EnhancedRadarPortalPage'; // Import EnhancedRadarPortalPage
import KaspaResearchPaper from './components/KaspaResearchPaper'; // Import KaspaResearchPaper
import { ThemeProvider } from './context/ThemeContext'; // Import ThemeProvider
import BlackPortfolioChart from './components/BlackPortfolioChart';
import BackgroundDemoShowcase from './components/BackgroundDemoShowcase'; // Import BackgroundDemoShowcase
import MobileResponsiveWrapper from './components/MobileResponsiveWrapper'; // Import MobileResponsiveWrapper
import './mobile-enhancements.js'; // Import mobile enhancements script

// ScrollToTop component to handle route changes
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

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

function App() {
  const [showAnalytics, setShowAnalytics] = useState(false);
  const location = useLocation();

  const isPortalRoute = location.pathname.startsWith('/portal');

  return (
    <ThemeProvider>
      <div className="relative">
        <ScrollToTop />
        {isPortalRoute && (
          null
        )}

        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/portal" element={<AdvancedPortal />} />
          <Route path="/portal/enhanced-radar" element={<EnhancedRadarPortalPage />} />
          <Route path="/portal/interdimensional" element={<InterdimensionalPortal />} />
          <Route path="/swap" element={<TokenSwappingPage />} />
          <Route path="/features/token-swapping" element={<TokenSwappingPage />} />
          <Route path="/features/cross-chain-compatibility" element={<CrossChainCompatibilityPage />} />
          <Route path="/features/multi-wallet-support" element={<MultiWalletSupportPage />} />
          <Route path="/features/advanced-analytics" element={<AdvancedAnalyticsPage />} />
          <Route path="/learn" element={<LearnPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:articleId" element={<ArticlePage />} />
          <Route path="/research/kaspa-analysis" element={<KaspaResearchPaper />} />
          <Route path="/icon-comparison" element={<IconComparison />} />
          <Route path="/demo-backgrounds" element={<BackgroundDemoShowcase />} />
          <Route path="/test/quantum-swap" element={<QuantumSwapEngineTest />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

function renderApp() {
  root.render(
    <React.StrictMode>
      <BrowserRouter> {/* BrowserRouter wraps the App */}
        <MobileResponsiveWrapper>
          <App />
        </MobileResponsiveWrapper>
      </BrowserRouter>
    </React.StrictMode>
  );
}

// --- Beta Access Gate ---
renderApp(); // Bypass all checks and render directly
// --- End Beta Access Gate ---
