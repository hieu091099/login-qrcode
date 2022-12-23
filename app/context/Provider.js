import { View, Text } from "react-native";
import React, { createContext, useState } from "react";

export const AppContext = createContext();

const Provider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <AppContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AppContext.Provider>
  );
};

export default Provider;
