import React, { createContext, useState, useContext } from 'react';
import { useColorScheme } from 'react-native';

export const Theme = createContext();

const lightTheme = {
  dark: false,
  colors: {
    background: '#FFFFFF',
    text: '#000000',  
    primary: '#6200EE',   
  },
};

const darkTheme = {
  dark: true,
  colors: {
    background: '#000000',
    text: '#FFFFFF',
    primary: '#BB86FC',
  },
};

export const ThemeProvider = ({ children }) => {
  const systemTheme = useColorScheme();
  
  const [theme, setTheme] = useState(systemTheme === 'dark' ? darkTheme : lightTheme); 

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme.dark ? lightTheme : darkTheme));
  };

  return (
    <Theme.Provider value={{ theme, toggleTheme }}>
      {children}
    </Theme.Provider>
  );
};

export const useTheme = () => useContext();
