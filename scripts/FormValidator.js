export class FormValidator {
  constructor (validConf,formElement) {
    this._formSelector = validConf.formSelector;
    this._inputSelector = validConf.inputSelector;
    this._submitButtonSelector = validConf.submitButtonSelector;
    this._inactiveButtonClass = validConf.inactiveButtonClass;
    this._inputErrorClass = validConf.inputErrorClass;
    this._errorClass = validConf.errorClass;
    this._formElement = formElement;
  }

  _setEventListeners() {
    const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._toggleButtonState();
    inputList.forEach((inputElement) => {
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


  _toggleButtonState () {
      const isFormValid = this._formElement.checkValidity();
      const buttonElement = this._formElement.querySelector(this._submitButtonSelector)
      buttonElement.classList.toggle(this._inactiveButtonClass, !isFormValid);
      buttonElement.disabled = !isFormValid;
    };

// шаг 1. перебор формы и добавление всем формам слушателя
  enableValidation () {
      const forms = Array.from (document.querySelectorAll(this._formSelector));
      forms.forEach ((form) => {
        form.addEventListener('submit', (evt) => {
          evt.preventDefault()
        });
        this._setEventListeners();
      });
    };
  };
