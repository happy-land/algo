import { ChangeEvent, useState } from "react";
import { TInput } from "../types/types";

export function useForm(inputValues: TInput) {
  const [values, setValues] = useState(inputValues);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const {value, name} = event.target;
    setValues({...values, [name]: value});
  };
  return {values, handleChange, setValues};
}