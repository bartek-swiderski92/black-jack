import { Player } from "./Player.js";
import { Table } from "./Table.js";
import { Deck } from "./Deck.js";
import { Message } from "./Message.js";

const player = new Player('Player');
const dealer = new Player('Dealer');
const deck = new Deck();
const table = new Table(
    document.getElementById('playerCards'),
    document.getElementById('dealerCards')
);
const messageBox = new Message(document.getElementById('message'));

const hitButton = document.getElementById('hit');
const stayButton = document.getElementById('stay');
const dealerPoints = document.getElementById('dealerPoints');
const playerPoints = document.getElementById('playerPoints');


class Game {
    constructor({ player, dealer, table, deck, hitButton, stayButton, dealerPoints, playerPoints, messageBox }) {
        this.player = player;
        this.dealer = dealer
        this.table = table;
        this.deck = deck;
        this.hitButton = hitButton;
        this.stayButton = stayButton;
        this.dealerPoints = dealerPoints;
        this.playerPoints = playerPoints;
        this.messageBox = messageBox;
    }

    run() {
        this.deck.shuffle();
        this.hitButton.addEventListener('click', () => this.hitCard());
        this.stayButton.addEventListener('click', () => this.dealerPlays());
        this.dealCards();
    }

    hitCard() {
        const card = this.deck.pickOne();
        this.player.hand.addCard(card);
        this.table.showPlayerCard(card);
        this.playerPoints.innerHTML = this.player.calculatePoints();

        if (this.player.points > 21) {
            this.endGame();
        };
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

    dealerPlays() {
        while (this.dealer.points <= this.player.points && this.dealer.points <= 21 && this.player.points <= 21) {
            const card = this.deck.pickOne();
            this.dealer.hand.addCard(card);
            this.table.showDealerCard(card);
            this.dealerPoints.innerHTML = this.dealer.calculatePoints()
        }
        this.endGame();
    }

    endGame() {
        this.hitButton.removeEventListener('click', (event) => this.hitCard());
        this.stayButton.removeEventListener('click', (event) => this.dealerPlays());

        this.hitButton.style.display = 'none';
        this.stayButton.style.display = 'none';
        

        if (this.player.points < 21 && this.player.points == this.dealer.points) {
            this.messageBox.setText('Tie!').show();

            return
        }

        if (this.player.points > 21) {
            this.messageBox.setText('Dealer wins!').show();

            return
        }

        if (this.dealer.points > 21) {
            this.messageBox.setText('Player wins!').show();

            return
        }

        if (this.player.points > 21) {
            this.messageBox.setText('Player wins!').show();

            return
        }

        if (this.player.points < this.dealer.points) {
            this.messageBox.setText('Dealer wins!').show();

            return
        }

    }
}


const game = new Game({ player, dealer, table, deck, hitButton, stayButton, dealerPoints, playerPoints, messageBox });

game.run();