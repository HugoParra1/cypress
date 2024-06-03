describe("Ejercicio 5b", () => {
    const baseUrl = "https://www.saucedemo.com/"
    beforeEach(() => {
        cy.visit(baseUrl)
    })
    it("Realizar login", () => {
        cy.get("#user-name").type("standard_user")
        cy.get("#password").type("secret_sauce")
        cy.get("#login-button").click()
        cy.url().should("eq", baseUrl + "inventory.html")
    })

    it("Validar Login incorrecto", () => {
        cy.get("#user-name").type("credencial_invalida")
        cy.get("#password").type("credencial_invalida")
        cy.get("#login-button").click()
        cy.get('[data-test="error"]')
    })

    it("Validar numero de resultadoos", () => {
        cy.get("#user-name").type("standard_user")
        cy.get("#password").type("secret_sauce")
        cy.get("#login-button").click()
        cy.get(".inventory_list .inventory_item").should("have.length", 6)
    })

    it("Incremento del valor del carrito", () => {
        cy.get("#user-name").type("standard_user")
        cy.get("#password").type("secret_sauce")
        cy.get("#login-button").click()
        cy.get('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click()
        cy.get('[data-test="shopping-cart-badge"]').should("have.text", "1")
    })

    it('Visibilidad del boton eliminar producto del carrito', () => {
        cy.get("#user-name").type("standard_user")
        cy.get("#password").type("secret_sauce")
        cy.get("#login-button").click()
        cy.get('[data-test="add-to-cart-sauce-labs-onesie"]').click()
        cy.get('[data-test="remove-sauce-labs-onesie"]').should("be.visible")
    });

    it('Eliminacion del producto del carrito', () => {
        cy.get("#user-name").type("standard_user")
        cy.get("#password").type("secret_sauce")
        cy.get("#login-button").click()
        cy.get('[data-test="add-to-cart-sauce-labs-onesie"]').click()
        cy.get('[data-test="remove-sauce-labs-onesie"]').click()
        cy.get('[data-test="remove-sauce-labs-onesie"]').should("not.exist")
    })  
})