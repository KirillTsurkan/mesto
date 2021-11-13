const popupElement = document.querySelector('.popup');
const closePopup = document.querySelector('.popup__close-button');
const openPopup = document.querySelector('.profile__edit-button');
const saveButton = document.querySelector('.form__save-button');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');
const formElement = document.querySelector('.form');
const addButton = document.querySelector('.profile__add-button');
const LikeButtonElements = document.querySelectorAll('.cards__like');
// Находим поля формы в DOM
let nameInput = document.querySelector('.form__input_type_name')
let jobInput = document.querySelector('.form__input_type_job')
let linkInput = document.querySelector('.form__input_type_link')


//функции открытия и закрытия
function viewPopup() {
  popupElement.classList.add('popup_opened')
  jobInput.value = profileJob.textContent;
  nameInput.value = profileName.textContent;
}


function noViewPopup () {
  popupElement.classList.remove('popup_opened');
}


// Обработчик «отправки» формы.
function formSubmitHandler (evt) {
  evt.preventDefault();
  profileJob.textContent = jobInput.value;
  profileName.textContent = nameInput.value;
  noViewPopup();

}
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);
openPopup.addEventListener('click', viewPopup);
closePopup.addEventListener('click', noViewPopup);

LikeButtonElements.forEach(function (like) {
  like.addEventListener('click', (event) => {
  event.target.classList.toggle('cards__like_aktive');
  });
});

