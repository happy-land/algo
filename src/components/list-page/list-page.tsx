import React, { FormEvent, MouseEvent, ChangeEvent, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { LinkedList } from "./linked-list";
import { ArrowIcon } from "../ui/icons/arrow-icon";

import { getCircleState } from "./utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

import styles from "./list-page.module.css";

const list = new LinkedList<string>(["0", "34", "8", "1"]);

export const ListPage: React.FC = () => {

  const [inputValue, setInputValue] = useState<string>("");
  const [inputIndex, setInputIndex] = useState<string>("");

  const [topCircleIndex, setTopCircleIndex] = useState(-1);
  const [topCircleLetter, setTopCircleLetter] = useState("");
  const [bottomCircleIndex, setBottomCircleIndex] = useState(-1);
  const [bottomCircleLetter, setBottomCircleLetter] = useState("");

  const [modifiedIndex, setModifiedIndex] = useState<number>(-1);

  const [changedIndexes, setChangedIndexes] = useState<number[]>([]);
  const [elements, setElements] = useState<string[]>(list.values);

  const [isWorking, setIsWorking] = useState({
    addHead: false,
    addTail: false,
    removeHead: false,
    removeTail: false,
    addIndex: false,
    removeIndex: false,
  });

  const [isInactive, setIsInactive] = useState({
    addHead: false,
    addTail: false,
    removeHead: false,
    removeTail: false,
    addIndex: false,
    removeIndex: false,
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
    if (!inputValue) return;

    setIsWorking((prev) => ({ ...prev, addHead: true }));
    setIsInactive((prev) => ({
      ...prev,
      removeHead: true,
      removeTail: true,
    }));

    // 1 добавить фиолетовый кружок со значением inputValue над head
    // 2 добавить зеленый кружок - новая голова
    // 3 новая голова теперь синяя

    list.prepend(inputValue);
    setTopCircleIndex(0);
    setTopCircleLetter(inputValue);
    setInputValue("");
    setTimeout(() => {

      setElements(list.values);
      setTopCircleIndex(-1);
      setTopCircleLetter("");
      setModifiedIndex(0);

      setTimeout(() => {
        setModifiedIndex(-1);

        setIsWorking((prev) => ({ ...prev, addHead: false }));
        setIsInactive((prev) => ({
          ...prev,
          removeHead: false,
          removeTail: false,
        }));
      }, SHORT_DELAY_IN_MS);
    }, SHORT_DELAY_IN_MS);
  };

  const handleAddTail = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (!inputValue) return;

    setIsWorking((prev) => ({ ...prev, addTail: true }));
    setIsInactive((prev) => ({
      ...prev,
      removeHead: true,
      removeTail: true,
    }));

    setTopCircleIndex(list.values.length - 1);
    setTopCircleLetter(inputValue);
    list.append(inputValue);
    setInputValue("");
    setTimeout(() => {
      setElements(list.values);
      setTopCircleIndex(-1);
      setTopCircleLetter("");
      setModifiedIndex(list.values.length - 1);

      setTimeout(() => {
        setModifiedIndex(-1);

        setIsWorking((prev) => ({ ...prev, addTail: false }));
        setIsInactive((prev) => ({
          ...prev,
          removeHead: false,
          removeTail: false,
        }));
      }, SHORT_DELAY_IN_MS);
    }, SHORT_DELAY_IN_MS);
  };

  const handleRemoveHead = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    setIsWorking((prev) => ({ ...prev, removeHead: true }));
    setIsInactive((prev) => ({
      ...prev,
      removeTail: true,
    }));

    setElements(elements.map((element, index) => (index === 0 ? "" : element)));

    setBottomCircleIndex(0);
    setBottomCircleLetter(list._head);

    list.removeFromHead();

    setTimeout(() => {
      setElements(list.values);
      setBottomCircleIndex(-1);
      setBottomCircleLetter("");
      setIsWorking((prev) => ({ ...prev, removeHead: false }));
      setIsInactive((prev) => ({
        ...prev,
        removeTail: false,
      }));
    }, SHORT_DELAY_IN_MS);
  };

  const handleRemoveTail = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    setIsWorking((prev) => ({ ...prev, removeTail: true }));
    setIsInactive((prev) => ({
      ...prev,
      removeHead: true,
    }));

    setElements(
      elements.map((element, index) => (index === list.values.length - 1 ? "" : element))
    );

    setBottomCircleIndex(list.values.length - 1);
    setBottomCircleLetter(list._tail);
    list.removeFromTail();

    setTimeout(() => {
      setElements(list.values);
      setBottomCircleIndex(-1);
      setBottomCircleLetter("");
      setIsWorking((prev) => ({ ...prev, removeTail: false }));
      setIsInactive((prev) => ({
        ...prev,
        removeHead: false,
      }));
    }, SHORT_DELAY_IN_MS);
  };

  const handleInputIndex = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setInputIndex(event.target.value);
  };

  const handleAddIndex = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    let step: number = 0;
    setIsWorking((prev) => ({ ...prev, addIndex: true }));
    setIsInactive((prev) => ({
      ...prev,
      addHead: true,
      addTail: true,
      removeHead: true,
      removeTail: true,
      addIndex: true,
      removeIndex: true,
    }));

    const interval = setInterval(() => {
      if (step + 1 <= Number(inputIndex)) {
        setTimeout(() => {
          setChangedIndexes((prev) => [...prev, step - 1]);
          setTopCircleIndex(step);
          setTopCircleLetter(inputValue);
          step++;
        }, SHORT_DELAY_IN_MS);
      } else {
        clearInterval(interval);

        list.appendByIndex(inputValue, Number(inputIndex));

        setTimeout(() => {
          setModifiedIndex(Number(inputIndex));
          setElements(list.values);
          setTopCircleIndex(-1);
          setTopCircleLetter("");

          setTimeout(() => {
            setModifiedIndex(-1);
            setChangedIndexes([]);
            setIsWorking((prev) => ({ ...prev, addIndex: false }));
            setIsInactive((prev) => ({
              ...prev,
              addHead: false,
              addTail: false,
              removeHead: false,
              removeTail: false,
              addIndex: false,
              removeIndex: false,
            }));
          }, SHORT_DELAY_IN_MS);
        }, SHORT_DELAY_IN_MS);
      }
    }, SHORT_DELAY_IN_MS);
    setInputIndex("");
    setInputValue("");
  };

  const handleRemoveIndex = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    let step: number = 0;
    setIsWorking((prev) => ({ ...prev, removeIndex: true }));
    setIsInactive((prev) => ({
      ...prev,
      addHead: true,
      addTail: true,
      removeHead: true,
      removeTail: true,
      addIndex: true,
      removeIndex: true,
    }));
    const interval = setInterval(() => {
      if (step + 1 <= Number(inputIndex)) {
        setChangedIndexes((prev) => [...prev, step]);
        step++;
      } else {
        clearInterval(interval);
        setChangedIndexes([step]);
        setElements(elements.map((element, index) => (index === step ? "" : element)));
        setBottomCircleIndex(step);
        setBottomCircleLetter(list.getByIndex(Number(inputIndex)));
        list.removeByIndex(Number(inputIndex));

        setTimeout(() => {
          setChangedIndexes([]);
          setElements(list.values);
          setBottomCircleIndex(-1);
          setBottomCircleLetter("");

          setTimeout(() => {
            setChangedIndexes([]);
            setIsWorking((prev) => ({
              ...prev,
              removeIndex: false,
            }));
            setIsInactive({
              addHead: false,
              addTail: false,
              removeHead: false,
              removeTail: false,
              addIndex: false,
              removeIndex: false,
            });
          }, SHORT_DELAY_IN_MS);
        }, SHORT_DELAY_IN_MS);
      }
    }, SHORT_DELAY_IN_MS);
    setInputValue("");
    setInputIndex("");
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
            extraClass={`${styles.button} ${styles.btn_add_to_head}`}
            onClick={handleAddHead}
            isLoader={isWorking.addHead}
            disabled={(!inputValue && !inputIndex) || isInactive.addHead}
          />
          <Button
            text="Добавить в tail"
            extraClass={`${styles.button} ${styles.btn_add_to_tail}`}
            onClick={handleAddTail}
            isLoader={isWorking.addTail}
            disabled={(!inputValue && !inputIndex) || isInactive.addTail}
          />
          <Button
            text="Удалить из head"
            extraClass={`${styles.button} ${styles.btn_remove_from_head}`}
            onClick={handleRemoveHead}
            isLoader={isWorking.removeHead}
            disabled={(!inputValue && !inputIndex) || isInactive.removeHead || elements.length === 0}
          />
          <Button
            text="Удалить из tail"
            extraClass={`${styles.button} ${styles.button_remove_tail}`}
            onClick={handleRemoveTail}
            isLoader={isWorking.removeTail}
            disabled={(!inputValue && !inputIndex) || isInactive.removeTail || elements.length === 0}
          />
          <Input
            placeholder="Введите индекс"
            type="number"
            max={elements.length-1}
            extraClass={styles.input_index}
            onChange={handleInputIndex}
            value={inputIndex}
          />
          <Button
            text="Добавить по индексу"
            extraClass={`${styles.btn_add_ind}`}
            onClick={handleAddIndex}
            isLoader={isWorking.removeTail}
            disabled={(!inputValue && !inputIndex) || isInactive.addIndex}
          />
          <Button
            text="Удалить по индексу"
            extraClass={`${styles.btn_remove_ind}`}
            onClick={handleRemoveIndex}
            isLoader={isWorking.removeTail}
            disabled={(!inputValue && !inputIndex) || isInactive.removeIndex}
          />
        </form>

        <div className={styles.circles}>
          {elements.map((element, index, arr) => {
            return (
              <React.Fragment key={index}>
                <div className={styles.list_container}>
                  {index === topCircleIndex && (
                    <Circle
                      extraClass={styles.topCircle}
                      letter={topCircleLetter}
                      isSmall={true}
                      state={ElementStates.Changing}
                    />
                  )}
                  <Circle
                    letter={element}
                    index={index}
                    head={index === 0 && topCircleIndex ? "head" : ""}
                    tail={arr.length - 1 === index && !bottomCircleLetter ? "tail" : ""}
                    state={getCircleState(index, modifiedIndex, changedIndexes)}
                  />
                  {index === bottomCircleIndex && (
                    <Circle
                      extraClass={styles.bottomCircle}
                      letter={bottomCircleLetter}
                      isSmall={true}
                      state={ElementStates.Changing}
                    />
                  )}
                </div>
                {arr.length - 1 !== index && <ArrowIcon />}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </SolutionLayout>
  );
};
