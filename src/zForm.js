
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


const showForm = (id,cats) => {
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
            }
        }
    }
    // document.querySelector('#edit-modal').classList.add("active");
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
    // document.querySelector('#show-modal-container').classList.add('active');
    // let idShowCat = event.target.parentElement.id;

    // ТУТ ТЕРЯЕТСЯ cats //
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





// setTimeout(()=> {
    // funcForShowCat = document.querySelectorAll('.cards .part_of_card:not(:nth-child(2))');
    // funcForShowCat.forEach(e=> {
    //     e.addEventListener('click', showCatInfo)
    // })    
// },500);





// let pups = document.querySelector('[data-show-catInfo]');
// console.log(pups);

// const showCatInfo = (id,catsDataBase,callback,event) => {
//     document.querySelector('#show-modal').classList.add('active');
//     console.log(event);  

// }
// console.log(showInfoStarter);
// console.log(event.target.id);  






// let funcForShowCat = document.querySelectorAll('.cards .part_of_card:not(:nth-child(2))');

// console.log(funcForShowCat);

// funcForShowCat.addEventListener('click', function showCatInfo(id,catsDataBase,callback,event) {
//         document.querySelector('#show-modal').classList.add('active');
//         console.log(event);  
    
// })





// showInfoStarter
// data-type="show_cat_info"

// let catsInfo = [...cats];



// let newData;
// catEditForm(id=0, newData, (updatedCats)=> {
// })


// ---------------------------

// document.forms["myform"].submit();

// function catEditForm(id, el) {
//     Array.from(modals).find(m => m.dataset.type === el.dataset.action).classList.add('active');
//     let cat = cats.find(cat => cat.id === id);
//     for (let i=0;i < editForm.elements.length; i++) {
//         let infoPart = editForm.elements[i];
//         if (infoPart.name && cat[infoPart.name]) {
//             if (infoPart.type === "checkbox") {
//                 infoPart.checked = cat[infoPart.name];
//             }
//             infoPart.name = cat[infoPart.name];
//         }
//     } 
// }

// function catEditClose(id, el) {
//     Array.from(modals).find(m => m.dataset.type === el.dataset.action).classList.add('active');
//     let cat = cats.find(cat => cat.id === id);
//     for (let i=0;i < editForm.elements.length; i++) {
//         let infoPart = editForm.elements[i];
//         if (infoPart.name && cat[infoPart.name]) {
//             if (infoPart.type === "checkbox") {
//                 infoPart.checked = cat[infoPart.name];
//             }
//             infoPart.name = cat[infoPart.name];
//         }
//     } 
// }



// console.log(modals)