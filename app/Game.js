import { Deck } from "./Deck.js";
import { Player } from "./Player.js";

class Game {
    constructor({ playerCards, dealerCards, player }) {
        this.player = player;
        this.playerCards = playerCards;
        this.dealerCards = dealerCards;
    }

    run() {
        const deck = new Deck();
        deck.shuffle();
    }

    dealCards() {
        for (let n = 0; n < 2; n++) {

            
        }
    }

}

const player = new Player('Player');
const game = new Game({
    player,
    playerCards: document.getElementById('playerCards'),
    dealerCards: document.getElementById('dealerCards')
});