import { Player } from "./Player.js";
import { Table } from "./Table.js";
import { Deck } from "./Deck.js";

const player = new Player('Player');
const dealer = new Player('Dealer');
const deck = new Deck();

class Game {
    constructor({ player, dealer, table, deck, hitButton, stayButton, dealerPoints, playerPoints }) {
        this.player = player;
        this.dealer = dealer
        this.table = table;
        this.deck = deck;
        this.deck.shuffle();
        this.hitButton = hitButton;
        this.stayButton = stayButton;
        this.dealerPoints = dealerPoints;
        this.playerPoints = playerPoints;
    }

    run() {
        this.hitButton.addEventListener('click', () => this.hitCard());
        this.dealCards();
    }

    hitCard() {
        const card = this.deck.pickOne();
        this.player.hand.addCard(card);
        this.table.showPlayerCard(card);
        this.playerPoints.innerHTML = this.player.calculatePoints();

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

        this.playerPoints.innerHTML = this.player.calculatePoints();
        this.dealerPoints.innerHTML = this.dealer.calculatePoints();
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
    dealerPoints: document.getElementById('dealerPoints'),
    playerPoints: document.getElementById('playerPoints'),
});


game.run();