import "./index.css"// добавьте импорт главного файла стилей
import {Card} from '../components/Card.js'
import {FormValidator} from '../components/FormValidator.js'
import {validationConfig} from '../utils/constants.js'
// import {initialCards} from '../utils/constants.js'
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
  apiUrl,
  token,
  avatarButton,
  popupAvatar,
  profileAvatar,
  avatarForm,
} from '../utils/constants.js';

// импортируем из components  классы
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import { Api } from "../components/Api"


// import PopupWithRemoveQuestion from "../components/PopupWithRemoveQuestion";
import { validate } from "schema-utils";
// объект отвечает за управление отображением информации о пользователе на странице, принимает два селектора(import from constants), эл- т имени и информации.

// window.addEventListener('load', function() {
//   api.deleateCard()
//     .then((res) => {
//       console.log(res);
//     })
// })
// создание объекта Api
const api = new Api({url: apiUrl, token})

// объект информации о User
const userInfo = new UserInfo ({profileName: popupProfileName, profileJob: popupProfileDescription, profileAvatar: profileAvatar})

//переменная для ID
let myProfileId;
// загрузка информации с сервера о карточках и юзере
api.getData()
  .then(([arrCards, userInform]) => {
  myProfileId = userInfo._id;
  userInfo.setUserInfo(userInform);
  userInfo.setUserAvatar(userInform)
  cardList.render(arrCards);
  })
  .catch(err => console.log(err))




// Попап подтверждения удаления
// const popupConfirmCard = new PopupWithRemoveQuestion(popupConfirm, {
//   handleFormCallBack: (data) => {
//     api.deleteCard(data)
//     .then (() => {
//       data.card.remove()
//       popupConfirm.close()
//     })
//     .catch((err) => console.log(err));
//   }
// })
// popupConfirmCard.setEventListeners();



//Попап смена Аватарки
const popupEditAvatar = new PopupWithForm ({popupSelector: popupAvatar,
  handleFormCallBack:(data) => {
    api.editAvatar(data)
      .then ((res) => {
    userInfo.setUserAvatar(res)
    popupEditAvatar.close()
    })
    .catch(err => console.log(err))
  }
});
//добавление метода к аватарке
popupEditAvatar.setEventListeners();
avatarButton.addEventListener('click', () => {
  popupEditAvatar.open()
})

// объект с попап профайл
const popupWithFormProfile = new PopupWithForm({popupSelector: popupTypeProfile,
  handleFormCallBack:(data) => {
    api.editprofile(data)
      .then ((res) => {
    userInfo.setUserInfo(res)
    popupWithFormProfile.close()
      })
  }
});

//рендер первоначальных карточек
// api.getCards()
//   .then((result) => {
    const cardList = new Section ({
    // items: result,
    renderer: (item) => {
      // const card = createCard(item)
      cardList.addItem(createCard(item))
    }
  }, containerSelector);
  // cardList.render()

// let cards, profileInfo,cardList = null;
// объект с попап фото

// Попап открытия картинки
const popupWithImage = new PopupWithImage(popupImage);



//функция создания карточки


// const createCard = (data) => {
//   const card = new Card(data, templateElement,
//     () => {
//     popupWithImage.open(data.name, data.link);
//     }
//   );
//   const newCard = card.generateCard();
//   return newCard
// }


const createCard = (data) => {
  const card = new Card(data, templateElement,
    () => {
    popupWithImage.open(data.name, data.link);
    }
  )
  const newCard = card.generateCard();
  return newCard
}



// объект который отвечает за отрисовку элементов на странице. items renderer  selector.
// const cardList = new Section ({items: initialCards,
//   renderer: (item) => {
//     const card = createCard(item)
//     cardList.addItem(card)
//   }
// }, containerSelector);
// cardList.render ()

// объект добавления карточек
const popupWithFormCards = new PopupWithForm({popupSelector: popupTypeImage,
  handleFormCallBack:() => {
    const newElementCard = createCard({name: placeInput.value, link: linkInput.value});
    cardList.addItem(newElementCard)
    cardForm.reset()
    popupWithFormCards.close();
  }
});

// const addNewCardPopup = new PopupWithForm(addCardPopup, {
//   formSubmitCallBack: (data, button) => {
//     addSpinner(button);
//     const item = {
//       name: data.placeName,
//       link: data.placeLink,
//     };
//     api
//       .addNewCard(item)
//       .then((res) => {
//         section.addItem(createCard(res), true);
//         addNewCardPopup.close();
//       })
//       .catch((err) => console.log(err))
//       .finally(() => {
//         removeSpinner(button);
//       });
//   },
// });



// метод из попапа
popupWithFormProfile.setEventListeners();
popupWithImage.setEventListeners();
popupWithFormCards.setEventListeners();

//----------- Прикрепляем обработчик-----------------

//слушатель на профайл
buttonOpeningProfile.addEventListener('click', () => {
  const getUserInfo = userInfo.getUserInfo();
  jobInput.value = getUserInfo.job;
  nameInput.value = getUserInfo.name
  formValidateBio.enableSubmitButton()
  popupWithFormProfile.open();
});

//слушатель на добавление карточек
addButton.addEventListener('click', () => {
  formValidatePhoto.resetValidation();
  popupWithFormCards.open()
});

//----------создание нового экземпляра валидации----------------
const formValidatePhoto = new FormValidator(validationConfig, cardForm);
const formValidateBio= new FormValidator(validationConfig, profileForm);
const formValidateAvatar = new FormValidator(validationConfig, avatarForm);
formValidatePhoto.enableValidation()
formValidateBio.enableValidation()
formValidateAvatar.enableValidation()
