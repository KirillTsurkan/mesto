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
const popupViewImage = document.querySelector('.popup_type_size-image');
const overlay = document.querySelector('.popup_opened');
const popupList = document.querySelectorAll('.popup');
//----------------------Buttons------------------
const buttonClosingProfile = document.querySelector('.popup__close-button_type_profile');
const buttonClosingSizeImage = document.querySelector('.popup__close-button_size_image');
const buttonClosingCard = document.querySelector('.popup__close-button-card');
const buttonOpeningProfile = document.querySelector('.profile__edit-button');
const buttonSavingProfile = document.querySelector('.form__save-button_type_profile');
const buttonSavingImage = document.querySelector('.form__save-button_type_image');


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

//функция создания карточки
const createCard = (cardInfo) => {
  const template = document.querySelector('.template');
  const newCard = template.content.querySelector('.cards__item').cloneNode(true);
  newCard.querySelector('.cards__title').textContent = cardInfo.name;
  const cardPhoto = newCard.querySelector('.cards__photo');
  cardPhoto.src = cardInfo.link
  cardPhoto.alt = cardInfo.name;
  cardPhoto.addEventListener('click', () => { //ПРИ КЛИКЕ БУДЕТ открываться POPUP
    openPopup(popupViewImage);
    popupViewImage.querySelector('.popup__photo').src = cardInfo.link;
    popupViewImage.querySelector('.popup__photo').alt = cardInfo.name;
    popupViewImage.querySelector('.popup__photo-caption').textContent = cardInfo.name;
  });

  const deleteButtonPhoto = newCard.querySelector('.cards__remove');
  deleteButtonPhoto.addEventListener('click', () => {
    deleteButtonPhoto.closest('.cards__item').remove();
  });
  const likeButtonElement = newCard.querySelector('.cards__like');
  likeButtonElement.addEventListener('click', (event) => {
    event.target.classList.toggle('cards__like_aktive');
    });
  return newCard;
};

//-----------Форма отправки-------------------
const handleNewCardSubmit = (evt) => {
  evt.preventDefault();
  const newElementCard = createCard({name: placeInput.value, link: linkInput.value});
  cardSection.prepend(newElementCard);
  closePopup(popupNewCard);
  buttonSavingImage.setAttribute('disabled','disabled');
  cardForm.reset();

};

//-----------Функция открытия popup--------------
const openPopup = function(item) {
  document.addEventListener('keydown', handleEscUp );
  item.classList.add("popup_opened")
  document.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('popup_opened')) {
      popupList.forEach(function (popupElement) {
        popupElement.classList.remove('popup_opened');
      });
    }
  });
};

  //-----------Функция закрытия popup------------
  const closePopup = function (item) {
    document.removeEventListener('keydown', handleEscUp);
    item.classList.remove('popup_opened');
  };

  const handleEscUp = (evt) => {
    const activePopup = document.querySelector('.popup_opened');
    if (evt.key === 'Escape') {
      closePopup(activePopup);
    }
  };


//----функции передачи значения форме профиля----
function openPopupProfile() {
  openPopup(popupElementProfile);
  // jobInput.value = profileJob.textContent;
  // nameInput.value = profileName.textContent;
};

// Обработчик «отправки» формы Profile
function handleProfileSubmit (evt) {
  evt.preventDefault();
  profileJob.textContent = jobInput.value;
  profileName.textContent = nameInput.value;
  closePopup(popupElementProfile);
  profileForm.reset();
};

//обход исходного массива  и добавление их в контейнер
const renderCards = function() {
  const createDataCards = initialCards.map((item) => {
    return createCard(item);
  });
  cardSection.append(...createDataCards);
};
renderCards();

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
profileForm.addEventListener('submit', handleProfileSubmit);
buttonOpeningProfile.addEventListener('click', openPopupProfile);
buttonClosingProfile.addEventListener('click', () => {closePopup(popupElementProfile);
});
buttonClosingSizeImage.addEventListener('click', () => {closePopup(popupViewImage);
});
addButton.addEventListener('click', () => {
  openPopup(popupNewCard);
});
buttonClosingCard.addEventListener('click', () => {closePopup(popupNewCard);
});
cardForm.addEventListener('submit', handleNewCardSubmit);
