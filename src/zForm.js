
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
        })
        editForm.reset();
    });
}
refresh()

const showForm = (id,cats) => {
    let infoPlaceholders = document.querySelectorAll('[type]');
    let img = document.querySelector('form img');

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
    }

    document.querySelector('#btn__upd').addEventListener('click', () => {
        document.querySelector('#edit-modal').classList.remove("active");
        refresh()
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
    console.log(newFormInfo);    

    if (document.querySelector('#edit').previousElementSibling.innerText === "Добавить красавца!") {
        let newCat = {            
            ...newFormInfo,
            id: catsInfo.length + 1
        } 
        catsInfo.push(newCat)
    } else {
        newData = {...formInfo, ...newFormInfo};
        setNewCat(newData, (cat) => {
        // catsInfo = [...cats];
        catsInfo = catsInfo.map(function(cat) {
            if (cat.id === newData.id) {
                updatedCats = {...cat, ...newData};
                return updatedCats;
            }
        console.log(updatedCats); 
        return cat; 
        })  
        })
    }
    console.log(catsInfo);


// newInfo newData

    console.log(catsInfo);
    showAllCats(catsInfo)
    refresh()
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


