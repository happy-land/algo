import { ElementStates } from "../../types/element-states";

// export const getCircleState = (
//   index: number,
//   modifiedIndexes: number[],
//   changedIndexes: number[]
// ): ElementStates => {
//   if (modifiedIndexes.includes(index)) return ElementStates.Modified;
//   if (changedIndexes.includes(index)) return ElementStates.Changing;
//   return ElementStates.Default;
// };

export const getCircleState = (
  index: number,
  modifiedIndex: number,
  changedIndexes: number[]
): ElementStates => {
  if (modifiedIndex === index) return ElementStates.Modified;
  if (changedIndexes.includes(index)) return ElementStates.Changing;
  return ElementStates.Default;
};
