class CheckoutPage {

    elements = {
        firstNameInput: () => cy.get('[data-test="firstName"]'),
        lastNameInput: () => cy.get('[data-test="lastName"]'),
        postalCodeInput: () => cy.get('[data-test="postalCode"]'),
        continueButton: () => cy.get('[data-test="continue"]'),
        finishButton: () => cy.get('[data-test="finish"]'),
        cancelButton: () => cy.get('[data-test="cancel"]'),
        errorMessage: () => cy.get('.error-message-container')
    }

    getFirstNameInput() {
        return this.elements.firstNameInput()
    }

    getLastNameInput() {
        return this.elements.lastNameInput()
    }

    getPostalCodeInput() {
        return this.elements.postalCodeInput()
    }

    getContinueButton() {
        return this.elements.continueButton()
    }   

    getFinishButton() {
        return this.elements.finishButton()
    }

    getCancelButton() {
        return this.elements.cancelButton()
    }

    writeCheckoutData(firstName, lastName, postalCode) {
        this.getFirstNameInput().type(firstName)
        this.getLastNameInput().type(lastName)
        this.getPostalCodeInput().type(postalCode)
    }

    clickContinueButton() {
        this.getContinueButton().click()
    }

    clickFinishButton() {
        this.getFinishButton().click()
    }

    clickCancelButton() {
        this.getCancelButton().click()
    }   
    
    fillNameInput(name) {
        this.getFirstNameInput().type(name)
        return this
    }

    fillLastNameInput(lastName) {
        this.getLastNameInput().type(lastName)
        return this 
    }

    fillPostalCodeInput(postalCode) {
        this.getPostalCodeInput().type(postalCode)
        return this
    }

    getErrorMessage() {
        return this.elements.errorMessage()
    }

}
module.exports = new CheckoutPage()