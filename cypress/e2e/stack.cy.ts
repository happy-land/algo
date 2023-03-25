import {
  borderStyle,
  circle,
  circles,
  addButton,
  removeButton,
  resetButton,
} from "./constants";
import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";

describe("Fibonacci tests", () => {
  beforeEach(() => {
    cy.viewport(1200, 660);
  });
  it("should button be disabled while input is empty", () => {
    cy.visit("http://localhost:3000/stack");
    cy.contains("Стек");
    cy.get("input");
    cy.get(addButton).should("be.disabled");

    cy.get("input").type("12");
    cy.get(addButton).should("be.enabled");
  });

  it("should add element to the stack correctly", () => {
    cy.clock();
    cy.visit("http://localhost:3000/stack");

    cy.get("input").type("12");
    cy.get(addButton).click();

    cy.get(circles).find(circle).should("have.text", "12");

    //check circle color
    cy.get(circles).find(circle).should("have.css", "border", borderStyle.changing);

    cy.tick(SHORT_DELAY_IN_MS);
    cy.get(circles).find(circle).should("have.css", "border", borderStyle.default);

    cy.get("input").type("34");
    cy.get(addButton).click();

    cy.get(circle).each((element, index) => {
      if (index === 0) {
        cy.wrap(element).should("have.css", "border", borderStyle.default);
      }
      if (index === 1) {
        cy.wrap(element).should("have.css", "border", borderStyle.changing);
      }
    });
  });

  it("should remove element from the stack correctly", () => {
    cy.clock();
    cy.visit("http://localhost:3000/stack");
    cy.get("input").type("342");
    cy.get(addButton).click();
    cy.tick(SHORT_DELAY_IN_MS);

    cy.get(circles).find(circle).should("have.text", "342");
    cy.get(circles).find(circle).should("have.css", "border", borderStyle.default);

    cy.get(removeButton).click();
    cy.get(circles).find(circle).should("have.css", "border", borderStyle.changing);

    cy.tick(SHORT_DELAY_IN_MS);

    cy.get(circles).find(circle).should("not.exist");
  });

  it("should reset button work as expected", () => {
    cy.clock();
    cy.visit("http://localhost:3000/stack");

    cy.get("input").type("1");
    cy.get(addButton).click();
    cy.tick(SHORT_DELAY_IN_MS);

    cy.get("input").type("2");
    cy.get(addButton).click();
    cy.tick(SHORT_DELAY_IN_MS);

    cy.get("input").type("3");
    cy.get(addButton).click();
    cy.tick(SHORT_DELAY_IN_MS);

    cy.get(circles).find(circle).its("length").should("eq", 3);

    cy.get(resetButton).click();
    cy.get(circles).find(circle).should("not.exist");
  });

});
