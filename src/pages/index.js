import "./index.css"; // добавьте импорт главного файла стилей
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { validationConfig } from "../utils/constants.js";
import {
  popupImage,
  containerSelector,
  buttonOpeningProfile,
  profileForm,
  cardForm,
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
  popupSubmit,
} from "../utils/constants.js";

// импортируем из components  классы
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Api from "../components/Api";
import PopupWithSubmit from "../components/PopupWithSubmit.js";

// Данные ползователя
let userData = null;

// создание объекта Api
const api = new Api({ url: apiUrl, token });
// Данные ползователя
// объект информации о User
const userInfo = new UserInfo({
  profileName: popupProfileName,
  profileJob: popupProfileDescription,
  profileAvatar: profileAvatar,
});

//переменная для ID
// загрузка информации с сервера о карточках и юзере
api
  .getData()
  .then(([arrCards, userInform]) => {
    userData = userInform;
    userInfo.setUserInfo(userInform);
    userInfo.setUserAvatar(userInform);
    cardList.render(arrCards);
  })
  .catch((err) => console.log(err));

//попап подтверждения удаления карточки
const popupWithSubmitDelete = new PopupWithSubmit(popupSubmit);
popupWithSubmitDelete.setEventListeners();

//функция удаления карточки
function deleteCard(card) {
  popupWithSubmitDelete.setFormSubmit(() => {
    api
      .deleteCard(card.cardId)
      .then(() => {
        card.deleteCardEl();
        popupWithSubmitDelete.close();
      })
      .catch((err) => console.log(err));
  });
  popupWithSubmitDelete.open();
}

//Попап смена Аватарки
const popupEditAvatar = new PopupWithForm({
  popupSelector: popupAvatar,
  handleFormCallBack: (data) => {
    popupEditAvatar.renderLoading(true, false);
    api
      .editAvatar(data)
      .then((res) => {
        userInfo.setUserAvatar(res);
        popupEditAvatar.close();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        popupEditAvatar.renderLoading(false, false);
      });
  },
});
//добавление метода к аватарке
popupEditAvatar.setEventListeners();
avatarButton.addEventListener("click", () => {
  formValidateAvatar.resetValidation();
  popupEditAvatar.open();
});

// объект с попап профайл
const popupWithFormProfile = new PopupWithForm({
  popupSelector: popupTypeProfile,
  handleFormCallBack: (data) => {
    debugger;
    popupWithFormProfile.renderLoading(false, true);
    api
      .editprofile(data)
      .then((res) => {
        userInfo.setUserInfo(res);
        popupWithFormProfile.close();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        popupWithFormProfile.renderLoading(false, false);
      });
  },
});

//рендер первоначальных карточек
const cardList = new Section(
  {
    renderer: (item) => {
      cardList.addItemAppend(createCard(item));
    },
  },
  containerSelector
);

// Попап открытия картинки
const popupWithImage = new PopupWithImage(popupImage);

// установка и снятие лайка
function handleLikeClick(card, data) {
  const promise = card.isLiked()
    ? api.deleteLike(data._id)
    : api.addLike(data._id);
  promise
    .then((data) => {
      card.setLike(data);
    })
    .catch((err) => console.log(err));
}

const createCard = (item) => {
  const card = new Card(
    {
      data: item,
      ownerId: userData._id, //мой ID
      handleLikeClick: () => handleLikeClick(card, item),
      handleDeleteClick: () => deleteCard(card),
      handleCardClick: (title, image) => {
        popupWithImage.open({
          name: title,
          link: image,
        });
      },
    },
    templateElement
  );
  const newCard = card.generateCard();
  return newCard;
};

// объект добавления карточек
const popupWithFormCards = new PopupWithForm({
  popupSelector: popupTypeImage,
  handleFormCallBack: (data) => {
    popupWithFormCards.renderLoading(true, false);
    const item = {
      name: data.place,
      link: data.link,
    };
    api
      .addCard(item)
      .then((res) => {
        cardList.addItemPrepand(createCard(res));
        cardForm.reset();
        popupWithFormCards.close();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        popupWithFormCards.renderLoading(false, false);
      });
  },
});

// метод из попапа
popupWithFormProfile.setEventListeners();
popupWithImage.setEventListeners();
popupWithFormCards.setEventListeners();

//----------- Прикрепляем обработчик-----------------

//слушатель на профайл
buttonOpeningProfile.addEventListener("click", () => {
  const getUserInfo = userInfo.getUserInfo();
  jobInput.value = getUserInfo.job;
  nameInput.value = getUserInfo.name;
  formValidateBio.resetValidation();
  popupWithFormProfile.open();
});

//слушатель на добавление карточек
addButton.addEventListener("click", () => {
  formValidatePhoto.resetValidation();
  popupWithFormCards.open();
});

//----------создание нового экземпляра валидации----------------
const formValidatePhoto = new FormValidator(validationConfig, cardForm);
const formValidateBio = new FormValidator(validationConfig, profileForm);
const formValidateAvatar = new FormValidator(validationConfig, avatarForm);
formValidatePhoto.enableValidation();
formValidateBio.enableValidation();
formValidateAvatar.enableValidation();
