import { circle, circles, submitButton } from "./constants";
import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";

describe("Fibonacci tests", () => {
  it("should button be disabled while input is empty", () => {
    cy.visit("fibonacci");
    cy.contains("Последовательность Фибоначчи");
    cy.get("input");
    cy.get(submitButton).should("be.disabled");

    cy.get("input").type("3");
    cy.get(submitButton).should("be.enabled");

    cy.get(submitButton).click();
  });

  it("should generate numbers as expected", () => {
    cy.clock();
    cy.visit("fibonacci");

    const fiboArray = [1, 1, 2, 3];

    cy.get("input").type("3");
    cy.get(submitButton).click();

    // just after click
    cy.get(circles).find(circle).its("length").should("eq", 1);
    cy.get(circles).find(circle).should("have.text", "1");


    cy.tick(SHORT_DELAY_IN_MS);
    cy.get(circle).each((element, index) => {
      cy.wrap(element).contains(fiboArray[index]);
    });

    cy.tick(SHORT_DELAY_IN_MS);
    cy.tick(SHORT_DELAY_IN_MS);
    cy.tick(SHORT_DELAY_IN_MS);

    cy.get(circle).each((element, index) => {
      cy.wrap(element).contains(fiboArray[index]);
    });
  });
});
