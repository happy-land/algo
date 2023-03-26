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
});