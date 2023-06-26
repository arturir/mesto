let editButton = document.querySelector(".profile__edit"),
    profileName = document.querySelector(".profile__name"),
    profileMetier = document.querySelector(".profile__metier"),
    popup = document.querySelector(".popup"),
    formName = document.querySelector("input[name='name']"),
    formMetier = document.querySelector("input[name='metier']"),
    form = document.querySelector(".form"),
    formClose = document.querySelector(".popup__close");
    body = document.querySelector(".body");
function openOrCloseForm (form) {
    form.classList.toggle("popup_active");
    body.classList.toggle("body_no-scroll");
    if (form.classList.contains("popup_active")) {
        formName.value = profileName.textContent;
        formMetier.value = profileMetier.textContent;
    }
}
function saveProfile (event) {
    profileName.innerHTML = formName.value;
    profileMetier.innerHTML = formMetier.value;
    openOrCloseForm(popup);
    event.preventDefault();
}
editButton.addEventListener("click", () => {openOrCloseForm(popup)});
formClose.addEventListener("click", () => {openOrCloseForm(popup)});
form.addEventListener("submit", saveProfile);