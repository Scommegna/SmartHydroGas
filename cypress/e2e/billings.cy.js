import "cypress-file-upload";

//Testes da página de faturas
describe("Pagina de faturas", () => {
  beforeEach(() => {
    cy.visit("/login");
    cy.wait(1000);
    cy.get('input[type="email"]').type("lucas@email.com");
    cy.wait(1000);
    cy.get('input[type="password"]').type("mudar123");
    cy.wait(1000);
    cy.get('button[type="submit"]').click();
    cy.wait(1000);
    cy.visit("/main");
    cy.visit("/faturas");
  });

  //   it("Deve ser possível gerar uma nova fatura", () => {
  //     cy.wait(5000);
  //     cy.get("button[class='new-fatura-button']").click();
  //     cy.wait(5000);
  //     cy.get('input[name="measureType"][value="WATER"]').check();
  //     cy.wait(5000);
  //     cy.get('input[type="file"]').attachFile("medidor.jpeg");
  //     cy.wait(5000);
  //     cy.get("button[class='submit']").click();
  //     cy.wait(5000);
  //     cy.on("window:alert", (alertText) => {
  //         expect(alertText).to.equal("Fatura criada com sucesso!");
  //     });
  //   });

  it("Deve ser possível para o usuário enviar uma prova de pagamento", () => {
    cy.wait(5000);
    cy.get("button[class='fatura-action-button upload-button']")
      .first()
      .click({ force: true });
    cy.wait(5000);
    cy.get('input[type="file"]').attachFile("exemplo-prova.1.png");
    cy.wait(5000);
    cy.get("button[class='send']").click();
    cy.wait(5000);
    cy.on("window:alert", (alertText) => {
      expect(alertText).to.equal("Comprovante enviado com sucesso!");
    });
  });
});
