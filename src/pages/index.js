import '../pages/index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupDeleteCard from '../components/PopupDeleteCard.js';
import Section from '../components/Section.js';
import Api from '../components/Api.js'
import {buttonEditAvatar, buttonAddCard, buttonEditProfile, formProfile, formNewPlace, formEditAvatar, formProfileName, formProfileMetier, validationSettings} from '../utils/constants.js'

const userInfo = new UserInfo({nameSelector: ".profile__name", metierSelector: ".profile__metier", avatarSelector: ".profile__avatar"}),
      validateFromProfile = new FormValidator(validationSettings, formProfile),
      validateFromNewPlace = new FormValidator(validationSettings, formNewPlace),
      validateFromEditAvatar = new FormValidator(validationSettings, formEditAvatar),
      cardSection = new Section(createCard, ".cards"),
      popupWithProfileEditor = new PopupWithForm (".popup_profile-editor", ({name, metier}) => editProfile({name, metier}), () => validateFromProfile.resetValidation()),
      popupCardAdds = new PopupWithForm(".popup_new-card", item => addNewCard(item), () => validateFromNewPlace.resetValidation()),
      popupEditAvatar = new PopupWithForm(".popup_avatar-editor", url => editAvatar(url), () => validateFromEditAvatar.resetValidation()),
      popupWithImage = new PopupWithImage(".popup_image"),
      popupDeleteCard = new PopupDeleteCard(".popup_delete"),
      api = new Api('https://nomoreparties.co/v1/', 'f47209cc-6612-4651-86f9-cddebc6c2b9a', 'cohort-75');

validateFromProfile.enableValidation();
validateFromNewPlace.enableValidation();
validateFromEditAvatar.enableValidation();
popupWithProfileEditor.setEventListeners();
popupCardAdds.setEventListeners();
popupWithImage.setEventListeners();
popupDeleteCard.setEventListeners();
popupEditAvatar.setEventListeners();

Promise.all([
  api.getUserInfo(),
  api.getCards()
])
.then((values)=> {
  userInfo.setUserInfo({name: values[0].name, metier: values[0].about, avatar: values[0].avatar, id: values[0]._id});
  values[1].forEach(element => {
    element.currentLikes = element.likes.length;
    element.isLiked = !!element.likes.find(element => {if (element._id == userInfo.getUserInfo().id) {return element}});
  })
  cardSection.renderItems(values[1]);
})
.catch(error => {
  handleResponseError(error);
})

function createCard(item) {
  item.myId = userInfo.getUserInfo().id;
  const card = new Card (item, '.template', handleCardClick, handleDeleteCardClick, card => handleLikeClick(card));
  return card.createCard();
}

function handleResponseError(error) {
  console.log(error, "Отправить, измененить или удалить данные не удалось")
}

function editProfile({name, metier}){
  popupWithProfileEditor.setSubmitButtonText("Загрузка...");
  validateFromProfile.disableButton();
  api.editProfile(name, metier)
  .then(data => {
    userInfo.setUserInfo({name: data.name, metier: data.about, avatar: data.avatar, id: data._id});
    popupWithProfileEditor.close();
  })
  .catch(error => {
    handleResponseError(error);
  })
  .finally(() => {
    popupWithProfileEditor.setSubmitButtonText("Сохранить");
    validateFromProfile.enableButton();
  })
}   

function editAvatar(url) {
  popupEditAvatar.setSubmitButtonText("Отправка...");
  validateFromEditAvatar.disableButton();
  api.editAvatar(url)
  .then(data => {
    userInfo.setAvatar(data.avatar);
  })
  .then(() => {
    popupEditAvatar.close();
  })
  .catch(error => {
    handleResponseError(error);
  })
  .finally(() => {
    popupEditAvatar.setSubmitButtonText("Сохранить");
    validateFromEditAvatar.enableButton();
  })
}

function addNewCard(card) {
  popupCardAdds.setSubmitButtonText("Загрузка...");
  validateFromNewPlace.disableButton();
  api.addNewCard(card.name, card.link)
  .then(data => {
    data.currentLikes = data.likes.length;
    cardSection.renderItems([data]);
  })
  .then(() => {
    popupCardAdds.close()})
  .catch(error => {
    handleResponseError(error);
  })
  .finally(() => {
    popupCardAdds.setSubmitButtonText("Добавить");
  });
}

function handleDeleteCardClick(card) {
  function handleButtonClick() {
    popupDeleteCard.setSubmitButtonText("Удаление...");
    popupDeleteCard.disableButton();
    api.deleteCard(card.getId())
    .then(() => {
      card.deleteCard();
      popupDeleteCard.close();
    })
    .catch(error => {
      handleResponseError(error);
    })
    .finally(() => {
      popupDeleteCard.setSubmitButtonText("Да");
      popupDeleteCard.enableButton();
    })
  }
  popupDeleteCard.setCallback(handleButtonClick);
  popupDeleteCard.open();

}

function handleCardClick(name, link) {
  popupWithImage.open(name, link);
}

function handleLikeClick(card) {
  if (card.isLiked()) {
    card.removeLike();
    api.deleteLikeCard(card.getId())
    .then(data => {
      data.currentLikes = data.likes.length;
      card.setCurrentLike(data);
    })
    .catch(error => {
      handleResponseError(error);
    })
  } else {
    card.addLike();
    api.addLikeCard(card.getId())
    .then(data => {
      data.currentLikes = data.likes.length;
      data.isLiked = true;
      card.setCurrentLike(data);
  })
    .catch(error => {
      handleResponseError(error);
    })
  }
}

buttonEditProfile.addEventListener("click", () => {
  const dataUserInfo = userInfo.getUserInfo();
  popupWithProfileEditor.open();
  formProfileName.value = dataUserInfo.name;
  formProfileMetier.value = dataUserInfo.metier;
});

buttonEditAvatar.addEventListener("click", () => {
  popupEditAvatar.open();
});

buttonAddCard.addEventListener("click", () => {popupCardAdds.open()});