import { useState, useEffect } from 'react';

/**
 * Mobile Responsive Wrapper Component
 * This component provides mobile responsive enhancements for the Kasportal application
 */
const MobileResponsiveWrapper = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);

  useEffect(() => {
    // Set viewport meta tag for better mobile display
    const metaViewport = document.querySelector('meta[name="viewport"]');
    if (!metaViewport) {
      const metaTag = document.createElement('meta');
      metaTag.name = 'viewport';
      metaTag.content = 'width=device-width, initial-scale=1.0, maximum-scale=5.0, viewport-fit=cover';
      document.head.appendChild(metaTag);
    } else {
      metaViewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=5.0, viewport-fit=cover';
    }

    // Handle window resize
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      // Close mobile menu when switching to desktop view
      if (window.innerWidth > 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Custom styles for mobile optimization
  const mobileStyles = `
    @media (max-width: 768px) {
      /* Mobile navigation enhancements */
      nav {
        padding: 1rem !important;
      }

      nav > div:not(:first-child) {
        display: ${isMobileMenuOpen ? 'flex' : 'none'};
        flex-direction: column;
        width: 100%;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background-color: #000;
        padding: 1rem;
        border-bottom: 1px solid rgba(74, 222, 128, 0.1);
        z-index: 50;
      }

      /* Responsive grid adjustments */
      .grid-cols-2,
      .sm\\:grid-cols-2,
      .sm\\:grid-cols-3 {
        grid-template-columns: repeat(2, 1fr) !important;
      }

      .md\\:grid-cols-2,
      .md\\:grid-cols-3,
      .md\\:grid-cols-6,
      .lg\\:grid-cols-4,
      .lg\\:grid-cols-5 {
        grid-template-columns: 1fr !important;
      }

      /* Better spacing for mobile */
      .py-24 {
        padding-top: 3rem !important;
        padding-bottom: 3rem !important;
      }

      .mb-16, .mb-20 {
        margin-bottom: 2rem !important;
      }

      /* Font size adjustments */
      .text-4xl, .md\\:text-4xl {
        font-size: 1.75rem !important;
      }

      .text-xl {
        font-size: 1rem !important;
      }
    }

    @media (max-width: 480px) {
      /* Even smaller screens */
      .grid-cols-2,
      .sm\\:grid-cols-2,
      .sm\\:grid-cols-3 {
        grid-template-columns: 1fr !important;
      }

      /* Adjusted sizes */
      .py-24 {
        padding-top: 2rem !important;
        padding-bottom: 2rem !important;
      }

      .p-6 {
        padding: 1rem !important;
      }

      /* Better typography for small screens */
      .text-4xl, .md\\:text-4xl, .text-3xl {
        font-size: 1.5rem !important;
      }

      .text-xl, .text-2xl {
        font-size: 0.95rem !important;
      }
    }

    /* Handle safe areas for notched devices */
    @supports (padding: env(safe-area-inset-left)) {
      .min-h-screen {
        padding-left: env(safe-area-inset-left);
        padding-right: env(safe-area-inset-right);
        padding-bottom: env(safe-area-inset-bottom);
      }
    }

    /* Animated mobile menu button */
    .mobile-menu-btn {
      display: none;
    }

    @media (max-width: 768px) {
      .mobile-menu-btn {
        display: block;
        position: absolute;
        right: 1rem;
        top: 1rem;
        z-index: 60;
        width: 44px;
        height: 44px;
        background: transparent;
        border: none;
        cursor: pointer;
      }

      .mobile-menu-btn .bar {
        display: block;
        width: 24px;
        height: 2px;
        margin: 5px auto;
        background-color: white;
        transition: all 0.3s ease-in-out;
      }

      .mobile-menu-btn.open .bar:nth-child(1) {
        transform: translateY(7px) rotate(45deg);
        background-color: #4ade80;
      }

      .mobile-menu-btn.open .bar:nth-child(2) {
        opacity: 0;
      }

      .mobile-menu-btn.open .bar:nth-child(3) {
        transform: translateY(-7px) rotate(-45deg);
        background-color: #4ade80;
      }
    }
  `;

  const MobileMenuButton = () => {
    if (windowWidth > 768) return null;

    return (
      <button
        className={`mobile-menu-btn ${isMobileMenuOpen ? 'open' : ''}`}
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label="Toggle mobile menu"
      >
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </button>
    );
  };

  return (
    <>
      <style>{mobileStyles}</style>
      <MobileMenuButton />
      {children}
    </>
  );
};

export default MobileResponsiveWrapper;
