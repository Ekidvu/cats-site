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
    {
      name: "Дуся",
      img_link:
        "https://www.friendforpet.ru/api/sites/default/files/2022-02/B1444207-6EE3-4BA4-97F7-2F9666AE2F63.jpeg",
      age: 3,
      rate: 9,
      favourite: false,
      description:
        "Дусеньке около 1 года с небольшим, здорова, привита, стерилизована. Лоточек и когтеточку знает прекрасно. Очень общительная и нежная, хочет постоянного внимания.",
      id: 7
    },
    {
      name: "Бруно",
      img_link:
        "https://www.friendforpet.ru/api/sites/default/files/2022-01/IMG-20211223-WA0049.jpg",
      age: 1,
      rate: 10,
      favourite: false,
      description:
        "Очаровательный активный кот Бруно, находится в постоянном движении! Очаровательный и ласковый кот. Приучен к лотку, ладит с другими котами, привит.",
      id: 8
    },
    {
      name: "Лара",
      img_link:
        "https://www.friendforpet.ru/api/sites/default/files/2022-01/%D1%81%D0%B2%D0%B5%D1%82%D0%BB%D1%8F%D1%87%D0%BE%D0%BA4_%D0%B0%D0%BB%D0%B5%D0%BA%D1%81.jpg",
      age: 1,
      rate: 9,
      favourite: true,
      description:
        "Немного боязливый, но очень добрый и нежный кот Светлячок. Приучен к лотку и когтеточке, ладит с детьми, привит. Станет вам хорошим другом",
      id: 9
    },
    {
      name: "Котух Шнипцель",
      img_link:
        "https://i.pinimg.com/originals/77/a0/68/77a0681200c82158809e5f190b8cf363.jpg",
      age: 20,
      rate: 10,
      favourite: true,
      description:
        "Боевой кот-индус. Этот кодзилла задаст вам жару. Готов отстоять честь и достоинство в бою за вискас. Ещe много чего готов отстоять. Например, грог.",
      id: 10
    }
];
  
let divAuth = document.createElement('div');
let divAuthContain = document.createElement('div');
let divAuthCloseBtn = document.createElement('button');
let authPic = document.createElement('img');
let authPicDesc = document.createElement('span');
let authBtn = document.querySelector('#author');

let popupInit = (id, catsInfo) => {
  let popup_element; 
  let editBtnOnCard = document.querySelectorAll('.editBtn');
  let partsOfCards = document.querySelectorAll(`#id_${id} .part_of_card`);  
  let addButton = document.querySelector('#add');
  let addButtonInner = document.querySelector('#add').firstChild;

  switch (event.target) {
    case editBtnOnCard[id-1]:
    case editBtnOnCard[id-1].firstChild:
      document.querySelector('#edit').previousElementSibling.innerText = "Смотр красавца!";
      popup_element = document.querySelector('#edit-modal');
      showForm(id,catsInfo);
      break
    case partsOfCards[0]: 
    case partsOfCards[1]: 
      popup_element = document.querySelector('#show-modal-container')
      showCatInfo(id, catsInfo)
      break
    case addButtonInner:
    case addButton: {
      popup_element = document.querySelector('#edit-modal'); 
      document.querySelector('#edit').previousElementSibling.innerText = "Добавить красавца!"; }
      showForm(false);
      break
    // case authBtn:
    //   popup_element = document.querySelector('.modalAuth')
    //   break      
    default:
      break
  }
  popup_element.classList.add('active');
  document.addEventListener('keyup', closeByEsc);
}

function closeByEsc() {  
  let close = document.querySelectorAll('.modal-close');
  if (event.key === "Escape") {
    close.forEach(e => {
      if (e.parentElement.parentElement.hasAttribute('class',   'active')) { e.parentElement.parentElement.classList.remove('active') }
    })
  }
  document.removeEventListener('keyup', closeByEsc);
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
  document.querySelector('.closeBtnAuthor').addEventListener('click', () => {
    modalAuthCloseButton.classList.remove('active');
    document.addEventListener('keyup', closeByEsc);
  });
}


