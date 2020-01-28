describe('Accessibility checks for App page', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.injectAxe();
        cy.wait(500);
    });

    it('Has no detectable a11y violations on load for desktop screens', () => {
        cy.viewport(1400, 900);
        cy.checkA11y();
    });

    it('Has no detectable a11y violations on load for mobile screens', () => {
        cy.viewport(1400, 900);
        cy.checkA11y();
    });

    it('Has no detectable a11y violations in the help modal for desktop screens', () => {
        cy.viewport(1400, 900);
        cy.get('.top-icons').find('svg').click();
        cy.wait(500);
        cy.checkA11y();
    });

    it('Has no detectable a11y violations in the help modal for mobile screens', () => {
        cy.viewport(320, 568);
        cy.get('.top-icons').find('svg').click();
        cy.wait(500);
        cy.checkA11y();
    });
});
