import { Player } from "./Player.js";
import { Deck } from "./Deck.js";

class Game {
    constructor({ playerCards, dealerCards, player }) {
        this.player = player;
        this.dealer = new Player('Dealer')
        this.playerCards = playerCards;
        this.dealerCards = dealerCards;
        this.deck = new Deck();
        this.deck.shuffle();
    }

    run() {
        this.dealCards()
    }

    dealCards() {
        for (let n = 0; n < 2; n++) {
            let card1 = this.deck.pickOne();
            this.player.hand.addCard(card1);
            this.playerCards.appendChild(card1.render());

            let card2 = this.deck.pickOne();
            this.dealer.hand.addCard(card2);
            this.dealerCards.appendChild(card2.render());
        }
    }

}

const player = new Player('Player');
const game = new Game({
    player,
    playerCards: document.getElementById('playerCards'),
    dealerCards: document.getElementById('dealerCards')
});

game.run();