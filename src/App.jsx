import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoute from "./routes/AppRoute";
import { UserProvider } from "./context/UserContext";

// 1. Import the new components
import { ThemeProvider } from "./components/ThemeProvider"; // Adjust path if needed
import SmoothCursor from "./components/ui/SmoothCursor";   // Adjust path if needed

const App = () => {
  return (
    // 2. Wrap everything in the ThemeProvider for dark mode
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <UserProvider>
        <Router>
          {/* 3. Add the SmoothCursor to render on every page */}
          <SmoothCursor />
          <AppRoute />
        </Router>
      </UserProvider>
    </ThemeProvider>
  );
};

export default App;