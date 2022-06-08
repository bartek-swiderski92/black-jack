import { Player } from "./Player.js";
import { Table } from "./Table.js";
import { Deck } from "./Deck.js";

const player = new Player('Player');
const dealer = new Player('Dealer');
const deck = new Deck();

class Game {
    constructor({ player, dealer, table, deck, hitButton, stayButton }) {
        this.player = player;
        this.dealer = dealer
        this.table = table;
        this.deck = deck;
        this.deck.shuffle();
        this.hitButton = hitButton;
        this.stayButton = stayButton;
    }

    run() {
        this.hitButton.addEventListener('click', () => this.hitCard());
        this.dealCards();
    }

    hitCard() {
        const card = this.deck.pickOne();
        this.player.hand.addCard(card);
        this.table.showPlayerCard(card);
    }

    dealCards() {
        for (let n = 0; n < 2; n++) {
            let card1 = this.deck.pickOne();
            this.player.hand.addCard(card1);
            this.table.showPlayerCard(card1);

            let card2 = this.deck.pickOne();
            this.dealer.hand.addCard(card2);
            this.table.showDealerCard(card2);
        }
    }

}


const table = new Table(
    document.getElementById('playerCards'),
    document.getElementById('dealerCards')
);

const game = new Game({
    player,
    dealer,
    table,
    deck,
    hitButton: document.getElementById('hit'),
    stayButton: document.getElementById('stay'),
});


game.run();