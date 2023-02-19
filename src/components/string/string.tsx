import React, { FormEvent, useEffect, useState } from "react";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { Circle } from "../ui/circle/circle";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";

import styles from "./string.module.css";
import { ElementStates } from "../../types/element-states";
import { TCircle } from "../../types/types";
import { getCircles, changeCircleState, swap } from "./utils";

export const StringComponent: React.FC = () => {
  const [word, setWord] = useState<string>("");
  const [circles, setCircles] = useState<TCircle[]>([]);

  const [isFirstStep, setIsFirstStep] = useState<boolean>(false);
  const [isSorting, setIsSorting] = useState<boolean>(false);

  const [start, setStart] = useState<number>(0);
  const [end, setEnd] = useState<number>(10);

  useEffect(() => {
    if (circles.length > 0) {
      if (!isFirstStep) {
        if (circles.length === 1) {
          setCircles(changeCircleState(circles, start, end, ElementStates.Modified));
          setIsSorting(false);
        } else {
          setCircles(changeCircleState(circles, start, end, ElementStates.Changing));
        }
        setIsFirstStep(true); // нужно для ре-рендера useEffect
      }

      const interval = setInterval(() => {
        if (isSorting && start <= end) {
          if (start + 1 <= end - 1) {
            setCircles(
              changeCircleState(circles, start + 1, end - 1, ElementStates.Changing)
            );
          }
          setCircles(changeCircleState(circles, start, end, ElementStates.Modified));
          setCircles(swap(circles, start, end));
          setStart((start) => start + 1);
          setEnd((end) => end - 1);
        }
        if (!(start <= end)) setIsSorting(false);
      }, 1000);
      return () => {
        clearInterval(interval);
      };
    }
  }, [circles, isSorting, isFirstStep, start, end]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // показать изначальные буквы в кружках
    setCircles(getCircles(word));
    setStart(0);
    setEnd(word.length - 1);
    setIsSorting(true);
    setIsFirstStep(false);
  };

  const checkButtonDisabled = (): boolean => {
    return word.length === 0 ? true : false;
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
            onChange={(event) => setWord((event.target as HTMLButtonElement).value)}
            extraClass={styles.input}
            isLimitText={true}
            disabled={checkInputDisabled()}
          />
          <Button
            type="submit"
            text="Развернуть"
            isLoader={isSorting}
            disabled={checkButtonDisabled()}
          />
        </form>
        <div className={styles.circles}>
          {circles.map((circle, index) => (
            <Circle key={index} letter={circle.letter} state={circle.state} />
          ))}
        </div>
      </div>
    </SolutionLayout>
  );
};
