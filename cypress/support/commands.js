Cypress.Commands.add("fillMandatoryFieldsAndSubmit", () => {
  cy.get("#firstName").type("Paulo");
  cy.get("#lastName").type("Moutinho");
  cy.get("#email").type("paulo_vicali@icloud.com");
  cy.get("#phone").type("965353340");
  cy.get("#open-text-area").type("Testando comando customizado");
  cy.contains("button", "Enviar").click();
});
