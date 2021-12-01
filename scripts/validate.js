
// ------------------Функция  валидации формы--------------------
const setEventListeners = (formElement, {inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass}) => {
  // const formElement = document.querySelector('.form');
  formElement.addEventListener('submit', evt => evt.preventDefault());
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);
  toggleButtonState(formElement, buttonElement, inactiveButtonClass);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, {inputErrorClass, errorClass});
      toggleButtonState(formElement, buttonElement, inactiveButtonClass);
    })
  });
};
// ------------------Функция проверки валидации формы-------------
const checkInputValidity = (formElement, inputElement, {inputErrorClass, errorClass}) => {
  if (inputElement.validity.valid) {
    hideInputError(formElement, inputElement, {inputErrorClass, errorClass});
  } else {
    showInputError(formElement, inputElement, inputElement.validationMessage, {inputErrorClass, errorClass});
  }
};
// ------------------Функция  скрытия ошибки ---------------------
const hideInputError = (formElement, inputElement, {inputErrorClass, errorClass}) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
};
// ------------------Функция  показа ошибки-----------------------
const showInputError = (formElement, inputElement, errorMessage, {inputErrorClass, errorClass}) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.classList.add(errorClass);
  errorElement.textContent = errorMessage;
};
// ------------------Функция  активации кнопки-----------------------
const toggleButtonState = (formElement, buttonElement, inactiveButtonClass) => {
  const isFormValid = formElement.checkValidity();
  buttonElement.classList.toggle(inactiveButtonClass, !isFormValid);
  buttonElement.disabled = !isFormValid;
};

// ------------------деструктуризация-----------------------
const validationConfig = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__save-button',
  inactiveButtonClass: 'form__save-button_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__error_visible',
};
// ------------------Функция  для всех форм на странице-----------------------
const enableValidation = (config) => {
  const {formSelector,inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass} = config;
  const forms = document.querySelectorAll(formSelector);
  forms.forEach(form => {
    setEventListeners(form, {inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass})
  });
};
// ------------------ вызов Функция с параметром для деструктуризации----------
enableValidation(validationConfig);

