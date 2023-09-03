import {body} from "../utils/constants.js"
export default class Popup {
    constructor(selector) {
        this._popup = document.querySelector(selector);
        this._closeIcon = this._popup.querySelector(".close-icon");
    }
    open () {
        this._popup.classList.add("popup_active");
        body.classList.add("body_no-scroll");
    }
    close () {
        this._popup.classList.remove("popup_active");
        body.classList.remove("body_no-scroll");
    }
    _handleEscClose(event) {
        if (event.key === "Escape") {
          this.close();
        }
    }
    _handleOverlayClose (event) {
        if (event.target.classList.contains("popup")) {
            this.close();
          }
    }
    setEventListeners() {
        this._closeIcon.addEventListener("click", this.close.bind(this));
        this._popup.addEventListener("mousedown", (event) => {this._handleOverlayClose(event)} );
        document.addEventListener("keydown", (event) => {this._handleEscClose(event)} );
    }

}