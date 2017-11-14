(() => {
  'use strict';

  window.Munchkin = window.Munchkin || {};

  window.Munchkin.game = {
    clickedCardName: null,
    turn: {
      progress: false,
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
      } else if (this.turn.monster) {
        this.battlePhase();
      } else if (this.turn.curse || this.turn.other && !this.turn.advOrClean) {
        window.Munchkin.ui.updateProgress(
          'You haven\'t met any monster :( \
             Drop a monster card to fight with it \
             or press "nextPhase" again to clean stash'
        );
      } else if (this.turn.advOrClean === 'clean') {
        this.cleanStashPhase();
      } else if (this.turn.advOrClean === 'adventure') {
        this.adventurePhase();
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
          .addLvls(monster.reward.lvl);
        this.turn.monster = 'dead';
        window.Munchkin.ui.updateHand();
        window.Munchkin.ui.updatePlayer('lvl', window.Munchkin.player.lvl);
        window.Munchkin.ui.updateProgress(`
          Congrat\'s you have just beaten this monster 
          and obtained ${monster.reward.treasures} treasure${monster.reward.treasures > 1 ? 's' : ''}  and 
          ${monster.reward.lvl} level${monster.reward.lvl > 1 ? 's' : ''}
        `);
      } else {
        window.Munchkin.ui.updateProgress('You can\'t beat this monster, try to find some help!');
      }
    },
    cleanStashPhase() {
      window.Munchkin.player.getCardsToHand(1, 'doors')
    },
    enableAdventurePhase() {
      this.turn.advOrClean = 'adventure';
    },
    adventurePhase() {
      const card = window.Munchkin.player.pickCardFromHand(this.clickedCardName);

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