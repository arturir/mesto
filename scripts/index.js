const addImageButton = document.querySelector(".profile__add-button"),
    editButton = document.querySelector(".profile__edit"),
    profileName = document.querySelector(".profile__name"),
    profileMetier = document.querySelector(".profile__metier"),
    popups = Array.from(document.querySelectorAll(".popup")),
    popupProfileEditor = document.querySelector(".popup_profile-editor"),
    popupNewCard = document.querySelector(".popup_new-card"),
    popupImage = document.querySelector(".popup_image"),
    formName = document.querySelector("input[name='name']"),
    formMetier = document.querySelector("input[name='metier']"),
    formPlace = document.querySelector("input[name='place']"),
    formLink= document.querySelector("input[name='link']"),
    formProfile = document.querySelector(".form_profile"),
    formNewPlace = document.querySelector(".form_new-place"),
    popupClosers = document.querySelectorAll(".close-icon"),
    imageCloser = document.querySelector(".popup-image__close"),
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
      ],
    imageInPopupImage = document.querySelector(".gallery__image"),
    titleInPopupImage = document.querySelector(".gallery__title");
function handleLikeClick (event) {
  event.target.classList.toggle("card__like_active");
}
function handleDeleteClick (event) {
  event.target.parentNode.remove();
}
function handleImageClick (event) {
  openImage(event.target);
}
function createCard (card) {
    newCard = templateCard.cloneNode(true);
    newCard.querySelector(".card__image").src = card.link;
    newCard.querySelector(".card__image").alt = card.name;
    newCard.querySelector(".card__title").textContent = card.name;
    newCard.querySelector(".card__like").addEventListener("click", handleLikeClick);
    newCard.querySelector(".card__delete").addEventListener("click", handleDeleteClick);
    newCard.querySelector(".card__image").addEventListener("click", handleImageClick);
    return newCard;
}    
function renderCard (card) {
  cards.prepend(createCard(card));
}
function openPopup (popup) {
  popup.classList.add("popup_active");
  body.classList.add("body_no-scroll");
}
function openPropfilePopup(profile) { 
  openPopup(profile);
  formName.value = profileName.textContent;
  formMetier.value = profileMetier.textContent;
} 
// function closePopup (event) {
//   const openedPopup = document.querySelector()
//   if (event.currentTarget.closest(".popup_active")) {event.currentTarget.closest(".popup_active").classList.remove("popup_active")}
//   else {event.currentTarget.closest.classList.remove(".popup_active")}
//   body.classList.remove("body_no-scroll");
// }

function closePopup () {
  const openedPopup = document.querySelector(".popup_active");
  openedPopup.classList.remove("popup_active");
  body.classList.remove("body_no-scroll");
}
function closePopupClickOverlay (event) {
  if (event.target.classList.contains('popup')) {
    closePopup();
  }
}
function closePopupClickEscape (event) {
  const key = event.key;
  if (key === "Escape") {
    closePopup();
  }
}
function saveProfile (event) {
    event.preventDefault();
    profileName.textContent = formName.value;
    profileMetier.textContent = formMetier.value;
    closePopup(event);
}
function addNewCard (event) {
    event.preventDefault();
    cards.prepend(createCard({name: formPlace.value, link: formLink.value}));
    formNewPlace.reset();
    closePopup(event);
}
function openImage (image) {
  openPopup(popupImage);
  imageInPopupImage.src = image.src;
  imageInPopupImage.alt = image.parentNode.querySelector(".card__title").textContent;
  titleInPopupImage.textContent = image.parentNode.querySelector(".card__title").textContent;
}
initialCards.forEach(card => renderCard(card));
popupClosers.forEach(item => item.addEventListener("click", closePopup));
popups.forEach(popup => popup.addEventListener('mousedown', closePopupClickOverlay));
window.addEventListener('keydown', closePopupClickEscape);
editButton.addEventListener("click", () => {openPropfilePopup(popupProfileEditor)});
addImageButton.addEventListener("click", () => {openPopup(popupNewCard)});
formProfile.addEventListener("submit", saveProfile);
formNewPlace.addEventListener("submit", addNewCard);