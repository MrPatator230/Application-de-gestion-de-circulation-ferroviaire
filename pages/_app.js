import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import '../styles/globals.css';
import { createContext, useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { SettingsProvider, SettingsContext } from '../contexts/SettingsContext';

export const AuthContext = createContext();

function AppWrapper({ children }) {
  const { primaryColor, secondaryColor, appName } = useContext(SettingsContext);

  useEffect(() => {
    document.title = appName;
  }, [appName]);

  return (
    <>
      <style jsx global>{`
        :root {
          --bs-primary: ${primaryColor};
          --bs-secondary: ${secondaryColor};
        }
      `}</style>
      {children}
    </>
  );
}

export default function MyApp({ Component, pageProps }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState(null); // 'admin' or 'client'
  const router = useRouter();

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
      <Head>
        <link
          href="https://cdn.jsdelivr.net/npm/startbootstrap-sb-admin-2@4.1.4/css/sb-admin-2.min.css"
          rel="stylesheet"
        />
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
          rel="stylesheet"
        />
      </Head>
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
