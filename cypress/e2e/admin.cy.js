//Testes da página de admin
describe("Pagina de administrador", () => {
  beforeEach(() => {
    cy.visit("/login");
    cy.wait(1000);
    cy.get('input[type="email"]').type("admin@email.com");
    cy.wait(1000);
    cy.get('input[type="password"]').type("mudar123");
    cy.wait(1000);
    cy.get('button[type="submit"]').click();
    cy.wait(1000);
    cy.visit("/admin");
  });

  it("Deve ser possível deslogar da página de admin", () => {
    cy.wait(5000);
    cy.get("button[class='btn btn-danger btn-lg shadow-lg']").click();
    cy.wait(5000);
    cy.url().should("include", "/login");
  });

  it("Deve ser possível dar baixa em fatura não paga.", () => {
    cy.wait(5000);
    cy.get("button[class='btn btn-outline-primary btn-lg']").click();
    cy.wait(5000);
    cy.get("button[class='btn btn-success ms-2']").first().click();
    cy.wait(5000);
    cy.on("window:alert", (alertText) => {
      expect(alertText).to.equal("Fatura marcada como paga!");
    });
  });

  it("Deve ser possível excluir um cliente.", () => {
    cy.wait(5000);
    cy.get("button[class='btn btn-success btn-lg shadow-lg']").click();
    cy.wait(5000);
    cy.get("button[class='custom-btn-danger']").first().click();
    cy.wait(5000);
    cy.on("window:alert", (alertText) => {
      expect(alertText).to.equal("Cliente excluído com sucesso!");
    });
  });

  it("Deve ser possível excluir um cliente.", () => {
    cy.wait(5000);
    cy.get("button[class='btn btn-info btn-lg shadow-lg']").click();
    cy.wait(5000);
    cy.intercept("GET", "http://localhost:80/api/billingsReportData");
  });
});
