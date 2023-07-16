let addButton = document.querySelector(".profile__add-button"),
    editButton = document.querySelector(".profile__edit"),
    profileName = document.querySelector(".profile__name"),
    profileMetier = document.querySelector(".profile__metier"),
    popupWindow = document.querySelector(".popup"),
    popupImage = document.querySelector(".popup-image"),
    formName = document.querySelector("input[name='name']"),
    formMetier = document.querySelector("input[name='metier']"),
    formPlace = document.querySelector("input[name='place']"),
    formLink= document.querySelector("input[name='link']"),
    formProfile = document.querySelector(".form_profile"),
    formNewPlace = document.querySelector(".form_new-place"),
    activeForm,
    formClose = document.querySelector(".popup__close"),
    imageClose = document.querySelector(".popup-image__close"),
    body = document.querySelector(".body"),
    cards = document.querySelector(".cards"),
    template = document.querySelector(".template").content,
    templateCard = template.querySelector(".card"),
    initialCards = [
        {
          name: 'Архыз',
          link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
        },
        {
          name: 'Челябинская область',
          link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
        },
        {
          name: 'Иваново',
          link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
        },
        {
          name: 'Камчатка',
          link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
        },
        {
          name: 'Холмогорский район',
          link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
        },
        {
          name: 'Байкал',
          link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
        }
      ];
function openOrCloseForm (popupWindow, form) {
    popupWindow.classList.toggle("popup_active");
    form.classList.toggle("form_active");
    body.classList.toggle("body_no-scroll");
    if (form.classList.contains("form_profile") && popupWindow.classList.contains("popup_active")) {
        formName.value = profileName.textContent;
        formMetier.value = profileMetier.textContent;
    }
    activeForm = form;
}
function saveProfile () {
    event.preventDefault();
    profileName.innerHTML = formName.value;
    profileMetier.innerHTML = formMetier.value;
    openOrCloseForm(popupWindow, formProfile);
}
function renderCard (card) {
    newCard = templateCard.cloneNode(true);
    newCard.querySelector(".card__image").src = card.link;
    newCard.querySelector(".card__image").alt = card.name;
    newCard.querySelector(".card__title").textContent = card.name;
    newCard.querySelector(".card__like").addEventListener("click", (element)=> {
        element.target.classList.toggle("card__like_active");
    });
    newCard.querySelector(".card__delete").addEventListener("click", (element)=> {
        element.target.parentNode.remove();
    });
    newCard.querySelector(".card__image").addEventListener("click", (element)=> {
        openImage(element.target);
    });
    cards.prepend(newCard);
}
function addNewCard () {
    event.preventDefault();
    renderCard({name: formPlace.value, link: formLink.value});
    formPlace.value = '';
    formLink.value = ''
    openOrCloseForm(popupWindow, formNewPlace);
}
function openImage (image) {
    popupImage.classList.toggle("popup-image_active");
    body.classList.toggle("body_no-scroll");
    popupImage.querySelector(".popup-image__image").src = image.src;
    popupImage.querySelector(".popup-image__image").alt = image.parentNode.querySelector(".card__title").textContent;
    popupImage.querySelector(".popup-image__title").innerHTML = image.parentNode.querySelector(".card__title").textContent;
}
initialCards.forEach(card => renderCard(card));
editButton.addEventListener("click", () => {openOrCloseForm(popupWindow, formProfile)});
addButton.addEventListener("click", () => {openOrCloseForm(popupWindow, formNewPlace)});
formClose.addEventListener("click", () => {openOrCloseForm(popupWindow, activeForm)});
imageClose.addEventListener("click", ()=> {popupImage.classList.toggle("popup-image_active");  body.classList.toggle("body_no-scroll");});
formProfile.addEventListener("submit", saveProfile);
formNewPlace.addEventListener("submit", addNewCard);