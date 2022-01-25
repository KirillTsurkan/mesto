// import {openPopup} from '../utils/constants.js';

export class Card {
  constructor(
    { data, ownerId, handleLikeClick, handleDeleteClick, handleCardClick },
    cardSelector
  ) {
    this._name = data.name; // имя карточки из объекта
    this._link = data.link; // ссылка карточки из объекта
    this._altName = data.name; // alt карточки и зобъекта
    this._likes = data.likes.length; // для установления количества лайков
    this._likesArray = data.likes; // для проверки лайков массив лайков карточки
    this.cardId = data._id; // id карточки из объекта с сервера, id удаляемой карточки, используется в index.js при отправке запроса
    this._cardSelector = cardSelector; // селектор карточки
    this._handleCardClick = handleCardClick; // callback
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
    this._dataOwnerId = data.owner._id; //id приходящий с сервера(текущий пользователь)
    this._ownerId = ownerId;
  }

  // получили размеку(шаблон)
  _getTemplate() {
    this._element = document
      .querySelector(this._cardSelector)
      .content.querySelector(".cards__item")
      .cloneNode(true);
    return this._element;
  }
  // создание карточки наполнение контентом
  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.querySelector(".cards__title").textContent = this._name;
    this._cardImage = this._element.querySelector(".cards__photo");
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._likeButton = this._element.querySelector(".cards__like");
    this._countLike = this._element.querySelector(".cards__count-likes");
    this._deleteButton = this._element.querySelector(".cards__remove");
    this.setLike({ likes: this._likesArray });
    this._getShowDeleteBtn();
    return this._element;
  }

  // метод показывает корзину только на созданных мною карточках
  _getShowDeleteBtn() {
    if (this._ownerId === this._dataOwnerId) {
      this._deleteButton.classList.add("cards__remove_show");
    }
  }

  // метод удаления элемента карточки
  deleteCardEl() {
    this._element.remove();
    this._element = null;
  }

  // изменение класса лайк
  isLiked() {
    return this._isLiked;
  }

  setLike(newData) {
    this._isLiked =
      newData.likes.filter((item) => {
        return item._id == this._ownerId;
      }).length > 0;
    this._countLike.textContent = newData.likes.length;
    if (this._isLiked) {
      this._likeButton.classList.add("cards__like_aktive");
    } else {
      this._likeButton.classList.remove("cards__like_aktive");
    }
  }
  // слушатели
  _setEventListeners() {
    this._element
      .querySelector(".cards__like")
      .addEventListener("click", () => {
        this._handleLikeClick(this);
      });

    this._element
      .querySelector(".cards__remove")
      .addEventListener("click", () => {
        this._handleDeleteClick(this); // работает без передачи (this)
      });

    this._element
      .querySelector(".cards__photo")
      .addEventListener("click", () => {
        this._handleCardClick(this._name, this._link);
      });
  }
}
