import { useBusinessStore } from "../../../../core/store/business.store";
import { Box, Skeleton } from "@mui/material";
import { BusinessCard } from "../business-card/BusinessCard";

const BusinessesList = () => {
  const [businessList, loading, business] = useBusinessStore((state) => [
    state.businessList,
    state.loading,
    state.business,
  ]);

  if (loading) {
    return (
      <Box
        sx={{
          padding: "16px 0",
          display: "flex",
          gap: 5,
          flexDirection: {
            xs: "column",
            sm: "row",
          },
        }}
      >
        {Array.from({ length: 3 }).map((_, index) => (
          <Skeleton
            key={index}
            variant="rectangular"
            height={200}
            width={500}
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
        flexWrap: "wrap",
        justifyContent: "center",
        gap: 2,
        flexDirection: {
          xs: "column",
          sm: "row",
        },
      }}
    >
      {businessList.map((bus) => (
        <BusinessCard
          key={bus.id}
          business={bus}
          currentBusinessId={business.id || 0}
        />
      ))}
    </Box>
  );
};
export default BusinessesList;
