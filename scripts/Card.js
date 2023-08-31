import {openPopup, popupImage, imageInPopupImage, titleInPopupImage} from "./index.js";
class Card {
    constructor(card, template) {
      this._link = card.link;
      this._name = card.name;
      this._template = template;
      this._newCard = this._getTemplateCard();
      this._cardImage = this._newCard.querySelector(".card__image");
    }
    _getTemplateCard () {
      return document.querySelector(`${this._template}`).content.querySelector(".card").cloneNode(true);
    }
    createCard() {
      this._cardImage.src = this._link;
      this._cardImage.alt = this._name;
      this._newCard.querySelector(".card__title").textContent = this._name;
      this._setListeners();
      return this._newCard;  
    }
    _setListeners() {
      const likeButton = this._newCard.querySelector(".card__like"),
            deleteButton = this._newCard.querySelector(".card__delete");
      likeButton.addEventListener("click", this._handleLikeClick);
      deleteButton.addEventListener("click", () => this._handleDeleteClick());
      this._cardImage.addEventListener("click", this._handleImageClick.bind(this));
    }
    _handleLikeClick () {
      this.classList.toggle("card__like_active");
    }
    _handleDeleteClick () {
      this._newCard.remove();
      this._newCard = null;
    }
    _handleImageClick () {
      this._openImage();
    }
    _openImage () {
      openPopup(popupImage);
      imageInPopupImage.src = this._link;
      imageInPopupImage.alt = this._name;
      titleInPopupImage.textContent = this._name;
    }
  }
  export default Card;