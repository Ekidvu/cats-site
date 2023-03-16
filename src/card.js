let catsInfo;

const setNewCat = (dataNewCat, callback) => {
    const newCat = {            
        ...dataNewCat,
        id: cats.length + 1
    }

    let switchNewCatIsNew;
    cats.forEach((e,i)=> {
        switchNewCatIsNew = e.name !== newCat.name && e.age !== newCat.age && e.description !== newCat.description ? true : false
    })
    if (switchNewCatIsNew === true) { cats.push(newCat) }
    
    callback(newCat)  
}

setNewCat(newInfo, (cat) => {
    catsInfo = [...cats];
})


// setTimeout(() => {
//     cardy.addEventListener('click', (e.target.closest(":not(#btn)")) => {
//         for (card in cardy) {
//             cardy.classList.add('zoom');
//         } 
        
//         cardy.addEventListener('click', () => {
//             setTimeout (() => {
//                 newCat.classList.remove('zoom');
//             },1000)            
//         });
//     })    
// }, 150)
