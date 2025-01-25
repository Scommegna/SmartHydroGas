// Teste da pagina de login
describe("Pagina de login", () => {
  beforeEach(() => {
    cy.visit("/login");
  });

  it("Deve fazer login com credenciais válidas", () => {
    cy.wait(1000);
    cy.get('input[type="email"]').type("user@email.com");
    cy.wait(1000);
    cy.get('input[type="password"]').type("mudar123");
    cy.wait(1000);
    cy.get('button[type="submit"]').click();
    cy.wait(1000);

    cy.url().should("include", "/main");
  });

  it("Deve exibir erro com credenciais inválidas", () => {
    cy.wait(1000);
    cy.get('input[type="email"]').type("usuarioerrado@exemplo.com");
    cy.wait(1000);
    cy.get('input[type="password"]').type("senhaErrada");
    cy.wait(1000);
    cy.get('button[type="submit"]').click();
    cy.wait(1000);

    cy.contains("Falha ao fazer login, tente novamente.").should("be.visible");
  });

  it("Deve redirecionar o usuário não autenticado para a página de login", () => {
    cy.visit("/main");
    cy.url().should("include", "/login");
    cy.visit("/admin");
    cy.url().should("include", "/login");
    cy.visit("/profile");
    cy.url().should("include", "/login");
    cy.visit("/faturas");
    cy.url().should("include", "/login");
  });
});
