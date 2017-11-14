(() => {
  'use strict';

  window.Munchkin = window.Munchkin || {};

  window.Munchkin.cards = {
      doors: [
        {
          id: 101,
          name: 'Curse of something',
          penalty: {
            type: 'no-helmet'
          },
          type: 'curse'
        }, {
          id: 102,
          name: 'lol',
          type: 'other'
        }, {
          id: 103,
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
          id: 104,
          name: 'lol2',
          penalty: {
            type: 'no-helmet'
          },
          type: 'curse'
        }, {
          id: 105,
          name: 'Annigilation',
          type: 'other',
          description: 'Let\'s you remove a card from game, put it to the box'
        }, {
          id: 106,
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
          id: 107,
          name: 'lol5',
          penalty: {
            type: 'no-helmet'
          },
          type: 'curse'
        }, {
          id: 108,
          name: 'lol6',
          type: 'other'
        }, {
          id: 109,
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
          id: 201,
          name: 'Weapon: Sword',
          type: 'gear',
          description: 'Solid sword, that give you +5 bonus',
          bonus: 5
        },
        {
          id: 202,
          name: 'Potion',
          type: 'treasure',
          description: 'bonus +5',
          bonus: 5
        }, {
          id: 203,
          name: 'Potion',
          type: 'treasure',
          description: 'bonus +3',
          bonus: 3
        }, {
          id: 204,
          name: 'Potion',
          type: 'treasure',
          description: 'bonus -3',
          bonus: -3
        }, {
          id: 205,
          name: '13',
          type: 'treasure',
          description: 'bonus +2',
          bonus: 2
        }, {
          id: 206,
          name: '14',
          type: 'treasure'
        }, {
          id: 207,
          name: '15',
          type: 'treasure'
        }, {
          id: 208,
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