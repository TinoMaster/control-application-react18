import { z } from "zod";

export const serviceSaleSchema = z
  .object({
    quantity: z.string().transform(Number),
    serviceId: z.number(),
  })
  .refine((data) => data.quantity > 0, {
    message: "La cantidad debe ser mayor a 0",
    path: ["quantity"],
  })
  .refine((data) => data.serviceId > 0, {
    message: "El servicio es requerido",
    path: ["serviceId"],
  });

export type ServiceSaleSchema = z.infer<typeof serviceSaleSchema>;

export const serviceSaleDefaultValues = {
  quantity: "",
  serviceId: 0,
};
