import { ElementStates } from "../../types/element-states";
import { TCircle } from "../../types/types";

export const getCircles = (word: string): TCircle[] => {
  const newCircles = [...word].reduce((acc: TCircle[], current: string) => {
    let newObj: TCircle = {
      letter: current,
      state: ElementStates.Default,
    };
    acc.push(newObj);
    return acc;
  }, []);
  return newCircles;
};

export const swap = (
  arr: TCircle[],
  firstIndex: number,
  secondIndex: number
): TCircle[] => {
  const temp = arr[firstIndex];
  arr[firstIndex] = arr[secondIndex];
  arr[secondIndex] = temp;
  return arr;
};

export const changeCircleState = (
  arr: TCircle[],
  firstIndex: number,
  secondIndex: number,
  state: ElementStates
): TCircle[] => {
  arr[firstIndex].state = state;
  arr[secondIndex].state = state;
  return arr;
};
