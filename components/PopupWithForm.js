import Popup from "./Popup.js"
export default class PopupWithForm extends Popup {
    constructor(selector, doAfterSubmit, resetValidation) {
        super(selector);
        this._doAfterSubmit = doAfterSubmit;
        this._inputList = this._popup.querySelectorAll(".form__text");
        this._resetValidation = resetValidation;
    }
    _getInputValues() {
        this._inputValue = {};
        this._inputList.forEach(input => { this._inputValue[input.name] = input.value; });
        return this._inputValue;
    }
    setEventListeners() {
        super.setEventListeners();
        this._popup.querySelector(".form").addEventListener("submit", event => {
            event.preventDefault();
            this._doAfterSubmit(this._getInputValues());
            this.close();
        });
    }
    close() {
        super.close();
        this._popup.querySelector(".form").reset();
    }
    open () {
        super.open();
        this._resetValidation();
    }
}