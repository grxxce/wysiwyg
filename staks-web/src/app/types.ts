export type modeType = "write" | "code" | "math";

export type MathField = "MathField";
export type TextField = "TextField";
export type Field = MathField | TextField;

export type TextObj = {
  field: Field;
  text: string;
};

export type TextObjAction = {
  type: "add" | "edit" | "remove" | "init";
  key?: number;
  value?: string | TextObj | Field;
};
