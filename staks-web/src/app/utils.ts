import { TextObj } from "./types";
import { TextObjAction } from "./types";
import { Field } from "./types";

export function textReducer(state: TextObj[], action: TextObjAction) {
  switch (action.type) {
    case "init": {
      state.push({ text: "", field: "TextField" });
      return state;
    }
    case "edit": {
      if (action.key || action.key === 0) {
        state[action.key].text = action.value as string;
      }
      return state;
    }
    case "add": {
      state.push({ text: "", field: action.value as Field });
      return state;
    }
    default:
      return state;
  }
}
