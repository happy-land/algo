import { ElementStates } from "../../types/element-states";
import { TCircle } from "../../types/types";
import { FiboStep } from "./types";

// создадим массив с шагами
export const getSteps = <T>(source: number[]): FiboStep[] => {
  const steps: FiboStep[] = [];

  // Нет последовательности Ф - нет шагов, всё честно
  if (source.length === 0) {
    return steps;
  }

  // Первым шагом показываем первое число
  for (let i = 1; i <= source.length; i++) {
    steps.push({
      numbers: [...source].slice(0, i), // Обязательно копируем!
      index: i
    });
  }

  return steps;
};

export const getCircles = (fibArray: number[]): TCircle[] => {
  const newCircles = fibArray.reduce(
    (acc: TCircle[], current: number, currentIndex: number) => {
      let newObj: TCircle = {
        letter: current.toString(),
        index: currentIndex,
        state: ElementStates.Default,
      };
      acc.push(newObj);
      return acc;
    },
    []
  );
  return newCircles;
};

export const getFibonacciNumbers = (num: number): number[] => {
  let resultArray = [];
  for (let i = 1; i <= num + 1; i++) {
    const res = fib(i);
    resultArray.push(res);
  }
  return resultArray;
};

const fib = (n: number, memo: Record<number, number> = {}): number => {
  if (n in memo) {
    return memo[n];
  }
  if (n <= 2) {
    return 1;
  }
  memo[n] = fib(n - 1, memo) + fib(n - 2, memo);
  return memo[n];
};
