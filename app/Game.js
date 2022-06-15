import { Player } from "./Player.js";
import { Table } from "./Table.js";
import { Deck } from "./Deck.js";
import { Message } from "./Message.js";


export const enumValues = {
    player: 'Player',
    opponent: 'Dealer',
    playerWins: 'Player Wins!',
    opponentWins: 'Dealer Wins!',
    tie: 'Tie!',
    restartGameButton: 'Play Again!'
}
export const pointsToWin = 21;


const player = new Player(enumValues.player);
const dealer = new Player(enumValues.opponent);
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
    };

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

        if (this.player.points > pointsToWin) {
            this.endGame();
        };
    };

    dealCards() {
        for (let n = 0; n < 2; n++) {
            let card1 = this.deck.pickOne();
            this.player.hand.addCard(card1);
            this.table.showPlayerCard(card1);

            let card2 = this.deck.pickOne();
            this.dealer.hand.addCard(card2);
            this.table.showDealerCard(card2);
        };

        this.playerPoints.innerHTML = this.player.calculatePoints();
        this.dealerPoints.innerHTML = this.dealer.calculatePoints();
    };

    dealerPlays() {
        while (this.dealer.points <= this.player.points && this.dealer.points <= pointsToWin && this.player.points <= pointsToWin) {
            const card = this.deck.pickOne();
            this.dealer.hand.addCard(card);
            this.table.showDealerCard(card);
            this.dealerPoints.innerHTML = this.dealer.calculatePoints()
        }
        this.endGame();
    };

    endGame() {
        this.hitButton.removeEventListener('click', (event) => this.hitCard());
        this.stayButton.removeEventListener('click', (event) => this.dealerPlays());

        this.hitButton.style.display = 'none';
        this.stayButton.style.display = 'none';

        if (this.player.points < pointsToWin && this.player.points == this.dealer.points) {
            this.messageBox.setText(enumValues.tie).show();

            return
        }

        if (this.player.points > pointsToWin) {
            this.messageBox.setText(enumValues.opponentWins).show();

            return
        }

        if (this.dealer.points > pointsToWin) {
            this.messageBox.setText(enumValues.playerWins).show();

            return
        }

        if (this.player.points > pointsToWin) {
            this.messageBox.setText(enumValues.playerWins).show();

            return
        }

        if (this.player.points < this.dealer.points) {
            this.messageBox.setText(enumValues.opponentWins).show();

            return
        }
    };
};


const game = new Game({ player, dealer, table, deck, hitButton, stayButton, dealerPoints, playerPoints, messageBox });

game.run();