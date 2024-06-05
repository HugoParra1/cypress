describe ("Inventory", () => {

    beforeEach(() => {
        cy.login("standard_user", "secret_sauce")
    })
    it("Validate results in the inventory", () => {
        cy.get(".inventory_list .inventory_item").should("have.length", 6)
    })

    it("Increment the shopping cart counter", () => {
        cy.get('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click()
        cy.get('[data-test="shopping-cart-badge"]').should("have.text", "1")
    })

    it('Delete button visibility in the shopping cart', () => {
        cy.get('[data-test="add-to-cart-sauce-labs-onesie"]').click()
        cy.get('[data-test="remove-sauce-labs-onesie"]').should("be.visible")
        cy.get('[data-test="shopping-cart-badge"]').should("be.visible")
    });

    it('Delete item in the shopping cart', () => {
        cy.get('[data-test="add-to-cart-sauce-labs-onesie"]').click()
        cy.get('[data-test="remove-sauce-labs-onesie"]').click()
        cy.get('[data-test="remove-sauce-labs-onesie"]').should("not.exist")
        cy.get('[data-test="shopping-cart-badge"]').should("not.exist")
    })  
})