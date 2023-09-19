describe('cv-gen', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.login('admin@admin.com', 'Admin1234');
  });

  it('should create project', () => {
    cy.visit('/projects/create');
    cy.contains('Create project').should('exist');

    cy.setProjectForm();

    cy.intercept('POST', 'http://localhost:3000/api/projects', (req) => {
      req.reply({
        status: 500,
        body: 'Failure',
      });
    }).as('postRequest');
    cy.contains('button', 'Save').click();
    cy.contains('Error').should('exist');
    // cy.contains('Cypress project').should('exist')
  });
});
