export interface BusinessFinalSaleModel {
  id?: number;
  businessId: number;
  total: number;
  paid: number;
  debt: number;
  date: Date;
}
