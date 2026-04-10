import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { LandingPage } from "../pages/LandingPage";
import { PreferencesPage } from "../pages/PreferencesPage";
import { SettingsPage } from "../pages/SettingsPage";
import { PreferencesGuard } from "./PreferencesGuard";

/**
 * AppRouter - Main routing component
 * Routes unauthenticated users to landing page
 * Routes authenticated users to preferences check (if needed) or main app
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

        {/* Preferences onboarding page (for users without saved preferences) */}
        <Route
          path="/preferences"
          element={
            <>
              <SignedOut>
                <Navigate to="/" replace />
              </SignedOut>
              <SignedIn>
                <PreferencesPage />
              </SignedIn>
            </>
          }
        />

        {/* Authenticated users see main app (with preference guard) */}
        <Route
          path="/app"
          element={
            <>
              <SignedOut>
                <Navigate to="/" replace />
              </SignedOut>
              <SignedIn>
                <PreferencesGuard />
              </SignedIn>
            </>
          }
        />

        {/* Settings page for editing preferences */}
        <Route
          path="/settings"
          element={
            <>
              <SignedOut>
                <Navigate to="/" replace />
              </SignedOut>
              <SignedIn>
                <SettingsPage />
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
