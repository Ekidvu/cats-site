let cards = document.querySelector('.cards');
let catsInfo = [...cats];

newInfo.id = catsInfo.length + 1
catsInfo.push(newInfo)

showAllCats(catsInfo)

function showAllCats(catsInfo) {
    document.querySelector('.cards').innerHTML = "";

    console.log(catsInfo);
    catsInfo.forEach(cat => showCat(cat, catsInfo))
}


function showCat(cat, catsInfo) {
    const checkAge = (num) => {
        return cat.age.toString().endsWith(num);
    }
    function checkAgeArray(numsArray) {
        let found = false;
        numsArray.forEach(n => {
            if (checkAge(n)) {                                
                found = true;
            };
        })
        return found;   
    }  

    let newCatDiv = document.createElement('div');
    newCatDiv.classList.add('card', 'scale');
    let newCatNameDiv = document.createElement('div');
    newCatNameDiv.classList.add('name_div', 'part_of_card');
    let newCatRateDiv = document.createElement('div');
    newCatRateDiv.classList.add('rate_div', 'part_of_card');

    if (checkAgeArray([0,5,6,7,8,9,11,12,13,14])) { 
        newCatNameDiv.innerText = `${cat.name}, ${cat.age} лет`;
    } else if (checkAge(1)) { 
        newCatNameDiv.innerText = `${cat.name}, ${cat.age} год`;
    } else { newCatNameDiv.innerText = `${cat.name}, ${cat.age} года`; }    
    newCatDiv.style.background = `no-repeat center/cover url(${cat.img_link})`;
    newCatDiv.setAttribute('id', `id_${cat.id}`);

    let btnEdit = document.createElement('button');
    let btnEditIcon = document.createElement('i');
    let btnEditDiv = document.createElement('div');
    btnEditDiv.classList.add('edit_btn_div',);
    btnEdit.classList.add("btn", "editBtn");
    btnEditIcon.className = "fa-solid fa-pen";
    btnEdit.setAttribute('onclick', `popupInit(${cat.id},catsInfo)`);
    newCatNameDiv.setAttribute('onclick', `popupInit(${cat.id}), catsInfo`);
    newCatRateDiv.setAttribute('onclick', `popupInit(${cat.id},catsInfo)`);
    btnEditIcon.setAttribute('data-action', "edit");
   
    newCatDiv.addEventListener('mouseover', () => { 
        btnEdit.setAttribute('id', "btnChangeOnCardHover");
    });
    newCatDiv.addEventListener('mouseleave', () => { 
        btnEdit.removeAttribute('id', "btnChangeOnCardHover");
    });

    btnEdit.appendChild(btnEditIcon);
    btnEditDiv.appendChild(btnEdit)
    newCatDiv.append(newCatNameDiv, btnEditDiv, newCatRateDiv);
    cards.appendChild(newCatDiv);
}





