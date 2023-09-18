import '../pages/index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupDeleteCard from '../components/PopupDeleteCard.js';
import Section from '../components/Section.js';
import initialCards from '../utils/cards.js';
import Api from '../components/Api.js'
import {buttonEditAvatar, buttonAddCard, buttonEditProfile, formProfile, formNewPlace, formEditAvatar, formProfileName, formProfileMetier, settings, userId} from '../utils/constants.js'

const userInfo = new UserInfo({nameSelector: ".profile__name", metierSelector: ".profile__metier", profileAvatar: ".profile__avatar"}),
      validateFromProfile = new FormValidator(settings, formProfile),
      validateFromNewPlace = new FormValidator(settings, formNewPlace),
      validateFromEditAvatar = new FormValidator(settings, formEditAvatar),
      section = new Section({items: initialCards, renderer}, ".cards"),
      popupWithProfileEditor = new PopupWithForm (".popup_profile-editor", ({name, metier}) => eidtProfile({name, metier}), () => validateFromProfile.resetValidation()),
      popupCardAdds = new PopupWithForm(".popup_new-card", item => addNewCard(item), () => validateFromNewPlace.resetValidation()),
      popupEditAvatar = new PopupWithForm(".popup_avatar-editor", url => editAvatar(url), () => validateFromEditAvatar.resetValidation()),
      popupWithImage = new PopupWithImage(".popup_image"),
      popupDeleteCard = new PopupDeleteCard(".popup_delete");

validateFromProfile.enableValidation();
validateFromNewPlace.enableValidation();
validateFromEditAvatar.enableValidation();
popupWithProfileEditor.setEventListeners();
popupCardAdds.setEventListeners();
popupWithImage.setEventListeners();
popupDeleteCard.setEventListeners();
popupEditAvatar.setEventListeners();

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

function renderer(item) {
  const card = new Card (item, '.template', handleCardClick, handleDeleteCardClick, handleLikeClick);
  return card.createCard();
}

const api = new Api('https://nomoreparties.co/v1/', 'f47209cc-6612-4651-86f9-cddebc6c2b9a', 'cohort-75');

function errorHandler(error) {
  console.log(error, "Отправить, измененить или удалить данные не удалось")
}

function setUserInfo() {
  api.getUserInfo()
  .then(data => {
    userInfo.setUserInfo({name: data.name, metier: data.about});
    userInfo.setAvatar(data.avatar);
  })
  .catch(error => {
    errorHandler(error);
  })
}
setUserInfo();

function getCards() {
  api.getCards()
  .then(data => {
    data.forEach(element => {
      element.currentLikes = element.likes.length;
      element.isLiked = !!element.likes.find(element => {if (element._id == userId) {return element}});
    })
    return data
  })
  .then(data => {
    const section = new Section({items: data, renderer}, ".cards");
    section.renderItems();
  })
  .catch(error => {
    errorHandler(error);
  })
}
getCards();

function eidtProfile({name, metier}){
  popupWithProfileEditor.button.textContent = "Загрузка...";
  popupWithProfileEditor.button.classList.add("form__submit_disabled");
  api.eidtProfile(name, metier)
  .then(data => {
    userInfo.setUserInfo({name: data.name, metier: data.about});
  })
  .then(() => {
    popupWithProfileEditor.close();
  })
  .catch(error => {
    errorHandler(error);
  })
  .finally(() => {
    popupWithProfileEditor.button.textContent = "Сохранить";
    popupWithProfileEditor.button.classList.remove("form__submit_disabled");
  })
}   

function editAvatar(url) {
  popupEditAvatar.button.textContent = "Отправка...";
  popupEditAvatar.button.classList.add("form__submit_disabled");
  api.editAvatar(url)
  .then(data => {
    userInfo.setAvatar(data.avatar);
  })
  .then(() => {
    popupEditAvatar.close();
  })
  .catch(error => {
    errorHandler(error);
  })
  .finally(() => {
    popupEditAvatar.button.classList.remove("form__submit_disabled");
    popupEditAvatar.button.textContent = "Сохранить";
  })
}

function addNewCard(card) {
  popupCardAdds.button.textContent = "Загрузка...";
  popupCardAdds.button.classList.add("form__submit_disabled");
  api.addNewCard(card.name, card.link)
  .then(data => {
    data.currentLikes = data.likes.length;
    section.addItem(renderer(data));
  })
  .then(() => {
    popupCardAdds.close()})
  .catch(error => {
    errorHandler(error);
  })
  .finally(() => {
    popupCardAdds.button.textContent = "Добавить";
    popupCardAdds.button.classList.remove("form__submit_disabled");
  });
}

function handleDeleteCardClick() {
  const handleDeleteClick = this.handleDeleteClick.bind(this);
  const cardId = this._id;
  function handleButtonClick() {
    popupDeleteCard.button.textContent = "Удаление...";
    popupDeleteCard.button.classList.add("form__submit_disabled");
    api.deleteCard(cardId)
    .then(() => {
      handleDeleteClick();
      popupDeleteCard.close();
      popupDeleteCard.button.removeEventListener("click", handleButtonClick);
    })
    .catch(error => {
      errorHandler(error);
    })
    .finally(() => {
      popupDeleteCard.button.classList.remove("form__submit_disabled");
      popupDeleteCard.button.textContent = "Да";
    })
  }
  this.deleteButton.addEventListener("click", function() {
    popupDeleteCard.open();
    popupDeleteCard.button.addEventListener("click", handleButtonClick);
  });
}

function handleCardClick(name, link) {
  popupWithImage.open(name, link);
}

function handleLikeClick() {
  const addLike = this.addLike.bind(this),
        removeLike = this.removeLike.bind(this),
        setCurrentLike = this.setCurrentLike.bind(this);
  if (this.likeButton.classList.contains("card__like_active")) {
    removeLike();
    api.deleteLikeCard(this._id)
    .then(data => {
      data.currentLikes = data.likes.length;
      setCurrentLike(data);
    })
    .catch(error => {
      errorHandler(error);
    })
  } else {
    addLike();
    api.addLikeCard(this._id)
    .then(data => {
      data.currentLikes = data.likes.length;
      data.isLiked = !!data.likes.find((element)=>{if (element._id =="837a2b7f12f475ab3575349d"){  return element}})
      setCurrentLike(data);
  })
    .catch(error => {
      errorHandler(error);
    })
  }
}


