import {
  borderStyle,
  circleWrapper,
  circle,
  circles,
  circleHead,
  circleLetter,
  circleTail,
  addButton,
  removeButton,
  resetButton,
} from "./constants";
import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";

describe("Queue tests", () => {
  beforeEach(() => {
    cy.viewport(1200, 660);
  });

  it("should button be disabled while input is empty", () => {
    cy.viewport(1200, 660);
    cy.visit("http://localhost:3000/queue");
    cy.contains("Очередь");
    cy.get("input");
    cy.get(addButton).should("be.disabled");
    cy.get(removeButton).should("be.disabled");
    cy.get(resetButton).should("be.disabled");

    cy.get("input").type("12");
    cy.get(addButton).should("be.enabled");
  });

  it("should add an element to the queue correctly", () => {
    cy.clock();
    cy.visit("http://localhost:3000/queue");

    cy.get("input").type("abc");
    cy.get(addButton).click();

    cy.get(circles).find(circle).should("have.text", "abc");
    cy.get(circles).find(circleHead).should("have.text", "head");

    //check circle color
    cy.get(circles).find(circle).should("have.css", "border", borderStyle.changing);

    cy.tick(SHORT_DELAY_IN_MS);
    cy.get(circles).find(circle).should("have.css", "border", borderStyle.default);

    cy.get("input").type("def");
    cy.get(addButton).click();

    cy.get(circleWrapper)
      .should("have.length", 7)
      .each(($element, index) => {
        if (index === 0) {
          cy.wrap($element).find(circleHead).should("have.text", "head");
          cy.wrap($element).find(circle).find(circleLetter).should("have.text", "abc");
          cy.wrap($element)
            .find(circle)
            .should("have.css", "border", borderStyle.default);
          cy.wrap($element).find(circleTail).should("not.have.text", "tail");
        }
        if (index === 1) {
          cy.wrap($element).find(circleHead).should("not.have.text", "head");
          cy.wrap($element).find(circle).find(circleLetter).should("have.text", "def");
          cy.wrap($element)
            .find(circle)
            .should("have.css", "border", borderStyle.changing);
          cy.wrap($element).find(circleTail).should("have.text", "tail");
        }
      });
  });

  it("should remove an element from the queue correctly", () => {
    cy.clock();
    cy.visit("http://localhost:3000/queue");

    cy.get("input").type("123");
    cy.get(addButton).click();
    cy.tick(SHORT_DELAY_IN_MS);

    cy.get("input").type("456");
    cy.get(addButton).click();
    cy.tick(SHORT_DELAY_IN_MS);

    cy.get(removeButton).click();

    cy.get(circleWrapper)
      .should("have.length", 7)
      .each(($element, index) => {
        if (index === 0) {
          cy.wrap($element).find(circleHead).should("have.text", "head");
          cy.wrap($element).find(circle).find(circleLetter).should("have.text", "123");
          cy.wrap($element)
            .find(circle)
            .should("have.css", "border", borderStyle.changing);
          cy.wrap($element).find(circleTail).should("not.have.text", "tail");
        }
        if (index === 1) {
          cy.wrap($element).find(circleHead).should("not.have.text", "head");
          cy.wrap($element).find(circle).find(circleLetter).should("have.text", "456");
          cy.wrap($element)
            .find(circle)
            .should("have.css", "border", borderStyle.default);
          cy.wrap($element).find(circleTail).should("have.text", "tail");
        }
      });

    cy.tick(SHORT_DELAY_IN_MS);

    cy.get(circleWrapper)
      .should("have.length", 7)
      .each(($element, index) => {
        if (index === 0) {
          cy.wrap($element).find(circleHead).should("not.have.text", "head");
          cy.wrap($element).find(circle).find(circleLetter).should("have.text", "");
          cy.wrap($element)
            .find(circle)
            .should("have.css", "border", borderStyle.default);
          cy.wrap($element).find(circleTail).should("have.text", "");
        }
        if (index === 1) {
          cy.wrap($element).find(circleHead).should("have.text", "head");
          cy.wrap($element).find(circle).find(circleLetter).should("have.text", "456");
          cy.wrap($element)
            .find(circle)
            .should("have.css", "border", borderStyle.default);
          cy.wrap($element).find(circleTail).should("have.text", "tail");
        }
      });
  });

  it("should reset button work as expected", () => {
    cy.clock();
    cy.visit("http://localhost:3000/queue");

    cy.get("input").type("0");
    cy.get(addButton).click();
    cy.tick(SHORT_DELAY_IN_MS);

    cy.get("input").type("1");
    cy.get(addButton).click();
    cy.tick(SHORT_DELAY_IN_MS);

    cy.get("input").type("2");
    cy.get(addButton).click();
    cy.tick(SHORT_DELAY_IN_MS);

    cy.get(circleWrapper)
      .should("have.length", 7)
      .each(($element, index) => {
        if (index <= 2) {
          cy.wrap($element).find(circle).find(circleLetter).should("have.text", index);
        }
      });

    cy.get(resetButton).click();
    cy.get(circleWrapper)
      .should("have.length", 7)
      .each(($element, index) => {
        cy.wrap($element).find(circle).find(circleLetter).should("have.text", "");
      });
  });
});
