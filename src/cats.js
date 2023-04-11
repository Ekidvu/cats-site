const cats = [
    {
      name: "Лара",
      img_link:
        "https://www.friendforpet.ru/api/sites/default/files/2021-09/167200DD-A44F-4845-8D4D-ACCFC180165A.jpeg",
      age: 8,
      rate: 7,
      favourite: false,
      description:
        "Лара – шотландская вислоухая, у нее остеохондродисплазия. Лара спокойная, очень ласковая и контактная. Болезнь не лечится и специального ухода не нужно.",
      id: 1
    },
    {
      name: "Базиль",
      img_link:
        "https://www.friendforpet.ru/api/sites/default/files/2022-01/064AEBCB-45EC-4CE7-AB13-C65F10F00B7B.jpeg",
      age: 2,
      rate: 10,
      favourite: false,
      description:
        "Внимательный, активный и ласковый. Любит играть, катать мяч, и мурчать на пледе рядом с людьми! Прилично воспитан, приучен к лотку. Вакцинирован, имеет ветеринарный паспорт.",
      id: 2
    },
    {
      name: "Риш",
      img_link:
        "https://www.friendforpet.ru/api/sites/default/files/2022-01/_DM34706.JPG",
      age: 1,
      rate: 10,
      favourite: true,
      description:
        "Риш любит лесенки, канаты. Очень активный и дружелюбный кот. Риш полностью здоров, привит, кастрирован. Использует лоточек и очень аккуратен.",
      id: 3
    },
    {
      name: "Элиа",
      img_link:
        "https://www.friendforpet.ru/api/sites/default/files/2022-01/1_25.jpg",
      age: 4,
      rate: 8,
      favourite: false,
      description:
        "Элли обладает мягким и добрым характером. Очень любит всевозможные лакомства и вкусно покушать. Не доверяет людям, потребуется время, чтобы стать ей другом. Приучена к лотку и когтеточке",
      id: 4
    },
    {
      name: "Чарли",
      img_link:
        "https://www.friendforpet.ru/api/sites/default/files/2022-01/%D0%BB%D0%B5%D0%B2%D0%B83_%D0%B0%D0%BB%D0%B5%D0%BA%D1%81.jpg",
      age: 9,
      rate: 8,
      favourite: false,
      description:
        "Чёрно-белый юный котофилософ очень любит размышлять и быть наедине. Пока что не доверяет людям, не агрессивный. Ладит с другими животными, приучен к лотку и когтеточке",
      id: 5
    },
    {
      name: "Стефани",
      img_link:
        "https://www.friendforpet.ru/api/sites/default/files/2022-01/4_30.jpg",
      age: 6,
      rate: 9,
      favourite: false,
      description:
        "Прелестная Стефани – трогательная, добродушная и очень-очень общительная девочка как никто другой нуждается в заботе и любви. Приучена к лотку и когтеточке",
      id: 6
    },
    // {
    //   name: "Дуся",
    //   img_link:
    //     "https://www.friendforpet.ru/api/sites/default/files/2022-02/B1444207-6EE3-4BA4-97F7-2F9666AE2F63.jpeg",
    //   age: 3,
    //   rate: 9,
    //   favourite: false,
    //   description:
    //     "Дусеньке около 1 года с небольшим, здорова, привита, стерилизована. Лоточек и когтеточку знает прекрасно. Очень общительная и нежная, хочет постоянного внимания.",
    //   id: 9
    // },
    // {
    //   name: "Бруно",
    //   img_link:
    //     "https://www.friendforpet.ru/api/sites/default/files/2022-01/IMG-20211223-WA0049.jpg",
    //   age: 1,
    //   rate: 10,
    //   favourite: false,
    //   description:
    //     "Очаровательный активный кот Бруно, находится в постоянном движении! Очаровательный и ласковый кот. Приучен к лотку, ладит с другими котами, привит.",
    //   id: 10
    // },
    // {
    //   name: "Светлячок",
    //   img_link:
    //     "https://www.friendforpet.ru/api/sites/default/files/2022-01/%D1%81%D0%B2%D0%B5%D1%82%D0%BB%D1%8F%D1%87%D0%BE%D0%BA4_%D0%B0%D0%BB%D0%B5%D0%BA%D1%81.jpg",
    //   age: 1,
    //   rate: 9,
    //   favourite: true,
    //   description:
    //     "Немного боязливый, но очень добрый и нежный кот Светлячок. Приучен к лотку и когтеточке, ладит с детьми, привит. Станет вам хорошим другом",
    //   id: 11
    // },
    {
      name: "Котух Шнипцель",
      img_link:
        "https://i.pinimg.com/originals/77/a0/68/77a0681200c82158809e5f190b8cf363.jpg",
      age: 20,
      rate: 10,
      favourite: true,
      description:
        "Боевой кот-индус. Этот кодзилла задаст вам жару. Готов отстоять честь и достоинство в бою за вискас. Ещe много чего готов отстоять. Например, грог.",
      id: 7
    }
];
  
let divAuth = document.createElement('div');
let divAuthContain = document.createElement('div');
let divAuthCloseBtn = document.createElement('button');
let authPic = document.createElement('img');
let authPicDesc = document.createElement('span');
let authBtn = document.querySelector('#author');
// const openEditApiCard = document.querySelectorAll('.cards__container .card h2');


let popupInit = (id, catsInfo, evt, clickEl) => {
  let popup_element; 
  let editBtnOnCard = document.querySelectorAll('.editBtn');
  let partsOfCards = document.querySelectorAll(`#id_${id} .part_of_card`);  
  let addButton = document.querySelector('#add');
  let addButtonInner = document.querySelector('#add').firstChild;
  // console.log(evt.target.closest('.isLiked'));

  switch (evt.target) {
    case editBtnOnCard[id-1]:
    case document.querySelectorAll('.editBtn .fa-pen')[id-1]:
      document.querySelector('#edit').previousElementSibling.innerText = "Смотр красавца!";
      popup_element = document.querySelector('#edit-modal');
      // popup_element.removeEventListener('click', closeByClosest)
      showForm(id, catsInfo, evt);
      break
    case clickEl:
      document.querySelector('#edit').previousElementSibling.innerText = "Смотр красавца!";
      popup_element = document.querySelector('#edit-modal');
      // popup_element.removeEventListener('click', closeByClosest)
      // console.log(dataBaseApiCats);
      showForm(id, catsInfo, evt, clickEl);
      break
    case partsOfCards[0]: 
    case partsOfCards[1]:  
      popup_element = document.querySelector('#show-modal-container')
      showCatInfo(id, catsInfo)
      break
    case addButtonInner:
    case addButton: 
      popup_element = document.querySelector('#edit-modal');
      // popup_element.removeEventListener('click', closeByClosest) 
      document.querySelector('#edit').previousElementSibling.innerText = "Добавить красавца!";
      showForm(false, catsInfo, evt);
      break
    case document.querySelectorAll('.isLiked')[id-1]:
    case document.querySelectorAll('.isLiked i')[id-1]:
      popup_element = document.querySelectorAll('.isLiked .fa-heart')[id-1];
      popup_element.classList.toggle('fa-solid')  
      popup_element.classList.toggle('fa-regular')
      if (popup_element.classList.contains('fa-solid')) {
        catsInfo[id-1].favourite = true;
      } else if (popup_element.classList.contains('fa-regular')) {
        catsInfo[id-1].favourite = false;
      }
      console.log(catsInfo[id-1].id);
      renewKotuhIPerchik(id)
      break
    default:
      break
  }
    
  console.log(catsInfo[id-1]);
  popup_element.classList.add('active');
  popup_element.addEventListener('mousedown', function closeByClosest(evt) {
    if(evt.target.classList.contains('modal')) {
      popup_element.classList.remove('active')
      document.querySelector('#btn__upd').removeEventListener('click', pushFormUpdateButton);
    }
    // popup_element.removeEventListener('click', closeByClosest)
  })
  document.addEventListener('keyup', closeByEsc);
}

function closeByEsc(evt) {  
  let close = document.querySelectorAll('.modal-close');
  if (evt.key === "Escape") {
    close.forEach(e => {
      if (e.parentElement.parentElement.hasAttribute('class',   'active')) { e.parentElement.parentElement.classList.remove('active') }
    })
  }
  document.removeEventListener('keyup', closeByEsc);
  document.querySelector('#btn__upd').removeEventListener('click', pushFormUpdateButton);
}

function renewKotuhIPerchik(id) {
  if (catsInfo[id-1].id === 7 || catsInfo[id-1].id === 8) {
    switch (catsInfo[id-1].id){
      case 7:          
        renewKotuh(id);
        break
      case 8:
        renewPerchik(id);
        break
      default:
        break
    }
  }
}

function renewKotuh(id) {
  cardsContainer.removeChild(cardsContainer.children[cardsContainer.children.length-2]);
  const newElementKotuh = new Card(catsInfo[id-1], "#card-template", handleClickCatImage);
  cardsContainer.insertBefore(newElementKotuh.getElement(), cardsContainer.lastElementChild);
}

function renewPerchik(id) {
  cardsContainer.removeChild(cardsContainer.lastElementChild);
  const newElementPerchik = new Card(catsInfo[id-1], "#card-template", handleClickCatImage);
  cardsContainer.append(newElementPerchik.getElement());
}

divAuthCloseBtn.classList.add('modal-close', 'btn', 'closeBtnAuthor');
divAuthContain.id = "divAuthContain";
divAuthContain.append(divAuthCloseBtn, authPicDesc, authPic);
divAuth.append(divAuthContain);
divAuth.classList.add('modal', 'modalAuth');
authBtn.setAttribute('onclick', 'popupInitAuth()')
authPic.src = 'http://ae04.alicdn.com/kf/HTB1s2ShXUvrK1RjSspcq6zzSXXaw/HDARTISAN-Vrolijk-Schilderij.jpg';
authPicDesc.innerText = 'Ух, ты!';
document.body.append(divAuth);


const popupInitAuth = () => {
  let modalAuthCloseButton = document.querySelector('.modalAuth');
  modalAuthCloseButton.classList.add('active');
  document.querySelector('.closeBtnAuthor').addEventListener('click', function closeAuthMonkey() {
    modalAuthCloseButton.classList.remove('active');
    document.addEventListener('keyup', closeByEsc);
    document.querySelector('.closeBtnAuthor').addEventListener('click', closeAuthMonkey)
  });
}


// https://yt3.ggpht.com/ytc/AAUvwnjTDmGOkG6BGDLELBugMWi7mdXa18tLzvVSMmt-=s900-c-k-c0x00ffffff-no-rj
// https://fikiwiki.com/uploads/posts/2022-02/1644991780_20-fikiwiki-com-p-prikolnie-kartinki-pro-kotov-21.jpg

// https://www.fonstola.ru/images/202006/fonstola.ru_394698.jpg
// https://kot-pes.com/wp-content/uploads/2019/03/post_5b48c1cfca497.jpg



// https://coolsen.ru/wp-content/uploads/2021/11/001-20211109_131908.jpg
// https://avatars.dzeninfra.ru/get-zen_doc/4055701/pub_61180c34cdef433a85fc6bd8_613e32e588d59c30fddf1e71/scale_1200
// 
// 