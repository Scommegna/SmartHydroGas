//Testes da página de editar perfil
describe("Pagina de editar perfil", () => {
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
    cy.visit("/profile");
  });

  it("Deve ser possível editar o nome do perfil", () => {
    cy.wait(5000);
    cy.get("button[class='btn btn-warning']").click();
    cy.wait(5000);
    cy.get('input[id="name"]').clear().type("Nome modificado");
    cy.wait(5000);
    cy.get("button[class='btn btn-success']").click();
    cy.wait(5000);
    cy.contains("Nome modificado").should("be.visible");
  });

  //   it("Deve ser possível editar o email do perfil", () => {
  //     cy.wait(5000);
  //     cy.get("button[class='btn btn-warning']").click();
  //     cy.wait(5000);
  //     cy.get('input[id="email"]').clear().type("email2@email.com");
  //     cy.wait(5000);
  //     cy.get("button[class='btn btn-success']").click();
  //     cy.wait(5000);
  //     cy.contains("email2@email.com").should("be.visible");
  //   });

  //   it("Deve ser possível editar o endereço do perfil", () => {
  //     cy.wait(5000);
  //     cy.get("button[class='btn btn-warning']").click();
  //     cy.wait(5000);
  //     cy.get('input[id="address"]').clear().type("Endereço novo");
  //     cy.wait(5000);
  //     cy.get("button[class='btn btn-success']").click();
  //     cy.wait(5000);
  //     cy.contains("Endereço novo").should("be.visible");
  //   });
});
