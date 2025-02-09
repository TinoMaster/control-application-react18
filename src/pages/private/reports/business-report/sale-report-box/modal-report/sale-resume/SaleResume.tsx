import { Box } from "@mui/material";
import { LoadingCircularProgress } from "../../../../../../../components/common/ui/loaders/LoadingCircularProgress";
import { useThemeContext } from "../../../../../../../core/context/use/useThemeContext";
import { HeaderSelector } from "./components/HeaderSelector";
import { FormSaleResume } from "./components/form/FormSaleResume";
import { useSaleResume } from "./hook/useSaleResume";

export const SaleResume = () => {
  const { selectedTheme } = useThemeContext();
  const {
    control,
    errors,
    handleSubmit,
    handleSelectEmployee,
    onSubmit,
    loading,
    machinesAlreadySelected,
    loadingEmployees,
    role,
    registerTypeWatch,
    dispatch,
    business,
    employees,
    businessSale,
  } = useSaleResume();

  return (
    <>
      <LoadingCircularProgress loading={loading || loadingEmployees} />
      <Box
        sx={{
          marginBottom: 2,
          width: "100%",
          maxWidth: 500,
          gap: 2,
          color: selectedTheme.text_color,
        }}
      >
        <HeaderSelector role={role} control={control} />

        <FormSaleResume
          control={control}
          errors={errors}
          handleSubmit={handleSubmit}
          handleSelectEmployee={handleSelectEmployee}
          onSubmit={onSubmit}
          loading={loading}
          role={role}
          registerTypeWatch={registerTypeWatch}
          dispatch={dispatch}
          business={business}
          employees={employees}
          businessSale={businessSale}
          machinesAlreadySelected={machinesAlreadySelected}
        />
      </Box>
    </>
  );
};
