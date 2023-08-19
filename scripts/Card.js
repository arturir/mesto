import openPopup from "./index.js";
class Card {
    constructor(card, template) {
      this._link = card.link;
      this._name = card.name;
      this._template = template;
    }
    _getTemplateCard () {
      return document.querySelector(`${this._template}`).content.querySelector(".card").cloneNode(true);
    }
    createCard() {
        this._newCard = this._getTemplateCard();
        this._newCard.querySelector(".card__image").src = this._link;
        this._newCard.querySelector(".card__image").alt = this._name;
        this._newCard.querySelector(".card__title").textContent = this._name;
        this._setListeners();
        return this._newCard;  
    }
    _setListeners() {
      const likeButton = this._newCard.querySelector(".card__like"),
            deleteButton = this._newCard.querySelector(".card__delete"),
            image = this._newCard.querySelector(".card__image");
      likeButton.addEventListener("click", this._handleLikeClick);
      deleteButton.addEventListener("click", this._handleDeleteClick);
      image.addEventListener("click", this._handleImageClick.bind(this));
    }
    _handleLikeClick () {
      this.classList.toggle("card__like_active");
    }
    _handleDeleteClick () {
      this.parentNode.remove();
    }
    _handleImageClick () {
      this._openImage();
    }
    _openImage () {
      const popupImage = document.querySelector(".popup_image"),
            imageInPopupImage = document.querySelector(".gallery__image"),
            titleInPopupImage = document.querySelector(".gallery__title");
      openPopup(popupImage);
      imageInPopupImage.src = this._link;
      imageInPopupImage.alt = this._name;
      titleInPopupImage.textContent = this._name;
    }
  }
  export default Card;