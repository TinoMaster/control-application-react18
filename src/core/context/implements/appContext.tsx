import { ReactNode } from "react";
import { AppContext } from "../use/useAppContext";

interface IContextProps {
  children: ReactNode;
}

export interface IAppContext {
  appTitle: string;
}

export const AppProvider = ({ children }: IContextProps) => {
  const appTitle = "CONTROL";
  return <AppContext.Provider value={{ appTitle }} children={children} />;
};
