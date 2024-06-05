const LoginPage = require("../../pages/saucedemo/login");
const InventoryPage = require("../../pages/saucedemo/inventory");
describe ("Inventory", () => {

    beforeEach(() => {
        cy.visit("/")
        LoginPage.login("standard_user", "secret_sauce")
        cy.url().should("contain", "/inventory.html")
    })
    it("Validate results in the inventory", () => {
        InventoryPage.getInventoryList().should("have.length", 6)
    })

    it("Increment the shopping cart counter", () => {
        InventoryPage.getAddToCartButton("sauce-labs-bolt-t-shirt").click()
        InventoryPage.getRemoveButton("sauce-labs-bolt-t-shirt").should("be.visible")
        InventoryPage.getShoppingCartBadge().should("have.text", "1")
    })

    it('Delete button visibility in the shopping cart', () => {
        InventoryPage.getAddToCartButton("sauce-labs-bolt-t-shirt").click()
        InventoryPage.getRemoveButton("sauce-labs-bolt-t-shirt").should("be.visible")
        InventoryPage.getShoppingCartBadge().should("be.visible")
    });

    it('Delete item in the shopping cart', () => {
        InventoryPage.addAndRemoveItem("sauce-labs-bolt-t-shirt")
        InventoryPage.getRemoveButton("sauce-labs-bolt-t-shirt").should("not.exist")
        InventoryPage.getShoppingCartBadge().should("not.exist")
    })  

    it('Open the cart', () => {
        InventoryPage.getShoppingCartButton().click()
        cy.url().should("contain", "/cart.html")
        cy.url().should("not.contain", "/inventory.html")
    });

    it('Check the burger menu', () => {
        InventoryPage.checkBurgerMenu()
    });

    it('Log out', () => {
        InventoryPage.logOut()
        cy.url().should("not.contain", "/inventory.html")
    });

    it('Change the order', () => {
        InventoryPage.changeOrder(3)
        InventoryPage.getInventoryList().should("be.visible")
    });
})