import CancelIcon from "@mui/icons-material/Cancel";
import { Box, IconButton, Modal, Typography } from "@mui/material";
import { useThemeContext } from "../../../../../../core/context/use/useThemeContext";
import { BusinessFinalSaleModelResponse } from "../../../../../../core/models/api/businessFinalSale.model";
import { useTableStyles } from "../../../../../../core/styles/useTableStyles";
import { transformCardModelToCardPayment } from "../../../../../../core/utilities/helpers/globals";
import { ViewFinalReport } from "../view-final-report/ViewFinalReport";

interface Props {
  openDetailSaleModal: boolean;
  onCloseDetailSaleModal: () => void;
  sale: BusinessFinalSaleModelResponse;
  onDeleteSale: (sale: BusinessFinalSaleModelResponse) => void;
}

export const ModalDetailSale = ({
  openDetailSaleModal,
  onCloseDetailSaleModal,
  sale,
  onDeleteSale,
}: Props) => {
  const { selectedTheme } = useThemeContext();
  const { modalBlurStyle, modalBoxStyle } = useTableStyles();
  return (
    <Modal
      open={openDetailSaleModal}
      onClose={onCloseDetailSaleModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={modalBlurStyle}
    >
      <Box
        sx={{
          ...modalBoxStyle,
          maxWidth: "1200px",
          height: "100%",
          maxHeight: "750px",
          gap: 2,
          overflow: "auto",
          paddingBottom: "20px",
          minWidth: { xs: "100%", sm: "400px" },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            py: 1,
          }}
        >
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ color: selectedTheme.text_color }}
          >
            Información de la venta
          </Typography>
          <IconButton onClick={onCloseDetailSaleModal}>
            <CancelIcon sx={{ color: selectedTheme.text_color }} />
          </IconButton>
        </Box>
        <ViewFinalReport
          sale={sale}
          editable={true}
          cards={sale.cards.map((card) =>
            transformCardModelToCardPayment(card)
          )}
          onDelete={onDeleteSale}
        />
      </Box>
    </Modal>
  );
};
