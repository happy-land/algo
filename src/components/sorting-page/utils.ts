import { ElementStates } from "../../types/element-states";

export type TElement<T> = {
  value: T;
  state?: ElementStates;
};

export interface SortingStep<T> {
  elements: TElement<T>[]; // элементы
  // index?: number; // индекс шага
}

// сохраняем начальный массив с элементами
const setElements = (source: number[]) => {
  const elements = source.reduce(
    (prev: TElement<number>[], curValue: number, index: number) => {
      return [
        ...prev,
        {
          value: curValue,
          state: ElementStates.Default,
        },
      ];
    },
    []
  );

  return elements;
};

// CHANGING
const setChangingElements = (
  source: number[],
  modifiedIndex: number,
  firstIndex = -1,
  secondIndex = -1
) => {
  const elements = source.reduce(
    (prev: TElement<number>[], curValue: number, index: number) => {
      let state = ElementStates.Default;

      if (index === firstIndex || index === secondIndex) {
        state = ElementStates.Changing;
      }

      if (index + 1 < modifiedIndex) {
        state = ElementStates.Modified;
      }

      return [
        ...prev,
        {
          value: curValue,
          state: state,
        },
      ];
    },
    []
  );

  return elements;
};

// MODIFIED
const setModifiedElements = (
  source: number[],
  modifiedIndex: number,
  firstIndex = -1
) => {
  const elements = source.reduce(
    (prev: TElement<number>[], curValue: number, index: number) => {
      let state = ElementStates.Default;
      if (firstIndex === source.length - 1) {
        console.log("MODIFIED!");
        state = ElementStates.Modified;
      }
      return [
        ...prev,
        {
          value: curValue,
          state:
            index + 1 < modifiedIndex || index === firstIndex
              ? ElementStates.Modified
              : state,
        },
      ];
    },
    []
  );

  return elements;
};

// сортировка выбором по возрастанию
export const getSteps = (source: number[], flag = "ASC"): SortingStep<number>[] => {
  const steps: SortingStep<number>[] = [];

  if (source.length === 0) {
    return steps;
  }

  // Первым шагом показываем исходную строку
  steps.push({
    elements: setElements(source),
    // index: 0,
  });

  const { length } = source;
  // let stepCounter = 1; // счетчик шагов, после каждого добавления в steps - увеличивать на 1

  if (flag === "ASC") {
    for (let i = 0; i <= length - 1; i++) {
      let minInd = i;

      // показываем, какие элементы (два) сейчас будут меняться местами

      for (let j = i + 1; j <= length - 1; j++) {
        steps.push({
          elements: setChangingElements(source, i + 1, i, j),
          // index: stepCounter,
        });
        // stepCounter++;

        if (source[j] < source[minInd]) {
          minInd = j;
        }
      }
      swap(source, minInd, i);

      // элемент с индексом minInd - cделать зеленым цветом
      steps.push({
        elements: setModifiedElements(source, i + 1, i),
      });
      // stepCounter++;
    }
  }

  if (flag === "DESC") {
    for (let i = 0; i <= length - 1; i++) {
      let maxInd = i;

      for (let j = i + 1; j <= length - 1; j++) {
        steps.push({
          elements: setChangingElements(source, i + 1, i, j),
          // index: stepCounter,
        });
        // stepCounter++;

        if (source[j] > source[maxInd]) {
          maxInd = j;
        }
      }
      swap(source, maxInd, i);

      // элемент с индексом maxInd - cделать зеленым цветом
      steps.push({
        elements: setModifiedElements(source, i + 1, i),
      });
      // stepCounter++;
    }
  }

  return steps;
};

export const randomArr = (): number[] => {
  const arrSize = Math.floor(3 + Math.random() * 14);
  const randArr: number[] = [];
  while (randArr.length < arrSize - 1) {
    randArr.push(Math.round(Math.random() * 100));
  }
  return randArr;
  // return [85, 9, 93, 35, 80];
};

const swap = (arr: number[], firstIndex: number, secondIndex: number): void => {
  const temp = arr[firstIndex];
  arr[firstIndex] = arr[secondIndex];
  arr[secondIndex] = temp;
};

// export const selectionSort = (arr: number[]) => {
export const selectionSort = (arr: number[]) => {
  const { length } = arr;
  for (let i = 0; i < length - 1; i++) {
    // console.log(i, "< i");
    let maxInd = i; // макс индекс
    for (let ind = i + 1; ind <= length - 1; ind++) {
      if (arr[ind] > arr[maxInd]) {
        maxInd = ind;
      }
    }
    // тут мы нашли макс индекс
    // поставим элемент с макс индексом в начало массива
    swap(arr, maxInd, i);
  }

  return arr;
};
