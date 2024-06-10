
const checkoutPage = require("../../pages/saucedemo/checkout");
const inventoryPage = require("../../pages/saucedemo/inventory");
const loginPage = require("../../pages/saucedemo/login");
const cartPage = require("../../pages/saucedemo/cart");


const ITEM_IN_CART ="sauce-labs-bolt-t-shirt"
const FIRST_NAME = "Jack"
const LAST_NAME = "Sparrow"
const POSTAL_CODE = "12345"


describe("Checkout", () => {
    beforeEach(() => {
        cy.visit("/")
        loginPage.login("standard_user", "secret_sauce")
        cy.url().should("contain", "/inventory.html")
        inventoryPage.getInventoryList().should("have.length", 6)
        inventoryPage.addAnItemToCart(ITEM_IN_CART)
        inventoryPage.goToShoppingCart()
        cartPage.clickCheckoutButton()
    })
    it("Validate results in the checkout", () => {
        cy.url().should("contain", "/checkout-step-one.html")
        checkoutPage.getFirstNameInput().should("be.visible")
        checkoutPage.getLastNameInput().should("be.visible")
        checkoutPage.getPostalCodeInput().should("be.visible")
        checkoutPage.getContinueButton().should("be.visible")
    })

    it('Check the checkout', () => {
        checkoutPage.writeCheckoutData(FIRST_NAME, LAST_NAME, POSTAL_CODE)
        checkoutPage.clickContinueButton()
        cy.url().should("contain", "/checkout-step-two.html")
        checkoutPage.clickFinishButton()
        cy.url().should("contain", "/checkout-complete.html")
    })

    it('Fill the form without first name', () => {
        checkoutPage.fillLastNameInput(LAST_NAME)
        checkoutPage.fillPostalCodeInput(POSTAL_CODE)
        checkoutPage.clickContinueButton()
        checkoutPage.getErrorMessage().should("contain", "Error: First Name is required")
    });

    it('Fill the form without last name', () => {
        checkoutPage.fillNameInput(FIRST_NAME)
        checkoutPage.fillPostalCodeInput(POSTAL_CODE)
        checkoutPage.clickContinueButton()
        checkoutPage.getErrorMessage().should("contain", "Error: Last Name is required")
    });

    it('Fill the form without postal code', () => {
        checkoutPage.fillNameInput(FIRST_NAME)
        checkoutPage.fillLastNameInput(LAST_NAME)
        checkoutPage.clickContinueButton()
        checkoutPage.getErrorMessage().should("contain", "Error: Postal Code is required")
    }); 
})