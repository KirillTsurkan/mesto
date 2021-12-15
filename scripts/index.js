import {Card} from './Card.js'
import {FormValidator} from './FormValidator.js'
import {validationConfig} from './components.js'
const initialCards = [
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
//----------------------Popup--------------------
const popupElementProfile = document.querySelector('.popup_type_profile');
const popupNewCard = document.querySelector('.popup_type_image');
export const popupViewImage = document.querySelector('.popup_type_size-image');
const overlay = document.querySelector('.popup_opened');
const popupList = document.querySelectorAll('.popup');
//----------------------Buttons------------------
const buttonOpeningProfile = document.querySelector('.profile__edit-button');

//----------------------формы-------------------
const profileForm = document.querySelector('.form_type_profile');
const cardForm = document.querySelector('.form_save-photo');

// Находим поля формы в DOM
const nameInput = document.querySelector('.form__input_type_name');
const jobInput = document.querySelector('.form__input_type_job');
const linkInput = document.querySelector('.form__input_type_link');
const placeInput = document.querySelector('.form__input_type_place');
//-------------Profile------------
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');
const addButton = document.querySelector('.profile__add-button');
//-------------Cards---------------
const cardSection = document.querySelector('.cards');


//-----------Форма отправки-------------------
const handleNewCardSubmit = (evt) => {
  evt.preventDefault();
  const newElementCard = createCard({name: placeInput.value, link: linkInput.value});
  cardSection.prepend(newElementCard);
  closePopup(popupNewCard);
  cardForm.reset()
};

//-----------Функция открытия popup--------------
export const openPopup = function(item) {
  document.addEventListener('keydown', handleEscUp );
  item.classList.add("popup_opened")
};

//-----------Функция открытия popup по событию 'Click'-----------
const handleOverlayClick = (evt) => {
  if (evt.target.classList.contains('popup_opened')) {
    closePopup(evt.target);
  };
};


  //-----------Функция закрытия popup------------
  const closePopup = function (item) {
    document.removeEventListener('keydown', handleEscUp);
    item.classList.remove('popup_opened');
  };

  const handleEscUp = (evt) => {
    if (evt.key === 'Escape') {
      const activePopup = document.querySelector('.popup_opened');
      closePopup(activePopup);
    }
  };


//----функции передачи значения форме профиля----
function openPopupProfile() {
  openPopup(popupElementProfile);
  jobInput.value = profileJob.textContent;
  nameInput.value = profileName.textContent;
};

// Обработчик «отправки» формы Profile
function handleProfileSubmit (evt) {
  evt.preventDefault();
  profileJob.textContent = jobInput.value;
  profileName.textContent = nameInput.value;
  closePopup(popupElementProfile);
};

//функция создания карточки
const createCard = (data) => {
  const card = new Card(data, '.template');
    return card.generateCard();
};


//обход исходного массива  и добавление их в контейнер
const renderCards = function() {
  const createDataCards = initialCards.map((item) => {
    return createCard(item, '.template');
  });
  cardSection.append(...createDataCards);
};
renderCards();

//-----------функция закрытия всех popup-----------------

const popups = document.querySelectorAll('.popup')
popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup)
      }
    if (evt.target.classList.contains('popup__close-button')) {
      closePopup(popup)
      }
  })
})

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
profileForm.addEventListener('submit', handleProfileSubmit);
buttonOpeningProfile.addEventListener('click', openPopupProfile);
addButton.addEventListener('click', () => {
  openPopup(popupNewCard);
  formValidatePhoto.resetInput();
});
cardForm.addEventListener('submit', handleNewCardSubmit);
document.addEventListener('click', handleOverlayClick);

const formValidatePhoto = new FormValidator(validationConfig, cardForm);
const formValidateBio= new FormValidator(validationConfig, profileForm);
formValidatePhoto.enableValidation()
formValidateBio.enableValidation()
