import { ThemeModel } from "../../models/api/theme.model";

export const defaultTheme: ThemeModel = {
  id: 0,
  name: "Default",
  primary_color: "#0B5A58",
  secondary_color: "#027483",
  background_color: "#242424",
  text_color: "#FFFFFF",
};

export const chooseThemeById = (
  themeId: number,
  themes: ThemeModel[]
): ThemeModel => {
  return themes.find((t) => t.id === themeId) || defaultTheme;
};
