import {Popup} from './Popup.js'
export default class PopupWithSubmit extends Popup {

//пока не понял зачем???
  setFormSubmit(handler) {
    this._handleSubmitCallback = handler;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener('submit', (evt) => { // добавляем слушателя прямо на попап, форму искать не надо, чтобы на ей добавить, т.к. работает всплытие.
      evt.preventDefault();
      this._handleSubmitCallback();
    })
  }
}
