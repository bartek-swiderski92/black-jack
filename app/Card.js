export class Card {
    mapTextToSIgn = {
        hearts: "&hearts;",
        spades: "&spades;",
        diamonds: "&diamonds;",
        clubs: "&clubs;",
    }

    constructor(weight, type) {
        this.weight = weight;
        this.type = type;
    }

    render() {
        const card = document.createElement('div');
        card.setAttribute('class', `card ${this.type}`);
        card.innerHTML = `${this.weight} ${this.mapTextToSIgn[this.type]}`;
        
        return card
    }

}