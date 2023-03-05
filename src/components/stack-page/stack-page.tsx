import React, { FormEvent, MouseEvent, ChangeEvent, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Stack } from "./stack";
import { TElement } from "./types";
import { ElementStates } from "../../types/element-states";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

import styles from "./stack-page.module.css";

const stack = new Stack<TElement<string>>();

export const StackPage: React.FC = () => {
  const [inputString, setInputString] = useState<string>("");
  const [isWorking, setIsWorking] = useState({
    addBtn: false,
    removeBtn: false,
    resetBtn: false,
  });

  const [elements, setElements] = useState<TElement<string>[]>([]);

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setInputString(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const handleAddElement = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsWorking({
      addBtn: true,
      removeBtn: false,
      resetBtn: false,
    });
    stack.push({
      value: inputString,
      state: ElementStates.Changing,
    });
    setInputString("");
    setElements([...stack.elements]);

    setTimeout(() => {
      stack.setElementByIndex(stack.size() - 1, {
        value: inputString,
        state: ElementStates.Default,
      });
      setElements([...stack.elements]);
      setIsWorking({
        addBtn: false,
        removeBtn: false,
        resetBtn: false,
      });
    }, SHORT_DELAY_IN_MS);
  };

  const handleRemoveElement = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsWorking({
      addBtn: false,
      removeBtn: true,
      resetBtn: false,
    });

    stack.setElementByIndex(stack.size() - 1, {
      value: stack.elements[stack.size() - 1].value,
      state: ElementStates.Changing,
    });

    setElements([...stack.elements]);

    setTimeout(() => {
      stack.pop();
      setElements([...stack.elements]);
      setIsWorking({
        addBtn: false,
        removeBtn: false,
        resetBtn: false,
      });
    }, SHORT_DELAY_IN_MS);
  };

  const handleReset = (event: FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    stack.clear();
    setElements(stack.elements);
    setIsWorking({
      addBtn: false,
      removeBtn: false,
      resetBtn: false,
    });
  };

  return (
    <SolutionLayout title="Стек">
      <div className={styles.container}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <Input
            placeholder="Введите значение"
            extraClass={styles.input}
            isLimitText={true}
            maxLength={4}
            onChange={handleInput}
            value={inputString}
          />
          <Button
            text="Добавить"
            extraClass={`${styles.button} ${styles.button_add}`}
            onClick={handleAddElement}
            isLoader={isWorking.addBtn}
            disabled={isWorking.removeBtn || !inputString}
          />
          <Button
            text="Удалить"
            extraClass={`${styles.button} ${styles.button_remove}`}
            onClick={handleRemoveElement}
            isLoader={isWorking.removeBtn}
            disabled={isWorking.addBtn || elements.length === 0}
          />
          <Button
            text="Очистить"
            extraClass={`${styles.button} ${styles.button_reset}`}
            type="reset"
            onClick={(e) => handleReset(e)}
            isLoader={isWorking.resetBtn}
            disabled={isWorking.addBtn || isWorking.removeBtn || elements.length === 0}
          />
        </form>

        <div className={styles.circles}>
          {elements.length > 0 &&
            elements.map((element, index) => {
              return (
                <Circle
                  key={index}
                  letter={element.value}
                  state={element.state}
                  head={index === elements.length - 1 ? "top" : ""}
                />
              );
            })}
        </div>
      </div>
    </SolutionLayout>
  );
};
