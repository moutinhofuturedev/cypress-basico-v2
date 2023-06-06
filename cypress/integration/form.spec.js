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
    cy.get('#phone-checkbox').check().should("be.checked");
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
    cy.get('#phone-checkbox').check()
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

  // comando customizado
  it("deve enviar o formulário com sucesso usando um comando customizado", () => {
    cy.fillMandatoryFieldsAndSubmit("Ian", "Gomes", "gomes_broche@gmail.com", "987876543", "Testando");
    cy.get(".success").should("be.visible");
  });

  // type select
  it("selecione um produto ( Youtube ) por seu texto", () => {
    cy.get('#product').select("YouTube").should("have.value", "youtube");
  });

  it("selecione um produto ( Mentoria ) pelo seu valor", () => {
    const mentoring = "mentoria";
    cy.get('#product').select(mentoring).should("have.value", mentoring);
  });

  it("selecione um produto ( blog ) por seu índice", () => {
    cy.get('#product').select(1).should("have.value", "blog");
  });

  // type radio
  it("marca o tipo de atendimento ( Feedback )", () => {
    cy.get("input[type='radio'][value='feedback']").check().should("have.value", "feedback");
  });

  it("marca cada tipo de atendimento", () => {
    cy.get("input[type='radio']").should("have.length", 3).each((radio) => {
      cy.wrap(radio).check();
      cy.wrap(radio).should("be.checked");
    });
  });

  // type check
  it("marca ambos os checkboxes, depois desmarca o último", () => {
    cy.get("input[type='checkbox']").check().should("be.checked").first().uncheck().should("not.be.checked");
  });

  // type file
  it("deve selecionar um arquivo de pasta", () => {
    cy.get("input[type='file']").should("not.have.value").selectFile("cypress/fixtures/example.json").should((input) => {
      expect(input[0].files[0].name).equal("example.json");
    });
  });

  // type file - usando o efeito "drag-and-drop", arrasta arquivo e solta
  it("deve selecionar um arquivo usando drag-and-drop", () => {
    cy.get("input[type='file']").should("not.have.value").selectFile("cypress/fixtures/example.json", { action: "drag-drop" }).should((input) => {
      expect(input[0].files[0].name).equal("example.json");
    });
  });

  // links
  it("deve verificar link que abre em outra aba a política de privacidade sem necessidade de click", () => {
    cy.get("#privacy a").should("have.attr", "target", "_blank")
  });

  it("deve verificar link que abre em outra aba a política de privacidade removendo o target", () => {
    cy.get("#privacy a").invoke("removeAttr", "target").click();

    cy.contains("Talking About Testing").should("be.visible");
  });

  // time of message
  it("deve exibir a mensagem por três segundos", () => {
    cy.clock()

    cy.fillMandatoryFieldsAndSubmit("Ricardo", "Mendes", "mendes_broche@gmail.com", "911223344", "Receba meu email");
    cy.get(".success").should("be.visible");

    cy.tick(3000);

    cy.get(".success").should("not.be.visible");
  });
});