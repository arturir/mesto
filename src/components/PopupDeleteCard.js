import Popup from "./Popup.js"
export default class PopupDeleteCard extends Popup {
    constructor(selector){
        super(selector);
        this._button = this._popup.querySelector('.form__submit');
    }
    setCallback(submitCallback) {
        this._handleSubmit = submitCallback;
    }
    setEventListeners() {
        super.setEventListeners();
        this._button.addEventListener('click',  () => this._handleSubmit());
      }
    setSubmitButtonText(text) {
        this._button.textContent = text;
    }
}