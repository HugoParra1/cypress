class inventory {
    elements = {
        shoppingCart : () => cy.get('[data-test="shopping-cart-link"]'),
        shoppingCartBadge: () => cy.get('[data-test="shopping-cart-badge"]'),
        orderDropdown: () => cy.get('[data-test="product-sort-container"]'),
        burgerMenuButton: () => cy.get('#react-burger-menu-btn'),
        burgerMenuItemList: () => cy.get('.bm-item-list'),
        burgerCloseButton: () => cy.get('.bm-cross-button'),
        logOutButton: () => cy.get('[data-test="logout-sidebar-link"]'),
        inventoryList: () => cy.get('.inventory_list .inventory_item '),
    }

    clickAddToCart() {
        this.elements.addToCartButton().click()
    }
     
    getInventoryList() {
        return this.elements.inventoryList()
    }
    
    getShoppingCartBadge() {
        return this.elements.shoppingCartBadge()
    }

    getShoppingCartButton() {
        return this.elements.shoppingCart()
    }
    //Que es mejor tener la funcion para añadir al carro o hacer un return con el boton "Add to cart" de un item especifico?

    getAddToCartButton(item) {
        return cy.get('[data-test="add-to-cart-' + item + '"]')
    }

    changeOrder(order) {
        this.elements.orderDropdown().select(order)
    }

    openBurgerMenu() {
        this.elements.burgerMenuButton().click()
    }

    getRemoveButton(item) {
        return cy.get('[data-test="remove-' + item + '"]')
    }

    closeBurgerMenu() {
        this.elements.burgerCloseButton().click()
    }

    getBurgerMenuItemList() {
        return this.elements.burgerMenuItemList()
    }

    clickLogOut() {
        this.elements.logOutButton().click()
    }

    logOut() {
        this.openBurgerMenu()
        this.clickLogOut()
    }

    addAndRemoveItem(item) {
        this.getAddToCartButton(item).click()
        this.getRemoveButton(item).click()
    }

    checkBurgerMenu() {
        this.openBurgerMenu()
        this.getBurgerMenuItemList().should("be.visible")
        this.closeBurgerMenu()
    }

}

module.exports = new inventory()