import { ElementStates } from "../../types/element-states";

export interface LettersStep {
  letters: string[];
  index?: number;
  state?: ElementStates;
}