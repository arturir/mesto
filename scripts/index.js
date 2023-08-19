import Card from './Card.js';
import FormValidator from './FormValidator.js';
import initialCards from './cards.js';
const buttonOpenPopupCard = document.querySelector(".profile__add-button"),
    editButton = document.querySelector(".profile__edit"),
    profileName = document.querySelector(".profile__name"),
    profileMetier = document.querySelector(".profile__metier"),
    popups = Array.from(document.querySelectorAll(".popup")),
    popupProfileEditor = document.querySelector(".popup_profile-editor"),
    popupNewCard = document.querySelector(".popup_new-card"),
    formName = document.querySelector("input[name='name']"),
    formMetier = document.querySelector("input[name='metier']"),
    formPlace = document.querySelector("input[name='place']"),
    formLink= document.querySelector("input[name='link']"),
    formProfile = document.querySelector(".form_profile"),
    formNewPlace = document.querySelector(".form_new-place"),
    popupClosers = document.querySelectorAll(".close-icon"),
    body = document.querySelector(".body"),
    cards = document.querySelector(".cards");

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
  const allActiveErrorMessages = openedPopup.querySelectorAll('.form__input-error_active');
  allActiveErrorMessages.forEach(item => {item.classList.remove('form__input-error_active')});
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
    let newCard = new Card({name: formPlace.value, link: formLink.value}, '.template');
    cards.prepend(newCard.createCard());
    formNewPlace.reset();
    closePopup(event.target.closest('.popup'));
}
popupClosers.forEach(item => item.addEventListener("click", (event) => {closePopup(event.target.closest('.popup'))})); 
popups.forEach(popup => popup.addEventListener('mousedown', closePopupClickOverlay));
editButton.addEventListener("click", () => {openPropfilePopup(popupProfileEditor)});
buttonOpenPopupCard.addEventListener("click", () => {openPopup(popupNewCard)});
formProfile.addEventListener("submit", saveProfile);
formNewPlace.addEventListener("submit", addNewCard);

Array.from(document.querySelectorAll('.form')).forEach((form)=> {
  const validateFrom = new FormValidator({  
    formSelector: `.${form.classList[1]}`,
    inputSelector: '.form__text',
    submitButtonSelector: '.form__submit',
    inactiveButtonClass: 'form__submit_disabled',
    inputErrorClass: 'form__text_error',
    errorClass: 'form__input-error_active'
  }, form);
  validateFrom.enableValidation();
});
function renderCard (card, template) {
  let newCard = new Card(card, template);
  cards.prepend(newCard.createCard());
}
initialCards.forEach(card => renderCard(card, '.template')); 
export default openPopup;