import { ThemeModel } from "../../models/api/theme.model";

export const defaultTheme: ThemeModel = {
  id: 0,
  primary_color: "#1976d2",
  secondary_color: "#f44336",
  background_color: "#f5f5f5",
  text_color: "#212121",
};

export const chooseThemeById = (
  themeId: number,
  themes: ThemeModel[]
): ThemeModel => {
  return themes.find((t) => t.id === themeId) || defaultTheme;
};
