describe('Authentication Flow', () => {
  beforeEach(() => {
    cy.visit('index.html');
  });

  it('User can log in with valid credentials', () => {
    cy.get('button[data-auth="login"]').first().click();
    cy.get('#loginModal').should('be.visible');

    cy.get('input[name="email"]').first().type('validuser@example.com');
    cy.get('input[name="password"]').first().type('validPassword123');
    cy.get('button[type="submit"]').first().click();
  });

  it('User cannot log in with invalid credentials and sees an error message', () => {
    cy.get('button[data-auth="login"]').first().click();
    cy.get('#loginModal').should('be.visible');

    cy.get('input[name="email"]').first().type('invaliduser@example.com');
    cy.get('input[name="password"]').first().type('wrongPassword123');
    cy.get('button[type="submit"]').first().click();
  });

  it('User can log out successfully', () => {
    cy.get('button[data-auth="login"]').first().click();
    cy.get('#loginModal').should('be.visible');

    cy.get('input[name="email"]').first().type('validuser@example.com');
    cy.get('input[name="password"]').first().type('validPassword123');
    cy.get('button[type="submit"]').first().click();

    cy.get('button[data-auth="logout"]').click();
  });
});
