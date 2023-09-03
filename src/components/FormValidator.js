class FormValidator {
    constructor(settings, form) {
        this._form = form;
        this._settings = settings;
        this._inputs = Array.from(this._form.querySelectorAll(settings.inputSelector)),
        this._submitButton = form.querySelector(settings.submitButtonSelector),
        this._inactiveButton = settings.inactiveButtonClass,
        this._inputError = settings.inputErrorClass,
        this._error = settings.errorClass;
    }
    _toggleErrorMessage (input) {
        if (!input.validity.valid) {
            this._showErrorMessage.call(this, input);
        } else {
            this._hideErrorMessage.call(this, input);
        }
    }
    _toggleButtonMessage() {
        if (!this._checkValidationForm()) {
            this._disableButton();
        } else {
            this._enableButton();
        }
    }
    _showErrorMessage (input) {
        const errorMessage = this._form.querySelector(`.${input.id}-error`);
        errorMessage.textContent = input.validationMessage;
        errorMessage.classList.add(this._error);
        input.classList.add(this._inputError);
    }
    _hideErrorMessage (input) {
        const errorMessage = this._form.querySelector(`.${input.id}-error`);
        errorMessage.classList.remove(this._error);
        input.classList.remove(this._inputError);
    }
    _disableButton () {
        this._submitButton.classList.add(this._inactiveButton);
        this._submitButton.disabled = true;
    }
    _enableButton () {
        this._submitButton.classList.remove(this._inactiveButton);
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
        this._toggleButtonMessage();
      } 
    enableValidation (){
        this._inputs.forEach((input) => {
            input.addEventListener('input', ()=> {
                this._toggleErrorMessage.call(this, input);
                this._toggleButtonMessage();
            })
        })
    }
}
export default FormValidator