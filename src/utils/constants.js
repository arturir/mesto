const body = document.querySelector(".body"),
    buttonEditAvatar = document.querySelector(".profile__avatar"),
    buttonAddCard = document.querySelector(".profile__add-button"),
    buttonEditProfile = document.querySelector(".profile__edit"),
    profileName = document.querySelector(".profile__name"),
    profileMetier = document.querySelector(".profile__metier"),
    formProfile = document.querySelector(".form_profile"),
    formNewPlace = document.querySelector(".form_new-place"),
    formEditAvatar = document.querySelector(".form_avatar-editor"),
    formProfileName = formProfile.querySelector("[name=name]"),
    formProfileMetier = formProfile.querySelector("[name=metier]"),
    cardsContainer = document.querySelector(".cards"),
    validationSettings = {
        inputSelector: '.form__text',
        submitButtonSelector: '.form__submit',
        inactiveButtonClass: 'form__submit_disabled',
        inputErrorClass: 'form__text_error',
        errorClass: 'form__input-error_active'
      }
  ;
export {body, buttonEditAvatar, buttonAddCard, buttonEditProfile, profileName, profileMetier, formProfile, formNewPlace, formEditAvatar, formProfileName, formProfileMetier, cardsContainer, validationSettings};