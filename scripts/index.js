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
import {handleEscUp,openPopup,popupElementProfile,popupNewCard,buttonOpeningProfile,profileForm,cardForm,nameInput,jobInput,linkInput,placeInput,profileName,profileJob,addButton,cardSection} from './components.js';

//-----------Форма отправки-------------------
const handleNewCardSubmit = (evt) => {
  evt.preventDefault();
  const newElementCard = createCard({name: placeInput.value, link: linkInput.value});
  cardSection.prepend(newElementCard);
  closePopup(popupNewCard);
  cardForm.reset()
};

  //-----------Функция закрытия popup------------
  const closePopup = function (item) {
    document.removeEventListener('keydown', handleEscUp);
    item.classList.remove('popup_opened');
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
  const card = new Card(data, '.template'); // создание карточки при помощи класса Card
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
    if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close-button')) {
      closePopup(popup)
    }
  });
});

//----------- Прикрепляем обработчик-----------------
profileForm.addEventListener('submit', handleProfileSubmit);
buttonOpeningProfile.addEventListener('click', () => {
  openPopupProfile();
  formValidateBio.resetValidation();
});
addButton.addEventListener('click', () => {
  openPopup(popupNewCard);
  formValidatePhoto.resetValidation();
});
cardForm.addEventListener('submit', handleNewCardSubmit);
//----------создание нового экземпляра валидации----------------
const formValidatePhoto = new FormValidator(validationConfig, cardForm);
const formValidateBio= new FormValidator(validationConfig, profileForm);
formValidatePhoto.enableValidation()
formValidateBio.enableValidation()
