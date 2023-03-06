import React, { FormEvent, MouseEvent, ChangeEvent, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { LinkedList } from "./linked-list";
import { ArrowIcon } from "../ui/icons/arrow-icon";

import styles from "./list-page.module.css";

const list = new LinkedList<string>(["0", "34", "8", "1"]);

export const ListPage: React.FC = () => {

  // value -> inputValue
  // indexValue -> inputIndex
  const [inputValue, setInputValue] = useState<string>("");
  const [inputIndex, setInputIndex] = useState<string>("");

  const [isWorking, setIsWorking] = useState({
    addHead: false,
    addTail: false,
    removeHead: false,
    removeTail: false,
    addIndex: false,
    removeIndex: false
  });

  const [isInactive, setIsInactive] = useState({
    
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const handleInputValue = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setInputValue(event.target.value);
  };

  const handleAddHead = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  }

  const handleAddTail = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  }

  const handleRemoveHead = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  }

  const handleRemoveTail = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  }

  const handleInputIndex = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setInputIndex(event.target.value);
  };



  return (
    <SolutionLayout title="Связный список">
      <div className={styles.container}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <Input
            placeholder="Введите значение"
            extraClass={styles.input_val}
            isLimitText={true}
            maxLength={4}
            onChange={handleInputValue}
            value={inputValue}
          />
          <Button
            text="Добавить в head"
            extraClass={`${styles.button} ${styles.button_add}`}
            onClick={handleAddHead}
            isLoader={isWorking.addHead}
            // disabled={isWorking.removeBtn || !inputString}
          />
          <Button
            text="Добавить в tail"
            extraClass={`${styles.button} ${styles.button_add}`}
            onClick={handleAddTail}
            isLoader={isWorking.addTail}
            // disabled={isWorking.removeBtn || !inputString}
          />

          <Button
            text="Удалить из head"
            extraClass={`${styles.button} ${styles.button_remove}`}
            onClick={handleRemoveHead}
            isLoader={isWorking.removeHead}
            // disabled={isWorking.addBtn || head === tail}
          />
          <Button
            text="Удалить из tail"
            extraClass={`${styles.button} ${styles.button_remove}`}
            onClick={handleRemoveTail}
            isLoader={isWorking.removeTail}
            // disabled={isWorking.addBtn || head === tail}
          />
          <Input
            placeholder="Введите индекс"
            extraClass={styles.input_ind}
            isLimitText={true}
            maxLength={4}
            onChange={handleInputIndex}
            value={inputIndex}
          />
        </form>

        <div className={styles.circles}>
          {/* {elements.length > 0 &&
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
            })} */}
        </div>
      </div>
    </SolutionLayout>
  );
};
