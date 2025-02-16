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
import { useThemeContext } from "../../../../../../../core/context/use/useThemeContext";
import { useBusinessFinalSale } from "../../../../../../../core/hooks/useBusinessFinalSale";
import {
  BusinessFinalSaleModelToCreate,
  transformBusinessSaleToBusinessSaleResponse,
} from "../../../../../../../core/models/api/businessFinalSale.model";
import { MachineModel } from "../../../../../../../core/models/api/machine.model";
import { updateBusinessSaleNote } from "../../../../../../../core/states/actions/businessFinalSaleActions";
import { useBusinessStore } from "../../../../../../../core/store/business.store";
import { useBusinessReportStore } from "../../../store/businessReport.store";
import { ViewFinalReport } from "../../view-final-report/ViewFinalReport";

export const SaleReport = () => {
  const businessSale = useBusinessReportStore((state) => state.businessSale);
  const dispatch = useBusinessReportStore((state) => state.dispatch);
  const cards = useBusinessReportStore((state) => state.cards);
  const setOpenModalReport = useBusinessReportStore(
    (state) => state.setOpenModalReport
  );

  const { saveBusinessFinalSale } = useBusinessFinalSale();

  const { selectedTheme } = useThemeContext();
  const business = useBusinessStore((state) => state.business);
  const [modalAddNote, setModalAddNote] = useState(false);
  const [note, setNote] = useState(businessSale.note);

  const handleAddNote = () => {
    dispatch(updateBusinessSaleNote(note));
    setModalAddNote(false);
  };

  const handleSave = () => {
    const dataToSave: BusinessFinalSaleModelToCreate = {
      ...businessSale,
      machines: business.machines?.filter((m) =>
        businessSale.machines.includes(m.id!)
      ) as MachineModel[],
      cards: cards.map((card) => ({
        amount: card.amount,
        number: card.cardNumber,
      })),
    };
    saveBusinessFinalSale(dataToSave, {
      onSuccess: () => {
        setOpenModalReport(false);
      },
    });
  };

  return (
    <>
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
        onSave={handleSave}
        onAddNote={() => setModalAddNote(true)}
      />
    </>
  );
};
