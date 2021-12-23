//объект с классами для валидации
export const validationConfig = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__save-button',
  inactiveButtonClass: 'form__save-button_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__error_visible',
};
// функция открытия попап
export const openPopup = function(item) {
  document.addEventListener('keydown', handleEscUp );
  item.classList.add("popup_opened")
};
// переменные

//----------------------Popup--------------------
export const popupElementProfile = document.querySelector('.popup_type_profile');
export const popupNewCard = document.querySelector('.popup_type_image');
export const popupViewImage = document.querySelector('.popup_type_size-image');
//----------------------Buttons------------------
export const buttonOpeningProfile = document.querySelector('.profile__edit-button');

//----------------------формы-------------------
export const profileForm = document.querySelector('.form_type_profile');
export const cardForm = document.querySelector('.form_save-photo');

// Находим поля формы в DOM
export const nameInput = document.querySelector('.form__input_type_name');
export const jobInput = document.querySelector('.form__input_type_job');
export const linkInput = document.querySelector('.form__input_type_link');
export const placeInput = document.querySelector('.form__input_type_place');
//-------------Profile------------
export const profileName = document.querySelector('.profile__title');
export const profileJob = document.querySelector('.profile__description');
export const addButton = document.querySelector('.profile__add-button');
//-------------Cards---------------
export const cardSection = document.querySelector('.cards');

// обработчик закрытия по esc
export const handleEscUp = (evt) => {
  if (evt.key === 'Escape') {
    const activePopup = document.querySelector('.popup_opened');
    closePopup(activePopup);
  }
};
