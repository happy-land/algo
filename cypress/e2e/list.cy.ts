import {
  borderStyle,
  circleContainer,
  circleWrapper,
  circle,
  circles,
  circleHead,
  circleLetter,
  circleTail,
  addHeadButton,
  addTailButton,
  removeHeadButton,
  removeTailButton,
  addIndButton,
  removeIndButton,
  valInput,
  indInput,
} from "./constants";
import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";

describe("List tests", () => {
  beforeEach(() => {
    cy.viewport(1200, 760);
  });

  it("should buttons: add, addByIndex, removeByIndex be disabled while input is empty", () => {
    cy.visit("http://localhost:3000/list");
    cy.contains("Связный список");
    cy.get(valInput);
    cy.get(indInput);

    cy.get(addHeadButton).should("be.disabled");
    cy.get(addTailButton).should("be.disabled");
    cy.get(addIndButton).should("be.disabled");
    cy.get(removeIndButton).should("be.disabled");
  });

  it("should default list render correctly", () => {
    cy.visit("http://localhost:3000/list");
    const values = ["1", "8", "34", "0"];
    cy.get(circleWrapper)
      .should("have.length", 4)
      .each(($element, index) => {
        cy.wrap($element)
          .find(circle)
          .find(circleLetter)
          .should("have.text", values[index]);
        cy.wrap($element).find(circle).should("have.css", "border", borderStyle.default);
      });
  });

  it("should add an element to the head correctly", () => {
    cy.visit("http://localhost:3000/list");
    cy.get(valInput).type("a");
    cy.get(addHeadButton).click();

    cy.get(circleWrapper)
      .eq(0)
      .should("have.text", "a");

    cy.get(circleWrapper)
      .find(circle)
      .eq(0)
      .should("have.css", "border", borderStyle.changing);

    cy.wait(500);
    cy.get(circleWrapper)
      .find(circleLetter)
      .eq(0)
      .should("have.text", "a");

    cy.get(circleWrapper)
      .find(circle)
      .eq(0)
      .should("have.css", "border", borderStyle.default);
  });

  it("should add an element to the tail correctly", () => {
    cy.visit("http://localhost:3000/list");

    cy.get(valInput).type("z");
    cy.get(addTailButton).click();

    cy.get(circleWrapper)
      .find(circleLetter)
      .eq(4)
      .should("have.text", "z");

  });

  it("should add an element by index correctly", () => {
    cy.visit("http://localhost:3000/list");
    cy.get(indInput).type("2");
    cy.get(valInput).type("a");
    cy.get(addIndButton).click();

    cy.get(circleContainer);

    cy.wait(500);
    cy.wait(500);
    cy.get(circleContainer);
    cy.get(circleWrapper)
      .eq(0)
      .should("have.text", "a");
    cy.wait(500);
    cy.get(circleWrapper)
      .eq(1)
      .should("have.text", "a");
    cy.wait(500);
    cy.get(circleWrapper)
      .eq(2)
      .should("have.text", "a");
    cy.wait(500);
    cy.get(circleWrapper)
      .eq(2)
      .find(circleLetter)
      .should("have.text", "a");
  });

  // it("should remove an element from the head correctly", () => {
  //   // cy.visit("http://localhost:3000/list");
  // });

  // it("should remove an element from the tail correctly", () => {
  //   // cy.visit("http://localhost:3000/list");
  // });

  // it("should remove an element by index correctly", () => {
  //   // cy.visit("http://localhost:3000/list");
  // });
});
