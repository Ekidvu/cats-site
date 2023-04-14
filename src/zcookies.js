
const isAuth = Cookies.get('email');

// document.cookie = 'email=ekidvu@gmail.com;samesite=strict;max-age=360';
// document.cookie = 'name=Макуцва;samesite=strict;max-age=360';



// console.log(document.cookie);
// console.log(Cookies.get('email'));

function handleFormLogin(e) {
    e.preventDefault();
    const elementsFormLogin = [...formCatLogin.elements];
    const formData = serializeForm(elementsFormLogin);
    Cookies.set("email", formData.email, {expires: 7});
    btnAddCatPopup.classList.remove("visually-hidden");
    btnOpenPopupLogin.classList.add("visually-hidden");
    popupLogin.close()
}


if(!isAuth){
    popupLogin.open();
    btnAddCatPopup.classList.add("visually-hidden");
    // btnAddCatPopup.remove()
} else {
    btnOpenPopupLogin.classList.add("visually-hidden");
}


formCatLogin.addEventListener('submit', handleFormLogin)