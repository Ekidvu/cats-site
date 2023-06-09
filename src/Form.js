let modals = document.querySelectorAll('.modal');
let formSub = document.querySelectorAll('.modal [type]:not(.btn)');
let editForm = document.forms.edit;
let newFormInfo = {};
let formInfo;
let funcForShowCat
let updatedCats
let img = document.querySelector('form img');
let starsDivInEditModal = document.querySelector('#rate_stars_div_edit');


function setupStarsInEditForm(formInfo) {
    for (let i=0; i< (10-formInfo.rate); i++) { 
        starsDivInEditModal.innerHTML += '<i class="fa-regular fa-star"></i>' }
    for (let i=0; i<formInfo.rate; i++) {
        starsDivInEditModal.innerHTML += '<i class="fa-solid fa-star"></i>';
    }
}

const showForm = (id, catsInfoVar, evt) => {
    let infoPlaceholders = document.querySelectorAll('#edit [type]');
    starsDivInEditModal.innerHTML = '';
    img.src = '';
    // let check = document.querySelector('.cards__container').contains(evt.target);
    // if(check) {
    //     catsInfoVar.forEach(el => {
    //         if (el.id === id) {
    //             formInfo = {...el}
    //         }
    //     })        
    // } else {
    //     formInfo = {...catsInfoVar[id-1]};
    // }
    formInfo = {...catsInfoVar[id-1]};

    if (id === false) {
    for (let i=0;i<infoPlaceholders.length;i++) {
    if (infoPlaceholders[i].type === "checkbox") {
        infoPlaceholders[i].checked = false;
    } else if (infoPlaceholders[i].type === "url") {
        infoPlaceholders[i].placeholder = "Ссылка на изображение";
    } else if (infoPlaceholders[i].name === "name") {
        infoPlaceholders[i].placeholder = "Введите имечко";
    } else if (infoPlaceholders[i].name === "age") {
        infoPlaceholders[i].placeholder = "Обозначить живучесть";
    } else if (infoPlaceholders[i].name === "rate") {
        infoPlaceholders[i].placeholder = "Выбрать няшность";
    } else if (infoPlaceholders[i].name === "description") {
        infoPlaceholders[i].placeholder = "Опишите красавца";
    }; }
    } else {    
    console.log(formInfo);
    for (let i=0;i<infoPlaceholders.length;i++) {
        if (infoPlaceholders[i].type === "checkbox") {
            console.log(infoPlaceholders[i].checked);
            infoPlaceholders[i].checked = formInfo["favourite"];            
        } else if (infoPlaceholders[i].type === "url") {
            img.src = formInfo.img_link;
            infoPlaceholders[i].placeholder = "Ссылка на изображение";
        } else if (infoPlaceholders[i].id === "card_id") {
            infoPlaceholders[i].placeholder = `${id}`;
        } else {
            for (let key in formInfo) { 
                if (key === infoPlaceholders[i].name) {
                    infoPlaceholders[i].placeholder = formInfo[key];
                }
    }}}

    setupStarsInEditForm(formInfo)
    }
};

function updateCatInfoAfterEditForm() {
    newData = {...formInfo, ...newFormInfo};
    catsInfo = catsInfo.map(function(cat) {
        if (cat.id === newData.id) {
            updatedCats = {...cat, ...newData};
            return updatedCats;
        }
    return cat; 
    })  
}

function catSubmitFormInfo(event) {
    event.preventDefault();
    let id = Array.from(formSub).find(e => e.id === "card_id").placeholder;

    formSub.forEach(e => {
        if(e.name === "favourite") {
            newFormInfo["favourite"] = e.checked;
        } else if (e.name === "url") {
            newFormInfo['img_link'] = !!e.value ? e.value : img.src;
        } else if (e.value && e.name !== "url") {
            newFormInfo[e.name] = e.value;
        }
    })
  
    console.log(catsInfo);
    let titleOfForm = document.querySelector('#edit').previousElementSibling;
    if (titleOfForm.innerText === "Добавить красавца!") {
        let newCat = {};
        newCat = {            
            ...newFormInfo,
            id: catsInfo.length + 1
        } 
        catsInfo.push(newCat)
        console.log(catsInfo);
    } else if (titleOfForm.innerText === "Смотр красавца!") {
        updateCatInfoAfterEditForm()
        renewKotuhIPerchik(newData.id);
    }

    formInfo = {};
    newFormInfo = {};
    editForm.reset()
    showAllCats(catsInfo)
    editModalPopup.classList.remove("active");
    submitButtonEdit.removeEventListener('click', catSubmitFormInfo);    
} 

function showCatInfo(id,cats) {
    let currentCat = {...catsInfo[id-1]};   
    let imgDiv = document.querySelector('#show__img__label img');
    imgDiv.src = currentCat.img_link;
    let showCatDesc = document.querySelector('#description');
    showCatDesc.firstChild.innerText = `${currentCat.name}, ${currentCat.age}`;

    document.querySelector('#stars_block_info').innerHTML = '';
    showCatDesc.lastChild.innerText = `${currentCat.description}`;
    document.querySelector('#show-modal-container .modal-close').addEventListener('click', function closeShowModal() {
        document.querySelector('#show-modal-container').classList.remove('active');
        document.querySelector('#show-modal-container .modal-close').removeEventListener('click', closeShowModal)
    })
    for (let i=0; i < (10-currentCat.rate); i++) { 
        document.querySelector('#stars_block_info').innerHTML += '<i class="fa-regular fa-star"></i>';
    }
    for (let i=0; i<currentCat.rate;i++) {
        document.querySelector('#stars_block_info').innerHTML += '<i class="fa-solid fa-star"></i>';
    }
    if (currentCat.favourite === true) {
        document.querySelector('#description div').innerHTML = '<i class="fa-solid fa-heart overview_cat_like"></i>';
    } else if (currentCat.favourite === false) {
        document.querySelector('#description div').innerHTML = '<i class="fa-regular fa-heart overview_cat_like"></i>';
    }
}

