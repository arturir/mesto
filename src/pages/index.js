import '../pages/index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import Section from '../components/Section.js';
import initialCards from '../utils/cards.js';
import {buttonAddPopupCard, buttonEdit, formProfile, formNewPlace, formProfileName, formProfileMetier, settings} from '../utils/constants.js'

function renderer(item) {
  const card = new Card (item, '.template', (name, link) => {popupWithImage.open(name, link)});
  return card.createCard();
}
const userInfo = new UserInfo({nameSelector: ".profile__name", metierSelector: ".profile__metier"}),
      validateFromProfile = new FormValidator(settings, formProfile),
      validateFromNewPlace = new FormValidator(settings, formNewPlace),
      section = new Section({items: initialCards, renderer}, ".cards"),
      popupWithProfileEditor = new PopupWithForm (".popup_profile-editor", ({name, metier}) => userInfo.setUserInfo({name, metier}), () => validateFromProfile.resetValidation()),
      popupCardAdds = new PopupWithForm(".popup_new-card",item => {section.addItem(renderer(item))}, () => validateFromNewPlace.resetValidation()),
      popupWithImage = new PopupWithImage(".popup_image");

userInfo.setUserInfo({name: "Жак-Ив Кусто", metier: "Исследователь океана"});
validateFromProfile.enableValidation();
validateFromNewPlace.enableValidation();
section.renderItems();
popupWithProfileEditor.setEventListeners();
popupCardAdds.setEventListeners();
popupWithImage.setEventListeners();

buttonEdit.addEventListener("click", () => {
  const dataUserInfo = userInfo.getUserInfo();
  popupWithProfileEditor.open();
  formProfileName.value = dataUserInfo.name;
  formProfileMetier.value = dataUserInfo.metier;
});
buttonAddPopupCard.addEventListener("click", () => {popupCardAdds.open()});




