
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
// let partsOfCards = document.querySelectorAll(`.part_of_card:not(:nth-child(2))`);
// let addForm = document.forms.add;

let refresh = () => { 
    modals.forEach(m=> {
        let close = m.querySelector('.modal-close');
        close.addEventListener('click', () => {
            m.classList.remove('active');
            editForm.reset();
        })
    });
}
refresh()

{/* <label for="upd__name">Имя питомца</label>
<input id="upd__name" name="name" placeholder="Введите имечко" type="text" >
</div>
<div class="form__info form-span-2">
<label id="show__img"><img src="" alt=""></label>
</div>
<div class="form__info form-span-3">
<label for="upd__img">Новое изображение</label>
<input id="upd__img" name="url" type="url" placeholder="Ссылка на изображение">
</div>
<div class="form__info">
<label for="upd__age">Возраст</label>
<input id="upd__age" name="age" type="number" min="0" max="50" placeholder="Обозначить живучесть">
</div>
<div class="form__info">
<label for="upd__rate" >Рейтинг</label>
<input id="upd__rate" name="rate" type="number" min="0" max="10" placeholder="Выбрать няшность">
</div>
<div class="form__info" id="editCatLikeDiv">            
<input id="upd__favour" name="favourite" type="checkbox">
<label for="upd__favour">любо!</label>
</div>
<div class="form__info form-span-3">
<label for="upd__text" placeholder="Введите что-нибудь">Описание</label>
<textarea id="upd__text" name="description" type="text" rows="3" placeholder="Опишите красавца"></textarea>
</div>
<button class="btn" id="btn__upd" type="submit" onclick="catSubmitFormInfo(event)">Обновить</button>
</form> */}

const showForm = (id,cats) => {
    if (id<0) {
    let infoPlaceholders = document.querySelectorAll('[type]');
    let img = document.querySelector('form img');
    for (let i=0;i<infoPlaceholders.length;i++) {
    if (infoPlaceholders[i].type === "checkbox") {
        infoPlaceholders[i].checked = false;
    } else if (infoPlaceholders[i].type === "url") {
        infoPlaceholders[i] = "Ссылка на изображение"; 
    } else if (infoPlaceholders[i].name = 'name') {
        infoPlaceholders[i] = "Введите имечко";
    } else if (infoPlaceholders[i].name = "rate") {
        infoPlaceholders[i] = "Выбрать няшность";
    } else if (infoPlaceholders[i].name = "description") {
        infoPlaceholders[i] = "Опишите красавца";
    };
    } else {
    formInfo = {...catsInfo[id-1]};
    let infoPlaceholders = document.querySelectorAll('[type]');
    let img = document.querySelector('form img');
    for (let i=0;i<infoPlaceholders.length;i++) {
        if (infoPlaceholders[i].type === "checkbox") {
            infoPlaceholders[i].checked = formInfo["favourite"];
        } else if (infoPlaceholders[i].type === "url") {
            img.src = formInfo.img_link; 
        } else {
            for (let key in formInfo) { 
                if (key === infoPlaceholders[i].name) {
                    infoPlaceholders[i].placeholder = formInfo[key];
                }
            }}
        }
    }}

    document.querySelector('#btn__upd').addEventListener('click', () => {
        document.querySelector('#edit-modal').classList.remove("active");
        console.log(); 
    });
};

catSubmitFormInfo = (event) => {
    event.preventDefault();    
    formSub.forEach(e => {
        if(e.name === "favourite") {
            newFormInfo["favourite"] = e.value === 'on' ? true : false;
        } else if (e.name === "url" && e.value) {
            newFormInfo['img_link'] = e.value;
        } else if (e.value) {
            newFormInfo[e.name] = e.value; 
        }
    })    

    newData = {...formInfo, ...newFormInfo};

    setNewCat(newInfo, (cat) => {
        catsInfo = [...cats];
    })

    catsInfo = catsInfo.map(function(cat) {
        if (cat.id === newData.id) {
            updatedCats = {...cat, ...newData};
            return updatedCats;
        }
        // console.log(updatedCats); 
        return cat; 
    })  
    // console.log(catsInfo);
    showAllCats(catsInfo)
} 

function showCatInfo(id,cats) {

    console.log(catsInfo);
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


