/// <reference types="Cypress" />
import { mockText } from "../../src/mock";

describe("Central de atendetimento ao Cliente", () => {
  beforeEach(() => {
    // antes de cada teste ser executado, o beforeEach visita a página testada

    cy.visit('./src/index.html');
  });

  it("verifica o título da aplicação", () => {
    cy.title().should("contain", "Central de Atendimento ao Cliente TAT");
    cy.get("h1").should("contain", "CAC TAT");
  });

  it("deve preencher os capmos obrigatórios e enviar formulário", () => {
    cy.get('#firstName').type("Paulo");
    cy.get('#lastName').type("Moutinho");
    cy.get('#email').type("paulo_vicali@icloud.com");
    cy.get('#phone').type("965353340");
    cy.get('#open-text-area').type(mockText.text, { delay: 0 });
    cy.get("button[type='submit']").click();
    cy.get(".success").should("be.visible");
  });

  it("deve exibir mensagem de erro", () => {
    cy.get('#firstName').type("Paulo");
    cy.get('#lastName').type("Moutinho");
    cy.get('#email').type("paulo_vicali@icloud,com");
    cy.get('#phone').type("965353340");
    cy.get('#open-text-area').type(mockText.textError);
    cy.get("button[type='submit']").click();
    cy.get(".error").should("be.visible");
  })
})