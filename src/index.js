import './pages/index.css';
import { settings, showInputError, hideInputError, isValid, hasInvalidInput, toggleButtonState, enableValidation, setEventListeners } from './components/validate'
import { openPopup, closePopup } from './components/modal';
import { initialCards, createCard, addNewCard, loadCards, cardsList } from './components/card';
import { getUserData, getCards, postUserProfile, postCard, deleteCard, addLike, deleteLike, addAvatar } from './components/api';
import { getResponse, renderLoading } from './components/utils';



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
//Общие
const popups = document.querySelectorAll('.popup')
const userProfile = document.querySelector('.profile')
const userAvatar = document.querySelector('.profile__avatar')
const avatarBtn = document.querySelector('.profile__avatar-button')



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


///////////Попап с изображением:
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
