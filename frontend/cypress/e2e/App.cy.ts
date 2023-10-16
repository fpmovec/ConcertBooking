describe("App E2E", () => {
  it("should have a form", () => {
    cy.visit("/");
    cy.get("input").should("have.value", "");
    cy.get("button").should("have.text", "Search");
  });

  it("should search a classic concert", () => {
    cy.visit("/");
    cy.get("input[type=text]")
      .type("Test_Classic")
      .should("have.value", "Test_Classic");
    cy.contains("Search").click();

    cy.get("ul li:first-of-type div div:first-of-type a").should(
      "have.text",
      "Test_Classic"
    );
  });

  it("shold search a party", () => {
    cy.visit("/");
    cy.get("input[type=text]")
      .type("Test_Party")
      .should("have.value", "Test_Party");
    cy.contains("Search").click();

    cy.get("ul li:first-of-type div div:first-of-type a").should(
      "have.text",
      "Test_Party"
    );
  });

  it("should search an openAir", () => {
    cy.visit("/");
    cy.get("input[type=text]")
      .type("Test_OpenAir")
      .should("have.value", "Test_OpenAir");
    cy.contains("Search").click();

    cy.get("ul li:first-of-type div div:first-of-type a").should(
      "have.text",
      "Test_OpenAir"
    );
  });

  it("should get the concert information", () => {
    cy.visit("/");
    cy.get("ul:first-of-type li:first-of-type div div:first-of-type a").click();
    cy.get("ymaps:first-of-type");
  });

  it("should have 404 Error", () => {
    cy.visit("/centaurea");
    cy.get("div div:last-of-type div:first-of-type").should("have.text", "404");
  });

  it("should back home", () => {
    cy.visit("/centaurea");
    cy.get("a._title_11j5d_81").click();
    cy.url().should("eq", "http://localhost:5173/");
  });

  it("should have 403", () => {
    cy.visit("/").visit("/admin");
    cy.get("div div:last-of-type div:first-of-type").should("have.text", "403");
  });
});
