(() => {
  'use strict';

  window.Munchkin = window.Munchkin || {};

  window.Munchkin.ui = {
      progressEl: document.getElementById('progress'),
      progressBox: document.getElementById('progress').getBoundingClientRect(),
      getHTMLForCards(cardsCollection) {
        return cardsCollection
            .reduce((prevState, card) => prevState + `<li data-card-id="${card.id}">
              <p><b>${card.name}</b></p>
              <p><i>${card.type}</i></p>
              <p><i>${card.description || ''}</i></p>
              <p>
            </li>`, '');
      },
      updateProgress(text) {
        document.querySelector('h1').innerHTML = text;
      },
      updatePlayer(field, value) {
        document
          .getElementById('player_' + field)
          .innerHTML = `<b>${field}:</b> <i>${value}</i>`;
      },
      updateHand() {
        let html = this.getHTMLForCards(window.Munchkin.player.hand);

        if (!html) {
          html = '<i>No cards in your hand...</i>'
        }
        document.getElementById('hand_cards').innerHTML = html;
      },
      updateHoldCards() {
        const html = this.getHTMLForCards(window.Munchkin.player.hold);

        document.getElementById('hold_cards').innerHTML = html;
      },
      updateEquippedCards() {
        const html = this.getHTMLForCards(window.Munchkin.player.equipped);

        document.getElementById('equipped_cards').innerHTML = html;
      },
      addEvents() {
        document.body.addEventListener('mousemove', (e) => {
          if (!this.progressEl.hidden) {
            this.progressBox = this.progressEl.getBoundingClientRect();
          }

          this.progressEl.hidden = 
            e.pageX - window.pageXOffset < this.progressBox.width 
            && e.pageY - window.pageYOffset < this.progressBox.height;
        });

        // card click
        document.addEventListener('click', (e) => {
          const handContainer = e.target.closest('#hand_cards');
          const context = document.body.querySelector('#context');
          if (!handContainer) {
            context.classList.remove('in');
            return;
          }

          document.getElementById('fight').hidden = 
            !(window.Munchkin.game.turn.curse || window.Munchkin.game.turn.other);

          context.classList.add('in');
          context.style.left = e.pageX + 'px';
          context.style.top = e.pageY + 'px';

          window.Munchkin.game.clickedCardId = 
            window.parseInt(
              e.target.closest('[data-card-id]').dataset.cardId
            );

          const card = window.Munchkin.player.pickCardFromHand(window.Munchkin.game.clickedCardId);

          document.getElementById('equip').hidden = 
            card.type !== 'gear' || window.Munchkin.game.turn.monster;
          document.getElementById('hold').hidden = 
            card.type !== 'treasure' || window.Munchkin.game.turn.monster;;
        });

        document.addEventListener('click', (e) => {
          if (e.target.id === 'hold') {
            window.Munchkin.player.cardToInventory(
              window.Munchkin.game.clickedCardId, 
              'hold'
            );
            this.updateHoldCards();
            this.updateHand();
            window.Munchkin.player.updateStr();
            this.updatePlayer('str', window.Munchkin.player.str);
          } else if (e.target.id === 'equip') {
            window.Munchkin.player.cardToInventory(
              window.Munchkin.game.clickedCardId, 
              'equipped'
            );
            this.updateEquippedCards();
            this.updateHand();
            window.Munchkin.player.updateStr();
            this.updatePlayer('str', window.Munchkin.player.str);
          } else if (e.target.id === 'drop') {
            window.Munchkin.player.dropCard(
              'hand', 
              window.Munchkin.game.clickedCardId
            );
            this.updateHand();
          } else if (e.target.id === 'fight') {
            window.Munchkin.game.enableAdventurePhase();
          }
        });

        document.getElementById('nextPhase').addEventListener('click', () => {
          window.Munchkin.game.nextPhase();
        });
      }
    };
})();

