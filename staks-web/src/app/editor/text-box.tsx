"use client";
import { TextObj } from "../types";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import { TextObjAction } from "../types";
import { Dispatch } from "react";

interface TextBoxProps {
  obj: TextObj;
  index: number;
  dispatch: Dispatch<TextObjAction>;
}

export const Textbox = ({ obj, dispatch, index }: TextBoxProps) => {
  return (
    <ReactQuill
      style={{
        width: "fit",
        border: 0, 
      }}
      theme="bubble"
      value={obj.text}
      onChange={(event) => dispatch({ type: "edit", key: index, value: event })}
    />
  );
};
