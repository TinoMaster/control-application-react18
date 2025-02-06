import { ThemeModel } from "../models/api/theme.model";

export const globalMaterialTheme = {
  id: 0,
  name: "Default",
  primary_color: "#00626d",
  secondary_color: "#027483",
  background_color: "#242424",
  text_color: "#FFFFFF",
  font_family: '"Roboto", "Helvetica", "Arial", sans-serif',
  components: {
    button: {
      text_transform: "none",
      border_radius: "4px",
    },
  },
};

export const defaultTheme: ThemeModel = {
  id: 0,
  name: "oscuro clasico",
  primary_color: "#161616",
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
