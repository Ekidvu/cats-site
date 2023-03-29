class Popup {
#popupElement;
#selectorPopup;

    constructor(selectorPopup) {
        this.#popupElement = document.querySelector(selectorPopup);
        this.#selectorPopup = selectorPopup;
    }

    open() {
        this.#popupElement.classList.add(`${this.#selectorPopup}_active`)
    }

    close() {
        this.#popupElement.classList.remove(`${this.#selectorPopup}_active`)
    }
}