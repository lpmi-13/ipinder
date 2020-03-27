describe('Accessibility checks for App page', () => {

    const MOBILE_WIDTH = 320;
    const MOBILE_HEIGHT = 568;

    const DESKTOP_WIDTH = 1400;
    const DESKTOP_HEIGHT = 900;

    beforeEach(() => {
        cy.visit('/');
        cy.injectAxe();
        cy.wait(500);
    });

    it('Has no detectable a11y violations on load for desktop screens', () => {
        cy.viewport(DESKTOP_WIDTH, DESKTOP_HEIGHT);
        cy.checkA11y();
    });

    it('Has no detectable a11y violations on load for mobile screens', () => {
        cy.viewport(MOBILE_WIDTH, MOBILE_HEIGHT);
        cy.checkA11y();
    });

    it('Has no detectable a11y violations in the help modal for desktop screens', () => {
        cy.viewport(DESKTOP_WIDTH, DESKTOP_HEIGHT);
        cy.get('.top-icons').find('svg').click();
        cy.wait(500);
        cy.checkA11y();
    });

    it('Has no detectable a11y violations in the help modal for mobile screens', () => {
        cy.viewport(MOBILE_WIDTH, MOBILE_HEIGHT);
        cy.get('.top-icons').find('svg').click();
        cy.wait(500);
        cy.checkA11y();
    });
});
