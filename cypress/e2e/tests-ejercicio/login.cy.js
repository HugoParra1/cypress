const LoginPage = require("../../pages/saucedemo/login");

describe("Login", () => {
    it("Check Login", () => {
        cy.visit("/")
        cy.url().should("eq", "https://www.saucedemo.com/")
        cy.title().should("eq", "Swag Labs")
    })

    it("Login with valid credentials", () => {
        cy.login("standard_user", "secret_sauce")
        cy.url().should("contain",  "/inventory.html")
        cy.title().should("eq", "Swag Labs")
    })

    it("Login with invalid credentials", () => {
        cy.login("invalid", "invalid")
        cy.get('[data-test="error"]')
        cy.url().should("eq", "https://www.saucedemo.com/")
    })
})