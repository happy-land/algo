import { fireEvent, render, screen } from "@testing-library/react";
import { getStepsSelect, getStepsBubble } from "./utils";
import { SortingStep } from "./types";

describe("SORTING ALGORITHMS TESTS", () => {
  test("selection empty array test", () => {
    expect(getStepsSelect([])).toEqual([]);
  });

  test("selection one element test", () => {
    // функция getStepsSelect на вход получает массив чисел
    // на выходе получаем массив объектов
    // в последнем элементе массива steps должен быть объект со свойством elements
    // должен содержать массив из одного элемента
    const steps: SortingStep<number>[] = getStepsSelect([5]);
    const lastStep: SortingStep<number> = steps[steps.length - 1];
    expect(lastStep.elements).toEqual([
      {
        state: "modified",
        value: 5,
      },
    ]);
  });

  test("selection many elements ASC test", () => {
    // в последнем элементе массива - объект со свойством elements
    // должен содержать массив из отсортиваннных элементов
    const steps: SortingStep<number>[] = getStepsSelect([5, 3, 8]);
    const lastStep: SortingStep<number> = steps[steps.length - 1];
    expect(lastStep.elements).toEqual([
      {
        state: "modified",
        value: 3,
      },
      {
        state: "modified",
        value: 5,
      },
      {
        state: "modified",
        value: 8,
      },
    ]);
  });

  test("selection many elements DESC test", () => {
    // в последнем элементе массива - объект со свойством elements
    // должен содержать массив из отсортиваннных элементов
    const steps: SortingStep<number>[] = getStepsSelect([5, 3, 8], "DESC");
    const lastStep: SortingStep<number> = steps[steps.length - 1];
    expect(lastStep.elements).toEqual([
      {
        state: "modified",
        value: 8,
      },
      {
        state: "modified",
        value: 5,
      },
      {
        state: "modified",
        value: 3,
      },
    ]);
  });

  test("bubble empty array test", () => {
    expect(getStepsBubble([])).toEqual([]);
  });

  test("bubble one element test", () => {
    const steps: SortingStep<number>[] = getStepsBubble([5]);
    const lastStep: SortingStep<number> = steps[steps.length - 1];
    expect(lastStep.elements).toEqual([
      {
        state: "modified",
        value: 5,
      },
    ]);
  });

  test("bubble many elements test ASC", () => {
    const steps: SortingStep<number>[] = getStepsBubble([5, 3, 8]);
    const lastStep: SortingStep<number> = steps[steps.length - 1];
    expect(lastStep.elements).toEqual([
      {
        state: "modified",
        value: 3,
      },
      {
        state: "modified",
        value: 5,
      },
      {
        state: "modified",
        value: 8,
      },
    ]);
  });

  test("bubble many elements test DESC", () => {
    const steps: SortingStep<number>[] = getStepsBubble([5, 3, 8], "DESC");
    const lastStep: SortingStep<number> = steps[steps.length - 1];
    expect(lastStep.elements).toEqual([
      {
        state: "modified", 
        value: 8,
      },
      {
        state: "modified",
        value: 5,
      },
      {
        state: "modified",
        value: 3,
      },
    ]);
  });
});
