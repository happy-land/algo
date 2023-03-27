import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import renderer from "react-test-renderer";
import { Button } from "./button";

describe("BUTTON UI COMPONENT TEST", () => {
  test("button with text", () => {
    const buttonWithText = renderer.create(<Button text="Развернуть" />);
    expect(buttonWithText).toMatchSnapshot();
  });

  test("button without text", () => {
    const buttonWithoutText = renderer.create(<Button />);
    expect(buttonWithoutText).toMatchSnapshot();
  });

  test("disabled button", () => {
    const buttonDisabled = renderer.create(<Button disabled />);
    expect(buttonDisabled).toMatchSnapshot();
  });

  test("button with loader", () => {
    const buttonWithLoader = renderer.create(<Button isLoader />);
    expect(buttonWithLoader).toMatchSnapshot();
  });

  test("button click", () => {
    const handleMockClick = jest.fn();
    render(<Button onClick={handleMockClick} text="Click me" />);
    const button = screen.getByText(/click me/i);
    fireEvent.click(button);
    expect(handleMockClick).toHaveBeenCalled();
  });
});
