import moment from 'moment-timezone';
/// <reference types="cypress" />

const today = moment().format('dddd, D MMM');

describe('My First Test', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8081');
  });

  it('Verify Text', () => {
    cy.get("div[data-testid='sign-in']").should('have.text', 'Sign in');
    cy.get("div[data-testid='sign-in']").click();
    cy.get("input[placeholder='Enter location...']").type('Berlin');
    cy.intercept(
      'POST',
      'https://places.googleapis.com/v1/places:searchNearby',
    ).as('getParks');
    // cy.intercept('GET', 'https://places.googleapis.com/v1/*').as('getPhoto');
    cy.get("div[data-testid='search-btn']").click();
    cy.wait('@getParks');
    // cy.wait('@getPhoto')
    cy.get("div[data-testid='park-list']")
      .its('length')
      .should('be.greaterThan', 1);
    // visit a place
    cy.intercept('/events/park/*').as('getParkEvents');
    cy.get('[data-testid="park-list"]')
      .first()
      .contains('div', /Plan visit/)
      .click();
    cy.wait('@getParkEvents');
    // next day
    cy.contains('div', /day/).invoke('text').as('today');
    cy.get('button')
      .contains('div', /Next Day/)
      .click();
    cy.contains('div', /day/).invoke('text').as('tomorrow');
    // format('dddd, D MMM')
    cy.get('@tomorrow').should('not.equal', today)
    // prev day
    cy.get('button')
      .contains('div', /Prev Day/)
      .click();
    cy.contains('div', /day/).invoke('text').as('prevday');
    cy.get('@prevday').should('equal', today)
    // click add visit
    cy.contains('div', /Add visit/).click()
    cy.contains('div', /Start Time/).click()
    // select start time
    cy.intercept('POST', '/events', {fixture: 'mockedData.json'}).as('postEvent')
    // save
    cy.contains('div', /Save/).click()
    cy.wait('@postEvent')
    //
    cy.intercept('GET', '/events/user/eugenio', {
      fixture: 'mockedData.json',
    }).as('getUserEvents');
    cy.get('a[href="/Main/MyPlansTab"]').click();
    cy.wait('@getUserEvents')
    // click delete button
    // check that no events on page
    // get to park schedule & check no event
    // go to profile & logout
  });
});
