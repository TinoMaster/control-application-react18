import { ReactNode } from "react";
import { AuthProvider } from "../../src/core/context/implements/authContext";
import { AppThemeProvider } from "../../src/core/context/implements/themeContext";

export const TestProviders = ({ children }: { children: ReactNode }) => {
  return (
    <AuthProvider>
      <AppThemeProvider>
        {children}
      </AppThemeProvider>
    </AuthProvider>
  );
};
