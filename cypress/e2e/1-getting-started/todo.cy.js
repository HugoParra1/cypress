describe("First test", () => {
  it("Test A", () => {
    cy.visit("https://demoblaze.com/index.html")
    cy.get("#login2").click()
    cy.url().should( "eq", "https://demoblaze.com/index.html")

    // cy.get("#loginusername").type("admin")
    // cy.get("#loginpassword").type("admin")
    // cy.get('#logInModal > .modal-dialog > .modal-content > .modal-footer > .btn-primary').click()
  })
})