import React, { FormEvent, ChangeEvent, useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";

import styles from "./stack-page.module.css";

export const StackPage: React.FC = () => {

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  }

  const handleReset = (event: FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsWorking(false);
    setInitArr(randomArr());
    setCurrentStep(null);
  };

  return (
    <SolutionLayout title="Стек">
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
            text="Добавить"
            extraClass={`${styles.button} ${styles.button_asc}`}
            type="submit"
            name="buttonAsc"
            isLoader={isWorking && sortDirection === Direction.Ascending}
            sorting={Direction.Ascending}
            disabled={isWorking}
          />
          <Button
            text="Удалить"
            extraClass={`${styles.button} ${styles.button_desc}`}
            type="submit"
            name="buttonDesc"
            isLoader={isWorking && sortDirection === Direction.Descending}
            sorting={Direction.Descending}
            disabled={isWorking}
          />
          <Button
            text="Очистить"
            extraClass={`${styles.button} ${styles.button_reset}`}
            type="reset"
            onClick={(e) => handleReset(e)}
            disabled={isWorking}
          />
        </form>
      </div>
    </SolutionLayout>
  );
};
