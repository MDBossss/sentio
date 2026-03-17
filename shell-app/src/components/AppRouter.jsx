import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { LandingPage } from "../pages/LandingPage";
import { MainApp } from "./MainApp";

/**
 * AppRouter - Main routing component
 * Routes unauthenticated users to landing page
 * Routes authenticated users to main app with micro-frontends
 */
export const AppRouter = () => {
  return (
    <Router>
      <Routes>
        {/* Unauthenticated users see landing page */}
        <Route
          path="/"
          element={
            <>
              <SignedOut>
                <LandingPage />
              </SignedOut>
              <SignedIn>
                <Navigate to="/app" replace />
              </SignedIn>
            </>
          }
        />

        {/* Authenticated users see main app */}
        <Route
          path="/app"
          element={
            <>
              <SignedOut>
                <Navigate to="/" replace />
              </SignedOut>
              <SignedIn>
                <MainApp />
              </SignedIn>
            </>
          }
        />

        {/* Catch-all: redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};
