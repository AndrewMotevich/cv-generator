describe('cv-gen', () => {
  beforeEach(() => cy.visit('/'));

  it('should login', () => {
    cy.login('admin@admin.com', 'Admin1234')

    cy.get('h1').contains('CV-Gen')
  });
});
