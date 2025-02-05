import AssignmentIcon from "@mui/icons-material/Assignment";
import {
  Box,
  Button,
  darken,
  Divider,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { CustomSnackbar } from "../../../../../../../components/common/ui/CustomSnackbar";
import { LoadingCircularProgress } from "../../../../../../../components/common/ui/LoadingCircularProgress";
import { useBusinessContext } from "../../../../../../../core/context/use/useBusinessContext";
import { useThemeContext } from "../../../../../../../core/context/use/useThemeContext";
import { transformBusinessSaleToBusinessSaleResponse } from "../../../../../../../core/models/api/businessFinalSale.model";
import { useBusinessReportContext } from "../../../context/useBusinessReportContext";
import { ViewFinalReport } from "../../view-final-report/ViewFinalReport";
import { updateBusinessSaleNote } from "../../../../../../../core/states/actions/businessFinalSaleActions";

export const SaleReport = () => {
  const {
    businessSale,
    cards,
    loading,
    success,
    error,
    saveBusinessSale,
    dispatch,
  } = useBusinessReportContext();
  const { selectedTheme } = useThemeContext();
  const { business } = useBusinessContext();
  const [modalAddNote, setModalAddNote] = useState(false);
  const [note, setNote] = useState(businessSale.note);

  const handleAddNote = () => {
    dispatch(updateBusinessSaleNote(note));
    setModalAddNote(false);
  };

  return (
    <>
      <LoadingCircularProgress loading={loading} />
      <CustomSnackbar
        error={error}
        success={success}
        errorMessage={error ? "Error al guardar la venta" : ""}
        successMessage={success ? "Venta guardada con éxito" : ""}
      />
      <Modal
        open={modalAddNote}
        onClose={() => setModalAddNote(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "90%", sm: 400 },
            bgcolor: selectedTheme.background_color,
            borderRadius: 2,
            boxShadow: 24,
            p: 3,
          }}
        >
          <Typography
            variant="h6"
            component="h2"
            sx={{
              color: selectedTheme.text_color,
              mb: 2,
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <AssignmentIcon /> Agregar Nota
          </Typography>
          <Divider sx={{ mb: 3 }} />
          <Box component="form" noValidate>
            <TextField
              autoFocus
              fullWidth
              value={note}
              multiline
              onChange={(e) => setNote(e.target.value)}
              rows={4}
              variant="outlined"
              placeholder="Escribe tu nota aquí..."
              sx={{
                mb: 3,
                "& .MuiOutlinedInput-root": {
                  backgroundColor: darken(selectedTheme.background_color, 0.03),
                  color: selectedTheme.text_color,
                  "& fieldset": {
                    borderColor: darken(selectedTheme.background_color, 0.3),
                  },
                  "&:hover fieldset": {
                    borderColor: selectedTheme.secondary_color,
                  },
                  "&:focused fieldset": {
                    borderColor: selectedTheme.secondary_color,
                  },
                  "&:active fieldset": {
                    borderColor: selectedTheme.secondary_color,
                  },
                },
              }}
            />
            <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
              <Button
                variant="outlined"
                onClick={() => setModalAddNote(false)}
                sx={{
                  color: selectedTheme.text_color,
                  borderColor: selectedTheme.secondary_color,
                  "&:hover": {
                    borderColor: selectedTheme.secondary_color,
                    backgroundColor: darken(
                      selectedTheme.background_color,
                      0.1
                    ),
                  },
                }}
              >
                Cancelar
              </Button>
              <Button
                variant="contained"
                onClick={handleAddNote}
                sx={{
                  backgroundColor: darken(selectedTheme.secondary_color, 0.2),
                  "&:hover": {
                    backgroundColor: darken(selectedTheme.secondary_color, 0.1),
                  },
                }}
              >
                Guardar
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
      <ViewFinalReport
        sale={transformBusinessSaleToBusinessSaleResponse(
          businessSale,
          business.machines || [],
          cards
        )}
        cards={cards}
        onSave={saveBusinessSale}
      />
    </>
  );
};
