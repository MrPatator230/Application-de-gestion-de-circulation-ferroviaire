import React, { createContext, useState, useEffect } from 'react';

export const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [companyName, setCompanyName] = useState('Ma Société Ferroviaire');
  const [companySlogan, setCompanySlogan] = useState('Le transport ferroviaire simplifié');
  const [companyDescription, setCompanyDescription] = useState('Description de la société ferroviaire...');
  const [primaryColor, setPrimaryColor] = useState('#007bff'); // default bootstrap blue
  const [secondaryColor, setSecondaryColor] = useState('#6c757d'); // default bootstrap gray
  const [appName, setAppName] = useState('Train Schedule Management');

  useEffect(() => {
    async function fetchSettings() {
      try {
        const response = await fetch('/api/settings');
        if (response.ok) {
          const data = await response.json();
          setCompanyName(data.companyName || 'Ma Société Ferroviaire');
          setCompanySlogan(data.companySlogan || 'Le transport ferroviaire simplifié');
          setCompanyDescription(data.companyDescription || 'Description de la société ferroviaire...');
          setPrimaryColor(data.primaryColor || '#007bff');
          setSecondaryColor(data.secondaryColor || '#6c757d');
          setAppName(data.appName || 'Train Schedule Management');
        }
      } catch (error) {
        console.error('Failed to fetch settings:', error);
      }
    }
    fetchSettings();
  }, []);

  return (
    <SettingsContext.Provider
      value={{
        companyName,
        setCompanyName,
        companySlogan,
        setCompanySlogan,
        companyDescription,
        setCompanyDescription,
        primaryColor,
        setPrimaryColor,
        secondaryColor,
        setSecondaryColor,
        appName,
        setAppName,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};
