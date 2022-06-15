import { enumValues } from "./Game.js";

export class Message {
    constructor(element) {
        this.element = element;
    }

    setText(message) {
        this.element.innerHTML = message + `<button id="restart">${enumValues.restartGameButton}</button>`
        document.getElementById('restart').addEventListener('click', () => location.reload())
        return this;
    }

    show() {
        this.element.style.display = 'flex'
    }

    hide() {
        this.element.style.display = 'none';
    }
};