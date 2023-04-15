let dataBaseApiCats = [];
let cardIdDivForApiCat = document.querySelector('#edit #card_id');

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
const btnOpenPopupLogin = document.querySelector('#login');
const popupAdd = new Popup('popup-add');
const popupImage = new PopupShowImage('popup-cat-image');
const popupLogin = new Popup('popup-login');

// console.log(isAuth);
const formCatAdd = document.querySelector('#popup-form');
const formCatLogin = document.querySelector('#popup-form-login');
let newFormInfoApiCat = {};
const MAX_LIVE_STORAGE = 10;

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
            updateLocalStorage(formData, {type: 'ADD_CAT'});
            popupAdd.close();
          })
          .catch(function(err){
            console.log(err);
          }) 
    })
}

function handleClickCatImage(dataSrc) {
    popupImage.open(dataSrc)
}

function showFormApiCats(id, catsInfoVar, evt, clickEl) {
    starsDivInEditModal.innerHTML = '';
    catsInfoVar.forEach(el => {
        if (el.id === id) {
            formInfo = {...el}
        }
    })
    console.log(formInfo);
    // Array.from(formSub).find(e => e.id === "card_id").placeholder = `${id}`;
    formSub.forEach(e => { if (e.id === 'card_id') { e.textContent = id } }); 

    let infoPlaceholders = document.querySelectorAll('#edit-modal [type]');

    document.querySelector('#show__img img').src = formInfo?.img_link
    infoPlaceholders.forEach(el => {        
        if(el.type === 'checkbox') {
            el.checked = formInfo.favourite === true ? formInfo.favourite : false;
            // console.log(el.checked);
        }     
        if(el.type !== 'checkbox') {
            el.placeholder = formInfo[el.name];
            // el.placeholder = formInfo[`${el.name}`];
        }
        if(el.type === "url") {
            el.placeholder = 'Попробуй изменить внешность красавца';
        }   
    })

    setupStarsInEditForm(formInfo)
    if(formInfo.id === IDkotuh || formInfo.id === IDperchik) {
        submitButtonEdit.addEventListener('click', pushFormUpdateFor2Cats)
    } else {
        submitButtonEdit.addEventListener('click', pushFormUpdateButton) 
        document.querySelector('#edit-modal .modal-close').addEventListener('click', pushFormCloseButton)
    }                
}

function pushFormUpdateFor2Cats(event) {
    event.preventDefault()
    document.querySelector('#edit-modal .modal-close').addEventListener('click', pushFormCloseButton);
    console.log(formInfo.id);
    catSubmitFormInfo(event, formInfo.id);
    editModalPopup.classList.remove("active");
    submitButtonEdit.removeEventListener('click', pushFormUpdateFor2Cats)
}

function pushFormUpdateButton(event) {    
    event.preventDefault()
    id = Number(cardIdDivForApiCat.textContent);
    catSubmitApiCats(id);
    editModalPopup.classList.remove("active");
    submitButtonEdit.removeEventListener('click', pushFormUpdateButton);
}

function catSubmitApiCats(id) {
    // event.preventDefault();
    // let id = Array.from(formSub).find(e => e.id === "card_id").placeholder;
    newFormInfoApiCat.id = id;

    formSub.forEach(e => {
        if(e.name === "favourite") {
            newFormInfo["favorite"] = e.checked;
            newFormInfoApiCat["favourite"] = e.checked;
        } else if (e.name === "url" && e.value) {
            newFormInfo['image'] = !!e.value ? e.value : img.src;
            newFormInfoApiCat['img_link'] = !!e.value ? e.value : img.src;
        } else if (!!e.value && e.name !== "url") {
            newFormInfo[e.name] = e.type === 'number' ? Number(e.value) : e.value;
            newFormInfoApiCat[e.name] = e.type === 'number' ? Number(e.value) : e.value;
        }
    })
    // console.log(newFormInfo);

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
        updateLocalStorage(newFormInfoApiCat, {type: 'EDIT_CAT'});
    })
     .catch(function(err){
        console.log(err);
    })

    newFormInfo = {};
    editForm.reset()
}

function showUpdatedApiCat(newCatInfo, id) {
    let indexOfCat = dataBaseApiCats.length - dataBaseApiCats.findIndex(e => e.id === id) - 1;

    cardsContainer.removeChild(cardsContainer.children[indexOfCat]);
    const newElement = new Card(dataBaseApiCats[dataBaseApiCats.length - indexOfCat -1], "#card-template", handleClickCatImage);
    cardsContainer.insertBefore(newElement.getElement(), cardsContainer.children[indexOfCat]);

    const openEditApiCard = cardsContainer.children[indexOfCat].querySelector('h2');
    openEditApiCard.addEventListener('click', function data(event) {
        popupInit(id, dataBaseApiCats, event, this)
    })
}

function openEditApiCardTriggerFunc(catData){
    const openEditApiCard = document.querySelectorAll('.cards__container .card h2');
    openEditApiCard[openEditApiCard.length-1].addEventListener('click', function data(event) {
    popupInit(catData.id, catsInfo, event, this)        
    }) 
}

[catsInfo[IDkotuh-1], catsInfo[IDperchik-1]].forEach(catData => {
    const newElement = new Card(catData, "#card-template",handleClickCatImage);
    cardsContainer.append(newElement.getElement())
    openEditApiCardTriggerFunc(catData)
})

function showCardsApiCats(arr) {
    arr.forEach(catData => {
        const newElement = new Card(catData, "#card-template",handleClickCatImage);
        cardsContainer.prepend(newElement.getElement());
        const openEditApiCard = document.querySelector('.cards__container .card h2');
        openEditApiCard.addEventListener('click', function data(event) {
            popupInit(catData.id, dataBaseApiCats, event, this)
        })
    })
}

formCatAdd.addEventListener('submit', handleFormToCard)

popupAdd.setEventListener();
popupImage.setEventListener();
popupLogin.setEventListener();

btnAddCatPopup.addEventListener('click', (e) => {
    e.preventDefault();
    popupAdd.open();
})

btnOpenPopupLogin.addEventListener('click', (e) => {
    e.preventDefault();
    popupLogin.open();
})

function setDataRefresh(minute, key) {
    const setTime = new Date(new Date().getTime()+minute*60000);
    localStorage.setItem(key, setTime);
    return setTime;
}

function updateLocalStorage(data, action) {
    const oldStorage = JSON.parse(localStorage.getItem('cats'));

    switch (action.type) {
        case 'ADD_CAT':
            oldStorage.push(data);
            localStorage.setItem('cats', JSON.stringify(oldStorage))
            return
        case 'ALL_CATS':
            setDataRefresh(MAX_LIVE_STORAGE, 'catsRefresh')
            localStorage.setItem('cats', JSON.stringify(data))            
            return;    
        // case 'DELETE_CAT':
        //     const newStorage = oldStorage.filter(cat => cat.id !== data.id)
        //     localStorage.setItem('cats', JSON.stringify(newStorage))            
        //     return;    
        case 'EDIT_CAT':
            const updateStorage = oldStorage.map(cat => cat.id !== data.id ? cat : {...data, ...cat});
            localStorage.setItem('cats', JSON.stringify(updateStorage))            
            return;    
        default:
            break;
    }
}

function checkLocalStorage() {
    const localData = JSON.parse(localStorage.getItem('cats'));
    const getExpiredTime = localStorage.getItem('catsRefresh');

    if(localData && localData.length && new Date() < new Date(getExpiredTime)) {
        showCardsApiCats(localData);
        dataBaseApiCats = localData;
        console.log(localData);
    } else {
        api.getAllApiCats()
        .then(data => {
            dataBaseApiCats = data.map(({
                favorite: favourite,
                image: img_link,
                ...rest
            }) => ({
                favourite,
                img_link,
                ...rest
            }))
            // localStorage.setItem('cats', JSON.stringify(dataBaseApiCats))
            updateLocalStorage(dataBaseApiCats, {type: 'ALL_CATS'});
            showCardsApiCats(dataBaseApiCats);
            console.log(dataBaseApiCats);       
        })      
        .catch(function(err){
                console.log(err);
        }) 
    }
}

checkLocalStorage()

// popupImage.open('https://fikiwiki.com/uploads/posts/2022-02/1644991780_20-fikiwiki-com-p-prikolnie-kartinki-pro-kotov-21.jpg')


// console.log(localStorage);






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