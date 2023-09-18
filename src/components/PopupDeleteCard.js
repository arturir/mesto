import Popup from "./Popup.js"
export default class PopupDeleteCard extends Popup {
    constructor(selector){
        super(selector);
        this.button = this._popup.querySelector('.form__submit');
    }
}