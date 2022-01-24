// import {openPopup} from '../utils/constants.js';

export class Card {
<<<<<<< Updated upstream
  constructor(data, cardSelector, handleCardClick, userId) {
    this._name = data.name;
    this._link = data.link;
    this._altName = data.name;
=======
  constructor(data, cardSelector, handleCardClick, userId, handleLikeButtonClick, handleDeleteButtonClick ) {
    this._name = data.name; // имя карточки из объекта
    this._link = data.link; // ссылка карточки из объекта
    this._altName = data.name; // alt карточки и зобъекта
    this._likes = data.likes; // лайки карточки из объекта(приходит массив)
    this._cardId = data._id; // id карточки из объекта с сервера
>>>>>>> Stashed changes
    this._cardSelector = cardSelector; // селектор карточки
    this._handleCardClick = handleCardClick // callback
    this._userId = userId; // id  профиля
    this._ownerId = data.owner._id; // id владельца карточки
    this._cardId = data._id; // id карточки из объекта с сервера
    //this._countLike =
    // this._deleteCard =
    // this._addCardLike =
    // this._removeCardLike =


<<<<<<< Updated upstream
  }
=======


>>>>>>> Stashed changes
// получили размеку(шаблон)
  _getTemplate() {
    this._element = document.querySelector(this._cardSelector).content.querySelector('.cards__item').cloneNode(true);
    return this._element;
  }
// создание карточки наполнение контентом
  generateCard () {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.querySelector('.cards__title').textContent = this._name;
    this._cardImage = this._element.querySelector('.cards__photo');
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._likeButton = this._element.querySelector('.cards__like');
<<<<<<< Updated upstream
=======
    this._countLike = this._element.querySelector('.cards__count-likes')
>>>>>>> Stashed changes
    return this._element;
  };
// изменение класса лайк
  _addLike() {
    this._likeButton.classList.toggle('cards__like_aktive');
  };
// удаление карточки
  _removeCard () {
    this._element.remove();
    this._element = null
  };
// слушатели
  _setEventListeners() {
    this._element.querySelector('.cards__like').addEventListener('click', (evt)=> {
      this._addLike(evt);
    })

<<<<<<< Updated upstream
    this._element.querySelector('.cards__remove').addEventListener('click', (evt)=> {
      this._removeCard (evt);
    });

    this._element.querySelector('.cards__photo').addEventListener('click', () => {
      this._handleCardClick(this._data)
=======
    // this._element.querySelector('.cards__remove').addEventListener('click', (evt)=> {
    //   this._removeCard (evt);
    // });
    if (this._ownerId) {
    this._element.querySelector('.cards__remove').addEventListener('click', (evt)=> {
      this._removeCard ()
      })
    };



    this._element.querySelector('.cards__photo').addEventListener('click', () => {
      this._handleCardClick()
>>>>>>> Stashed changes
    });
  };
};
