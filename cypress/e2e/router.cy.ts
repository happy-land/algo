describe("routing tests", () => {
  before(() => {
    cy.visit("http://localhost:3000");
  });

  it("should open /recursion page", () => {
    cy.visit("http://localhost:3000/recursion");
    cy.contains("Строка");
  });

  it("should open /fibonacci page", () => {
    cy.visit("http://localhost:3000/fibonacci");
    cy.contains("Последовательность Фибоначчи");
  });

  it("should open /sorting page", () => {
    cy.visit("http://localhost:3000/sorting");
    cy.contains("Сортировка массива");
  });

  it("should open /stack page", () => {
    cy.visit("http://localhost:3000/stack");
    cy.contains("Стек");
  });

  it("should open /queue page", () => {
    cy.visit("http://localhost:3000/queue");
    cy.contains("Очередь");
  });

  it("should open /list page", () => {
    cy.visit("http://localhost:3000/list");
    cy.contains("Связный список");
  });
});
