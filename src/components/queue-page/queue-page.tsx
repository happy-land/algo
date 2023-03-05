import React, { FormEvent, MouseEvent, ChangeEvent, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";

import styles from "./queue-page.module.css";

export const QueuePage: React.FC = () => {
  const [inputString, setInputString] = useState<string>("");
  const [isWorking, setIsWorking] = useState({
    addBtn: false,
    removeBtn: false,
    resetBtn: false,
  });

  return (
    <SolutionLayout title="Очередь">

    </SolutionLayout>
  );
};
