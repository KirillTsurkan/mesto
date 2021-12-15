export class FormValidator {
  constructor (validConf,formElement) {
    this._formSelector = validConf.formSelector;
    this._inputSelector = validConf.inputSelector;
    this._submitButtonSelector = validConf.submitButtonSelector;
    this._inactiveButtonClass = validConf.inactiveButtonClass;
    this._inputErrorClass = validConf.inputErrorClass;
    this._errorClass = validConf.errorClass;
    this._formElement = formElement;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
  }

  _setEventListeners() {
    //const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
  });
}

  _checkInputValidity (inputElement) {
      if (inputElement.validity.valid) {
        this._hideInputError( inputElement);
      } else {
        this._showInputError(inputElement, inputElement.validationMessage);
      }
    };

  _hideInputError (inputElement) {
      const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
      inputElement.classList.remove(this._inputErrorClass);
      errorElement.classList.remove(this._errorClass);
      errorElement.textContent = '';
  };
  _showInputError (inputElement) {
      const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
      inputElement.classList.add(this._inputErrorClass);
      errorElement.classList.add(this._errorClass);
      errorElement.textContent = inputElement.validationMessage;
  };
  resetInput() {
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement) //очищаем ошибки
    });
    this._toggleButtonState(); // управляем кнопкой
  }


  _toggleButtonState () {
    const isFormValid = this._formElement.checkValidity();
    this._buttonElement.classList.toggle(this._inactiveButtonClass, !isFormValid);
    this._buttonElement.disabled = !isFormValid;
  };

// шаг 1. перебор формы и добавление всем формам слушателя
  enableValidation () {
      this._formElement.addEventListener('submit', (evt) => {
        evt.preventDefault()
        });
      this._setEventListeners();
  };
};