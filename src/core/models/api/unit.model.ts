export enum EUnit {
  PIECE = "PIECE",
  GRAM = "GRAM",
  LITRE = "LITRE",
  PERCENTAGE = "PERCENTAGE",
}

export type TUnit = keyof typeof EUnit;

export const TRANSLATE_UNIT = {
  [EUnit.PIECE]: "Unidad",
  [EUnit.GRAM]: "Gramos",
  [EUnit.LITRE]: "Litros",
  [EUnit.PERCENTAGE]: "Porcentaje",
};
