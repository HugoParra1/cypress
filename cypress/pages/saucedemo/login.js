class LoginPage {
    elements = {
        usernameInput: () => cy.get("#user-name"),
        passwordInput: () => cy.get("#password"),
        loginButton: () => cy.get("#login-button"),
        errorMessage: () => cy.get('[data-test="error"]')
    }

    typeUsername(username) {
        this.elements.usernameInput().type(username)
    }

    typePassword(password) {
        this.elements.passwordInput().type(password)
    }

    clickLogin() {
        this.elements.loginButton().click()
    }

    createErrorMessage() {
        return this.elements.errorMessage()
    }
    login(username, password) {
        this.typeUsername(username)
        this.typePassword(password)
        this.clickLogin()
    }
}

module.exports = new LoginPage();
