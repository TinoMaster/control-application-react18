import { PublicLayout } from "../../components/public";
import { AppThemeProvider } from "../../core/context/implements/themeContext";

const PublicContainer = () => {
  return (
    <AppThemeProvider>
      <PublicLayout />
    </AppThemeProvider>
  );
};
export default PublicContainer;
