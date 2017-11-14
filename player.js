(() => {
  'use strict';

  window.Munchkin = window.Munchkin || {};

  window.Munchkin.player = {
      lvl: 1,
      str: 10,
      hand: [],
      equipped: [],
      hold: [],
      curses: [],
      addLvls(amount) {
        this.lvl += amount;
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
      pickCardFromHand(card) {
        return this.hand.find((c) => {
          return c.name === card;
        });
      },
      dropCard(deck, card) {
        this[deck] = this[deck].filter((c) => c.name !== card.name);
        return this;
      },
      cardToInventory(card, equipment) {
        this[equipment].push(player.pickCardFromHand(card));
        this.dropCard('hand', card);
        return this;
      }
    };
})();

































