import {Card} from '../components/Card.js'
import {FormValidator} from '../components/FormValidator.js'
import {validationConfig} from '../utils/constants.js'
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
import {
  popupImage,
  profileInputName,
  profileInputJob,
  containerSelector,
  popupElementProfile,
  popupNewCard,
  buttonOpeningProfile,
  profileForm,
  cardForm,
  nameInput,
  jobInput,
  linkInput,
  placeInput,
  profileName,
  profileJob,
  addButton,
  cardSection,
  popupTypeProfile,
  popupTypeImage,
  popupProfileName,
  popupProfileJob,
} from '../utils/constants.js';

// импортируем из components  классы
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import { Popup } from '../components/Popup.js';


// объект отвечает за управление отображением информации о пользователе на странице, принимает два селектора(import from constants), эл- т имени и информации.
const userInfo = new UserInfo ({profileName: '.profile__title', profileJob:'.profile__description'})

// объект с попап профайл
const popupWithFormProfile = new PopupWithForm({popupSelector:'.popup_type_profile',
handleFormCallBack:({name, job}) => {
  userInfo.setUserInfo({name, job})
  // profileJob.textContent = jobInput.value;
  // profileName.textContent = nameInput.value;
  popupWithFormProfile.close()}
});

// объект с попап фото
const popupWithImage = new PopupWithImage(popupImage);
//объект с попап формой


// const popupWithFormCards = new PopupWithForm(popupTypeImage, )
//   ()=> {
// })

//функция создания карточки
const createCard = (item) => {
  const card = new Card(item, '.template',
    () => {
    popupWithImage.open(item.name, item.link);
    }
  );
  const newCard = card.generateCard();
  return newCard
}
// объект который отвечает за отрисовку элементов на странице. items renderer  selector.
const cardList = new Section ({items: initialCards,
  renderer: (item) => {
    const card = createCard(item)
    cardList.addItem(card)
  }
}, containerSelector);
cardList.render ()

//-----------Форма отправки-------------------
// const handleNewCardSubmit = (evt) => {
//   evt.preventDefault();
//   const newElementCard = createCard({name: placeInput.value, link: linkInput.value});
//   cardSection.prepend(newElementCard);
//   cardForm.reset()
// };

//----функции передачи значения форме профиля----
// function openPopupProfile() {
//   openPopup(popupElementProfile);
//   jobInput.value = profileJob.textContent;
//   nameInput.value = profileName.textContent;
// };

//бработчик «отправки» формы Profile
// function handleProfileSubmit (evt) {
//   evt.preventDefault();
//   profileJob.textContent = jobInput.value;
//   profileName.textContent = nameInput.value;
  // closePopup(popupElementProfile);
// };

//обход исходного массива  и добавление их в контейнер
// const renderCards = function() {
//   const createDataCards = initialCards.map((item) => {
//     return createCard(item, '.template');
//   });
//   cardSection.append(...createDataCards);
// };
// renderCards();

//-----------функция закрытия всех popup-----------------
// const popups = document.querySelectorAll('.popup')
// popups.forEach((popup) => {
//   popup.addEventListener('click', (evt) => {
//     if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close-button')) {
//       closePopup(popup)
//     }
//   });
// });


// объект добавления карточек
const popupWithFormCards = new PopupWithForm({popupSelector:'.popup_type_image',
handleFormCallBack:() => {
    const newElementCard = createCard({name: placeInput.value, link: linkInput.value});
    cardSection.prepend(newElementCard);
    cardForm.reset()
    popupWithFormCards.close();
  }
  });





popupWithFormProfile.setEventListeners();
popupWithImage.setEventListeners();
popupWithFormCards.setEventListeners();

//----------- Прикрепляем обработчик-----------------
// profileForm.addEventListener('submit', handleProfileSubmit);
buttonOpeningProfile.addEventListener('click', () => {
  formValidateBio.resetValidation();
  popupWithFormProfile.open();
});

addButton.addEventListener('click', () => {
  popupWithFormCards.open()
  formValidatePhoto.resetValidation();
});

// cardForm.addEventListener('submit', handleNewCardSubmit);
//----------создание нового экземпляра валидации----------------
const formValidatePhoto = new FormValidator(validationConfig, cardForm);
const formValidateBio= new FormValidator(validationConfig, profileForm);
formValidatePhoto.enableValidation()
formValidateBio.enableValidation()
