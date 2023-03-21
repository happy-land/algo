import { borderStyle, circle, circleLetter, circles, submitButton } from "./constants";

describe("Fibonacci tests", () => {
  it("should button be disabled while input is empty", () => {
    cy.visit("http://localhost:3000/fibonacci");
    cy.contains("Последовательность Фибоначчи");
    cy.get("input");
    cy.get(submitButton).should("be.disabled");

    cy.get("input").type("12");
    cy.get(submitButton).should("be.enabled");

    cy.get(submitButton).click();
  });
});