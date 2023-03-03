import React, { FormEvent, useEffect, useState } from "react";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { Circle } from "../ui/circle/circle";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";

import styles from "./fibonacci-page.module.css";
import { getSteps, getFibonacciNumbers } from "./utils";
import { FiboStep } from "./types";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

export const FibonacciPage: React.FC = () => {
  const [inputString, setInputString] = useState<string>("");
  const [isWorking, setIsWorking] = useState<boolean>(false);

  // Шаги визуализации
  const [steps, setSteps] = useState<FiboStep[]>([]);

  // Текущий шаг, который видим на экране
  const [currentStep, setCurrentStep] = useState<FiboStep | null>(null);

  // Номер текущего шага.
  const [stepsIndex, setStepsIndex] = useState<number>(0);

  useEffect(() => {
    if (steps.length === 0 || stepsIndex >= steps.length) {
      setIsWorking(false);
      return;
    }

    // Показываем текущий шаг
    setCurrentStep(steps[stepsIndex]);
    setTimeout(() => {
      setStepsIndex(stepsIndex + 1);
    }, SHORT_DELAY_IN_MS);
  }, [steps, currentStep, stepsIndex]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formElements = form.elements as typeof form.elements & {
      fiboInput: HTMLInputElement;
    };
    const fiboNumber = parseInt(formElements.fiboInput.value);
    // вычисляем последовательность Фибоначчи
    const fiboArray = getFibonacciNumbers(fiboNumber);

    // Сбрасываем всё на исходную позицию
    setCurrentStep(null);
    setStepsIndex(0);
    // Генерируем шаги и запускаем визуализацию
    setIsWorking(true);
    const fsteps = getSteps(fiboArray);
    setSteps(fsteps);
  };

  const checkButtonDisabled = (): boolean => {
    return inputString.length === 0 ? true : false;
  };

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <div className={styles.container}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <Input
            type={"number"}
            name={"fiboInput"}
            extraClass={styles.input}
            isLimitText={true}
            max={19}
            onChange={(event) =>
              setInputString((event.target as HTMLButtonElement).value)
            }
          />
          <Button
            type="submit"
            text="Рассчитать"
            isLoader={isWorking}
            disabled={checkButtonDisabled()}
          />
        </form>
        {currentStep && (
          <div className={styles.circles}>
            {currentStep.numbers.map((num, index) => {
              return <Circle key={index} letter={num.toString()} index={index} />;
            })}
          </div>
        )}
      </div>
    </SolutionLayout>
  );
};
