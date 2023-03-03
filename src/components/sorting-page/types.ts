import { ElementStates } from "../../types/element-states";

export type TSortMode = 'selection' | 'bubble';

export type TElement<T> = {
  value: T;
  state?: ElementStates;
};

export interface SortingStep<T> {
  elements: TElement<T>[]; // элементы
}