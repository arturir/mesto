const buttonOpenPopupCard = document.querySelector(".profile__add-button"),
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
    imageInPopupImage = document.querySelector(".gallery__image"),
    titleInPopupImage = document.querySelector(".gallery__title");
function handleLikeClick (event) {
  event.target.classList.toggle("card__like_active");
}
function handleDeleteClick (event) {
  event.target.parentNode.remove();
}
function handleImageClick (event) {
  openImage(event.target.src, event.target.alt)
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
  document.addEventListener('keydown', closePopupClickEscape);
}
function openPropfilePopup(profile) { 
  openPopup(profile);
  formName.value = profileName.textContent;
  formMetier.value = profileMetier.textContent;
} 
function closePopup (openedPopup) {
  openedPopup.classList.remove("popup_active");
  body.classList.remove("body_no-scroll");
  document.removeEventListener('keydown', closePopupClickEscape);
}
function closePopupClickOverlay (event) {
  const openedPopup = event.target;
  if (openedPopup.classList.contains('popup')) {
    closePopup(openedPopup);
  }
}
function closePopupClickEscape (event) {
  const key = event.key;
  if (key === "Escape") {
    closePopup(document.querySelector('.popup_active'));
  }
}
function saveProfile (event) {
    event.preventDefault();
    profileName.textContent = formName.value;
    profileMetier.textContent = formMetier.value;
    closePopup(event.target.closest('.popup'));
}
function addNewCard (event) {
    event.preventDefault();
    cards.prepend(createCard({name: formPlace.value, link: formLink.value}));
    formNewPlace.reset();
    closePopup(event.target.closest('.popup'));
}
function openImage (src, alt) {
  openPopup(popupImage);
  imageInPopupImage.src = src;
  imageInPopupImage.alt = alt;
  titleInPopupImage.textContent = alt;
}
initialCards.forEach(card => renderCard(card));
popupClosers.forEach(item => item.addEventListener("click", (event) => {closePopup(event.target.closest('.popup'))}));
popups.forEach(popup => popup.addEventListener('mousedown', closePopupClickOverlay));
editButton.addEventListener("click", () => {openPropfilePopup(popupProfileEditor)});
buttonOpenPopupCard.addEventListener("click", () => {openPopup(popupNewCard)});
formProfile.addEventListener("submit", saveProfile);
formNewPlace.addEventListener("submit", addNewCard);

Array.from(document.querySelectorAll('.form')).forEach((form)=> {enableValidation({  
  formSelector: `.${form.classList[1]}`,
  inputSelector: '.form__text',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'form__submit_disabled',
  inputErrorClass: 'form__text_error',
  errorClass: 'form__input-error_active'
})});