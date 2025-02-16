import CancelIcon from "@mui/icons-material/Cancel";
import { Box, darken, IconButton, Modal, Typography } from "@mui/material";
import { useThemeContext } from "../../../../../../core/context/use/useThemeContext";
import { useTableStyles } from "../../../../../../core/styles/useTableStyles";
import { useBusinessReportStore } from "../../store/businessReport.store";
import {
  SECTIONS_BUSINESS_REPORT,
  SECTIONS_TRANSLATIONS,
} from "../../store/data/businessReport.data";
import { SaleCards } from "./sale-cards/SaleCards";
import { SaleDebts } from "./sale-debts/SaleDebts";
import { SaleMiron } from "./sale-miron/SaleMiron";
import { SaleReport } from "./sale-report/SaleReport";
import { SaleResume } from "./sale-resume/SaleResume";
import { SaleServices } from "./sale-services/SaleServices";

interface Props {
  openModal: boolean;
  closeModal: () => void;
}

export const ModalReport = ({ openModal, closeModal }: Props) => {
  const { selectedTheme } = useThemeContext();
  const currentSection = useBusinessReportStore(
    (state) => state.currentSection
  );
  const cancelProcess = useBusinessReportStore((state) => state.cancelProcess);
  const { modalBlurStyle, modalBoxStyle } = useTableStyles();

  const selectedSection = () => {
    switch (currentSection) {
      case SECTIONS_BUSINESS_REPORT.RESUME:
        return <SaleResume />;
      case SECTIONS_BUSINESS_REPORT.DEBTS:
        return <SaleDebts />;
      case SECTIONS_BUSINESS_REPORT.CARDS:
        return <SaleCards />;
      case SECTIONS_BUSINESS_REPORT.SERVICES:
        return <SaleServices />;
      case SECTIONS_BUSINESS_REPORT.MIRON:
        return <SaleMiron />;
      case SECTIONS_BUSINESS_REPORT.REPORT:
        return <SaleReport />;
      default:
        return null;
    }
  };

  return (
    <Modal open={openModal} sx={modalBlurStyle}>
      <Box
        sx={{
          ...modalBoxStyle,
          py: 1,
          maxWidth: "1200px",
          width: "max-content",
          height: "100%",
          maxHeight: "750px",
          gap: 2,
          position: "relative",
          overflow: "auto",
          paddingBottom: "20px",
          minWidth: { xs: "100%", sm: "500px" },
        }}
      >
        {/* Titulo de cada sección */}
        <Box sx={{ width: "100%", py: 2 }}>
          <Typography variant="h5" sx={{ color: selectedTheme.text_color }}>
            {SECTIONS_TRANSLATIONS[currentSection].title}
          </Typography>
          <Typography
            sx={{
              color: darken(selectedTheme.text_color, 0.3),
              fontSize: "0.8rem",
            }}
            variant="body1"
          >
            {SECTIONS_TRANSLATIONS[currentSection].subtitle}
          </Typography>
        </Box>
        {/* Contenido de cada sección */}
        {selectedSection()}
        {/* Botón de cerrar */}
        <Box
          sx={{
            position: "absolute",
            top: "10px",
            right: "10px",
          }}
        >
          <IconButton
            onClick={() => {
              cancelProcess();
              closeModal();
            }}
          >
            <CancelIcon sx={{ color: selectedTheme.text_color }} />
          </IconButton>
        </Box>
      </Box>
    </Modal>
  );
};
