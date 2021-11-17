const popupElement = document.querySelector('.popup');
const popupTypeImage = document.querySelector('.popup_type_image');
const modalSizeImage = document.querySelector('.popup_type_size-image')
const popupTypeProfile = document.querySelector('popup_type_profile')
const closePopup = document.querySelector('.popup__close-button');
const closePopupSize = document.querySelector('.popup__close-button_size_image')
const closePopupPhoto = document.querySelector('.popup__close-button-photo')
const openPopup = document.querySelector('.profile__edit-button');
const saveButton = document.querySelector('.form__save-button');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');
const formElement = document.querySelector('.form');
const addButton = document.querySelector('.profile__add-button');
const cardsTitle = document.querySelector('.cards__title');
const formSavePhoto = document.querySelector('.form_save-photo')
const formInputPlace = document.querySelector('.form__input_type_place');
const cardSection = document.querySelector('.cards');
const inputForm = document.querySelector('.form_save-photo');
const photoBigSize = document.querySelector('.cards__photo');
// Находим поля формы в DOM
const nameInput = document.querySelector('.form__input_type_name');
const jobInput = document.querySelector('.form__input_type_job');
const linkInput = document.querySelector('.form__input_type_link');
const placeInput = document.querySelector('.form__input_type_place');


//функция создания карточки
const createTaskDomNode = (name, link) => {
  const template = document.querySelector('.template');
  const taskTemplate = template.content.querySelector('.cards__item').cloneNode(true);
  taskTemplate.querySelector('.cards__title').textContent = name;
  taskTemplate.querySelector('.cards__photo').src = link
  taskTemplate.querySelector('.cards__photo').alt = name;
  taskTemplate.querySelector('.cards__photo').addEventListener('click', () => { //ПРИ КЛИКЕ БУДЕТ открываться POPUP
    modalSizeImage.classList.add('popup_opened');
    modalSizeImage.querySelector('.popup__photo').src = taskTemplate.querySelector('.cards__photo').src;
    modalSizeImage.querySelector('.popup__photo').alt = taskTemplate.querySelector('.cards__photo').alt;
    modalSizeImage.querySelector('.popup__photo-caption').textContent = taskTemplate.querySelector('.cards__photo').alt;


  });
  closePopupSize.addEventListener('click', () => {modalSizeImage.classList.remove('popup_opened')
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

const result = initialCards.map((item) => {
  return createTaskDomNode(item.name, item.link);
});

const submitformHandlerCard = (evt) => {
  evt.preventDefault();
  const createElement = createTaskDomNode(placeInput.value, linkInput.value);
  cardSection.prepend(createElement);
  popupTypeImage.classList.remove('popup_opened');
  linkInput.value = '';
  placeInput.value = '';
};

const openPopuppp = function(item){
  item.classList.add("popup_opened")
  }

//функции открытия и закрытия
function viewPopup() {
  popupElement.classList.add('popup_opened')
  jobInput.value = profileJob.textContent;
  nameInput.value = profileName.textContent;
};

function noViewPopup () {
  popupElement.classList.remove('popup_opened');
}

addButton.addEventListener('click', () => {
  openPopuppp(popupTypeImage);
})

closePopupPhoto.addEventListener('click', () => {
  popupTypeImage.classList.remove('popup_opened');
})

// every button has a class "action-button"
// const actionBtns = ...
// actionBtns.forEach(button => {
//   button.addEventListener('click', (evt) => {
//     if(evt.target.classList.contains('add') {
//       popupTypeImage.classList.add('popup_opened')
//     }
//   })
// })
// every close button has a class "close-button"



// Обработчик «отправки» формы Profile
function formSubmitHandler (evt) {
  evt.preventDefault();
  profileJob.textContent = jobInput.value;
  profileName.textContent = nameInput.value;
  noViewPopup();
}

// function formSubmitPhoto (evt) {
//   evt.preventDefault();
//   cardsTitle.textContent = formInputPlace.value;
//
//   popupTypeImage.classList.remove('popup_opened');
// }


inputForm.addEventListener('submit', submitformHandlerCard);
cardSection.append(...result);




// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);
openPopup.addEventListener('click', viewPopup);
closePopup.addEventListener('click', noViewPopup);

// const likeActive = LikeButtonElements.forEach(function (like) {
//   like.addEventListener('click', (event) => {
//   event.target.classList.toggle('cards__like_aktive');
//   });
// });


//  photoBigSize.addEventListener('click', (event) => {
//   event.target.classList.toggle('popup_opened');
//  })
// -----------------функция открытия модального окна фото-------------------

// function handleModal() {

//   const popupModal = document.querySelector('.popup_type_modal');
//   const modalSrc = popupModal.querySelector('.popup__pic');
//   const modalTitle = popupModal.querySelector('.popup__pic-caption');

//   popupOpen(popupModal);
//   modalTitle.textContent = name;
//   modalSrc.alt = name;
//   modalSrc.src = link;

// }

// deleteButton.addEventListener('click', handleDeletePhoto);
// likeButton.addEventListener('click', handleLike);
// photoSrc.addEventListener('click', handleModal);

// return newPhoto;
// }
