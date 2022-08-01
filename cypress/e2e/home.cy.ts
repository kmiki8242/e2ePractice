describe('empty spec', () => {
  it('passes', () => {
    cy.visit('/');
    cy.get('.d-lg-block').contains(/HOTEL PLANISPHERE/i)
  })
})