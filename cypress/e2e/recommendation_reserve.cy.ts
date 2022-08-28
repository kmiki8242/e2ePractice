import { replace } from "cypress/types/lodash";
import { text } from "stream/consumers";

//金額の変化は別ファイルで見る
describe('home spec', () => {
  it('should confirm plan', () => {
    cy.visit('/');
    cy.get('[id="navbarNav"]').contains("宿泊予約").click();

    //予約ボタンを押す
    cy.get('.col-lg-9').within(() =>{
      cy.get('.card')
        .children('.card-body')
        .children('.btn')
        //別タブで開くことの確認
        .should('have.attr', 'target', '_blank')
        .should('have.text', 'このプランで予約').click();
    });
  });

  it('should reserve recommendation plan', () => {
    //予約画面に遷移
    cy.visit('https://hotel.testplanisphere.dev/ja/reserve.html?plan-id=0')
    cy.get('[id="plan-name"]').should('have.text', 'お得な特典付きプラン');
    cy.get('[id="plan-desc"]').should('have.text', 'お一人様1泊7,000円〜、土日は25%アップ。1名様〜9名様、最長9泊');

    //宿泊日の選択(翌月の1日)
    cy.get('[id="date"]').click()
    cy.get('.ui-datepicker-next')
      .should('be.visible').click();
    cy.get('.ui-datepicker-calendar').contains('1').click();
    
    //氏名の入力
    cy.get('[id="username"]').type('三木');

    //確認のご連絡の選択
    cy.get('[id="contact"]').select('希望しない');
    cy.get('[data-test="submit-button"]').click();

    //宿泊予約確認ページへの遷移を確認
    //TODO:合計金額のアサーション
    cy.get('h2').should('have.text', '宿泊予約確認');
    cy.get('[id="plan-name"]').should('have.text', 'お得な特典付きプラン');
    cy.get('[id="plan-desc"]').should('have.text', 'お一人様1泊7,000円〜、土日は25%アップ');
    
    //TODO:宿泊期間のアサーション
    // cy.get(':nth-child(1) > .col-lg-9 > .my-3').should('have.text', '宿泊予約確認');
    // cy.get('.col-9').contains(date2);
    
    //前ページで入力した内容の反映確認
    cy.get('dl')
      .within(() =>{
        cy.get('dt').eq(3).contains('お名前');
        cy.get('dd').eq(3).contains('三木様');
        cy.get('dt').eq(4).contains('確認のご連絡');
        cy.get('dd').eq(4).contains('希望しない');
      });

    //予約する
    cy.get('.col-lg-9')
      .children('[type="button"]')
      .should('have.text', 'この内容で予約する')
      .click();
    cy.get('.modal-title').should('have.text', '予約を完了しました');
    cy.get('.modal-body')
      .children('p')
      .should('have.text', 'ご来館、心よりお待ちしております。');
    cy.get('.modal-footer')
      .children('[type="button"]')
      .should('have.text', '閉じる')
      .click({force: true});
    cy.get('.modal-dialog').should('not.be.visible');
    });
  });
