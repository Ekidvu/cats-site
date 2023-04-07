
const cardsContainer = document.querySelector('.cards__container')

class Card {
    #data;
    #selectorTemplate;
    #element;
    #handleClickCatImage

    #getTemplate(){
        const template = document.querySelector(this.#selectorTemplate).content.querySelector('.card');
        return template
    }

    constructor(data, selectorTemplate, handleClickCatImage) {
        this.#data = data;
        this.#selectorTemplate = selectorTemplate;
        this.#handleClickCatImage = handleClickCatImage;
    }

    getElement(){
        this.#element = this.#getTemplate().cloneNode(true);
        const cardTitleElement = this.#element.querySelector('.card__name');
        const cardImageElement = this.#element.querySelector('.card__image');
        const cardLikeElement = this.#element.querySelector('.card__like');

        cardTitleElement.textContent = this.#data.name;
        cardImageElement.src = this.#data.img_link;
        
        if(!this.#data.favourite) {
            cardLikeElement.remove();
        }
        
        cardImageElement.addEventListener('click', () => {
            this.#handleClickCatImage(this.#data.img_link)
        })

        //Наполнять карточку
        return this.#element;
    }
}






// let catsInfo;


// const setNewCat = (dataNewCat, callback) => {
//     const newCat = {            
//         ...dataNewCat,
//         id: cats.length + 1
//     }

//------Template--------//

// const template = document.querySelector('#card-template');
// const newCatElement = template.content.querySelector('.card');

// cards.append(newCatElement.cloneNode(true))
// cards.prepend(newCatElement.cloneNode(true))

// const newElement = new Card(cats[0], "#card-template");