import { getSteps } from "../string/utils";

describe("STRING ALGORITHM", () => {
  test("test even четный", () => {
    expect(getSteps("qwer")).toEqual([
      { letters: ["q", "w", "e", "r"] },
      { letters: ["q", "w", "e", "r"], index: 0, state: "changing" },
      { letters: ["r", "w", "e", "q"], index: 0, state: "modified" },
      { letters: ["r", "w", "e", "q"], index: 1, state: "changing" },
      { letters: ["r", "e", "w", "q"], index: 1, state: "modified" },
      { letters: ["r", "e", "w", "q"] },
    ]);
  });

  test("test odd нечетный", () => {
    expect(getSteps("qwe")).toEqual([
      { letters: ["q", "w", "e"] },
      { letters: ["q", "w", "e"], index: 0, state: "changing" },
      { letters: ["e", "w", "q"], index: 0, state: "modified" },
      { letters: ["e", "w", "q"], index: 1, state: "changing" },
      { letters: ["e", "w", "q"], index: 1, state: "modified" },
      { letters: ["e", "w", "q"] },
    ]);
  });

  test("one letter", () => {
    expect(getSteps("a")).toEqual([
      { letters: ["a"] },
      { letters: ["a"], index: 0, state: "changing" },
      { letters: ["a"], index: 0, state: "modified" },
      { letters: ["a"] },
    ]);
  });

  test("empty string", () => {
    console.log(getSteps(""));
    expect(getSteps("")).toEqual([]);
  });
});
