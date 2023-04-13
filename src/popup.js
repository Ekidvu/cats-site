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
let newFormInfoApiCat = {};

btnAddCatPopup.addEventListener('click', (e) => {
    e.preventDefault();
    popupAdd.open();
})

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
        cardsContainer.prepend(newElement.getElement());
        const openEditApiCard = document.querySelector('.cards__container .card h2');
        openEditApiCard.addEventListener('click', function data() {
            popupInit(catData.id, dataBaseApiCats, event, this)
        })
    })
}

function showFormApiCats(id, catsInfoVar, evt, clickEl) {
    starsDivInEditModal.innerHTML = '';
    catsInfoVar.forEach(el => {
        if (el.id === id) {
            formInfo = {...el}
        }
    })
    console.log(formInfo);

    let infoPlaceholders = document.querySelectorAll('#edit-modal [type]');
    // if(formInfo.img_link) {
    //     document.querySelector('#show__img img').src = formInfo.img_link;
    // }
    document.querySelector('#show__img img').src = formInfo?.img_link
    infoPlaceholders.forEach(el => {        
        if(el.type === 'checkbox') {
            el.checked = formInfo.favourite === true ? formInfo.favourite : false;
            console.log(el.checked);
        }     
        if(el.type !== 'checkbox') {
            el.placeholder = formInfo[`${el.name}`];
        }
        if(el.type === "url") {
            el.placeholder = 'Попробуй изменить внешность красавца';
        }   
    })
        // switch (el.name) {
        //     case 'name':
        //         el.placeholder = formInfo.name;
        //     break
        //     case 'url':
        //         el.placeholder = formInfo.name;
        //     break
        //     case 'age':
        //         el.placeholder = formInfo.age;
        //     break
        //     case 'rate':
        //         el.placeholder = formInfo.rate;
        //     break
        //     case 'favourite':
        //         el.placeholder = formInfo.name;
        //     break
        //     case 'description':
        //         el.placeholder = formInfo.description;
        //     break
        // }
    setupStarsInEditForm(formInfo)
    if(formInfo.id === 7 || formInfo.id === 8) {
        setListenersOnSubmitAndCloseBtn(catSubmitFormInfo, formInfo.id)
    } else {
        setListenersOnSubmitAndCloseBtn(catSubmitApiCats, formInfo.id)
    }
                
}

function catSubmitApiCats(event, id) {
    event.preventDefault();

    formSub.forEach(e => {
        if(e.name === "favourite") {
            newFormInfo["favorite"] = e.checked;
            newFormInfoApiCat["favourite"] = e.checked;
        } else if (e.name === "url") {
            newFormInfo['image'] = !!e.value ? e.value : img.src;
            newFormInfoApiCat['img_link'] = !!e.value ? e.value : img.src;
        } else if (!!e.value && e.name !== "url") {
            newFormInfo[e.name] = e.value;
            newFormInfoApiCat[e.name] = e.value;
        }
    })
    console.log(newFormInfo);

    dataBaseApiCats = dataBaseApiCats.map(function(cat) {
        if (cat.id === id) {
            updatedCats = {...cat, ...newFormInfoApiCat};
            return updatedCats;
        }
    return cat; 
    })

    api.updateApiCatById(id, newFormInfo)
     .then(function() {
        showUpdatedApiCat(newFormInfoApiCat, id)
    })
     .catch(function(err){
        console.log(err);
    })

    // newFormInfoApiCat = {};
    newFormInfo = {};
    editForm.reset()
}

function showUpdatedApiCat(newCatInfo, id) {
    // dataBaseApiCats = [...dataBaseApiCats, ...newCatInfo]
    // let currentApiCat = dataBaseApiCats.findIndex(e => e.id === id)
    // newData = {...currentApiCat, ...newCatInfo};
    let indexOfCat = dataBaseApiCats.findIndex(e => e.id === id);
    cardsContainer.removeChild(cardsContainer.children[indexOfCat]);
    console.log(newCatInfo);
    const newElement = new Card(dataBaseApiCats[indexOfCat], "#card-template", handleClickCatImage);
    cardsContainer.insertBefore(newElement.getElement(), cardsContainer.children[indexOfCat]);

    const openEditApiCard = cardsContainer.children[indexOfCat].querySelector('h2');
    openEditApiCard.addEventListener('click', function data() {
        popupInit(id, dataBaseApiCats, event, this)
    })
}

function openEditApiCardTriggerFunc(catData){
    const openEditApiCard = document.querySelectorAll('.cards__container .card h2');
    openEditApiCard[openEditApiCard.length-1].addEventListener('click', function data() {
        popupInit(catData.id, catsInfo, event, this)
    })
}

[catsInfo[catsInfo.length-2], catsInfo[catsInfo.length-1]].forEach(catData => {
    const newElement = new Card(catData, "#card-template",handleClickCatImage);
    cardsContainer.append(newElement.getElement())
    openEditApiCardTriggerFunc(catData)
    // const openEditApiCard = document.querySelectorAll('.cards__container .card h2');
    // openEditApiCard[openEditApiCard.length-1].addEventListener('click', function data() {
    //     popupInit(catData.id, catsInfo, event, this)
    // })
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