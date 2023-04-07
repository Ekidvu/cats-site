class Popup {
    #handleEscapeUp = (evt) => {
        if(evt.key === 'Escape') {
            console.log(this);
            this.close();
        }
    } 

    constructor(classPopup) {
        this._popupElement = document.querySelector(`.${classPopup}`);
    }

    open() {
        this._popupElement.classList.add(`popup_active`)
        document.addEventListener('keyup', this.#handleEscapeUp)
    }

    close() {
        this._popupElement.classList.remove(`popup_active`)
        document.removeEventListener('keyup', this.#handleEscapeUp)
    }

    setEventListener() {
        this._popupElement.addEventListener('mousedown', evt => {
            // console.log(evt.target);
            if(evt.target.classList.contains('popup') || !!evt.target.closest('.popup__close')) {
                this.close()
            }
        })
    }
}

class PopupShowImage extends Popup {
    constructor(className) {
        super(className)
    }
    open(dataImage){
        const imagePopup = this._popupElement.querySelector('.popup__image')
        imagePopup.src = dataImage;

        super.open()
    }
}

const btnAddCatPopup = document.querySelector('#addNewCat');
const popupAdd = new Popup('popup-add');
const popupImage = new PopupShowImage('popup-cat-image');

const formCatAdd = document.querySelector('#popup-form');


btnAddCatPopup.addEventListener('click', (e) => {
    e.preventDefault();
    popupAdd.open();
})

// popupAdd.open()

// console.log(document.querySelector(`.popup`));



function serializeForm(elements) {
    const formData = {};

    elements.forEach(input => {
        if(input.type === 'submit' || input.type === 'button') return;
        if(input.type === 'checkbox') {
            formData[input.name] = input.checked;
            console.log(input.checked);
        }
        if(input.type !== 'checkbox') {
            formData[input.name] = input.value;
        }

    })
    return formData
}

function handleFormAddCat(e) {
    e.preventDefault();
    const elementsFormCat = [...formCatAdd.elements];
    const formData = serializeForm(elementsFormCat);

    const newElement = new Card(formData, "#card-template", handleClickCatImage);
    cardsContainer.prepend(newElement.getElement())

    popupAdd.close();
}

function handleClickCatImage(dataSrc) {
    popupImage.open(dataSrc)
}

[catsInfo[9], catsInfo[10]].forEach(catData => {
    const newElement = new Card(catData, "#card-template",handleClickCatImage);
    cardsContainer.append(newElement.getElement())
})

formCatAdd.addEventListener('submit', handleFormAddCat)

popupAdd.setEventListener();
popupImage.setEventListener();

// popupImage.open('https://fikiwiki.com/uploads/posts/2022-02/1644991780_20-fikiwiki-com-p-prikolnie-kartinki-pro-kotov-21.jpg')













/*--- первый вариант класса popup*/

// class Popup2 {
//     #popupElement;
//     #classPopup;

//     #handleEscapeUp = (evt) => {
//         if(evt.key === 'Escape') {
//             console.log(this);
//             this.close();
//         }
//     } 

//     constructor(classPopup) {
//         this.#popupElement = document.querySelector(`.${classPopup}`);
//         this.#classPopup = classPopup;
//     }

//     open() {
//         this.#popupElement.classList.add(`${this.#classPopup}_active`)
//         document.addEventListener('keyup', this.#handleEscapeUp)
//     }

//     close() {
//         this.#popupElement.classList.remove(`${this.#classPopup}_active`)
//         document.removeEventListener('keyup', this.#handleEscapeUp)
//     }

//     setEventListener() {
//         this.#popupElement.addEventListener('mousedown', evt => {
//             // console.log(evt.target);
//             if(evt.target.classList.contains(this.#classPopup) || !!evt.target.closest('.popup__close')) {
//                 this.close()
//             }
//         })
//     }
// }