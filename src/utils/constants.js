const body = document.querySelector(".body"),
    buttonAddPopupCard = document.querySelector(".profile__add-button"),
    buttonEdit = document.querySelector(".profile__edit"),
    profileName = document.querySelector(".profile__name"),
    profileMetier = document.querySelector(".profile__metier"),
    formProfile = document.querySelector(".form_profile"),
    formNewPlace = document.querySelector(".form_new-place"),
    formProfileName = formProfile.querySelector("[name=name]"),
    formProfileMetier = formProfile.querySelector("[name=metier]"),
    cards = document.querySelector(".cards"),
    settings = {
        inputSelector: '.form__text',
        submitButtonSelector: '.form__submit',
        inactiveButtonClass: 'form__submit_disabled',
        inputErrorClass: 'form__text_error',
        errorClass: 'form__input-error_active'
      }
export {body, buttonAddPopupCard, buttonEdit, profileName, profileMetier, formProfile, formNewPlace,formProfileName, formProfileMetier, cards, settings};