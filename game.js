(() => {
  'use strict';

  window.Munchkin = window.Munchkin || {};

  window.Munchkin.game = {
    clickedCardId: null,
    turn: {
      progress: false,
      phase: 1,
      monster: null,
      curse: null,
      other: null,
    },
    start() {
      window.Munchkin.player.getCardsToHand(4, 'treasures');
      window.Munchkin.player.getCardsToHand(4, 'doors');

      window.Munchkin.ui.updateHand();
      window.Munchkin.ui.addEvents();
    },
    nextPhase() {
      if (!this.turn.progress) {
        this.knockKnock();
        this.turn.phase = 2;
      } else if (this.turn.monster) {
        this.battlePhase();
      } else if ( (this.turn.curse || this.turn.other) && this.turn.phase === 2 ) {
        window.Munchkin.ui.updateProgress(
          'You haven\'t met any monster :( \
             Drop a monster card to fight with it \
             or press "nextPhase" again to clean stash'
        );
        this.turn.phase = 2.5;
      } else if (this.turn.advOrClean === 'adventure') {
        this.adventurePhase();
      } else if (this.turn.phase === 2.5) {
        this.cleanStashPhase();
      } else if (this.turn.phase === 3) {
        if (window.Munchkin.player.hand.length <= 5) {
          this.allowNextTurn();
          window.Munchkin.ui.updateProgress('Oppenents turn...');
        } else {
          window.Munchkin.ui.updateProgress(
            'You have more than 5 cards on your hands! \
            Drop or equip some of them to be able to continue'
          );
        }
      }
    },
    knockKnock() {
      const card = window.Munchkin.cards.give(1, 'doors');
      this.turn.monster = null;
      this.turn.curse = null;
      this.turn.other = null;
      this.turn.progress = true;
      window.Munchkin.ui.updateProgress(
        'Knocking to the door has brought you a new card:' +
        window.Munchkin.ui.getHTMLForCards([card])
      );
      this.turn[card.type] = card;

      if (this.turn.curse) {
        window.Munchkin.player.becomeCursed(this.turn.curse.penalty.type);
        window.Munchkin.ui.updatePlayer('curses', window.Munchkin.player.curses);
      } else {
        window.Munchkin.player.grabCard(card);
        window.Munchkin.ui.updateHand();
      }
    },
    allowNextTurn() {
      this.turn.progress = false;
    },
    battleMonster() {
      let monster = this.turn.monster;
      if (window.Munchkin.player.str > monster.str) {
        window.Munchkin.player
          .getCardsToHand(monster.reward.treasures, 'treasures')
          .addLvls(monster.reward.lvl)
          .updateStr();
        this.turn.monster = 'dead';
        window.Munchkin.ui.updateHand();
        window.Munchkin.ui.updatePlayer('lvl', window.Munchkin.player.lvl);
        window.Munchkin.ui.updatePlayer('str', window.Munchkin.player.str);
        window.Munchkin.ui.updateProgress(`
          Congrat\'s you have just beaten this monster 
          and obtained ${monster.reward.treasures} treasure${monster.reward.treasures > 1 ? 's' : ''}  and 
          ${monster.reward.lvl} level${monster.reward.lvl > 1 ? 's' : ''}
        `);
        this.turn.phase = 3;
      } else {
        window.Munchkin.ui.updateProgress('You can\'t beat this monster, try to find some help!');
      }
    },
    cleanStashPhase() {
      window.Munchkin.player.getCardsToHand(1, 'doors');
      window.Munchkin.ui.updateProgress('Great, you have obtained a new card');
      window.Munchkin.ui.updateHand();
      this.turn.phase = 3;
    },
    enableAdventurePhase() {
      this.turn.advOrClean = 'adventure';
      this.phase = 2.5;
    },
    adventurePhase() {
      const card = window.Munchkin.player.pickCardFromHand(this.clickedCardId);

      if (card && card.type === 'monster') {
        window.Munchkin.player.dropCard('hand', card);
        window.Munchkin.ui.updateHand();
        this.turn.monster = card;
        this.battlePhase();
      }
    },
    battlePhase() {
      if (this.turn.monster !== 'dead') {
        this.battleMonster();
      }
    }
  };
})();