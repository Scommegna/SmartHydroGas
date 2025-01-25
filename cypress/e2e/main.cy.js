//Testes da página main
describe("Pagina principal do usuário comum", () => {
  beforeEach(() => {
    cy.visit("/login");
    cy.wait(1000);
    cy.get('input[type="email"]').type("user@email.com");
    cy.wait(1000);
    cy.get('input[type="password"]').type("mudar123");
    cy.wait(1000);
    cy.get('button[type="submit"]').click();
    cy.wait(1000);
    cy.visit("/main");
  });

  it("Deve acessar a página de editar perfil com sucesso.", () => {
    cy.wait(5000);
    cy.get("#profile").click();
    cy.wait(5000);
    cy.intercept("GET", "localhost:80/api/profile");
  });

  it("Deve ser capaz de acessar a página de faturas", () => {
    cy.wait(5000);
    cy.get("#faturas").click();
    cy.wait(5000);
    cy.url().should("include", "/faturas");
  });

  it("Deve ser possível fazer logout com o usuário logado", () => {
    cy.wait(5000);
    cy.get('button[class="user-icon"]').click();
    cy.wait(5000);
    cy.url().should("include", "/login");
  });
});
