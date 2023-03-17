
// console.log(catsInfo);

// document.querySelector('.card .btn').addEventListener('click', )
// let actions = document.querySelector('[data-action]');
let modals = document.querySelectorAll('.modal');
let formSub = document.querySelectorAll('[type]:not(.btn)');
let editForm = document.forms.edit;
let newFormInfo = {};
let formInfo;
let funcForShowCat
let updatedCats
let img = document.querySelector('form img');

// let partsOfCards = document.querySelectorAll(`.part_of_card:not(:nth-child(2))`);
// let addForm = document.forms.add;

let refresh = () => { 
    modals.forEach(m=> {
        let close = m.querySelector('.modal-close');
        close.addEventListener('click', () => {
            m.classList.remove('active');
        })
        editForm.reset();
    });
}
refresh()

/* <label for="upd__img">Новое изображение</label>
<input id="upd__img" name="url" type="url" placeholder="Ссылка на изображение"> */

const showForm = (id,cats) => {
    let infoPlaceholders = document.querySelectorAll('[type]');
    // let img = document.querySelector('form img');
    let cardElem = document.querySelector(`#id_${id}`);
    console.log(cardElem)

    if (id === false) {
    for (let i=0;i<infoPlaceholders.length;i++) {
    if (infoPlaceholders[i].type === "checkbox") {
        infoPlaceholders[i].checked = false;
    } else if (infoPlaceholders[i].type === "url") {
        infoPlaceholders[i].placeholder = "Ссылка на изображение";
        img.src = '';
    } else if (infoPlaceholders[i].name === "name") {
        infoPlaceholders[i].placeholder = "Введите имечко";
    } else if (infoPlaceholders[i].name === "age") {
        infoPlaceholders[i].placeholder = "Обозначить живучесть";
    } else if (infoPlaceholders[i].name === "rate") {
        infoPlaceholders[i].placeholder = "Выбрать няшность";
    } else if (infoPlaceholders[i].name === "description") {
        infoPlaceholders[i].placeholder = "Опишите красавца";
    };
    }} else {
    formInfo = {...catsInfo[id-1]};
    console.log(formInfo);
    console.log(catsInfo);
    for (let i=0;i<infoPlaceholders.length;i++) {
        if (infoPlaceholders[i].type === "checkbox") {
            infoPlaceholders[i].checked = formInfo["favourite"] === true ? "on" : "off";
        } else if (infoPlaceholders[i].type === "url") {
            img.src = formInfo.img_link;
            // formInfo.img_link = '';
            console.log(formInfo.img_link);
            console.log(cardElem.style.background);
        } else {
            for (let key in formInfo) { 
                if (key === infoPlaceholders[i].name) {
                    infoPlaceholders[i].placeholder = formInfo[key];
                }
            }}
        }
    }

    document.querySelector('#btn__upd').addEventListener('click', () => {
        document.querySelector('#edit-modal').classList.remove("active");
        // editForm.reset();
        refresh()
    });
};

catSubmitFormInfo = (event) => {
    event.preventDefault();
    
    formSub.forEach(e => {
        if(e.name === "favourite") {
            newFormInfo["favourite"] = e.value;
            console.log(e.value);
            console.log(document.querySelector('#upd__favour').attributes.specified); 
            console.log(document.querySelector('#upd__favour').value); 
            // === 'on' ? true : false;
        } else if (e.name === "url" && e.value) {
            newFormInfo['img_link'] = e.value;
            document.querySelector('#upd__img').value = "";
            // img.src = '';
            console.log(newFormInfo['img_link']);
        } else if (e.value) {
            newFormInfo[e.name] = e.value; 
        }
    })
    // editForm.reset();
    // console.log(formSub);    
    // console.log(document.querySelector('#upd__img').value);    
    // console.log(document.querySelector('#show__img img').src);    

    if (document.querySelector('#edit').previousElementSibling.innerText === "Добавить красавца!") {
        let newCat = {            
            ...newFormInfo,
            id: catsInfo.length + 1
        } 
        catsInfo.push(newCat)
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
    refresh()


    showAllCats(catsInfo)    
} 

function showCatInfo(id,cats) {

    // console.log(catsInfo);
    let currentCat = {...catsInfo[id-1]};
    
    let imgDiv = document.querySelector('#show__img__label img');
    imgDiv.src = currentCat.img_link;
    let showCatDesc = document.querySelector('#description');
    showCatDesc.firstChild.innerText = `${currentCat.name}, ${currentCat.age}`;
    showCatDesc.lastChild.innerText = `${currentCat.description}`;     
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


