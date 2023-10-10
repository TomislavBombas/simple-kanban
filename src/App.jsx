import React from "react";
import UserContextProvider from "./components/userContext";
import UserSpace from "./pages/userSpace";

function App() {
  return (
    <UserContextProvider>
      <UserSpace />
    </UserContextProvider>
  );
}

export default App;
