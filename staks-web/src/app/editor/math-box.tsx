"use client";
import { TextObj } from "../types";
import { TextObjAction } from "../types";
import { addStyles, EditableMathField, MathField } from "react-mathquill";
import React, { useRef, useEffect, useState, Dispatch, forwardRef, useImperativeHandle } from 'react';
import { parseLatexContent } from './latexParser'; //latex parser


interface MathBox {
  obj: TextObj;
  index: number;
  dispatch: Dispatch<TextObjAction>;
}

addStyles();

const replaceLatexPatterns = (latex: string): string => {
    let updatedLatex = latex;
    // Replacing '-\' with '•\'
    updatedLatex = updatedLatex.replace(/-\s*\\/g, '\\ \\ •\\');
    // Replacing any number followed by '.' with the LaTeX format
    updatedLatex = updatedLatex.replace(/(\d+)\.\s*\\/g, (match, number) => `\\ \\ (${number})\\ `);
    return updatedLatex;
};

const MathBox = forwardRef(({ obj, index, dispatch }: MathBox, ref) => {
    const [focusedField, setFocusedField] = useState<number | null>(null);
    const [mathFields, setMathFields] = useState<string[]>(['']);
    const [prevMathFields, setPrevMathFields] = useState<string[]>([]);
    const [useLexerParser, setUseLexerParser] = useState(false); // New state for toggling the method

    // Update prevMathFields whenever mathFields changes
    useEffect(() => {
        setPrevMathFields(mathFields);
    }, [mathFields]);

    const downloadTexFile = () => {
        let latexContent = mathFields.join('\n') + "\n";

        if (useLexerParser) {
            // Lexer + Parser implementation
            latexContent = parseLatexContent(latexContent);
        } else {
            // Regex implementation
            latexContent = latexContent.replace(/•\s*(.*?)\n/g, "\\textbullet{} $1 \\\\\n");
            latexContent = latexContent.replace(/\((\d+)\)\s*(.*?)\n/gs, (match, number, text) => {
                return `\\begin{enumerate}\n\\setcounter{enumi}{${number-1}}\n\\item ${text}\n\\end{enumerate}\n`;
            });
        }

        // Create a blob from the LaTeX content
        const blob = new Blob([latexContent], { type: 'text/plain;charset=utf-8' });

        // Create a download link and trigger the download
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'math_content.tex'; // Name of the file to be downloaded
        link.click();

        // Clean up
        URL.revokeObjectURL(link.href);
    };


    // Expose downloadTexFile to parent
    useImperativeHandle(ref, () => ({downloadTexFile}));


    const addNewMathQuillField = () => {
        if (focusedField !== null) {
        const currentFieldLatex = mathFields[focusedField];
        
        // Detect the previous formatting and repeat
        var startsWith = "";
        if (currentFieldLatex.trim().startsWith('\\ \\ •')) {
            startsWith =  '\\ \\ •\\ ';
        }        
        else if (currentFieldLatex.trim().startsWith('\\ \\ (')) {
            const regex = /\((\d+)\)/;
            const match = currentFieldLatex.trim().match(regex);
            // console.log("trimmed: ", currentFieldLatex.trim());
            if (match) {
                startsWith = "\\ \\ (" + (String(parseInt(match[1])+ 1)) + ") \\ ";
            }
        }
        
        setMathFields((prevMathFields) => {
            const updatedFields = [...prevMathFields];
            updatedFields.splice(focusedField + 1, 0, startsWith);
            return updatedFields;
        });

        setFocusedField((prevFocused) => {
            const newFocused = prevFocused !== null ? prevFocused + 1 : null;
            return newFocused;
        });
        }
    };
    
    // State var to track last key

    const handleKeyDown = (index: number, event: React.KeyboardEvent<HTMLElement>) => {
            const currentChars = mathFields[index].length;

            console.log("math fields: ",mathFields);
            console.log("chars: ",currentChars);
            if (event.key === 'Enter') {
                event.preventDefault();
                addNewMathQuillField();

            } 
            else if (event.key === 'Backspace' ) {
                if (prevMathFields[index] === '' && index > 0) {
                    event.preventDefault();
                    removeMathQuillField(index);
                    setFocusedField(index - 1);
                } 
            } 

    };

    const focusOnField = (index: number) => {
        setFocusedField(index);
    };

    const removeMathQuillField = (index: number) => {
        const updatedFields = [...mathFields];
        updatedFields.splice(index, 1);
        setMathFields(updatedFields);
        setFocusedField((prevFocused) => (prevFocused !== null ? prevFocused - 1 : null));
    };

    return (
        <div>
            <button onClick={() => setUseLexerParser(!useLexerParser)}
                style={{
                    backgroundColor: "#FFFFFF", 
                    color: "black",
                    padding: "6px 10px", 
                    border: "2px", 
                    borderRadius: "2px", 
                    cursor: "pointer", 
                    marginTop: "10px", 
                    marginBottom: "10px", 
                    marginLeft: "2px", 
                    fontSize: "16px", 
                    outline: "3px solid #F8D16D", 
                    transition: "background-color 0.3s, outline-color 0.3s", 
                }}
                onMouseOver={e => {
                    e.currentTarget.style.backgroundColor = "#F5E6C0"; 
                    e.currentTarget.style.outlineColor = "#F8D16D"; 
                }}
                onMouseOut={e => {
                    e.currentTarget.style.backgroundColor = "#FFFFFF"; 
                    e.currentTarget.style.outlineColor = "#F8D16D"; 
                }}
            >
                {useLexerParser ? "Using Lexer and Parser: Click to Use Regex" : "Using Regex: Click to Use Lexer + Parser"}
            </button>
        {mathFields.map((latex, i) => (
            <div key={i}>
            <EditableMathField
                id={`mathField-${i}`}
                latex={latex}
                style={{
                border: 0, 
                height: "fit",
                }}

                mathquillDidMount={(mathField) => {
                    console.log('new i: ', i);
                    console.log('new focus: ', focusedField);

                    mathField.focus();
                }}

                onChange={(mathField) => {
                console.log(mathFields);
                const originalLatex = mathField.latex();
                const updatedLatex = replaceLatexPatterns(originalLatex);
                
                if (originalLatex !== updatedLatex) {
                    mathField.latex(updatedLatex); 
                    dispatch({ type: "edit", key: index, value: updatedLatex });
                }

                const updatedFields = [...mathFields];
                updatedFields[i] = updatedLatex;
                setMathFields(updatedFields);

                if (updatedFields[i] === '' && i > 0) {
                    focusOnField(i - 1);
                }
                }}
                onKeyDown={(event) => handleKeyDown(i, event)}
                onFocus={() => focusOnField(i)}
            />
            </div>
        ))}
        </div>
    );
            });

            MathBox.displayName = 'MathBox';

export default MathBox;