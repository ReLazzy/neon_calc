import React, { createContext, useEffect, useState } from "react";
import { SignStoreProvider } from "./stores/SignStoreContext";

import Main from "./pages/Main";
import AuthPage from "./pages/authpage/AuthPage";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";

export type AuthContextType = {
  isLogin: boolean;
  setIsLogin: (isLoggedIn: boolean) => void;
};

export const AuthContext = createContext<AuthContextType>({
  isLogin: false,
  setIsLogin: () => {},
});

function App() {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    setIsLogin(!!localStorage.getItem("name"));
  }, []);

  return (
    <AuthContext.Provider value={{ isLogin, setIsLogin }}>
      <BrowserRouter>
        <SignStoreProvider>
          <AppRoutes />
        </SignStoreProvider>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
