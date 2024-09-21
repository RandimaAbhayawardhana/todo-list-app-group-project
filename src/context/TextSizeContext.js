import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const TextSizeContext = createContext();

export const TextSizeProvider = ({ children }) => {
  const [textSize, setTextSize] = useState(16); // Default text size

  // Load the text size from AsyncStorage when the app starts
  useEffect(() => {
    const loadTextSize = async () => {
      try {
        const savedTextSize = await AsyncStorage.getItem('textSize');
        if (savedTextSize) {
          setTextSize(parseInt(savedTextSize));
        }
      } catch (error) {
        console.error('Failed to load text size:', error);
      }
    };
    loadTextSize();
  }, []);

  // Save the text size to AsyncStorage whenever it changes
  const updateTextSize = async (size) => {
    try {
      setTextSize(size);
      await AsyncStorage.setItem('textSize', size.toString());
    } catch (error) {
      console.error('Failed to save text size:', error);
    }
  };

  return (
    <TextSizeContext.Provider value={{ textSize, updateTextSize }}>
      {children}
    </TextSizeContext.Provider>
  );
};
