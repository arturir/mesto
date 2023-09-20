export default class Card {
    constructor(card, template, handleCardClick, handleDeleteCardClick, handleLikeClick) {
      this._link = card.link;
      this._name = card.name;
      this._id = card._id;
      this._userId = card.myId;
      this._ownerId = card.owner._id;
      this._likes = card.currentLikes;
      this._handleLikeClick = handleLikeClick;
      this._template = template;
      this._isLiked = card.isLiked;
      this._newCard = this._getTemplateCard();
      this._cardImage = this._newCard.querySelector(".card__image");
      this._handleCardClick = handleCardClick;
      this.handleDeleteCardClick = handleDeleteCardClick;
      this.likeButton = this._newCard.querySelector(".card__like");
      this.currentLikes = this._newCard.querySelector(".card__current-likes");
      this._deleteButton = this._newCard.querySelector(".card__delete");
    }
    _getTemplateCard () {
      return document.querySelector(this._template).content.querySelector(".card").cloneNode(true);
    }
    _setListeners() {
      this.likeButton.addEventListener("click", this._handleCardLike.bind(this));
      this._cardImage.addEventListener("click", this._handleImageClick.bind(this));
      if (this._ownerId===this._userId) {
        this._deleteButton.addEventListener("click", () => this.handleDeleteCardClick(this));
      }
    }
    _handleCardLike () {
      this._handleLikeClick(this);
    }
    _handleImageClick () {
      this._openImage();
    }
    _openImage () {
      this._handleCardClick(this._name, this._link);
    }
    createCard() {
      if (this._ownerId !== this._userId) {this._deleteButton.remove()};
      if (this._isLiked) {this.addLike()};
      this._cardImage.src = this._link;
      this._cardImage.alt = this._name;
      this.currentLikes.textContent = this._likes;
      this._newCard.querySelector(".card__title").textContent = this._name;
      this._newCard.id = this._id;
      this._setListeners();
      return this._newCard;  
    }
    deleteCard () {
      this._newCard.remove();
      this._newCard = null;
    }
    addLike () {
      this.likeButton.classList.add("card__like_active");
    }
    removeLike() {
      this.likeButton.classList.remove("card__like_active");
    }
    setCurrentLike(data) {
      this.currentLikes.textContent = data.currentLikes;
      this._isLiked = data.isLiked;
      if (data.isLiked){
        this.addLike();
      } else {
        this.removeLike();
      }
    }
    isLiked() {
      return this._isLiked
    }
    getId() {
      return this._id
    }
  }