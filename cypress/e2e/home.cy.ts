describe('home spec', () => {
  it('should open home as nologin user', () => {    
    const explanation_url = './about.html';

    cy.visit('/');
    cy.get('.active > .nav-link').contains('ホーム');
    cy.get(':nth-child(2) > .nav-link').contains('宿泊予約');
    cy.get('#signup-holder > .nav-link').contains('会員登録');
    cy.get('#login-holder > .btn').contains('ログイン');

    //title name
    cy.title().should('include','HOTEL PLANISPHERE');

    //first paragraph
    cy.get(':nth-child(1) > .col > .my-4').contains('このサイトはテスト自動化の学習用の練習サイトです。');
    
    //second paragraph
    cy.get(':nth-child(2) > .col > h3.my-4').contains('サイトの構成');
    cy.get('.col-12 > p > a')
      .should('have.attr', 'href', explanation_url)
      .and('contains.text', 'より詳しい解説はこちら（研修を作る方向け）');

    //third paragraph
    cy.get(':nth-child(3) > .col > .my-4').contains('サンプルコード');
  });
})
