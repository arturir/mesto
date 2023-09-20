class FormValidator {
    constructor(settings, form) {
        this._form = form;
        this._settings = settings;
        this._inputs = Array.from(this._form.querySelectorAll(settings.inputSelector)),
        this._submitButton = form.querySelector(settings.submitButtonSelector),
        this._inactiveButtonClass = settings.inactiveButtonClass,
        this._inputErrorClass = settings.inputErrorClass,
        this._errorClass = settings.errorClass;
    }
    _toggleErrorMessage (input) {
        if (!input.validity.valid) {
            this._showErrorMessage(input);
        } else {
            this._hideErrorMessage(input);
        }
    }
    _toggleButtonState() {
        if (!this._checkValidationForm()) {
            this.disableButton();
        } else {
            this.enableButton();
        }
    }
    _showErrorMessage (input) {
        const errorMessage = this._form.querySelector(`.${input.id}-error`);
        errorMessage.textContent = input.validationMessage;
        errorMessage.classList.add(this._errorClass);
        input.classList.add(this._inputErrorClass);
    }
    _hideErrorMessage (input) {
        const errorMessage = this._form.querySelector(`.${input.id}-error`);
        errorMessage.classList.remove(this._errorClass);
        input.classList.remove(this._inputErrorClass);
    }
    disableButton () {
        this._submitButton.classList.add(this._inactiveButtonClass);
        this._submitButton.disabled = true;
    }
    enableButton () {
        this._submitButton.classList.remove(this._inactiveButtonClass);
        this._submitButton.disabled = false;
    }
    _checkValidationElement (input) {
        return input.validity.valid
    }
    _checkValidationForm () {
        return this._inputs.reduce((accum, input)=> {
            return accum && input.validity.valid;
        }, true);
    }
    resetValidation() {
        this._inputs.forEach((input) => {
          this._hideErrorMessage(input)
        })
        this._toggleButtonState();
      } 
    enableValidation (){
        this._inputs.forEach((input) => {
            input.addEventListener('input', ()=> {
                this._toggleErrorMessage(input);
                this._toggleButtonState();
            })
        })
    }
}
export default FormValidator