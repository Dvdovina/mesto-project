
import { openPopup } from "./modal";


const popupImg = document.querySelector('.popup__img');
const popupPhoto = popupImg.querySelector('.popup__img-photo');
const popupTitle = popupImg.querySelector('.popup__img-caption')
const cardTemplate = document.querySelector('#card-template').content;
const cardsList = document.querySelector('.elements__grid');


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

//Функция для создания и просмотра карточки пользователем (клонируем template, наполняем содержимым, удаление, like button)
function createCard(titleValue, imgValue) {
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  cardElement.querySelector('.element__title').textContent = titleValue;
  const cardImage = cardElement.querySelector('.element__image');
  cardImage.src = imgValue;
  cardImage.alt = titleValue;
  cardImage.addEventListener('click', function () {
    popupPhoto.src = imgValue;
    popupPhoto.alt = titleValue;
    popupTitle.textContent = titleValue;
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


export { initialCards, createCard, addNewCard, loadCards, cardsList }