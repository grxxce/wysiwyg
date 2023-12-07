import { TextObj } from "../types";
import { Textbox } from "./text-box";
import { TextObjAction } from "../types";
import { Dispatch } from "react";
import { MathBox } from "./math-box";

interface InputFieldProps {
  obj: TextObj;
  index: number; 
  dispatch: Dispatch<TextObjAction>;
}

export const InputField = ({ obj, index, dispatch }: InputFieldProps) => {
  switch (obj.field) {
    case "MathField":
        console.log(obj.text);
      return <MathBox obj={obj} index={index} dispatch={dispatch} />;
    case "TextField":
      return <Textbox obj={obj} index={index} dispatch={dispatch} />;
    default:
      return <div></div>;
  }
};
