import { useState, useEffect } from 'react';

/**
 * Detects if the app is running inside Capacitor (native mobile) or in a browser.
 * Also detects small-screen mobile browsers for responsive layout.
 */
export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(() => {
    // Check Capacitor native first
    if (window.Capacitor?.isNativePlatform()) return true;
    // Fallback: check screen width for mobile browsers
    return window.innerWidth < 768;
  });

  useEffect(() => {
    // If native, always mobile
    if (window.Capacitor?.isNativePlatform()) {
      setIsMobile(true);
      return;
    }

    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isMobile;
};

export const isNativePlatform = () => {
  return !!window.Capacitor?.isNativePlatform();
};
