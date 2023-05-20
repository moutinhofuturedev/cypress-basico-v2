Cypress.Commands.add("fillMandatoryFieldsAndSubmit", (name, lastName, email, phone, textArea) => {
  cy.get("#firstName").type(name);
  cy.get("#lastName").type(lastName);
  cy.get("#email").type(email);
  cy.get("#phone").type(phone);
  cy.get("#open-text-area").type(textArea);
  cy.contains("button", "Enviar").click();
});
