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
    cards = document.querySelector(".cards"),
    popupImage = document.querySelector(".popup_image"),
    imageInPopupImage = document.querySelector(".gallery__image"),
    titleInPopupImage = document.querySelector(".gallery__title");

function openPopup (popup, validateForm) {
  popup.classList.add("popup_active");
  body.classList.add("body_no-scroll");
  document.addEventListener('keydown', closePopupClickEscape);
  validateForm.resetValidation();
}
function openPropfilePopup(profile, validateForm) { 
  openPopup(profile, validateForm);
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
function createCard (card, template) {
  return new Card(card, template).createCard();
}
function renderCard (card, template) {
  cards.prepend(createCard(card, template));
}
function addNewCard (event) {
  event.preventDefault();
  renderCard({name: formPlace.value, link: formLink.value}, '.template')
  formNewPlace.reset();
  popupNewCard.querySelector('.form__submit').classList.add('form__submit_disabled');
  closePopup(event.target.closest('.popup'));
}
popupClosers.forEach(item => item.addEventListener("click", (event) => {closePopup(event.target.closest('.popup'))})); 
popups.forEach(popup => popup.addEventListener('mousedown', closePopupClickOverlay));
editButton.addEventListener("click", () => {openPropfilePopup(popupProfileEditor, validateFromProfile)});
buttonOpenPopupCard.addEventListener("click", () => {openPopup(popupNewCard, validateFromNewPlace)});
formProfile.addEventListener("submit", saveProfile);
formNewPlace.addEventListener("submit", addNewCard);

const settings = {
  inputSelector: '.form__text',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'form__submit_disabled',
  inputErrorClass: 'form__text_error',
  errorClass: 'form__input-error_active'
}
const validateFromProfile = new FormValidator(settings, formProfile);
const validateFromNewPlace = new FormValidator(settings, formNewPlace);
validateFromProfile.enableValidation();
validateFromNewPlace.enableValidation();

initialCards.forEach(card => renderCard(card, '.template')); 
export {openPopup, popupImage, imageInPopupImage, titleInPopupImage};