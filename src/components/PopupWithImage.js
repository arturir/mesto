import Popup from "./Popup.js"
export default class PopupWithImage extends Popup{
    constructor(selector) {
        super(selector);
        this._image = this._popup.querySelector(".gallery__image");
        this._title = this._popup.querySelector(".gallery__title");
    }
    open(title, image) {
        super.open();
        this._image.src = image;
        this._image.alt = title;
        this._title.textContent = title;
    }
}