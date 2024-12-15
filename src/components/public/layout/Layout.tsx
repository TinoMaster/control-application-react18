import { PublicRoutes } from "../../../pages/public";
import { Container } from "@mui/material";
import Header from "../header/Header";

export const PublicLayout = () => {
  return (
    <Container sx={{ marginTop: "100px", height: "calc(100vh-100px)", padding: 0 }}>
      <Header />
      <PublicRoutes />
    </Container>
  );
};
