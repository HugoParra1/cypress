const cartPage = require("../../pages/saucedemo/cart");
const inventoryPage = require("../../pages/saucedemo/inventory");
const loginPage = require("../../pages/saucedemo/login");
const checkoutPage = require("../../pages/saucedemo/checkout");

const ITEM_IN_CART = "sauce-labs-bolt-t-shirt";

describe("Cart", () => {
    beforeEach(function () {
        if (this.currentTest.title != "Validate results in the cart") {
            cy.visit("/");
            loginPage.login("standard_user", "secret_sauce");
            cy.url().should("contain", "/inventory.html");
            inventoryPage.getInventoryList().should("have.length", 6);
            inventoryPage.getAddToCartButton(ITEM_IN_CART).click();
            inventoryPage.goToShoppingCart();
        } else {
            cy.fixture('items').as('items');
        }
    });

    it("Validate results in the cart", function () {
        cy.get("@items").each((item) => {
            cy.visit("/");
            loginPage.login("standard_user", "secret_sauce");
            cy.url().should("contain", "/inventory.html");
            inventoryPage.getInventoryList().should("have.length", 6);
            inventoryPage.getAddToCartButton(item.reference).click();
            inventoryPage.goToShoppingCart();
            cartPage.getListItem().should("have.length", 1);
            cartPage.getListItem().should("contain", item.name);
            cartPage.clickRemoveButton(item.reference);
            cartPage.getListItem().should("not.exist");
        })
    });

    it('Delete item in the shopping cart', function () {
        cartPage.clickRemoveButton(ITEM_IN_CART);
        cartPage.getRemoveButton(ITEM_IN_CART).should("not.exist");
        cartPage.getListItem().should("not.exist");
    });

    it('Validate continue shopping button', function () {
        cartPage.clickContinueShoppingButton();
        cy.url().should("contain", "/inventory.html");
        inventoryPage.getInventoryList().should("have.length", 6);
    });

    it('Validate checkout button', function () {
        cartPage.clickCheckoutButton();
        cy.url().should("contain", "/checkout-step-one.html");
        checkoutPage.getFirstNameInput().should("be.visible");
        checkoutPage.getLastNameInput().should("be.visible");
        checkoutPage.getPostalCodeInput().should("be.visible");
        checkoutPage.getContinueButton().should("be.visible");
    });

    it('Check item url click', function () {
        cartPage.goToItemPage();
        cy.url().should("contain", "/inventory-item.html?id=");
        cy.get('[data-test="remove"]').should("be.visible");
    });
});
