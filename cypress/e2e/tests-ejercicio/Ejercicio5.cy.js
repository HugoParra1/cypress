describe("Ejercicio 5", () => {
    const baseUrl = "https://www.saucedemo.com/"
    beforeEach(() => {
        cy.visit(baseUrl)
    })
    it("a)", () => {
        cy.url().should("eq", baseUrl)
        cy.title().should("eq", "Swag Labs")
    })

    it("b)", () => {
        cy.get("#user-name").type("standard_user")
        cy.get("#password").type("secret_sauce")
        cy.get("#login-button").click()
        cy.url().should("eq", baseUrl + "inventory.html")
        cy.title().should("eq", "Swag Labs")
    })

    it("c)", () => {
        cy.get("#user-name").type("credencial_invalida")
        cy.get("#password").type("credencial_invalida")
        cy.get("#login-button").click()
        cy.get('[data-test="error"]')
     
    })
})