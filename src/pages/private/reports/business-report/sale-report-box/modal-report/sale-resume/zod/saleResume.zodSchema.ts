import { z } from "zod";
import { EmployeeModel } from "../../../../../../../../core/models/api/employee.model";

export enum ERegisterType {
  INDIVIDUAL = "individual",
  GENERAL = "general",
}

export const SaleResumeZodSchema = z
  .object({
    total: z.string(),
    found: z.string().optional(),
    machines: z.array(z.number()).min(1, "Selecciona al menos una maquina"),
    workers: z
      .array(z.custom<EmployeeModel>())
      .min(1, "Selecciona al menos un trabajador"),
    registerType: z.nativeEnum(ERegisterType),
  })
  .refine((data) => parseInt(data.total) > 0, {
    message: "El total debe ser mayor a 0",
    path: ["total"],
  });

export type TSaleResume = z.infer<typeof SaleResumeZodSchema>;
