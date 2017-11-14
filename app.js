(() => {
	'use strict';

		window.Munchkin = window.Munchkin || {};

		let player = window.Munchkin.player;
		let cards = window.Munchkin.cards;
		let game = window.Munchkin.game;
		let ui = window.Munchkin.ui;
		let recall = [];

		game.start();

		// Next phase:

		// if (hand.length > 5) {
    //  window.Munchkin.ui.updateProgress(
    //    'You have more than 5 cards on your hand! \
    //    Drop some of them, before you can end your game.turn!'
    //   );
    // } else {
    //  allowNextgame.Turn();
    // }
})();