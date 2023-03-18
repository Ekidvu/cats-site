
// console.log(catsInfo);

// document.querySelector('.card .btn').addEventListener('click', )
// let actions = document.querySelector('[data-action]');
let modals = document.querySelectorAll('.modal');
let formSub = document.querySelectorAll('.modal [type]:not(.btn)');
let editForm = document.forms.edit;
let newFormInfo = {};
let formInfo;
let funcForShowCat
let updatedCats
let img = document.querySelector('form img');
let starsDivInEditModal = document.querySelector('#rate_stars_div_edit');


const showForm = (id,catsInfo) => {
    let infoPlaceholders = document.querySelectorAll('[type]');
    let cardElem = document.querySelector(`#id_${id}`);
    starsDivInEditModal.innerHTML = '';
    img.src = '';

    if (id === false) {
    for (let i=0;i<infoPlaceholders.length;i++) {
    if (infoPlaceholders[i].type === "checkbox") {
        // infoPlaceholders[i].checked = false;
    } else if (infoPlaceholders[i].type === "url") {
        infoPlaceholders[i].placeholder = "Ссылка на изображение";
        // img.src = '';
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
    formInfo = {...catsInfo[id-1]};
    for (let i=0;i<infoPlaceholders.length;i++) {
        if (infoPlaceholders[i].type === "checkbox") {
            console.log(infoPlaceholders[i].checked);
            infoPlaceholders[i].checked = formInfo["favourite"];            
        } else if (infoPlaceholders[i].type === "url") {
            img.src = formInfo.img_link;
        } else if (infoPlaceholders[i].id === "card_id") {
            infoPlaceholders[i].placeholder = `${id}`;
        } else {
            for (let key in formInfo) { 
                if (key === infoPlaceholders[i].name) {
                    infoPlaceholders[i].placeholder = formInfo[key];
                }
            }}
        }
    for (let i=0; i< (10-formInfo.rate); i++) { 
        starsDivInEditModal.innerHTML += '<i class="fa-regular fa-star"></i>' }
    for (let i=0; i<formInfo.rate; i++) {
        starsDivInEditModal.innerHTML += '<i class="fa-solid fa-star"></i>';
    }
    }

   
    // console.log(infoPlaceholders);   
    // console.log(editForm);
    document.querySelector('#btn__upd').addEventListener('click', function pushFormUpdateButton(event) {
        catSubmitFormInfo(event);
        document.querySelector('#edit-modal').classList.remove("active");
        document.querySelector('#btn__upd').removeEventListener('click', pushFormUpdateButton);
    });
    document.querySelector('#edit-modal .modal-close').addEventListener('click', function pushFormCloseButton() {
        document.querySelector('#edit-modal').classList.remove("active");
        document.querySelector('#edit-modal .modal-close').removeEventListener('click', pushFormCloseButton)
    })
    // editForm.reset()
};
// console.log(document.querySelector(`#id_4`).style.backgroundImage.slice(4,-1));

catSubmitFormInfo = (event) => {
    event.preventDefault();
    let id = Array.from(formSub).find(e => e.id === "card_id").placeholder;

    formSub.forEach(e => {
        if(e.name === "favourite") {
            newFormInfo["favourite"] = e.checked;
        } else if (e.name === "url") {
            // newFormInfo['img_link'] === e.value;
            newFormInfo['img_link'] = !!e.value ? e.value : img.src;
            //  document.querySelector(`#id_${id}`).style.backgroundImage.slice(4,-1);
            // console.log(e.value);
            // console.log(e.name);
            // console.log(newFormInfo);
            // console.log(newFormInfo['img_link']);
        } else if (e.value && e.name !== "url") {
            newFormInfo[e.name] = e.value;
        }
    })

    // editForm.reset();
    // console.log(formSub);    
    // console.log(document.querySelector('#upd__img').value);    
    // console.log(document.querySelector('#show__img img').src);    
    console.log(catsInfo);
    if (document.querySelector('#edit').previousElementSibling.innerText === "Добавить красавца!") {
        let newCat = {};
        newCat = {            
            ...newFormInfo,
            id: catsInfo.length + 1
        } 
        catsInfo.push(newCat)
        console.log(catsInfo);
    } else {
        newData = {...formInfo, ...newFormInfo};
        catsInfo = catsInfo.map(function(cat) {
            if (cat.id === newData.id) {
                updatedCats = {...cat, ...newData};
                return updatedCats;
            }
        // console.log(updatedCats); 
        return cat; 
        })  
    }
    // console.log(catsInfo);
    // refresh()

    editForm.reset()
    showAllCats(catsInfo)    
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
        document.querySelector('#show-modal-container .modal-close').addEventListener('click', closeShowModal)
    })
    for (let i=0; i < (10-currentCat.rate); i++) { 
        document.querySelector('#stars_block_info').innerHTML += '<i class="fa-regular fa-star"></i>';
    }
    for (let i=0; i<currentCat.rate;i++) {
        document.querySelector('#stars_block_info').innerHTML += '<i class="fa-solid fa-star"></i>';
    }         
}

// const setNewCat = (dataNewCat, callback) => {
//     const newCat = {            
//         ...dataNewCat,
//         id: cats.length + 1
//     }

//     let switchNewCatIsNew;
//     cats.forEach((e,i)=> {
//         switchNewCatIsNew = e.name !== newCat.name && e.age !== newCat.age && e.description !== newCat.description ? true : false
//     })
//     if (switchNewCatIsNew === true) { cats.push(newCat) }
    
//     callback(newCat)  
// }

// const catEditForm = (id, newData, callback) => {
//     // let updatedCats = null;
//     catsInfo = catsInfo.map(function(cat) {
//         if (cat.id === id) {
//             updatedCats = {...cat, ...newData};
//             return updatedCats;
//         }
//         // console.log(updatedCats); 
//         return cat; 
//     })        
//     console.log(updatedCats);
//     // catsInfo = updatedCats;
//     callback(updatedCats);
// }


