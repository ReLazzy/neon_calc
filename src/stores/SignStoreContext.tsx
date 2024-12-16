import React, { createContext, useContext } from "react";
import { signStore } from "./SignStore";

const SignStoreContext = createContext(signStore);

export const useSignStore = () => {
  const context = useContext(SignStoreContext);
  if (!context) {
    throw new Error(
      "useSignStore must be used within a SignStoreContext.Provider",
    );
  }
  return context;
};

export const SignStoreProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <SignStoreContext.Provider value={signStore}>
      {children}
    </SignStoreContext.Provider>
  );
};
