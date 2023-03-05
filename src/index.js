import './pages/index.css';
import { settings, showInputError, hideInputError, isValid, hasInvalidInput, toggleButtonState, enableValidation, setEventListeners } from './components/validate'
import { openPopup, closePopup} from './components/modal';
import { initialCards } from './components/card';

//Переменные Popup Profile
const popupProfile = document.querySelector('.popup__profile');
const popupEditBtn = document.querySelector('.profile__edit-button');
const popupProfileForm = popupProfile.querySelector('.popup__form');
const profileName = document.querySelector('.profile__name');
const profileInfo = document.querySelector('.profile__description');
const nameInput = popupProfileForm.querySelector('#Name');
const jobInput = popupProfileForm.querySelector('#About');
//Переменные Popup Create Card
const popupCard = document.querySelector('.popup__card');
const popupCardOpenBtn = document.querySelector('.profile__add-button');
const popupCardForm = popupCard.querySelector('.popup__form');
const cardTitle = popupCard.querySelector('#title');
const cardLink = popupCard.querySelector('#link');
//Переменные popup IMG
const popupImg = document.querySelector('.popup__img');
//
const popups = document.querySelectorAll('.popup')


//Закрытие попапов через нажатие на крестик или оверлей
popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
          closePopup(popup)
      }
      if (evt.target.classList.contains('popup__close-button')) {
        closePopup(popup)
      }
  })
})


//////Попап редактирование профиля:

//Открытие попапа edit profile 
popupEditBtn.addEventListener('click', function () {
    nameInput.value = profileName.textContent;
    jobInput.value = profileInfo.textContent;
    openPopup(popupProfile);
});

//Обработчик отправки формы
function submitProfileForm(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileInfo.textContent = jobInput.value;
    closePopup(popupProfile);
};

//Прикрепление обработчика к форме
popupProfileForm.addEventListener('submit', submitProfileForm);


///////////Попап для создания карточки с фото:

//Открытие карточки
popupCardOpenBtn.addEventListener('click', function () {
    openPopup(popupCard);
});

//Обработчик отправки формы
function submitCardForm(evt) {
    evt.preventDefault();
    const newImg = createCard(cardTitle.value, cardLink.value)
    addNewCard(newImg, cardsList);
    evt.target.reset();
    closePopup(popupCard);
};


//Прикрепление обработчика к форме
popupCardForm.addEventListener('submit', submitCardForm);

  ////////////Добавление карточки пользователем
  
  const cardTemplate = document.querySelector('#card-template').content;
  const cardsList = document.querySelector('.elements__grid');
  
  //Функция для создания и просмотра карточки пользователем (клонируем template, наполняем содержимым, удаление, like button)
  function createCard(titleValue, imgValue) {
    const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
    cardElement.querySelector('.element__title').textContent = titleValue;
    const cardImage = cardElement.querySelector('.element__image');
    cardImage.src = imgValue;
    cardImage.alt = titleValue;
    cardImage.addEventListener('click', function () {
      popupImg.querySelector('.popup__img-photo').src = imgValue;
      popupImg.querySelector('.popup__img-photo').alt = titleValue;
      popupImg.querySelector('.popup__img-caption').textContent = titleValue;
      openPopup(popupImg);
    });
    cardElement.querySelector('.element__like-button').addEventListener('click', function (evt) {
      evt.target.classList.toggle('element__like-button_active');
    });
    cardElement.querySelector('.element__delete-button').addEventListener('click', function () {
      cardElement.remove();
    });
    return cardElement;
  };
  
  //Функция добавления новой карточки
  function addNewCard(card, container) {
    container.prepend(card);
  };
  
  
  //Функция добавления 6 шаблонных карточек
  function loadCards(array) {
    array.forEach(item => {
      const element = createCard(item.name, item.link);
      addNewCard(element, cardsList);
    });
  };
  
  loadCards(initialCards)


