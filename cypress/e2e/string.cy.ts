import { submitButton } from "./constants";

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

  it("should button be disabled while input is empty", function () {
    
    cy.visit("http://localhost:3000/recursion");
    
    cy.get("input").type("qwer");
    cy.get(submitButton).click();
    
  });
});
