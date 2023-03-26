import {
  borderStyle,
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
  indInput
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
        cy.wrap($element).find(circle).find(circleLetter).should("have.text", values[index]);
        cy.wrap($element).find(circle).should("have.css", "border", borderStyle.default);
      });
  });

  
});