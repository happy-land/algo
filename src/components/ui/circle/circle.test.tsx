import { render } from "@testing-library/react";
import renderer from "react-test-renderer";
import { ElementStates } from "../../../types/element-states";
import { Circle } from "./circle";

describe("CIRCLE UI COMPONENT TEST", () => {
  test("Circle without letter", () => {
    const circleWithoutLetter = renderer.create(<Circle />);
    expect(circleWithoutLetter).toMatchSnapshot();
  });

  test("Circle with letter", () => {
    const circleWithLetter = renderer.create(<Circle letter="q" />);
    expect(circleWithLetter).toMatchSnapshot();
  });

  test("Circle with head", () => {
    const container = render(<Circle head="asd" />);
    const circleWithHead = container.getByText("asd");
    expect(circleWithHead.textContent).toEqual("asd");
    expect(container).toMatchSnapshot();
  });

  test("Circle with react element in head", () => {
    const circleWithReactEl = renderer.create(<Circle head={<Circle />} />);
    expect(circleWithReactEl).toMatchSnapshot();
  });

  test("Circle with tail", () => {
    const circleWithTail = renderer.create(<Circle tail="tail" />);
    expect(circleWithTail).toMatchSnapshot();
  });

  test("Circle with react element in tail", () => {
    const circleWithReactEl = renderer.create(<Circle tail={<Circle />} />);
    expect(circleWithReactEl).toMatchSnapshot();
  });

  test("Circle with index", () => {
    const circleWithIndex = renderer.create(<Circle index={4} />);
    expect(circleWithIndex).toMatchSnapshot();
  });

  test("Circle with isSmall props", () => {
    const circleSmall = renderer.create(<Circle isSmall />);
    expect(circleSmall).toMatchSnapshot();
  });

  test("Circle with Default state", () => {
    const circleDefault = renderer.create(<Circle state={ElementStates.Default} />);
    expect(circleDefault).toMatchSnapshot();
  });

  test("Circle with Changing state", () => {
    const circleChanging = renderer.create(<Circle state={ElementStates.Changing} />);
    expect(circleChanging).toMatchSnapshot();
  });

  test("Circle with Modified state", () => {
    const circleModified = renderer.create(<Circle state={ElementStates.Modified} />);
    expect(circleModified).toMatchSnapshot();
  });
});
