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
const cardsList = document.querySelector('.elements__grid');
const closeButtons = document.querySelectorAll('.popup__close-button');
const cardTemplate = document.querySelector('#card-template').content;


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

//Закрытие popupCard по клиу на оверлей

popupCard.addEventListener("click", (evt) => {
    if (evt.currentTarget === evt.target) {
        closePopup(popupCard)
    }
})

//Закрытие popupImg по клиу на оверлей

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

////////////Добавление карточки пользователем

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

loadCards(initialCards);

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


//Валидация форм

const settings = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_active'
  };


const showInputError = (formElement, inputElement, errorMessage, settings) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(settings.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(settings.errorClass);
};


const hideInputError = (formElement, inputElement, settings) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(settings.inputErrorClass);
    errorElement.classList.remove(settings.errorClass);
    errorElement.textContent = '';
};


const isValid = (formElement, inputElement) => {
    if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, settings);
    } else {
        hideInputError(formElement, inputElement, settings);
    }
};


const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
};
  

const toggleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.disabled = true;
        buttonElement.classList.add(settings.inactiveButtonClass);
    } else {
        buttonElement.disabled = false;
        buttonElement.classList.remove(settings.inactiveButtonClass);
    }
};

const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
    const buttonElement = formElement.querySelector(settings.submitButtonSelector);
    toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            isValid(formElement, inputElement)
            toggleButtonState(inputList, buttonElement);
        });
    });
    formElement.addEventListener('reset', () => {
        setTimeout(() => {
          toggleButtonState(inputList, buttonElement, selectors), 0
        });
      });
    };


const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll(settings.formSelector));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {                       
            evt.preventDefault();                                                                       
          });
        setEventListeners(formElement);
    });
};

enableValidation();

