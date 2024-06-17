import React, { createContext, useState } from 'react';

export const SelectedSymbolContext = createContext();

export const SelectedSymbolProvider = ({ children }) => {
  const [selectedSymbol, setSelectedSymbol] = useState('MSFT'); // Default symbol

  return (
    <SelectedSymbolContext.Provider value={{ selectedSymbol, setSelectedSymbol }}>
      {children}
    </SelectedSymbolContext.Provider>
  );
};
