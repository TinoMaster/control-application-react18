import { Box, darken, IconButton, Modal, Typography } from "@mui/material";
import { SaleResume } from "./sale-resume/SaleResume";
import { useThemeContext } from "../../../../../../core/context/use/useThemeContext";
import CancelIcon from "@mui/icons-material/Cancel";
import {
  SECTIONS_BUSINESS_REPORT,
  SECTIONS_TRANSLATIONS,
  useBusinessReportContext,
} from "../../context/useBusinessReportContext";
import { SaleDebts } from "./sale-debts/SaleDebts";
import { SaleCards } from "./sale-cards/SaleCards";
import { SaleServices } from "./sale-services/SaleServices";
import { SaleMiron } from "./sale-miron/SaleMiron";
import { SaleReport } from "./sale-report/SaleReport";
import { SaleEnd } from "./sale-end/SaleEnd";

interface Props {
  openModal: boolean;
  closeModal: () => void;
}

export const ModalReport = ({ openModal, closeModal }: Props) => {
  const { selectedTheme } = useThemeContext();
  const { currentSection, cancelProcess } = useBusinessReportContext();

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
      case SECTIONS_BUSINESS_REPORT.END:
        return <SaleEnd />;
      default:
        return null;
    }
  };

  return (
    <Modal
      open={openModal}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backdropFilter: "blur(10px)",
      }}
    >
      <Box
        sx={{
          width: "auto",
          maxWidth: "1200px",
          height: "100%",
          maxHeight: "750px",
          margin: "0 auto",
          gap: 2,
          padding: "0 1rem",
          border: "1px solid",
          borderColor: selectedTheme.secondary_color,
          backgroundColor: selectedTheme.background_color,
          borderRadius: "8px",
          boxShadow: `0 0 70px 10px ${selectedTheme.secondary_color}15 , 0 0 5px 2px #00000015`,
          position: "relative",
          overflow: "auto",
          paddingBottom: "20px",
          minWidth: { xs: "100%", sm: "400px" },
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
