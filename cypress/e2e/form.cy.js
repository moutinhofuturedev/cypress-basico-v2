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
    cy.contains("button", "Enviar").click();
    cy.get(".success").should("be.visible");
  });

  it("deve exibir mensagem de erro", () => {
    cy.get('#firstName').type("Paulo");
    cy.get('#lastName').type("Moutinho");
    cy.get('#email').type("paulo_vicali@icloud,com");
    cy.get('#phone').type("965353340");
    cy.get('#open-text-area').type(mockText.textError);
    cy.contains("button", "Enviar").click();
    cy.get(".error").should("be.visible");
  });

  it("deve verificar se campo numérico esta sendo preenchido com letras", () => {
    cy.get("#phone").type("asdfgh").should("have.value", "")
  });

  it("deve exibir mensagem quando campo de telefone for obrigatório", () => {
    cy.get('#firstName').type("Paulo");
    cy.get('#lastName').type("Moutinho");
    cy.get('#email').type("paulo_vicali@icloud.com");
    cy.get('#phone-checkbox').click()
    cy.get('#open-text-area').type(mockText.textError);
    cy.contains("button", "Enviar").click();
    cy.get(".error").should("be.visible");
  });

  it("preenche e limpa campos obrigatórios", () => {
    cy.get('#firstName').type("Paulo").should("have.value", "Paulo").clear().should("have.value", "");
    cy.get('#lastName').type("Moutinho").should("have.value", "Moutinho").clear().should("have.value", "");
    cy.get('#email').type("paulo_vicali@icloud.com").should("have.value", "paulo_vicali@icloud.com").clear().should("have.value", "");
    cy.get("#phone").type("123456").should("have.value", "123456").clear().should("have.value", "");
  });

  it("deve exibir mensagem de erro ao tentar enviar sem preencher campos", () => {
    cy.contains("button", "Enviar").click();
    cy.get(".error").should("be.visible");
  });

  it("deve enviar o formulário com sucesso usando um comando customizado", () => {
    cy.fillMandatoryFieldsAndSubmit("Paulo", "Moutinho", "paulo_vicpj@hotmail.com", "965353340", "Testando 1234")
    cy.get(".success").should("be.visible");
  })
});