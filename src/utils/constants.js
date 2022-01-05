//объект с классами для валидации
export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
export const validationConfig = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__save-button',
  inactiveButtonClass: 'form__save-button_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__error_visible',
};

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

// Селекторы
export const popupTypeProfile = '.popup_type_profile';
export const containerSelector = '.cards';
export const profileInputJob = '.form__input_type_job';
export const profileInputName = '.form__input_type_name';
export const popupImage = '.popup_type_size-image';
export const popupTypeImage = '.popup_type_image';
export const popupProfileName = '.profile__title';
export const templateElement = '.template';
export const popupProfileDescription = '.profile__description';
