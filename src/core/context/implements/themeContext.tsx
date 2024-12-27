import { ReactNode, useCallback, useEffect, useState } from "react";
import { ThemeContext } from "../use/useThemeContext";
import { ThemeModel } from "../../models/api/theme.model";
import { appService } from "../../services/appService";
import { chooseThemeById } from "../../utilities/helpers/chooseTheme";

interface IContextProps {
  children: ReactNode;
}

export interface IThemeContext {
  themes: ThemeModel[];
  selectedTheme: ThemeModel | undefined;
  setSelectedTheme: (theme: ThemeModel) => void;
}

export const AppThemeProvider = ({ children }: IContextProps) => {
  const themeId = localStorage.getItem("themeId");
  const [themes, setThemes] = useState<ThemeModel[]>([]);
  const [selectedTheme, setSelectedTheme] = useState<ThemeModel | undefined>(
    themeId ? chooseThemeById(Number(themeId), themes) : undefined
  );

  const getThemes = useCallback(async () => {
    const response = await appService.getThemes();
    if (response.status === 200) {
      setThemes(response.data || []);
      if (response.data && !themeId) {
        setSelectedTheme(response.data[1]);
      }
    }
  }, [themeId]);

  useEffect(() => {
    getThemes();
  }, [getThemes]);

  return (
    <ThemeContext.Provider
      value={{ themes, selectedTheme, setSelectedTheme }}
      children={children}
    />
  );
};
