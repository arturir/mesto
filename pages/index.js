import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import Section from '../components/Section.js';
import initialCards from '../utils/cards.js';
import {buttonAddPopupCard, buttonEdit, profileName, profileMetier, formProfile, formNewPlace, formProfileName, formProfileMetier, cards, settings} from '../utils/constants.js'

function renderer(item) {
  const card = new Card (item, '.template', () => {popupWithImage.open(item.name, item.link)});
  return card.createCard();
}
function addCard(item) {
  cards.prepend(renderer(item));
}

const userInfo = new UserInfo({name: "Жак-Ив Кусто", metier: "Исследователь океана"}),
      validateFromProfile = new FormValidator(settings, formProfile),
      validateFromNewPlace = new FormValidator(settings, formNewPlace),
      section = new Section({items: initialCards, renderer}, ".cards"),
      popupWithProfileEditor = new PopupWithForm (".popup_profile-editor", ({name, metier}) => userInfo.setUserInfo({name, metier}), () => validateFromProfile.resetValidation()),
      popupCardAdds = new PopupWithForm(".popup_new-card", addCard, () => validateFromNewPlace.resetValidation()),
      popupWithImage = new PopupWithImage(".popup_image");

userInfo.setUserInfo({name: "Жак-Ив Кусто", metier: "Исследователь океана"});
validateFromProfile.enableValidation();
validateFromNewPlace.enableValidation();
section.renderer();
popupWithProfileEditor.setEventListeners();
popupCardAdds.setEventListeners();
popupWithImage.setEventListeners();

buttonEdit.addEventListener("click", () => {
  popupWithProfileEditor.open();
  formProfileName.value = userInfo.getUserInfo().name;
  formProfileMetier.value = userInfo.getUserInfo().metier;
});
buttonAddPopupCard.addEventListener("click", () => {popupCardAdds.open()});




