// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace Cypress {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Chainable<Subject> {
    login(email: string, password: string): void;
    setProjectForm(): void;
  }
}
//
// -- This is a parent command --
Cypress.Commands.add('login', (email, password) => {
  cy.get('[data-testid="email"]').type(email);

  cy.get('[data-testid="password"]').type(password);

  cy.get('[data-testid="login"]').find('button').click();
});

Cypress.Commands.add('setProjectForm', () => {
  cy.get('cv-gen-text-input').find('input').type('Cypress project');
  cy.get('cv-gen-textarea-input')
    .find('textarea')
    .type('Project was created by cypress e2e test');
  cy.get('cv-gen-date-input[formControlName="startDate"]').type('01/01/2023');
  cy.get('cv-gen-date-input[formControlName="endDate"]').type('01/01/2023');
  cy.get('cv-gen-number-input').type('1');
  cy.get('cv-gen-chips-input[formControlName="techStack"]').type(
    'angular{enter}'
  );
  cy.get('cv-gen-chips-input[formControlName="responsibilities"]').type(
    'frontend{enter}'
  );
  cy.get('cv-gen-chips-input[formControlName="teamRoles"]').type(
    'developer{enter}'
  );
});
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
