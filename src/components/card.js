
import { openPopup } from "./modal";
import { deleteCard, addLike, deleteLike } from "./api"

const popupImg = document.querySelector('.popup__img');
const popupPhoto = popupImg.querySelector('.popup__img-photo');
const popupTitle = popupImg.querySelector('.popup__img-caption')
const cardTemplate = document.querySelector('#card-template').content;
const cardsList = document.querySelector('.elements__grid');


function deleteImg(evt) {
  evt.target.closest('.element').remove();
}

function likeImg(evt) {
  evt.target.classList.toggle('element__like-button_active')
}

function openPopupImg(evt) {
  popupPhoto.src = evt.target.src;
  popupPhoto.alt = evt.target.alt;
  popupTitle.textContent = evt.target.alt;
  openPopup(popupImg)
}

function createCard(card, user) {
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  const cardImage = cardElement.querySelector('.element__image');
  const likeBtn = cardElement.querySelector('.element__like-button');
  const delBtn = cardElement.querySelector('.element__delete-button');
  const likeCounter = cardElement.querySelector('.element__like-counter');
  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardElement.querySelector('.element__title').textContent = card.name;
  if (user.id !== card.owner._id) {
    delBtn.classList.add('element__delete-button_disabled');
  };
  delBtn.addEventListener('click', (evt) => {
    deleteCard(card._id)
      .then(() => {
        deleteImg(evt)
      })
      .catch((err) => {
        console.log(err);
      })
  }
  );
  likeCounter.textContent = card.likes.length;
  card.likes.forEach(() => {
    if (card.likes._id === user._id) {
      likeBtn.classList.add('element__like-button_active')
    };
  });
  likeBtn.addEventListener('click', (evt) => {
    if (!evt.target.classList.contains('element__like-button_active')) {
      addLike(card._id)
        .then((card) => {
          likeImg(evt);
          likeCounter.textContent = card.likes.length;
        })
        .catch((err) => {
          console.log(err);
        })
    } else {
      deleteLike(card._id)
        .then((card) => {
          likeImg(evt);
          likeCounter.textContent = card.likes.length;
        })
        .catch((err) => {
          console.log(err);
        })
    }
  })
  cardImage.addEventListener('click', openPopupImg);
  return cardElement;
};

export { createCard, cardsList }