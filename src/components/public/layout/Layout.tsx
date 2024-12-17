import { PublicRoutes } from "../../../pages/public";
import { Container } from "@mui/material";
import Header from "../header/Header";

export const PublicLayout = () => {
  return (
    <Container sx={{ height: "calc(100vh-10px)", padding: 0 }}>
      <Header />
      <Container sx={{ py: 5 }}>
        <PublicRoutes />
      </Container>
    </Container>
  );
};
