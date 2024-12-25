import { useBusinessContext } from "../../../../core/context/use/useBusinessContext";
import { Box, Skeleton } from "@mui/material";
import { BusinessCard } from "../business-card/BusinessCard";

const BusinessesList = () => {
  const { businessList, loading } = useBusinessContext();

  if (loading) {
    return (
      <Box
        sx={{
          padding: "16px 0",
          display: "flex",
          gap: 5,
          flexDirection: "column",
        }}
      >
        {Array.from({ length: 3 }).map((_, index) => (
          <Skeleton
            key={index}
            variant="rectangular"
            height={200}
            width="100%"
            sx={{ width: "100%", margin: "auto", borderRadius: "8px" }}
          />
        ))}
      </Box>
    );
  }

  if (businessList.length === 0) {
    return (
      <Box
        sx={{
          padding: "16px 0",
          display: "flex",
          gap: 5,
          flexDirection: "column",
        }}
      >
        <p>No se encontraron negocios</p>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        padding: "16px 0",
        display: "flex",
        gap: 5,
        flexDirection: "column",
      }}
    >
      {businessList.map((business) => (
        <BusinessCard key={business.id} business={business} />
      ))}
    </Box>
  );
};
export default BusinessesList;
