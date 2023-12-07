import { modeType } from "../types";
import React, { ButtonHTMLAttributes } from "react";

interface ModeButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  mode: modeType;
  selected: modeType;
}

function modeToString(mode: modeType) {
  switch (mode) {
    case "write": {
      return "⌘ W";
    }
    case "code": {
      return "⌘ K";
    }
    case "math": {
      return "⌘ M";
    }
  }
}

function selectedModeToString(mode: modeType) {
  switch (mode) {
    case "write": {
      return "(writing mode)";
    }
    case "code": {
      return "(coding mode)";
    }
    case "math": {
      return "(math mode)";
    }
  }
}

export default function ModeButton({
  mode,
  selected,
  ...props
}: ModeButtonProps) {
  return (
    <button {...props} className="text-center w-fit rounded-[3px] py-0.5 px-2">
      {modeToString(mode)} {selected == mode && selectedModeToString(mode)}
    </button>
  );
}
