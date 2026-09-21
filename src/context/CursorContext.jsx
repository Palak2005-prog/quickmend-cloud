import React, { createContext, useContext, useState, useEffect } from 'react';

const CursorContext = createContext({
  cursorVariant: 'default',
  cursorText: '',
  setCursorVariant: () => {},
  setCursorText: () => {},
  resetCursor: () => {},
  setHoverState: () => {},
});

export const CursorProvider = ({ children }) => {
  const [cursorVariant, setCursorVariant] = useState('default');
  const [cursorText, setCursorText] = useState('');

  const resetCursor = () => {
    setCursorVariant('default');
    setCursorText('');
  };

  const setHoverState = (variant = 'pointer', text = '') => {
    setCursorVariant(variant);
    setCursorText(text);
  };

  return (
    <CursorContext.Provider
      value={{
        cursorVariant,
        cursorText,
        setCursorVariant,
        setCursorText,
        resetCursor,
        setHoverState,
      }}
    >
      {children}
    </CursorContext.Provider>
  );
};

export const useCursor = () => useContext(CursorContext);
