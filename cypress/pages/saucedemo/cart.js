class CartPage {
    elements = {
        checkoutButton: () => cy.get("[data-test=checkout]"),
        continueShoppingButton: () => cy.get('[data-test="continue-shopping"]'),
        cartList: () => cy.get('[data-test="cart-list"]'),
    }

    getListItem() {
        return this.elements.cartList().find('.cart_item_label>a>[data-test="inventory-item-name"]')
    }

    getCheckoutButton() {
        return this.elements.checkoutButton()
    }

    getContinueShoppingButton() {
        return this.elements.continueShoppingButton()    
    }

    getRemoveButton(item) {
        return this.elements.cartList().find(`[data-test="remove-${item}"]`)
    }

    clickCheckoutButton() {
        this.getCheckoutButton().click()
    }   

    clickContinueShoppingButton() {
        this.getContinueShoppingButton().click()
    }

    clickRemoveButton(item) {
        this.getRemoveButton(item).click()
    }

    goToItemPage() {
        this.getListItem().click()
    }

}

module.exports = new CartPage()