describe("routing tests", () => {
  before(() => {
    cy.visit("/");
  });

  it("should open /recursion page", () => {
    cy.visit("recursion");
    cy.contains("Строка");
  });

  it("should open /fibonacci page", () => {
    cy.visit("fibonacci");
    cy.contains("Последовательность Фибоначчи");
  });

  it("should open /sorting page", () => {
    cy.visit("sorting");
    cy.contains("Сортировка массива");
  });

  it("should open /stack page", () => {
    cy.visit("stack");
    cy.contains("Стек");
  });

  it("should open /queue page", () => {
    cy.visit("queue");
    cy.contains("Очередь");
  });

  it("should open /list page", () => {
    cy.visit("list");
    cy.contains("Связный список");
  });
});
