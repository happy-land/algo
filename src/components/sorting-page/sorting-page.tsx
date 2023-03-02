import React, { FormEvent, ChangeEvent, useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import { Column } from "../ui/column/column";

import styles from "./sorting-page.module.css";
import { Direction } from "../../types/direction";
import { TSortMode } from "./types";
import { getSteps, randomArr, SortingStep } from "./utils";
import { DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";

export const SortingPage: React.FC = () => {
  const [isWorking, setIsWorking] = useState<boolean>(false);
  const [sortDirection, setSortDirection] = useState<Direction>();
  const [sortMode, setSortMode] = useState<TSortMode>("selection");
  // начальный массив
  const [initArr, setInitArr] = useState<number[]>([]);
  // console.log(randomArr());

  // Шаги визуализации алгоритма
  const [steps, setSteps] = useState<SortingStep<number>[]>([]);

  // Текущий шаг, который видим на экране
  const [currentStep, setCurrentStep] = useState<SortingStep<number> | null>(null);

  // Номер текущего шага
  const [stepsIndex, setStepsIndex] = useState<number>(0);

  useEffect(() => {
    if (initArr.length === 0) {
      console.log(initArr);
      setInitArr(randomArr());
    }

    if (steps.length === 0 || stepsIndex >= steps.length) {
      setIsWorking(false);
      return;
    }

    // Показываем текущий шаг
    setCurrentStep(steps[stepsIndex]);
    setTimeout(() => {
      setStepsIndex(stepsIndex + 1);
    }, 500); // TODO: change to DELAY_IN_MS
  }, [steps, currentStep, stepsIndex]);

  const onSortChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSortMode(event.target.value as TSortMode);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Сбрасываем всё на исходную позицию
    setCurrentStep(null);
    setStepsIndex(0);

    setIsWorking(true);

    // определяем какой вид сортировки выбран
    const buttonClicked = event.currentTarget.querySelector("button:focus");
    if (buttonClicked) {
      let fsteps;
      const buttonName = buttonClicked.getAttribute("name");
      if (sortMode === "selection") {
        if (buttonName === "buttonAsc") {
          // Генерируем шаги и запускаем визуализацию
          setIsWorking(true);
          setSortDirection(Direction.Ascending);
          fsteps = getSteps(initArr, "ASC");
          setSteps(fsteps);
          console.log(fsteps);
        }
        if (buttonName === "buttonDesc") {
          // Генерируем шаги и запускаем визуализацию
          setIsWorking(true);
          setSortDirection(Direction.Descending);
          fsteps = getSteps(initArr, "DESC");
          setSteps(fsteps);
          console.log(fsteps);
        }
      }
      if (sortMode === "bubble") {

      }
      
    }
  };

  const handleReset = (event: FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsWorking(false);
    console.log("Reset!");
    setInitArr(randomArr());
    setCurrentStep(null);
    // setStepsIndex(0);
  };

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles.container}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <RadioInput
            label="Выбор"
            extraClass={styles.radio_sel_sort}
            name="radioSelection"
            value="selection"
            checked={sortMode === "selection"}
            onChange={onSortChange}
            disabled={isWorking}
          />

          <RadioInput
            label="Пузырек"
            extraClass={styles.radio_bub_sort}
            name="radioBubble"
            value="bubble"
            checked={sortMode === "bubble"}
            onChange={onSortChange}
            disabled={isWorking}
          />
          <Button
            text="По возрастанию"
            extraClass={`${styles.button} ${styles.button_asc}`}
            type="submit"
            name="buttonAsc"
            isLoader={isWorking && sortDirection === Direction.Ascending}
            sorting={Direction.Ascending}
            disabled={isWorking}
          />
          <Button
            text="По убыванию"
            extraClass={`${styles.button} ${styles.button_desc}`}
            type="submit"
            name="buttonDesc"
            isLoader={isWorking && sortDirection === Direction.Descending}
            sorting={Direction.Descending}
            disabled={isWorking}
          />
          <Button
            text="Новый массив"
            extraClass={`${styles.button} ${styles.button_reset}`}
            type="reset"
            onClick={(e) => handleReset(e)}
            disabled={isWorking}
          />
        </form>
        {sortMode} = {initArr.toString()} = {currentStep && currentStep.toString()}
       
        {initArr && !currentStep && (
          <div className={styles.sortingContainer}>
            {initArr.map((element, index) => {
              return <Column key={index} index={element} />;
            })}
          </div>
        )}

        {currentStep && (
          <div className={styles.sortingContainer}>
            {currentStep.elements.map((element, index) => {
              return <Column key={index} index={element.value} state={element.state} />;
            })}
          </div>
        )}
      </div>
    </SolutionLayout>
  );
};
