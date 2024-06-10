const loginPage = require("../../pages/saucedemo/login");

describe("Login", () => {
    const usernames = [
        "problem_user",
        "performance_glitch_user",
        "error_user",
        "visual_user"
    ];

    beforeEach(() => {
        cy.visit("/")
    })
    it("Check Login", () => {
        cy.url().should("eq", "https://www.saucedemo.com/")
        cy.title().should("eq", "Swag Labs")
    })

    it("Login with valid credentials", () => {
        loginPage.login("standard_user", "secret_sauce")
        cy.url().should("contain", "/inventory.html")
        cy.title().should("eq", "Swag Labs")
    })

    it("Login with invalid credentials", () => {
        loginPage.login("Invalid", "Invalid")
        loginPage.getErrorMessage().should("exist")
        loginPage.getErrorMessage().should("have.text", "Epic sadface: Username and password do not match any user in this service")
        cy.url().should("eq", "https://www.saucedemo.com/")
    })

    it('Login without credentials', () => {
        loginPage.clickLogin()
        loginPage.getErrorMessage().should("exist")
        loginPage.getErrorMessage().should("have.text", "Epic sadface: Username is required")
        cy.url().should("eq", "https://www.saucedemo.com/")
    });

    it('Login without username', () => {
        loginPage.typePassword("Invalid")
            .clickLogin()
        loginPage.getErrorMessage().should("exist")
        loginPage.getErrorMessage().should("have.text", "Epic sadface: Username is required")
        cy.url().should("eq", "https://www.saucedemo.com/")
    });

    it('Login without password', () => {
        loginPage.typeUsername("Invalid")
            .clickLogin()
        loginPage.getErrorMessage().should("exist")
        loginPage.getErrorMessage().should("have.text", "Epic sadface: Password is required")
        cy.url().should("eq", "https://www.saucedemo.com/")
    });

    // Test every credential
    usernames.forEach((username) => {
        it('Login with all the credentials user: ' + username, () => {
            loginPage.login(username, "secret_sauce")
            cy.url().should("contain", "/inventory.html")
            cy.title().should("eq", "Swag Labs")
        });
    })

    it('Login with locked out user', () => {
        loginPage.login("locked_out_user", "secret_sauce")
        loginPage.getErrorMessage().should("exist")
        loginPage.getErrorMessage().should("have.text", "Epic sadface: Sorry, this user has been locked out.")
        cy.url().should("eq", "https://www.saucedemo.com/")
    });

})