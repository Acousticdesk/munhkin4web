(() => {
  'use strict';

  window.Munchkin = window.Munchkin || {};

  window.Munchkin.player = {
      lvl: 1,
      str: 1,
      hand: [],
      equipped: [],
      hold: [],
      curses: [],
      addLvls(amount) {
        this.lvl += amount;
        return this;
      },
      becomeCursed(curse) {
        this.curses.push(curse);
      },
      getCardsToHand(amount, fromDeck) {
        this.hand = this.hand.concat( this.getCards(amount, fromDeck) );
        return this;
      },
      getCards(howMany, deck) {
          return window.Munchkin.cards.give(howMany, deck);
      },
      grabCard(card) {
        this.hand.push(card);
        return this;
      },
      pickCardFromHand(cardId) {
        return this.hand.find((c) => {
          return c.id === cardId;
        });
      },
      dropCard(deck, cardId) {
        this[deck] = this[deck].filter((c) => c.id !== cardId);
        return this;
      },
      cardToInventory(cardId, equipment) {
        this[equipment].push(this.pickCardFromHand(cardId));
        this.dropCard('hand', cardId);

        return this;
      },
      updateStr() {
        const bonus = this.equipped.reduce((state, item) => state + item.bonus, 0);
        this.str = this.lvl + bonus;
      }
    };
})();

































