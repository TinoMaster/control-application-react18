import { ReactNode, useCallback, useEffect, useState } from "react";
import { ThemeContext } from "../use/useThemeContext";
import { ThemeModel } from "../../models/api/theme.model";
import { appService } from "../../services/appService";
import { chooseThemeById } from "../../utilities/helpers/chooseTheme";
import { useAuthContext } from "../use/useAuthContext";

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
  primary_color: "#027483",
  secondary_color: "#00abc2",
  background_color: "#1a1a1a",
  text_color: "#ffffff",
};

export const AppThemeProvider = ({ children }: IContextProps) => {
 const { isLoggedIn } = useAuthContext();
  const themeId = localStorage.getItem("themeId");
  const [themes, setThemes] = useState<ThemeModel[]>([]);
  const [loadingThemes, setLoadingThemes] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState<ThemeModel>(
    themeId ? chooseThemeById(Number(themeId), themes) : chooseThemeById(0, themes)
  );

  const getThemes = useCallback(async () => {
    setLoadingThemes(true);

    if (!isLoggedIn()) {
      setThemes([defaultTheme]);
      setSelectedTheme(defaultTheme);
      setLoadingThemes(false);
      return;
    }

    const response = await appService.getThemes();
    if (response.status === 200) {
      setThemes(response.data || []);
      if (response.data && !themeId) {
        console.log(response.data);
        setSelectedTheme(response.data[0]);
        localStorage.setItem("themeId", response.data[0]?.id.toString() || "0");
      }else{
        setSelectedTheme(chooseThemeById(Number(themeId), response.data || []));
      }
    }
    setLoadingThemes(false);
  }, [themeId, isLoggedIn]);

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
