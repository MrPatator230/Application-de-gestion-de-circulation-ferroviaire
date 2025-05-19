// Import styles
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css';

// Import dependencies
import { createContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { SettingsProvider } from '../contexts/SettingsContext';
import { initTestData } from '../utils/testData';

export const AuthContext = createContext();

function AppWrapper({ children }) {
  return children;
}

export default function MyApp({ Component, pageProps }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState(null); // 'admin' or 'client'
  const router = useRouter();

  // Initialize test data and load scripts
  useEffect(() => {
    // Initialize test data
    initTestData();

    // Load jQuery, Popper.js, and Bootstrap JS
    if (typeof window !== 'undefined') {
      const loadScript = (src) => {
        return new Promise((resolve, reject) => {
          const script = document.createElement('script');
          script.src = src;
          script.async = true;
          script.onload = resolve;
          script.onerror = reject;
          document.body.appendChild(script);
        });
      };

      const loadDependencies = async () => {
        try {
          await loadScript('https://code.jquery.com/jquery-3.6.0.min.js');
          await loadScript('https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js');
          await loadScript('https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/js/bootstrap.min.js');
        } catch (error) {
          console.error('Error loading scripts:', error);
        }
      };

      loadDependencies();

      return () => {
        const scripts = document.querySelectorAll('script');
        scripts.forEach(script => {
          if (script.src.includes('jquery') || script.src.includes('popper') || script.src.includes('bootstrap')) {
            script.parentNode.removeChild(script);
          }
        });
      };
    }
  }, []);

  // Check authentication
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const storedRole = localStorage.getItem('userRole');
    if (token && storedRole) {
      setIsAuthenticated(true);
      setRole(storedRole);
    }
  }, []);

  const login = (username, password) => {
    if (username === 'admin' && password === 'admin') {
      localStorage.setItem('authToken', 'dummy-token');
      localStorage.setItem('userRole', 'admin');
      localStorage.setItem('username', username);
      setIsAuthenticated(true);
      setRole('admin');
      router.push('/admin');
      return true;
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
      localStorage.setItem('authToken', 'dummy-token');
      localStorage.setItem('userRole', 'client');
      localStorage.setItem('username', username);
      setIsAuthenticated(true);
      setRole('client');
      router.push('/client');
      return true;
    }

    return false;
  };

  const register = (username, password) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.find(u => u.username === username)) {
      return false;
    }
    users.push({ username, password });
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('authToken', 'dummy-token');
    localStorage.setItem('userRole', 'client');
    localStorage.setItem('username', username);
    setIsAuthenticated(true);
    setRole('client');
    router.push('/client');
    return true;
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
    localStorage.removeItem('username');
    setIsAuthenticated(false);
    setRole(null);
    router.push('/login');
  };

  return (
    <>
      <Head />
      <AuthContext.Provider value={{ isAuthenticated, role, login, logout, register }}>
        <SettingsProvider>
          <AppWrapper>
            <Component {...pageProps} />
          </AppWrapper>
        </SettingsProvider>
      </AuthContext.Provider>
    </>
  );
}
