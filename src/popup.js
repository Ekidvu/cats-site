let dataBaseApiCats = [];

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

function handleFormToCard(e) {
    e.preventDefault();
    const elementsFormCat = [...formCatAdd.elements];
    const formData = serializeForm(elementsFormCat);

    const formDataForApiServer = [formData].map(({
        favourite: favorite,
        img_link: image,
        ...rest
    }) => ({
        favorite,
        image,
        ...rest
    }))
    formDataForApiServer.forEach(cat => {
        api.addNewApiCat(cat)
          .then(function() {
            showCardsApiCats([formData])
          })
          .catch(function(err){
            console.log(err);
          }) 
    })
    
    popupAdd.close();
}

function handleClickCatImage(dataSrc) {
    popupImage.open(dataSrc)
}

function showCardsApiCats(arr) {
    arr.forEach(catData => {
        const newElement = new Card(catData, "#card-template",handleClickCatImage);
        cardsContainer.prepend(newElement.getElement())
        // console.log(catData.id);
        const openEditApiCard = document.querySelector('.cards__container .card h2')
        // console.log(openEditApiCard);
        openEditApiCard.addEventListener('click', function data() {
            popupInit(catData.id, dataBaseApiCats, event, this)
        })
        // popupInit(catData.id, dataBaseApiCats, evt)
    })
}

// showCardsApiCats([catsInfo[9], catsInfo[10]])
[catsInfo[catsInfo.length-2], catsInfo[catsInfo.length-1]].forEach(catData => {
    const newElement = new Card(catData, "#card-template",handleClickCatImage);
    cardsContainer.append(newElement.getElement())
    const openEditApiCard = document.querySelectorAll('.cards__container .card h2');
    openEditApiCard[openEditApiCard.length-1].addEventListener('click', function data() {
        popupInit(catData.id, catsInfo, event, this)
    })
})

formCatAdd.addEventListener('submit', handleFormToCard)

popupAdd.setEventListener();
popupImage.setEventListener();

api.getAllApiCats()
  .then(data => {
    // dataBaseApiCats = data;
    dataBaseApiCats = data.map(({
        favorite: favourite,
        image: img_link,
        ...rest
    }) => ({
        favourite,
        img_link,
        ...rest
    }))
    console.log(dataBaseApiCats);
    showCardsApiCats(dataBaseApiCats)
 })
  .catch(function(err){
    console.log(err);
    }) 


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