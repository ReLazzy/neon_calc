import React from "react";
import { SignStoreProvider } from "./stores/SignStoreContext";

import Main from "./pages/Main";
import AuthPage from "./pages/authpage/AuthPage";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <BrowserRouter>
    <SignStoreProvider>
      <AppRoutes />
    </SignStoreProvider>
    </BrowserRouter>
  );
}

export default App;
