import { borderStyle, circle, circleLetter, circles, submitButton } from "./constants";

describe("String tests", function () {
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
    // cy.get(circleLetter).first().should("have.text", "q");
    // cy.get(circleLetter).eq(1).should("have.text", "w");
    // cy.get(circleLetter).eq(2).should("have.text", "e");
    // cy.get(circleLetter).last().should("have.text", "r");

    cy.get(circleLetter).eq(0).should("have.text", "q");
    cy.get(circleLetter).eq(1).should("have.text", "w");
    cy.get(circleLetter).eq(2).should("have.text", "e");
    cy.get(circleLetter).eq(3).should("have.text", "r");

    // check styles
    // cy.get(circle).eq(0).should("have.css", "border", borderStyle.changing);
    // cy.get(circle).eq(1).should("have.css", "border", borderStyle.default);
    // cy.get(circle).eq(2).should("have.css", "border", borderStyle.default);
    // cy.get(circle).eq(3).should("have.css", "border", borderStyle.changing);

    cy.tick(1000);
    // check letters
    cy.get(circleLetter).eq(0).should("have.text", "r");
    cy.get(circleLetter).eq(1).should("have.text", "w");
    cy.get(circleLetter).eq(2).should("have.text", "e");
    cy.get(circleLetter).eq(3).should("have.text", "q");

    // check styles
    // cy.get(circle).eq(0).should("have.css", "border", borderStyle.modified);
    // cy.get(circle).eq(1).should("have.css", "border", borderStyle.changing);
    // cy.get(circle).eq(2).should("have.css", "border", borderStyle.changing);
    // cy.get(circle).eq(3).should("have.css", "border", borderStyle.modified);

    cy.tick(1000);
    // check letters
    cy.get(circleLetter).eq(0).should("have.text", "r");
    cy.get(circleLetter).eq(1).should("have.text", "e");
    cy.get(circleLetter).eq(2).should("have.text", "w");
    cy.get(circleLetter).eq(3).should("have.text", "q");


  });
});
