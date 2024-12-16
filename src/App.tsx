import React from "react";
import { SignStoreProvider } from "./stores/SignStoreContext";

import Main from "./pages/Main";

function App() {
  return (
    <SignStoreProvider>
      <Main />
    </SignStoreProvider>
  );
}

export default App;
