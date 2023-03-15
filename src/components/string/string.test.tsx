import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter as Router } from "react-router-dom";
import { ElementStates } from "../../types/element-states";
import { getCircles, changeCircleState, swap } from "../string/utils";
import { Circle } from "../ui/circle/circle";
import { StringComponent } from "./string";

describe("STRING ALGORITHM", () => {
  test("test even четный", () => {
    // const { container } = render(
    //   <Router>
    //     <StringComponent />
    //   </Router>
    // );
    // const inputString = "asdf";
    // const input = screen.getByTestId("input-elem");
    // const reverseBtn = screen.getByTestId("button-elem");
    // userEvent.type(input, inputString);
    // expect(screen.queryByTestId("input-elem")).toContainHTML(inputString);

    // userEvent.click(reverseBtn);

    expect(getCircles("asdf")).toEqual([
      {
        letter: "a",
        state: ElementStates.Default,
      },
      {
        letter: "s",
        state: ElementStates.Default,
      },
      {
        letter: "d",
        state: ElementStates.Default,
      },
      {
        letter: "f",
        state: ElementStates.Default,
      },
    ]);

    expect(
      swap(
        [
          {
            letter: "a",
            state: ElementStates.Default,
          },
          {
            letter: "s",
            state: ElementStates.Default,
          },
        ],
        0,
        1
      )
    ).toEqual([
      {
        letter: "s",
        state: ElementStates.Default,
      },
      {
        letter: "a",
        state: ElementStates.Default,
      },
    ]);
  });

  test("test odd нечетный", () => {
    expect(
      swap(
        [
          {
            letter: "a",
            state: ElementStates.Default,
          },
          {
            letter: "s",
            state: ElementStates.Default,
          },
          {
            letter: "d",
            state: ElementStates.Default,
          },
        ],
        0,
        2
      )
    ).toEqual([
      {
        letter: "d",
        state: ElementStates.Default,
      },
      {
        letter: "s",
        state: ElementStates.Default,
      },
      {
        letter: "a",
        state: ElementStates.Default,
      },
    ]);
  });

  test("one letter", () => {
    expect(
      swap(
        [
          {
            letter: "a",
            state: ElementStates.Default,
          },
        ],
        0,
        0
      )
    ).toEqual([
      {
        letter: "a",
        state: ElementStates.Default,
      },
    ]);
  });

  test("empty string", () => {
    expect(swap([], 0, 0)).toEqual([]);
  });
});
