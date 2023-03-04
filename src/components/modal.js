
//Переменные Popup Profile
const popupProfile = document.querySelector('.popup__profile');
const popupEditBtn = document.querySelector('.profile__edit-button');
const popupCloseBtn = popupProfile.querySelector('.popup__close-button');
const popupSaveBtn = popupProfile.querySelector('.popup__submit-button');
const popupProfileForm = popupProfile.querySelector('.popup__form');
const profileName = document.querySelector('.profile__name');
const profileInfo = document.querySelector('.profile__description');
const nameInput = popupProfileForm.querySelector('#Name');
const jobInput = popupProfileForm.querySelector('#About');
//Переменные Popup Create Card
const popupCard = document.querySelector('.popup__card');
const popupCardOpenBtn = document.querySelector('.profile__add-button');
const popupCardCloseBtn = popupCard.querySelector('.popup__close-button');
const popupCardCreateBtn = popupCard.querySelector('.popup__submit-button');
const popupCardForm = popupCard.querySelector('.popup__form');
const cardTitle = popupCard.querySelector('#title');
const cardLink = popupCard.querySelector('#link');
//Переменные popup IMG
const popupImg = document.querySelector('.popup__img');
const popupImgPhoto = popupImg.querySelector('.popup__img-photo');
const popupImgTitle = popupImg.querySelector('.popup__img-caption');
const popupImgCloseBtn = popupImg.querySelector('.popup__close-button');
//
const closeButtons = document.querySelectorAll('.popup__close-button');


// Универсальная функция для открытия popup
function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closeOnEsc);
};

// Универсальная функция для закрытия popup 
function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closeOnEsc);
};

//Универсальный обработчик крестиков закрытия
closeButtons.forEach((button) => {
    const popup = button.closest('.popup');
    button.addEventListener('click', () => closePopup(popup));
});

//Закрытие по клику на Esc
function closeOnEsc(evt) {
    if (evt.key === "Escape") {
        const activePopup = document.querySelector('.popup_opened');
        closePopup(activePopup);
    }
}

//Закрытие popupProfile по клику на оверлей
popupProfile.addEventListener("click", (evt) => {
    if (evt.currentTarget === evt.target) {
        closePopup(popupProfile)
    }
})

//Закрытие popupCard по клику на оверлей

popupCard.addEventListener("click", (evt) => {
    if (evt.currentTarget === evt.target) {
        closePopup(popupCard)
    }
})

//Закрытие popupImg по клику на оверлей

popupImg.addEventListener("click", (evt) => {
    if (evt.currentTarget === evt.target) {
        closePopup(popupImg)
    }
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

export { openPopup, closePopup, closeOnEsc, submitProfileForm, submitCardForm };