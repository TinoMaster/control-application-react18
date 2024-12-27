import { z } from "zod";

export const billCountSchema = z.object({
  oneThousand: z.string(),
  fiveHundred: z.string(),
  twoHundred: z.string(),
  oneHundred: z.string(),
  fifty: z.string(),
  twenty: z.string(),
  ten: z.string(),
  five: z.string(),
  two: z.string(),
  one: z.string(),
  total: z.string(),
});

export type TBillCount = z.infer<typeof billCountSchema>;

export const defaultBillCount: TBillCount = {
  oneThousand: "0",
  fiveHundred: "0",
  twoHundred: "0",
  oneHundred: "0",
  fifty: "0",
  twenty: "0",
  ten: "0",
  five: "0",
  two: "0",
  one: "0",
  total: "0",
};
