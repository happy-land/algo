import { borderStyle, circle, circleLetter, submitButton } from "./constants";

describe("String tests", function () {
  this.beforeEach(() => {
    cy.viewport(1200, 860);
  });

  it("should button be disabled while input is empty", function () {
    cy.visit("http://localhost:3000/recursion");
    cy.contains("Строка");
    cy.get("input");
    cy.get(submitButton).should("be.disabled");

    cy.get("input").type("qwerty");
    cy.get(submitButton).should("be.enabled");

    cy.get(submitButton).click();
  });

  it("should reverse string correctly", function () {
    cy.visit("http://localhost:3000/recursion");

    cy.clock();

    cy.get("input").type("qwer");
    cy.get(submitButton).click();

    // check letters
    cy.get(circleLetter).eq(0).should("have.text", "Q");
    cy.get(circleLetter).eq(1).should("have.text", "W");
    cy.get(circleLetter).eq(2).should("have.text", "E");
    cy.get(circleLetter).eq(3).should("have.text", "R");

    // check styles
    cy.get(circle).eq(0).should("have.css", "border", borderStyle.default);
    cy.get(circle).eq(1).should("have.css", "border", borderStyle.default);
    cy.get(circle).eq(2).should("have.css", "border", borderStyle.default);
    cy.get(circle).eq(3).should("have.css", "border", borderStyle.default);

    cy.tick(1000);

    cy.get(circle).eq(0).should("have.css", "border", borderStyle.changing);
    cy.get(circle).eq(1).should("have.css", "border", borderStyle.default);
    cy.get(circle).eq(2).should("have.css", "border", borderStyle.default);
    cy.get(circle).eq(3).should("have.css", "border", borderStyle.changing);

    cy.tick(1000);

    cy.tick(1000);

    cy.get(circleLetter).eq(0).should("have.text", "R");
    cy.get(circleLetter).eq(1).should("have.text", "W");
    cy.get(circleLetter).eq(2).should("have.text", "E");
    cy.get(circleLetter).eq(3).should("have.text", "Q");

    cy.get(circle).eq(0).should("have.css", "border", borderStyle.modified);
    cy.get(circle).eq(1).should("have.css", "border", borderStyle.default);
    cy.get(circle).eq(2).should("have.css", "border", borderStyle.default);
    cy.get(circle).eq(3).should("have.css", "border", borderStyle.modified);

    cy.tick(1000);

    cy.tick(1000);

    cy.get(circleLetter).eq(0).should("have.text", "R");
    cy.get(circleLetter).eq(1).should("have.text", "W");
    cy.get(circleLetter).eq(2).should("have.text", "E");
    cy.get(circleLetter).eq(3).should("have.text", "Q");

    cy.get(circle).eq(0).should("have.css", "border", borderStyle.default);
    cy.get(circle).eq(1).should("have.css", "border", borderStyle.changing);
    cy.get(circle).eq(2).should("have.css", "border", borderStyle.changing);
    cy.get(circle).eq(3).should("have.css", "border", borderStyle.default);

    cy.tick(1000);

    cy.tick(1000);

    cy.get(circleLetter).eq(0).should("have.text", "R");
    cy.get(circleLetter).eq(1).should("have.text", "E");
    cy.get(circleLetter).eq(2).should("have.text", "W");
    cy.get(circleLetter).eq(3).should("have.text", "Q");

    cy.get(circle).eq(0).should("have.css", "border", borderStyle.default);
    cy.get(circle).eq(1).should("have.css", "border", borderStyle.modified);
    cy.get(circle).eq(2).should("have.css", "border", borderStyle.modified);
    cy.get(circle).eq(3).should("have.css", "border", borderStyle.default);

    cy.tick(1000);

    cy.tick(1000);

    cy.get(circleLetter).eq(0).should("have.text", "R");
    cy.get(circleLetter).eq(1).should("have.text", "E");
    cy.get(circleLetter).eq(2).should("have.text", "W");
    cy.get(circleLetter).eq(3).should("have.text", "Q");

    cy.get(circle).eq(0).should("have.css", "border", borderStyle.default);
    cy.get(circle).eq(1).should("have.css", "border", borderStyle.default);
    cy.get(circle).eq(2).should("have.css", "border", borderStyle.default);
    cy.get(circle).eq(3).should("have.css", "border", borderStyle.default);
  });
});
