// Custom command for logging in a user
Cypress.Commands.add('login', (email, password) => {
  cy.visit('/index.html'); // Adjust path to your login page
  cy.get('input[name="email"]').type(email);
  cy.get('input[name="password"]').type(password);
  cy.get('button[type="submit"]').click();
  cy.url().should('include', '/dashboard'); // Adjust URL check after login success
});
