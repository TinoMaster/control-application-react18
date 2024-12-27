import { ReactNode, useState } from "react";
import { ITheme } from "../../data/global.data";
import { ThemeContext } from "../use/useThemeContext";

interface IContextProps {
  children: ReactNode;
}

export interface IThemeContext {
  theme: ITheme;
  setTheme: (theme: ITheme) => void;
}

const defaultTheme: ITheme = {
  primaryColor: "#1976d2",
  secondaryColor: "#f44336",
  backgroundColor: "#f5f5f5",
  textColor: "#212121",
};

export const ThemeProvider = ({ children }: IContextProps) => {
  const [theme, setTheme] = useState(defaultTheme);
  return (
    <ThemeContext.Provider value={{ theme, setTheme }} children={children} />
  );
};
