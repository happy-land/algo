import React, { FormEvent, MouseEvent, ChangeEvent, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Queue } from "./queue";
import { TElement } from "./types";
import { ElementStates } from "../../types/element-states";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { useForm } from "../../hooks/useForm";

import styles from "./queue-page.module.css";

const queue = new Queue<TElement<string>>(7);

export const QueuePage: React.FC = () => {
  const [isWorking, setIsWorking] = useState({
    addBtn: false,
    removeBtn: false,
    resetBtn: false,
  });

  // состояние для изменения цвета
  const [elementState, setElementState] = useState<ElementStates>(); // color
  const [elementIndex, setElementIndex] = useState(0);

  const head = queue.getHead();
  const tail = queue.getTail();

  const [elements, setElements] = useState(queue.elements);

  const {values, handleChange, setValues} = useForm({
    queueInput: ""
  }); 

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

    queue.enqueue({
      value: values.queueInput!,
      state: ElementStates.Default
    });
    
    setElementState(ElementStates.Changing);
    setElementIndex(tail);
    setElements([...queue.elements]);

    setTimeout(() => {
      setValues({queueInput: ""})
      setElementState(ElementStates.Default);
      
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

    setElementState(ElementStates.Changing);
    setElementIndex(head);

    setTimeout(() => {
      queue.dequeue();
      setElementState(ElementStates.Default);
      setElements([...queue.elements]);
      setIsWorking({
        addBtn: false,
        removeBtn: false,
        resetBtn: false,
      });
    }, SHORT_DELAY_IN_MS);
  };

  const handleReset = (event: FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    queue.clear();
    setElements([...queue.elements]);
    setIsWorking({
      addBtn: false,
      removeBtn: false,
      resetBtn: false,
    });
  };

  return (
    <SolutionLayout title="Очередь">
      <div className={styles.container}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <Input
            name={"queueInput"}
            placeholder="Введите значение"
            extraClass={styles.input}
            isLimitText={true}
            maxLength={4}
            onChange={handleChange}
            value={String(values.queueInput)}
          />
          <Button
            text="Добавить"
            extraClass={`${styles.button} ${styles.button_add}`}
            onClick={handleAddElement}
            isLoader={isWorking.addBtn}
            disabled={isWorking.removeBtn || !values.queueInput}
            data-testid="button-add"
          />
          <Button
            text="Удалить"
            extraClass={`${styles.button} ${styles.button_remove}`}
            onClick={handleRemoveElement}
            isLoader={isWorking.removeBtn}
            disabled={isWorking.addBtn || head === tail}
            data-testid="button-remove"
          />
          <Button
            text="Очистить"
            extraClass={`${styles.button} ${styles.button_reset}`}
            type="reset"
            onClick={(e) => handleReset(e)}
            isLoader={isWorking.resetBtn}
            disabled={isWorking.addBtn || isWorking.removeBtn || queue.isEmpty()}
            data-testid="button-reset"
          />
        </form>

        <div className={styles.circles} data-testid="circles">
          {elements.length > 0 &&
            elements.map((element, index) => {
              return (
                <Circle
                  key={index}
                  index={index}
                  letter={element?.value ? element.value : ""}
                  state={index === elementIndex ? elementState : element?.state}
                  head={element?.value && index === head ? "head" : ""}
                  tail={element?.value && index === tail - 1 ? "tail" : ""}
                />
              );
            })}
        </div>
      </div>
    </SolutionLayout>
  );
};
