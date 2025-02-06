import { CardPayment } from "../../../pages/private/reports/business-report/context/useBusinessReportContext";
import { CardModel } from "../../models/api/card.model";

export const transformCardModelToCardPayment = (
  card: CardModel
): CardPayment => {
  return {
    id: card?.id?.toString() || crypto.randomUUID(),
    amount: card.amount,
    cardNumber: card.number,
  };
};
