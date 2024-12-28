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
  selectedTheme: ThemeModel;
  loadingThemes: boolean;
  onChangeTheme: (theme: ThemeModel) => void;
}

const defaultTheme: ThemeModel = {
  id: 0,
  name: "Default",
  primary_color: "#6200ea",
  secondary_color: "#03dac6",
  background_color: "#f5f5f5",
  text_color: "#000000",
};

export const AppThemeProvider = ({ children }: IContextProps) => {
  const themeId = localStorage.getItem("themeId");
  const [themes, setThemes] = useState<ThemeModel[]>([]);
  const [loadingThemes, setLoadingThemes] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState<ThemeModel>(
    themeId ? chooseThemeById(Number(themeId), themes) : defaultTheme
  );

  const getThemes = useCallback(async () => {
    setLoadingThemes(true);
    const response = await appService.getThemes();
    if (response.status === 200) {
      setThemes(response.data || []);
      if (response.data && !themeId) {
        setSelectedTheme(response.data[0]);
        localStorage.setItem("themeId", response.data[0].id.toString());
      }else{
        setSelectedTheme(chooseThemeById(Number(themeId), response.data || []));
      }
    }
    setLoadingThemes(false);
  }, [themeId]);

  const onChangeTheme = (theme: ThemeModel) => {
    setSelectedTheme(theme);
    localStorage.setItem("themeId", theme.id.toString());
  };

  useEffect(() => {
    getThemes();
  }, [getThemes]);

  return (
    <ThemeContext.Provider
      value={{ themes, selectedTheme, loadingThemes, onChangeTheme }}
      children={children}
    />
  );
};
