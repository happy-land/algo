import { circle, circles, submitButton } from "./constants";
import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";

describe("Fibonacci tests", () => {
  it("should button be disabled while input is empty", () => {
    cy.visit("http://localhost:3000/fibonacci");
    cy.contains("Последовательность Фибоначчи");
    cy.get("input");
    cy.get(submitButton).should("be.disabled");

    cy.get("input").type("3");
    cy.get(submitButton).should("be.enabled");

    cy.get(submitButton).click();
  });
});