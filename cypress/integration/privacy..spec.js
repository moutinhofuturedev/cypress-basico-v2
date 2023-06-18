// Load dash ( executa o teste três vezes )
Cypress._.times(3, () => {
  it("deve visitar página de privacidade de forma independente", () => {
    cy.visit("./src/privacy.html");

    cy.contains("CAC TAT - Política de privacidade").should("be.visible");
  });
});
