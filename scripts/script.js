//----------------------Popup--------------------
const popupElementProfile = document.querySelector('.popup_type_profile');
const popupNewCard = document.querySelector('.popup_type_image');
const popupViewImage = document.querySelector('.popup_type_size-image');
//----------------------Buttons------------------
const buttonClosingProfile = document.querySelector('.popup__close-button_type_profile');
const buttonClosingSizeImage = document.querySelector('.popup__close-button_size_image');
const buttonClosingCard = document.querySelector('.popup__close-button-card');
const buttonOpeningProfile = document.querySelector('.profile__edit-button');
const buttonSavingProfile = document.querySelector('.form__save-button_type_profile');
const addNewCardButton = document.querySelector('.profile__add-button');

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
const createTaskDomNode = (name, link) => {
  const template = document.querySelector('.template');
  const taskTemplate = template.content.querySelector('.cards__item').cloneNode(true);
  taskTemplate.querySelector('.cards__title').textContent = name;
  taskTemplate.querySelector('.cards__photo').src = link
  taskTemplate.querySelector('.cards__photo').alt = name;
  taskTemplate.querySelector('.cards__photo').addEventListener('click', () => { //ПРИ КЛИКЕ БУДЕТ открываться POPUP
    popupViewImage.classList.add('popup_opened');
    popupViewImage.querySelector('.popup__photo').src = taskTemplate.querySelector('.cards__photo').src;
    popupViewImage.querySelector('.popup__photo').alt = taskTemplate.querySelector('.cards__photo').alt;
    popupViewImage.querySelector('.popup__photo-caption').textContent = taskTemplate.querySelector('.cards__photo').alt;
  });
  buttonClosingSizeImage.addEventListener('click', () => {popupViewImage.classList.remove('popup_opened')
  });
  const deleteButtonPhoto = taskTemplate.querySelector('.cards__remove');
  deleteButtonPhoto.addEventListener('click', () => {
    taskTemplate.remove();
  });
  const likeButtonElement = taskTemplate.querySelector('.cards__like');
  likeButtonElement.addEventListener('click', (event) => {
    event.target.classList.toggle('cards__like_aktive');
    });
  return taskTemplate;
};

//функция удаления карточек
// cardDelete.addEventListener('click', function () {
//   const listItem = cardDelete.closest('.cards__item');
//   listItem.remove();
// });

//массив карточек
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
//-------функция присвоения данных массива карточке-------------
const result = initialCards.map((item) => {
  return createTaskDomNode(item.name, item.link);
});
//-----------Форма отправки-------------------
const submitformHandlerCard = (evt) => {
  evt.preventDefault();
  const createElement = createTaskDomNode(placeInput.value, linkInput.value);
  cardSection.prepend(createElement);
  popupNewCard.classList.remove('popup_opened');
  linkInput.value = '';
  placeInput.value = '';
};

const openPopuppp = function(item){
  item.classList.add("popup_opened")
  }

//функции открытия и закрытия
function viewPopup() {
  popupElementProfile.classList.add('popup_opened')
  jobInput.value = profileJob.textContent;
  nameInput.value = profileName.textContent;
};

function noViewPopup () {
  popupElementProfile.classList.remove('popup_opened');
}

addButton.addEventListener('click', () => {
  openPopuppp(popupNewCard);
})

buttonClosingCard.addEventListener('click', () => {
  popupNewCard.classList.remove('popup_opened');
})

// Обработчик «отправки» формы Profile
function formSubmitHandler (evt) {
  evt.preventDefault();
  profileJob.textContent = jobInput.value;
  profileName.textContent = nameInput.value;
  noViewPopup();
}

//-----------Добавление форме обработчика-----------
cardForm.addEventListener('submit', submitformHandlerCard);
cardSection.append(...result);


// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
profileForm.addEventListener('submit', formSubmitHandler);
buttonOpeningProfile.addEventListener('click', viewPopup);
buttonClosingProfile.addEventListener('click', noViewPopup);
