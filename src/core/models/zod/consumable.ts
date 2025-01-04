import { z } from "zod";
import { EUnit } from "../api/unit.model";

export const consumableSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  description: z.string().min(1, "La descripción es requerida"),
  price: z.string().min(0.01, "El precio debe ser mayor a 0"),
  unit: z.nativeEnum(EUnit, {
    errorMap: () => ({ message: "La unidad de medida es requerida" }),
  }),
  stock: z.string().min(0, "El stock no puede ser negativo"),
});

export type TConsumableModel = z.infer<typeof consumableSchema>;

export const consumableDefaultValues: TConsumableModel = {
  name: "",
  description: "",
  price: "",
  unit: EUnit.PIECE,
  stock: "",
};
