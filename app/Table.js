export class Table {
    constructor(playerCards, dealerCards) {
        this.dealerCards = dealerCards;
        this.playerCards = playerCards;
    }

    showPlayerCard(card) {
        this.playerCards.appendChild(card.render());
    }

    showDealerCard(card) {
        this.dealerCards.appendChild(card.render());
    }

}