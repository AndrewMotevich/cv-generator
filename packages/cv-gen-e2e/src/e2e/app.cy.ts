describe('cv-gen', () => {
  beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {
    cy.get('button').contains('Log-in')
  });
});
