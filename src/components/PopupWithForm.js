import Popup from "./Popup.js"
export default class PopupWithForm extends Popup {
    constructor(selector, doOnSubmit, onClose) {
        super(selector);
        this._doOnSubmit = doOnSubmit;
        this._inputList = this._popup.querySelectorAll(".form__text");
        this._onClose = onClose;
        this._form = this._popup.querySelector(".form");
        this._button = this._form.querySelector(".form__submit");
    }
    _getInputValues() {
        this._inputValue = {};
        this._inputList.forEach(input => { this._inputValue[input.name] = input.value; });
        return this._inputValue;
    }
    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener("submit", event => {
            event.preventDefault();
            this._doOnSubmit(this._getInputValues());
        });
    }
    close() {
        super.close();
        this._form.reset();
        this._onClose();
    }
    setSubmitButtonText(text) {
        this._button.textContent = text;
    }
}