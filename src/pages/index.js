import "./index.css"// добавьте импорт главного файла стилей
import {Card} from '../components/Card.js'
import {FormValidator} from '../components/FormValidator.js'
import {validationConfig} from '../utils/constants.js'
import {initialCards} from '../utils/constants.js'
import {
  popupImage,
  containerSelector,
  buttonOpeningProfile,
  profileForm,
  cardForm,
  linkInput,
  placeInput,
  addButton,
  jobInput,
  nameInput,
  popupTypeProfile,
  popupTypeImage,
  templateElement,
  popupProfileName,
  popupProfileDescription,
} from '../utils/constants.js';

// импортируем из components  классы
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';

// объект отвечает за управление отображением информации о пользователе на странице, принимает два селектора(import from constants), эл- т имени и информации.
const userInfo = new UserInfo ({profileName: popupProfileName, profileJob: popupProfileDescription})

// объект с попап профайл
const popupWithFormProfile = new PopupWithForm({popupSelector: popupTypeProfile,
  handleFormCallBack:({name, job}) => {
    userInfo.setUserInfo({name, job})
    popupWithFormProfile.close()
  }
});

// объект с попап фото
const popupWithImage = new PopupWithImage(popupImage);

//функция создания карточки
const createCard = (item) => {
  const card = new Card(item, templateElement,
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

// объект добавления карточек
const popupWithFormCards = new PopupWithForm({popupSelector: popupTypeImage,
  handleFormCallBack:() => {
    const newElementCard = createCard({name: placeInput.value, link: linkInput.value});
    cardList.addItem(newElementCard)
    cardForm.reset()
    popupWithFormCards.close();
  }
});

popupWithFormProfile.setEventListeners();
popupWithImage.setEventListeners();
popupWithFormCards.setEventListeners();

//----------- Прикрепляем обработчик-----------------
buttonOpeningProfile.addEventListener('click', () => {
  const getUserInfo = userInfo.getUserInfo();
  jobInput.value = getUserInfo.job;
  nameInput.value = getUserInfo.name
  formValidateBio.enableSubmitButton()
  popupWithFormProfile.open();
});

addButton.addEventListener('click', () => {
  formValidatePhoto.resetValidation();
  popupWithFormCards.open()
});

//----------создание нового экземпляра валидации----------------
const formValidatePhoto = new FormValidator(validationConfig, cardForm);
const formValidateBio= new FormValidator(validationConfig, profileForm);
formValidatePhoto.enableValidation()
formValidateBio.enableValidation()
