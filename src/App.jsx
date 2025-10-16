import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoute from "./routes/AppRoute";
import { UserProvider } from "./context/UserContext";

// 1. Import the new components


const App = () => {
  return (
    
  
      <UserProvider>
        <Router>
          <AppRoute />
        </Router>
      </UserProvider>
    
  );
};

export default App;