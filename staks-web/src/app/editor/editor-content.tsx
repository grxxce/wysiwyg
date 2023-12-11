"use client";
import { useState, useEffect, ChangeEvent } from "react";
import Toolbar from "./toolbar";
import { modeType } from "../types";
import Latex from "react-latex-next";
import { addStyles, EditableMathField } from "react-mathquill";
import { MathField, TextField, TextObj } from "../types";
import { useReducer } from "react";
import { textReducer } from "../utils";
import { InputField } from "./InputField";
import { useRef } from 'react';
import MathBox from './math-box';

export default function EditContent() {
  const [mode, setMode] = useState<modeType>("math");
  const [pageTitle, setPageTitle] = useState<string>("Demo");
  const [textState, dispatch] = useReducer(textReducer, [
    { field: "MathField", text: "" },
  ]);
  const mathBoxRef = useRef(null);

  addStyles();

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // Check for "Command + M" on macOS or "Ctrl + M" on Windows
      if (event.metaKey || event.ctrlKey) {
        // Modify the state variable
        event.preventDefault();

        if (event.key === "m") {
          setMode("math");
          dispatch({ type: "add", value: "MathField" });
        } else if (event.key === "s") {
          dispatch({ type: "add", value: "TextField" });
          setMode("write");
        } else if (event.key === "k") {
          setMode("code");
        }
      }
    };
    // Add the event listener when the component mounts
    document.addEventListener("keydown", handleKeyPress);

    // Remove the event listener when the component unmounts
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [mode]);

  // const handleInit = () => {
  //   console.log("test")
  //   if (textState.length === 0) {
  //     dispatch({ type: "init" });
  //   }
  // };

  console.log(textState);
  return (
    <div
      className="flex flex-col text-color-main"
      style={{
        fontFamily: "CMU Serif",
      }}
    >
      <Toolbar pageTitle={pageTitle} currentMode={mode} setMode={setMode} onDownload={() => mathBoxRef.current?.downloadTexFile()}/>
      <div className="flex flex-col mt-12 mx-32">
        <input
          className="font-[700] text-[40px] outline-none"
          onChange={(event) => {
            setPageTitle(event.target.value);
          }}
          defaultValue={pageTitle}
        />

            

        <div className="grid space-y-2 -ml-2 w-full h-full cursor-pointer">
            {textState.map((obj, index: number) => {
            if (obj.field === "MathField") {
                return (
                  <MathBox ref={mathBoxRef} obj={obj} index={index} dispatch={dispatch} key={index} />
                );
              }
            return (
              <div key={index}>
                <InputField obj={obj} index={index} dispatch={dispatch} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
