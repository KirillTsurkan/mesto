const popupElement = document.querySelector('.popup');
const closePopup = document.querySelector('.popup__close-button');
const openPopup = document.querySelector('.profile__edit-button');
const saveButton = document.querySelector('.form__save-button');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');
let formElement = document.querySelector('.form')// Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
let nameInput = document.querySelector('.form__input_type_name') // Воспользуйтесь инструментом .querySelector()
let jobInput = document.querySelector('.form__input_type_job') // Воспользуйтесь инструментом .querySelector()



function viewPopup() {
  popupElement.classList.add('popup_opened');
  jobInput.value = profileJob.textContent;
  nameInput.value = profileName.textContent;
}

function noViewPopup () {
  popupElement.classList.remove('popup_opened');

}


// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
  evt.preventDefault();
  profileJob.textContent = jobInput.value;
  profileName.textContent = nameInput.value;
  noViewPopup();

    // Получите значение полей jobInput и nameInput из свойства value

    // Выберите элементы, куда должны быть вставлены значения полей

    // Вставьте новые значения с помощью textContent
}
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);
openPopup.addEventListener('click', viewPopup);
closePopup.addEventListener('click', noViewPopup);

