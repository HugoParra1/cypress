const LoginPage = require("../../pages/saucedemo/login");

describe("Login", () => {
    const usernames = [
        "standard_user",
        "locked_out_user",
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
        // cy.login("standard_user", "secret_sauce")
        LoginPage.login("standard_user", "secret_sauce")
        cy.url().should("contain", "/inventory.html")
        cy.title().should("eq", "Swag Labs")
    })

    it("Login with invalid credentials", () => {
        LoginPage.login("Invalid", "Invalid")
        LoginPage.createErrorMessage().should("exist")
        LoginPage.createErrorMessage().should("have.text", "Epic sadface: Username and password do not match any user in this service")
        cy.url().should("eq", "https://www.saucedemo.com/")
    })

    it('Login without credentials', () => {
        LoginPage.clickLogin()
        LoginPage.createErrorMessage().should("exist")
        LoginPage.createErrorMessage().should("have.text", "Epic sadface: Username is required")
        cy.url().should("eq", "https://www.saucedemo.com/")
    });

    it('Login without username', () => {
        LoginPage.typePassword("Invalid")
        LoginPage.clickLogin()
        LoginPage.createErrorMessage().should("exist")
        LoginPage.createErrorMessage().should("have.text", "Epic sadface: Username is required")
        cy.url().should("eq", "https://www.saucedemo.com/")
    });

    it('Login without password', () => {
        LoginPage.typeUsername("Invalid")
        LoginPage.clickLogin()
        LoginPage.createErrorMessage().should("exist")
        LoginPage.createErrorMessage().should("have.text", "Epic sadface: Password is required")
        cy.url().should("eq", "https://www.saucedemo.com/")
    });

    // Test every credential
    usernames.forEach((username) => {
        if (username === "locked_out_user") {
            it('Login with all the credentials user: ' + username, () => {
                LoginPage.login(username, "secret_sauce")
                LoginPage.createErrorMessage().should("exist")
                LoginPage.createErrorMessage().should("have.text", "Epic sadface: Sorry, this user has been locked out.")
                cy.url().should("eq", "https://www.saucedemo.com/")

            });
        } else {
            it('Login with all the credentials user: ' + username, () => {
                LoginPage.login(username, "secret_sauce")
                cy.url().should("contain", "/inventory.html")
                cy.title().should("eq", "Swag Labs")

            });
        }

    })
    // Prueba que en cypress no funcion, en navegador normal si lo intentas te redirecciona a login, aqui te manda un 404
    // it('Go to the inventory without login', () => {
    //     cy.visit("https://www.saucedemo.com/inventory.html")
    //     LoginPage.createErrorMessage().should("exist")
    //     LoginPage.createErrorMessage().should("have.text", "Epic sadface: You can only access '/inventory.html' when you are logged in.")
    //     cy.url().should("eq", "https://www.saucedemo.com/")

    // });


    


})