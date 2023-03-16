let cards = document.querySelector('.cards');

showAllCats(cats)

function showAllCats(cats) {
    document.querySelector('.cards').innerHTML = "";

    console.log(cats);
    cats.forEach(cat => showCat(cat, cats))
}


function showCat(cat, cats) {
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
    newCatDiv.setAttribute('id', `${cat.id}`);

    let btnEdit = document.createElement('button');
    let btnEditIcon = document.createElement('i');
    let btnEditDiv = document.createElement('div');
    btnEditDiv.classList.add('edit_btn_div',);
    btnEdit.classList.add("btn", "editBtn");
    btnEditIcon.className = "fa-solid fa-pen";
    btnEditIcon.setAttribute('onclick', `popupInit(${cat.id},cats)`);
    newCatNameDiv.setAttribute('onclick', `popupInit(${cat.id}), cats`);
    newCatRateDiv.setAttribute('onclick', `popupInit(${cat.id},cats)`);
    btnEditIcon.setAttribute('data-action', "edit");
   
    newCatDiv.addEventListener('mouseover', () => { 
        btnEdit.setAttribute('id', "btnChangeOnCardHover");
    });
    newCatDiv.addEventListener('mouseleave', () => { 
        btnEdit.removeAttribute('id', "btnChangeOnCardHover");
    });
    // showForm
    // showCatInfo

    // console.log(document.querySelectorAll('card:not(:first-child)'));
    // let funcForShowCat = document.querySelectorAll('.cards .part_of_card:not(:nth-child(2))');

    // console.log(funcForShowCat);

    btnEdit.appendChild(btnEditIcon);
    btnEditDiv.appendChild(btnEdit)
    newCatDiv.append(newCatNameDiv, btnEditDiv, newCatRateDiv);
    cards.appendChild(newCatDiv);
    // console.log(cards);
    // document.querySelectorAll('.part_of_card:not(:nth-child(2))').addEventListener('click', showCatInfo);
}

// funcForShowCat = document.querySelectorAll('.cards .part_of_card:not(:nth-child(2))');
// funcForShowCat.forEach(e=> {
//     e.addEventListener('click', showCatInfo)
// })  



// console.log(cards);


// setTimeout(()=> {
//     console.log(catsDataBase);
// },400)

