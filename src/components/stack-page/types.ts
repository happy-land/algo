import { ElementStates } from "../../types/element-states";

export type TElement<T> = {
  value: T;
  state?: ElementStates;
};
