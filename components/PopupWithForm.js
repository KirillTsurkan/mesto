import { Popup } from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor ({popupSelector, handleFormCallBack}) {
    super (popupSelector)
    this._handleFormCallBack = handleFormCallBack;
    this._popupForm = this._popup.querySelector('.form');
  };

  _getInputValues() {
    // this._inputsList = Array.from(this._popup.querySelectorAll('.form__input'));
    this._inputsList = document.querySelectorAll('.form__input');
    this._data = {};
    this._inputsList.forEach((input) => {this._data[input.name] = input.value});
    return this._data;
  }

  setEventListeners() {
    super.setEventListeners()
    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormCallBack(this._getInputValues());
      //this.close()
    })
  };

  close () {
    super.close()
    this._popupForm.reset()
    }
  };
