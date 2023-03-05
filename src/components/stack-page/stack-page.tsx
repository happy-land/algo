import React, { FormEvent, ChangeEvent, useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";

import styles from "./stack-page.module.css";

export const StackPage: React.FC = () => {

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  }

  return (
    <SolutionLayout title="Стек">
      <div className={styles.container}>
        <form className={styles.form} onSubmit={handleSubmit}>

        </form>
      </div>
    </SolutionLayout>
  );
};
