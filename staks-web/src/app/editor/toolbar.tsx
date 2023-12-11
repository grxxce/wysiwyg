"use client"; 

import { modeType } from "../types";
import ModeButton from "./mode-button";

interface ToolbarProps {
  currentMode: modeType;
  pageTitle: string;
  setMode: (mode: modeType) => void;
  onDownload: () => void;
}

const modes: modeType[] = ["write", "code", "math"];
export default function Toolbar({
  pageTitle,
  currentMode,
  setMode,
  onDownload
}: ToolbarProps) {

  return (
    <div className="flex flex-row justify-between items-center mx-6 mt-4">
        <div className="flex flex-row space-x-12 items-center">
            <div className="flex flex-row space-x-3 items-center">
            <div className="flex flex-row space-x-4 items-center">
                <i className="pi pi-arrow-left text-color-main"></i>
                <i className="pi pi-arrow-right text-color-main"></i>
                <span>{pageTitle}</span>
            </div>
            </div>
            <div className="flex flex-row space-x-2">
            {modes.map((m) => {
                return (
                <ModeButton
                    key={m}
                    mode={m}
                    selected={currentMode}
                    onClick={() => setMode(m)}
                    style={{
                    background:
                        currentMode == m
                        ? "var(--tag-color-yellow-fbeecc, rgba(223, 172, 3, 0.30))"
                        : "var(--tag-color-default-e-6-e-6-e-4, rgba(143, 142, 138, 0.30))",
                    }}
                />
                );
            })}
            </div>
        </div>
        <div onClick={onDownload}>
            <i className="pi pi-download"></i>
        </div>
    </div>
  );
}
