let editButton = document.querySelector(".profile__edit"),
    profileName = document.querySelector(".profile__name"),
    profileMetier = document.querySelector(".profile__metier"),
    formBackground = document.querySelector(".form-background"),
    formName = document.querySelector(".form__name"),
    formMetier = document.querySelector(".form__metier"),
    formSubmit = document.querySelector(".form__submit"),
    formClose = document.querySelector(".form__close");
    cardLikeList = document.querySelectorAll(".card__like"),
    body = document.querySelector(".body");
function openOrCloseForm (form) {
    form.classList.toggle("form-background_active");
    body.classList.toggle("body_no-scroll");
}
function saveProfile (event) {
    event.preventDefault();
    profileName.innerHTML = formName.value;
    profileMetier.innerHTML = formMetier.value;
    openOrCloseForm(formBackground);
}
function addOrRemoveLike (event, item) {
    event.target.classList.toggle("card__like_active");
}
editButton.addEventListener("click", () => {openOrCloseForm(formBackground)});
formClose.addEventListener("click", () => {openOrCloseForm(formBackground)});
formSubmit.addEventListener("click", (event) => {saveProfile(event)});
cardLikeList.forEach((item)=> {
    item.addEventListener("click", (event, item) => {addOrRemoveLike(event, item)});
});