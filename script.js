//Переменные
const popupEditBtn = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__name');
const profileInfo = document.querySelector('.profile__description');
const popupProfile = document.querySelector('.popup__profile');
const popupCloseBtn = popupProfile.querySelector('.popup__close-button');
const popupSaveBtn = popupProfile.querySelector('.popup__submit-button');
const popupForm = popupProfile.querySelector('.popup__form');
const nameInput = popupForm.querySelector('#Name');
const jobInput = popupForm.querySelector('#About');
const popupCard = document.querySelector('.popup__card');
const popupCardOpenBtn = document.querySelector('.profile__add-button');
const popupCardCloseBtn = popupCard.querySelector('.popup__close-button');
const popupCardCreateBtn = popupCard.querySelector('.popup__submit-button');
const cardTitle = popupCard.querySelector('#title');
const cardLink = popupCard.querySelector('#link');

/////////// Реализация открытия и закрытия модального окна

// Универсальная функция для открытия popup
function openPopup(popup) {
    popup.classList.add('popup_opened');
};

// Универсальная функция для закрытия popup 
function closePopup(popup) {
    popup.classList.remove('popup_opened');
};

//Открытие попапа edit profile 
popupEditBtn.addEventListener('click', function()  {
    nameInput.value = profileName.textContent;
    jobInput.value = profileInfo.textContent;
    openPopup(popupProfile);
});

//Закрытие попапа profile
popupCloseBtn.addEventListener('click', function()  {
    closePopup(popupProfile);
});

//Закрытие и сохранение данных попапа через Save Button
popupSaveBtn.addEventListener ('click', function()  {
    closePopup(popupProfile);
});

//Обработчик отправки формы
function submitProfileForm(evt) {
    evt.preventDefault(); 
    profileName.textContent = nameInput.value;
    profileInfo.textContent = jobInput.value;

};

//Прикрепление обработчика к форме
popupForm.addEventListener('submit', submitProfileForm);



////////////Добавление карточки пользователем







///////////Реализация открытия модального окна для создания карточки
popupCardOpenBtn.addEventListener('click', function()  {
    openPopup(popupCard);
});

//Закрытие карточки
popupCardCloseBtn.addEventListener('click', function()  {
    closePopup(popupCard);
});

//Функционал кнопки создания карточки
popupCardCreateBtn.addEventListener('click', function()  {
    closePopup(popupCard);
});

