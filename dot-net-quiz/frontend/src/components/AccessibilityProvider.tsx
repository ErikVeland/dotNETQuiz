'use client'

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface AccessibilityContextType {
  announceToScreenReader: (message: string) => void;
  keyboardNavigation: boolean;
  highContrast: boolean;
  reducedMotion: boolean;
  toggleHighContrast: () => void;
  toggleReducedMotion: () => void;
  focusedElement: string | null;
  setFocusedElement: (element: string | null) => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within AccessibilityProvider');
  }
  return context;
};

interface AccessibilityProviderProps {
  children: ReactNode;
}

const SkipLinks: React.FC = () => {
  return (
    <div className="skip-links">
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200"
      >
        Skip to main content
      </a>
      <a 
        href="#main-navigation" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-32 z-50 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200"
      >
        Skip to navigation
      </a>
      <a 
        href="#search-input" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-64 z-50 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200"
      >
        Skip to search
      </a>
    </div>
  );
};

const KeyboardHelpModal: React.FC<{ 
  isOpen: boolean; 
  onClose: () => void; 
}> = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const shortcuts = [
    { key: 'Ctrl/Cmd + K', description: 'Open search' },
    { key: 'Ctrl/Cmd + H', description: 'Go to homepage' },
    { key: 'Ctrl/Cmd + N', description: 'Focus navigation' },
    { key: 'Ctrl/Cmd + /', description: 'Show keyboard shortcuts' },
    { key: 'Tab', description: 'Navigate forward' },
    { key: 'Shift + Tab', description: 'Navigate backward' },
    { key: 'Enter/Space', description: 'Activate focused element' },
    { key: 'Escape', description: 'Close modals/dropdowns' },
    { key: 'Arrow Keys', description: 'Navigate within components' }
  ];

  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
      role="dialog"
      aria-labelledby="keyboard-help-title"
      aria-modal="true"
    >
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full mx-4 shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <h2 id="keyboard-help-title" className="text-xl font-bold text-gray-900 dark:text-gray-100">
            Keyboard Shortcuts
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            aria-label="Close keyboard shortcuts help"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {shortcuts.map((shortcut, index) => (
            <div key={index} className="flex justify-between items-center">
              <span className="text-sm text-gray-600 dark:text-gray-300">
                {shortcut.description}
              </span>
              <kbd className="px-2 py-1 text-xs font-semibold text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded">
                {shortcut.key}
              </kbd>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const AccessibilityProvider: React.FC<AccessibilityProviderProps> = ({ children }) => {
  const [keyboardNavigation, setKeyboardNavigation] = useState(false);
  const [screenReaderAnnouncements, setScreenReaderAnnouncements] = useState<string[]>([]);
  const [highContrast, setHighContrast] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [focusedElement, setFocusedElement] = useState<string | null>(null);
  const [showKeyboardHelp, setShowKeyboardHelp] = useState(false);

  // Load accessibility preferences from localStorage
  useEffect(() => {
    try {
      const savedHighContrast = localStorage.getItem('accessibility-high-contrast');
      if (savedHighContrast) {
        setHighContrast(JSON.parse(savedHighContrast));
      }

      const savedReducedMotion = localStorage.getItem('accessibility-reduced-motion');
      if (savedReducedMotion) {
        setReducedMotion(JSON.parse(savedReducedMotion));
      }

      // Check for system preference for reduced motion
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      if (mediaQuery.matches) {
        setReducedMotion(true);
      }

      // Listen for changes to system preference
      const handleMediaQueryChange = (e: MediaQueryListEvent) => {
        setReducedMotion(e.matches);
      };
      mediaQuery.addEventListener('change', handleMediaQueryChange);
      
      return () => mediaQuery.removeEventListener('change', handleMediaQueryChange);
    } catch (error) {
      console.error('Error loading accessibility preferences:', error);
    }
  }, []);

  // Apply accessibility classes to document
  useEffect(() => {
    const root = document.documentElement;
    
    if (highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }
    
    if (reducedMotion) {
      root.classList.add('reduced-motion');
    } else {
      root.classList.remove('reduced-motion');
    }
    
    if (keyboardNavigation) {
      root.classList.add('keyboard-navigation');
    } else {
      root.classList.remove('keyboard-navigation');
    }
  }, [highContrast, reducedMotion, keyboardNavigation]);

  // Keyboard event handlers
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Detect keyboard navigation
      if (e.key === 'Tab') {
        setKeyboardNavigation(true);
      }
      
      // Global keyboard shortcuts
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case 'k':
          case 'K':
            e.preventDefault();
            const searchInput = document.getElementById('search-input');
            if (searchInput) {
              searchInput.focus();
              announceToScreenReader('Search input focused');
            }
            break;
          case 'h':
          case 'H':
            e.preventDefault();
            window.location.href = '/';
            announceToScreenReader('Navigating to homepage');
            break;
          case 'n':
          case 'N':
            e.preventDefault();
            const navigation = document.getElementById('main-navigation');
            if (navigation) {
              const firstLink = navigation.querySelector('a, button');
              if (firstLink) {
                (firstLink as HTMLElement).focus();
                announceToScreenReader('Navigation focused');
              }
            }
            break;
          case '/':
            e.preventDefault();
            setShowKeyboardHelp(true);
            break;
        }
      }

      // Escape key handling
      if (e.key === 'Escape') {
        // Close any open dropdowns or modals
        const openDropdowns = document.querySelectorAll('[aria-expanded="true"]');
        openDropdowns.forEach(dropdown => {
          dropdown.setAttribute('aria-expanded', 'false');
        });
        
        // Close keyboard help if open
        if (showKeyboardHelp) {
          setShowKeyboardHelp(false);
        }
      }
    };
    
    const handleMouseDown = () => {
      setKeyboardNavigation(false);
    };

    const handleFocus = (e: FocusEvent) => {
      if (e.target && (e.target as HTMLElement).id) {
        setFocusedElement((e.target as HTMLElement).id);
      }
    };

    const handleBlur = () => {
      setFocusedElement(null);
    };
    
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('focus', handleFocus, true);
    document.addEventListener('blur', handleBlur, true);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('focus', handleFocus, true);
      document.removeEventListener('blur', handleBlur, true);
    };
  }, [showKeyboardHelp]);

  const announceToScreenReader = (message: string) => {
    setScreenReaderAnnouncements(prev => [...prev, message]);
    setTimeout(() => {
      setScreenReaderAnnouncements(prev => prev.slice(1));
    }, 1000);
  };

  const toggleHighContrast = () => {
    const newValue = !highContrast;
    setHighContrast(newValue);
    localStorage.setItem('accessibility-high-contrast', JSON.stringify(newValue));
    announceToScreenReader(newValue ? 'High contrast enabled' : 'High contrast disabled');
  };

  const toggleReducedMotion = () => {
    const newValue = !reducedMotion;
    setReducedMotion(newValue);
    localStorage.setItem('accessibility-reduced-motion', JSON.stringify(newValue));
    announceToScreenReader(newValue ? 'Reduced motion enabled' : 'Reduced motion disabled');
  };

  const contextValue: AccessibilityContextType = {
    announceToScreenReader,
    keyboardNavigation,
    highContrast,
    reducedMotion,
    toggleHighContrast,
    toggleReducedMotion,
    focusedElement,
    setFocusedElement
  };

  return (
    <AccessibilityContext.Provider value={contextValue}>
      {children}
      
      {/* Screen Reader Announcements */}
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {screenReaderAnnouncements.map((announcement, index) => (
          <div key={index}>{announcement}</div>
        ))}
      </div>
      
      {/* Skip Links */}
      <SkipLinks />
      
      {/* Keyboard Help Modal */}
      <KeyboardHelpModal 
        isOpen={showKeyboardHelp} 
        onClose={() => setShowKeyboardHelp(false)} 
      />
      
      {/* Accessibility Controls */}
      <div className="fixed bottom-4 right-4 z-40">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-3 space-y-2 border border-gray-200 dark:border-gray-700">
          <button
            onClick={toggleHighContrast}
            className={`w-full text-left px-3 py-2 text-sm rounded transition-colors duration-200 ${
              highContrast 
                ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200' 
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
            aria-label={`${highContrast ? 'Disable' : 'Enable'} high contrast mode`}
          >
            🎨 High Contrast
          </button>
          
          <button
            onClick={toggleReducedMotion}
            className={`w-full text-left px-3 py-2 text-sm rounded transition-colors duration-200 ${
              reducedMotion 
                ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200' 
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
            aria-label={`${reducedMotion ? 'Disable' : 'Enable'} reduced motion`}
          >
            🏃 Reduced Motion
          </button>
          
          <button
            onClick={() => setShowKeyboardHelp(true)}
            className="w-full text-left px-3 py-2 text-sm rounded text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
            aria-label="Show keyboard shortcuts help"
          >
            ⌨️ Shortcuts
          </button>
        </div>
      </div>
    </AccessibilityContext.Provider>
  );
};

// CSS to be added to global styles
export const accessibilityStyles = `
  /* Screen reader only class */
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  /* Focus visible for keyboard navigation */
  .keyboard-navigation *:focus {
    outline: 2px solid #3b82f6;
    outline-offset: 2px;
  }

  /* High contrast mode */
  .high-contrast {
    filter: contrast(150%);
  }

  .high-contrast * {
    border-color: #000 !important;
    background-image: none !important;
  }

  /* Reduced motion */
  .reduced-motion *,
  .reduced-motion *:before,
  .reduced-motion *:after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }

  /* Focus indicators */
  .focus\\:not-sr-only:focus {
    position: static;
    width: auto;
    height: auto;
    padding: inherit;
    margin: inherit;
    overflow: visible;
    clip: auto;
    white-space: normal;
  }

  /* Ensure interactive elements have minimum size for touch */
  button, 
  input[type="button"], 
  input[type="submit"], 
  input[type="reset"], 
  input[type="file"]::-webkit-file-upload-button, 
  a[role="button"] {
    min-height: 44px;
    min-width: 44px;
  }

  /* Skip links styling */
  .skip-links a {
    transform: translateY(-100%);
  }

  .skip-links a:focus {
    transform: translateY(0);
  }
`;

export default AccessibilityProvider;