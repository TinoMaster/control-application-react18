import { createContext, useContext } from "react";
import { IThemeContext } from "../implements/themeContext";

export const ThemeContext = createContext<IThemeContext | null>(null);

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error(
      "useThemeContext must be used within a ThemeContextProvider"
    );
  }
  return context;
};
