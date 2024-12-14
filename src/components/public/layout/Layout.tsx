import { PublicRoutes } from "../../../pages/public";
import { Container } from "@mui/material";
import Header from "../header/Header";

export const PublicLayout = () => {
  return (
    <Container sx={{ marginTop: "64px", height: "2000px" }}>
      <Header />
      <PublicRoutes />
    </Container>
  );
};
