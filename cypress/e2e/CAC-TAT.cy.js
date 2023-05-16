/// <reference types="Cypress" />

describe("Central de atendetimento ao Cliente", () => {
  it("verifica o título da aplicação", () => {
    cy.visit('./src/index.html');

    cy.title().should("contain", "Central de Atendimento ao Cliente TAT")
  })
})