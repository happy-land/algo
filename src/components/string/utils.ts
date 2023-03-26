import { ElementStates } from "../../types/element-states";
import { TCircle } from "../../types/types";
import { LettersStep } from "./types";

export const getSteps = (source: String): LettersStep[] => {
  const letters = source.split("");
  const steps: LettersStep[] = [];

  // Нет символов - нет шагов, всё честно
  if (letters.length === 0) {
    return steps;
  }

  // Первым шагом показываем исходную строку
  steps.push({
    letters: [...letters], 
  });

  let leftIndex = 0;
  let rightIndex = letters.length - leftIndex - 1;

  // До тех пор, пока не дошли до середины
  while (leftIndex <= rightIndex) {
    // Показываем, какие символы сейчас будут меняться местами
    steps.push({
      letters: [...letters],
      index: leftIndex,
      state: ElementStates.Changing,
    });

    // Меняем символы местами и показываем, что они изменились
    letters[leftIndex] = source[rightIndex];
    letters[rightIndex] = source[leftIndex];
    steps.push({
      letters: [...letters], 
      index: leftIndex,
      state: ElementStates.Modified,
    });

    // Двигаемся к середине
    leftIndex++;
    rightIndex--;
  }

  // Завершаем разворот, показываем результат
  steps.push({
    letters: [...letters], 
  });

  return steps;
};

