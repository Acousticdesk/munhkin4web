(() => {
  'use strict';

  window.Munchkin = window.Munchkin || {};

  window.Munchkin.cards = {
      doors: [
        {
          name: 'Curse of something',
          penalty: {
            type: 'no-helmet'
          },
          type: 'curse'
        }, {
          name: 'lol',
          type: 'other'
        }, {
          name: 'lol1',
          str: 3,
          penalty: {
            type: 'death'
          },
          reward: {
            lvl: 1,
            treasures: 1
          },
          type: 'monster'
        }, {
          name: 'lol2',
          penalty: {
            type: 'no-helmet'
          },
          type: 'curse'
        }, {
          name: 'Annigilation',
          type: 'other',
          description: 'Let\'s you remove a card from game, put it to the box'
        }, {
          name: 'lol4',
          str: 4,
          penalty: {
            type: 'lvl',
            amount: 2
          },
          reward: {
            lvl: 1,
            treasures: 2
          },
          type: 'monster'
        }, {
          name: 'lol5',
          penalty: {
            type: 'no-helmet'
          },
          type: 'curse'
        }, {
          name: 'lol6',
          type: 'other'
        }, {
          name: 'lol7',
          str: 5,
          penalty: {
            type: 'death',
          },
          reward: {
            lvl: 1,
            treasures: 2
          },
          type: 'monster'
        }
      ],
      treasures: [
        {
          name: 'Potion',
          type: 'treasure',
          description: 'bonus +5'
        }, {
          name: 'Potion',
          type: 'treasure',
          description: 'bonus +3'
        }, {
          name: 'Potion',
          type: 'treasure',
          description: 'bonus -3'
        }, {
          name: '13',
          type: 'treasure',
          description: 'bonus +2'
        }, {
          name: '14',
          type: 'treasure'
        }, {
          name: '15',
          type: 'treasure'
        }, {
          name: '16',
          type: 'treasure'
        }
      ],
      give(howMany, deck) {
        let cards = [];
        for (let i = 0; i < howMany; i++) {
          cards.push(this[deck].shift());
        }
        return cards.length > 1 ? cards : cards[0];
      }
    };
})();