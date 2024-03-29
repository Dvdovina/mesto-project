import './pages/index.css';
import { settings, showInputError, hideInputError, isValid, hasInvalidInput, toggleButtonState, enableValidation, setEventListeners } from './components/validate'
import { openPopup, closePopup } from './components/modal';
import { getUserData, getCards, postUserProfile, postCard, deleteCard, addLike, deleteLike, addAvatar } from './components/api';
import { getResponse, renderLoading } from './components/utils';
import { createCard, cardsList } from './components/card'

//Переменные Popup Profile
const popupProfile = document.querySelector('.popup__profile');
const popupEditBtn = document.querySelector('.profile__edit-button');
const popupProfileForm = document.forms["user-info"];
const profileName = document.querySelector('.profile__name');
const profileInfo = document.querySelector('.profile__description');
const nameInput = popupProfileForm.querySelector('#Name');
const jobInput = popupProfileForm.querySelector('#About');
//Переменные Popup Create Card
const popupCard = document.querySelector('.popup__card');
const popupCardOpenBtn = document.querySelector('.profile__add-button');
const popupCardForm = document.forms["place-info"];
const cardTitle = popupCard.querySelector('#title');
const cardLink = popupCard.querySelector('#link');
//Общие
const popups = document.querySelectorAll('.popup')
const userProfile = document.querySelector('.profile')
const avatarBtn = document.querySelector('.profile__avatar-button')
//Переменные Popup Avatar
const popupAvatar = document.querySelector('.popup__avatar')
const popupAvatarForm = document.forms["avatar-info"];
const avatarInput = popupAvatar.querySelector('.popup__input')
const profileAvatar = document.querySelector('.profile__avatar')


//Загрузка инфо и карточек с сервера
Promise.all([getUserData(), getCards()])
  .then(([user, cards]) => {
    profileName.textContent = user.name;
    profileInfo.textContent = user.about;
    userProfile.id = user._id;
    profileAvatar.src = user.avatar;
    cards.forEach((card) => {
      cardsList.append(createCard(card, userProfile))
    });
  })
  .catch((err) => {
    console.log(err);
  });


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

//Открытие попапа edit profile 
popupEditBtn.addEventListener('click', function () {
  nameInput.value = profileName.textContent;
  jobInput.value = profileInfo.textContent;
  openPopup(popupProfile);
});


//Открытие карточки с изображением
popupCardOpenBtn.addEventListener('click', function () {
  openPopup(popupCard);
});

//Открытие попапа аватар
avatarBtn.addEventListener('click', function () {
  avatarInput.value = avatar.src
  openPopup(popupAvatar);
});


//Обработчик отправки формы с профилем
function submitProfileForm(evt) {
  renderLoading(true, evt.target)
  evt.preventDefault();
  postUserProfile(nameInput.value, jobInput.value)
    .then((res) => {
      profileName.textContent = res.name;
      profileInfo.textContent = res.about;
      closePopup(popupProfile);
      evt.target.reset();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, evt.target);
    });
};


//Прикрепление обработчика к форме
popupProfileForm.addEventListener('submit', submitProfileForm);


//Обработчик отправки формы с карточкой
function submitCardForm(evt) {
  renderLoading(true, evt.target)
  evt.preventDefault();
  postCard(cardTitle.value, cardLink.value)
    .then((card) => {
      cardsList.prepend(createCard(card, userProfile))
      closePopup(popupCard);
      evt.target.reset();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, evt.target);
    });
};


//Прикрепление обработчика к форме
popupCardForm.addEventListener('submit', submitCardForm);


// //Обработчик отправки формы с аватаром
function submitAvatarForm(evt) {
  renderLoading(true, evt.target)
  evt.preventDefault();
  addAvatar(avatarInput.value)
    .then((res) => {
      profileAvatar.src = res.avatar;
      closePopup(popupAvatar);
      evt.target.reset();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, evt.target);
    });
};

popupAvatarForm.addEventListener('submit', submitAvatarForm)
