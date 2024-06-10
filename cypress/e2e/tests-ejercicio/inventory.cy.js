const loginPage = require("../../pages/saucedemo/login");
const inventoryPage = require("../../pages/saucedemo/inventory");
const ITEM_IN_CART ="sauce-labs-bolt-t-shirt"
describe("Inventory", () => {

    beforeEach(() => {
        cy.visit("/")
        loginPage.login("standard_user", "secret_sauce")
        cy.url().should("contain", "/inventory.html")
    })
    it("Validate results in the inventory", () => {
        inventoryPage.getInventoryList().should("have.length", 6)
    })

    it("Increment the shopping cart counter", () => {
        inventoryPage.addAnItemToCart(ITEM_IN_CART)
        inventoryPage.getRemoveButton(ITEM_IN_CART).should("be.visible")
        inventoryPage.getShoppingCartBadge().should("have.text", "1")
    })

    it('Delete button visibility in the shopping cart', () => {
        inventoryPage.addAnItemToCart(ITEM_IN_CART)
        inventoryPage.getRemoveButton(ITEM_IN_CART).should("be.visible")
        inventoryPage.getShoppingCartBadge().should("be.visible")
    });

    it('Delete item in the shopping cart', () => {
        inventoryPage.addAnItemToCart(ITEM_IN_CART)
        inventoryPage.removeAnItemFromCart(ITEM_IN_CART)
        inventoryPage.getRemoveButton(ITEM_IN_CART).should("not.exist")
        inventoryPage.getShoppingCartBadge().should("not.exist")
    })

    it('Open the cart', () => {
        inventoryPage.goToShoppingCart()
        cy.get("[data-test='checkout']").should("be.visible")
        cy.url().should("not.contain", "/inventory.html")
    });

    it('Check the burger menu', () => {
        inventoryPage.openBurgerMenu()
        inventoryPage.getBurgerMenuItemList().should("be.visible")
        inventoryPage.closeBurgerMenu()
    });

    it('Log out', () => {
        inventoryPage.logOut()
        cy.url().should("not.contain", "/inventory.html")
    });

    it('Change the order of the products', () => {
        inventoryPage.changeOrderOfProducts(3)
        inventoryPage.getInventoryList().should("be.visible")
        inventoryPage.getInventoryList().should("have.length", 6)
        inventoryPage.getInventoryList().first().should("contain", "Sauce Labs Fleece Jacket")
        
    });
})