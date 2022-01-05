// import {openPopup} from '../utils/constants.js';

export class Card {
  constructor(data, cardSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._altName = data.name;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick
  }

  _getTemplate() {
    this._element = document.querySelector(this._cardSelector).content.querySelector('.cards__item').cloneNode(true);
    return this._element;
  }

  generateCard () {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.querySelector('.cards__title').textContent = this._name;
    this._cardImage = this._element.querySelector('.cards__photo');
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._likeButton = this._element.querySelector('.cards__like');
    return this._element;
  };

  _addLike() {
    this._likeButton.classList.toggle('cards__like_aktive');
  };

  _removeCard () {
    this._element.remove();
    this._element = null
  };

  _setEventListeners() {
    this._element.querySelector('.cards__like').addEventListener('click', (evt)=> {
      this._addLike(evt);
    })

    this._element.querySelector('.cards__remove').addEventListener('click', (evt)=> {
      this._removeCard (evt);
    });

    this._element.querySelector('.cards__photo').addEventListener('click', () => {
      this._handleCardClick(this._data)
    });
  };
};
