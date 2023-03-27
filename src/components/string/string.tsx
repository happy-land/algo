import React, { FormEvent, useEffect, useState } from "react";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { Circle } from "../ui/circle/circle";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";

import styles from "./string.module.css";
import { getSteps } from "./utils";
import { LettersStep } from "./types";
import { useForm } from "../../hooks/useForm";
import { DELAY_IN_MS } from "../../constants/delays";

export const StringComponent: React.FC = () => {

  // Шаги визуализации разворота строки
  const [steps, setSteps] = useState<LettersStep[]>([]);
  // Текущий шаг, который видим на экране
  const [currentStep, setCurrentStep] = useState<LettersStep | null>(null);
  // Номер текущего шага
  const [stepsIndex, setStepsIndex] = useState<number>(0);

  const [isSorting, setIsSorting] = useState<boolean>(false);

  const { values, handleChange, setValues } = useForm({
    word: "",
  });

  useEffect(() => {
    if (steps.length === 0 || stepsIndex >= steps.length) {
      setIsSorting(false);
      return;
    }

    // Показываем текущий шаг
    setCurrentStep(steps[stepsIndex]);
    // Через пару секунд будет следующий шаг, что спровоцирует запуск нового эффекта
    setTimeout(() => {
      setStepsIndex(stepsIndex + 1);
    }, DELAY_IN_MS);
  }, [steps, currentStep, stepsIndex]);


  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formElements = form.elements as typeof form.elements & {
      word: HTMLInputElement;
    };
    const letters = formElements.word.value.toUpperCase();

    setCurrentStep(null);
    setStepsIndex(0);
    setSteps(getSteps(letters));

    setIsSorting(true);
  };

  const checkButtonDisabled = (): boolean => {
    // return word.length === 0 ? true : false;
    return values.word!.length === 0 ? true : false;
  };

  const checkInputDisabled = (): boolean => {
    return isSorting ? true : false;
  };

  return (
    <SolutionLayout title="Строка">
      <div className={styles.container}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <Input
            maxLength={11}
            // onChange={(event) => setWord((event.target as HTMLButtonElement).value)}
            name={"word"}
            onChange={handleChange}
            extraClass={styles.input}
            isLimitText={true}
            value={String(values.word)}
            disabled={checkInputDisabled()}
            data-testid="input-elem"
          />
          <Button
            type="submit"
            text="Развернуть"
            isLoader={isSorting}
            disabled={checkButtonDisabled()}
            data-testid="button-elem"
          />
        </form>
        {currentStep && (
          <div className={styles.circles} data-testid="circles">
            {currentStep.letters.map((letter, index) => {
              let stateClass;
              const stepIndex = currentStep.index;
              if (stepIndex !== undefined) {
                if (
                  index === stepIndex ||
                  index === currentStep.letters.length - stepIndex - 1
                ) {
                  stateClass = currentStep.state;
                }
              }

              return (
                <Circle
                  key={index}
                  letter={letter}
                  state={stateClass}
                />
              );
            })}
          </div>
        )}
      </div>
    </SolutionLayout>
  );
};
