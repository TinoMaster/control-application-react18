import { ReactNode } from "react";
import { AppThemeProvider } from "../../src/core/context/implements/themeContext";

export const TestProviders = ({ children }: { children: ReactNode }) => {
  return <AppThemeProvider>{children}</AppThemeProvider>;
};
