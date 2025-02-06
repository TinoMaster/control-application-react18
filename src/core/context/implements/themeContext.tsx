import { ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import { ThemeContext } from "../use/useThemeContext";
import { ThemeModel } from "../../models/api/theme.model";
import { appService } from "../../services/appService";
import {
  chooseThemeById,
  defaultTheme,
  globalMaterialTheme,
} from "../../styles/chooseTheme";
import { useAuthContext } from "../use/useAuthContext";
import { createTheme, ThemeProvider } from "@mui/material";

const muiTheme = createTheme({
  palette: {
    primary: { main: globalMaterialTheme.primary_color },
    secondary: { main: globalMaterialTheme.secondary_color },
    background: { default: globalMaterialTheme.background_color },
    text: { primary: globalMaterialTheme.text_color },
  },
  typography: {
    fontFamily: globalMaterialTheme.font_family,
    fontSize: 14,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius:
            globalMaterialTheme.components?.button?.border_radius || "8px",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: globalMaterialTheme.background_color,
          color: globalMaterialTheme.text_color,
        },
      },
    },
  },
});

interface IContextProps {
  children: ReactNode;
}

export interface IThemeContext {
  themes: ThemeModel[];
  selectedTheme: ThemeModel;
  loadingThemes: boolean;
  onChangeTheme: (theme: ThemeModel) => void;
}

export const AppThemeProvider = ({ children }: IContextProps) => {
  const { isLoggedIn } = useAuthContext();
  const themeId = localStorage.getItem("themeId");
  const [themes, setThemes] = useState<ThemeModel[]>([defaultTheme]);
  const [loadingThemes, setLoadingThemes] = useState(true);
  const [selectedTheme, setSelectedTheme] = useState<ThemeModel>(
    themeId ? chooseThemeById(Number(themeId), [defaultTheme]) : defaultTheme
  );

  const getThemes = useCallback(async () => {
    setLoadingThemes(true);

    if (!isLoggedIn()) {
      setThemes([defaultTheme]);
      setSelectedTheme(defaultTheme);
      setLoadingThemes(false);
      return;
    }

    try {
      const response = await appService.getThemes();
      if (response.status === 200) {
        // Ensure defaultTheme is always included and no duplicates
        const allThemes = [...(response.data || [])];
        if (!allThemes.some((theme) => theme.id === defaultTheme.id)) {
          allThemes.push(defaultTheme);
        }
        setThemes(allThemes);

        // Handle theme selection
        if (themeId) {
          const selectedTheme = chooseThemeById(Number(themeId), allThemes);
          setSelectedTheme(selectedTheme || defaultTheme);
        } else if (response.data && response.data.length > 0) {
          setSelectedTheme(response.data[0]);
          localStorage.setItem("themeId", response.data[0].id.toString());
        }
      }
    } catch (error) {
      console.error("Error fetching themes:", error);
      setThemes([defaultTheme]);
      setSelectedTheme(defaultTheme);
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

  const contextValue = useMemo(
    () => ({
      themes,
      selectedTheme,
      loadingThemes,
      onChangeTheme,
    }),
    [themes, selectedTheme, loadingThemes]
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      <ThemeProvider theme={muiTheme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};
