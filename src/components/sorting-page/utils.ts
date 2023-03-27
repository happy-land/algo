import { ElementStates } from "../../types/element-states";
import {TElement, SortingStep} from "./types"

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

// CHANGING SELECTION
const setChangingElementsSelection = (
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

// CHANGING BUBBLE
const setChangingElementsBubble = (
  source: number[],
  firstIndex = -1,
  secondIndex = -1,
  modifiedIndex = -1
) => {
  const elements = source.reduce(
    (prev: TElement<number>[], curValue: number, index: number) => {
      let state = ElementStates.Default;

      if (index === firstIndex || index === secondIndex) {
        state = ElementStates.Changing;
      }

      if (index > modifiedIndex) {
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

// MODIFIED SELECTION
const setModifiedElements = (
  source: number[],
  modifiedIndex: number,
  firstIndex = -1
) => {
  const elements = source.reduce(
    (prev: TElement<number>[], curValue: number, index: number) => {
      let state = ElementStates.Default;
      if (firstIndex === source.length - 1) {
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

// MODIFIED BUBBLE
const setModifiedElementsBubbles = (source: number[]) => {
  const elements = source.reduce(
    (prev: TElement<number>[], curValue: number, index: number) => {
      return [
        ...prev,
        {
          value: curValue,
          state: ElementStates.Modified,
        },
      ];
    },
    []
  );
  return elements;
};

// SELECTION сортировка выбором
export const getStepsSelect = (source: number[], flag = "ASC"): SortingStep<number>[] => {
  const steps: SortingStep<number>[] = [];

  if (source.length === 0) {
    return steps;
  }

  // Первым шагом показываем исходную строку
  steps.push({
    elements: setElements(source),
  });

  const { length } = source;
  if (flag === "ASC") {
    for (let i = 0; i <= length - 1; i++) {
      let minInd = i;

      // показываем, какие элементы (два) сейчас будут меняться местами
      for (let j = i + 1; j <= length - 1; j++) {
        steps.push({
          elements: setChangingElementsSelection(source, i + 1, i, j),
        });

        if (source[j] < source[minInd]) {
          minInd = j;
        }
      }
      swap(source, minInd, i);

      // элемент с индексом minInd - cделать зеленым цветом
      steps.push({
        elements: setModifiedElements(source, i + 1, i),
      });
    }
  }

  if (flag === "DESC") {
    for (let i = 0; i <= length - 1; i++) {
      let maxInd = i;

      for (let j = i + 1; j <= length - 1; j++) {
        steps.push({
          elements: setChangingElementsSelection(source, i + 1, i, j),
        });

        if (source[j] > source[maxInd]) {
          maxInd = j;
        }
      }
      swap(source, maxInd, i);

      // элемент с индексом maxInd - cделать зеленым цветом
      steps.push({
        elements: setModifiedElements(source, i + 1, i),
      });
    }
  }

  return steps;
};

// BUBBLE сортировка пузырьком
export const getStepsBubble = (source: number[], flag = "ASC"): SortingStep<number>[] => {
  const steps: SortingStep<number>[] = [];
  if (source.length === 0) {
    return steps;
  }

  // Первым шагом показываем исходную строку
  steps.push({
    elements: setElements(source),
  });

  const { length } = source;
  if (flag === "ASC") {
    for (let i = 0; i < length; i++) {
      for (let j = 0; j < length - 1 - i; j++) {
        let maxInd = j;
        if (source[maxInd] > source[j + 1]) {
          maxInd = j + 1;
          // сортируем элементы по возрастанию
          swap(source, j, j + 1);
        }
        // поменяем цвет на changing у двух элементов
        steps.push({
          elements: setChangingElementsBubble(source, j, j + 1, length - 1 - i),
        });
      }
      // последний шаг
      if (i === length - 1) {
        steps.push({
          elements: setModifiedElementsBubbles(source),
        });
      }
    }
  }

  if (flag === "DESC") {
    for (let i = 0; i < length; i++) {
      for (let j = 0; j < length - 1 - i; j++) {
        let minInd = j;
        if (source[minInd] < source[j + 1]) {
          minInd = j + 1;
          // сортируем элементы по убыванию
          swap(source, j, j + 1);
        }
        // поменяем цвет на changing у двух элементов
        steps.push({
          elements: setChangingElementsBubble(source, j, j + 1, length - 1 - i),
        });
      }
      // последний шаг
      if (i === length - 1) {
        steps.push({
          elements: setModifiedElementsBubbles(source),
        });
      }
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
