export const formatCurrency = (amount: number) => {
  return amount.toLocaleString("es-CO", { style: "currency", currency: "COP" });
};
