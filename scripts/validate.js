const forms = Array.from(document.querySelectorAll('.form'));
const showErrorMessage = (form, input, inputError, errorClass) => {
    const errorMessage = form.querySelector(`.${input.id}-error`);
    errorMessage.textContent = input.validationMessage;
    errorMessage.classList.add(errorClass);
    input.classList.add(inputError);
}
const hideErrorMessage = (form, input, inputError, errorClass) => {
    const errorMessage = form.querySelector(`.${input.id}-error`);
    errorMessage.classList.remove(errorClass);
    input.classList.remove(inputError);
}
const disableButton = (button, inactiveButtonClass) => {
    button.classList.add(inactiveButtonClass);
}
const enableButton = (button, inactiveButtonClass) => {
    button.classList.remove(inactiveButtonClass);
}
const checkValidationElement = (input) => {
    return input.validity.valid
}
const checkValidationForm = (form) => {
    const allInputs = Array.from(form.querySelectorAll('input'));
    return allInputs.reduce((accum, input)=> {
        return accum && checkValidationElement(input);
    }, true);
}
const toggleErrorMessage = (form, input, inputError, errorClass) => {
    if (!checkValidationElement(input)) {
        showErrorMessage(form, input, inputError, errorClass);
    } else {
        hideErrorMessage(form, input, inputError, errorClass);
    }
}
const toggleButtonMessage = (form, button, inactiveButtonClass) => {
    if (!checkValidationForm(form)) {
        disableButton(button, inactiveButtonClass);
    } else {
        enableButton(button, inactiveButtonClass);
    }
}
const validation = (form, inputs, button, inactiveButtonClass, inputError, errorClass) => {
    // disableButton(button, inactiveButtonClass);
    // console.log(checkValidationForm(form));
    // if (checkValidationForm(form)) {
    //     enableButton(button, inactiveButtonClass);
    // }
    form.addEventListener('input', () => {
        toggleButtonMessage(form, button, inactiveButtonClass);
    });
    inputs.forEach((input) => {
        input.addEventListener('input', ()=> {
            toggleErrorMessage(form, input, inputError, errorClass);
        })
    })
}
const enableValidation = (obj) => {
    const form = document.querySelector(obj.formSelector),
          inputs = Array.from(form.querySelectorAll(obj.inputSelector)),
          submitButton = form.querySelector(obj.submitButtonSelector),
          inactiveButton = obj.inactiveButtonClass,
          inputError = obj.inputErrorClass,
          error = obj.errorClass;

    validation(form, inputs, submitButton, inactiveButton, inputError, error);
}
forms.forEach((form)=> {enableValidation({  
    formSelector: `.${form.classList[1]}`,
    inputSelector: '.form__text',
    submitButtonSelector: '.form__submit',
    inactiveButtonClass: 'form__submit_disabled',
    inputErrorClass: 'form__text_error',
    errorClass: 'form__input-error_active'
})});