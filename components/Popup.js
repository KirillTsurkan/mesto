//создаём класс popup
export class Popup {
  constructor (popupSelector) {
    this._popup = document.querySelector(popupSelector)
    this._handleEscClose = this._handleEscClose.bind(this);
  };

// метод открытия Popup(вынес из index, изменил условия)
  open() {
    this._popup.classList.add('popup_opened')
    document.addEventListener('keydown', this._handleEscClose)
  }

// метод закрытия Popup(вынес из index, изменил условия)

  close() {
    this._popup.classList.remove('popup_opened')
    document.removeEventListener('keydown', this._handleEscClose)
  }


   // обработчик закрытия по esc
  _handleEscClose (evt) {
    if (evt.key === 'Escape') {
      this.close();
  }
};

  setEventListeners () {
    this._popup.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close-button')) {
      this.close()
      }
    })
  };
};
