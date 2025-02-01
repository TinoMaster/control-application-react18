import { Box, Card, darken, Stack, Typography } from "@mui/material";
import { useThemeContext } from "../../../../../../core/context/use/useThemeContext";
import { EmployeeModel } from "../../../../../../core/models/api/employee.model";
import { ButtonDelete } from "./ButtonDelete";

interface Props {
  employee: EmployeeModel;
  onDeleteBusiness?: (businessId: string) => void;
  canDelete: boolean;
}

export const MobileView = ({
  employee,
  onDeleteBusiness,
  canDelete,
}: Props) => {
  const { selectedTheme } = useThemeContext();
  return (
    <Stack spacing={2} sx={{ mt: 2 }}>
      {employee?.user.businesses.map((business) => (
        <Card
          key={business.id}
          elevation={2}
          sx={{
            p: 2,
            backgroundColor: darken(selectedTheme.background_color, 0.1),
            color: selectedTheme.text_color,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h6"
              sx={{ fontSize: "1rem", fontWeight: "bold" }}
            >
              {business.name}
            </Typography>
            <ButtonDelete
              businessId={business.id?.toString() || ""}
              onDeleteBusiness={onDeleteBusiness}
              canDelete={canDelete}
            />
          </Box>

          <Box>
            <Typography
              variant="caption"
              color={darken(selectedTheme.text_color, 0.5)}
            >
              Dirección
            </Typography>
            <Typography variant="body2">
              {`${business.address.street}, #${business.address.number}, ${business.address.municipality}, ${business.address.city}`}
            </Typography>
          </Box>
        </Card>
      ))}
    </Stack>
  );
};
