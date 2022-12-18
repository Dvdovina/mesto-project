//Переменные
const popupEditBtn = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__name');
const profileInfo = document.querySelector('.profile__description');
const popup = document.querySelector('.popup');
const popupCloseBtn = popup.querySelector('.popup__close-button')
const popupSaveBtn = popup.querySelector('.popup__submit-button')
const popupForm = popup.querySelector('.popup__form');
const nameInput = popupForm.querySelector('#Name');
const jobInput = popupForm.querySelector('#About');


// Реализация открытия и закрытия модального окна

// Универсальная функция для открытия popup
function popupOpen(popup){
    popup.classList.add('popup_opened');
};

// Универсальная функция для закрытия popup 
function popupClose(popup){
    popup.classList.remove('popup_opened');
};

//Открытие попапа edit profile 
popupEditBtn.addEventListener('click', function()  {
    nameInput.value = profileName.textContent;
    jobInput.value = profileInfo.textContent;
    popupOpen(popup);
});

//Закрытие попапа profile
popupCloseBtn.addEventListener('click', function()  {
    popupClose(popup);
});

//Закрытие и сохранение данных попапа через Save Button
popupSaveBtn.addEventListener ('click', function()  {
    popupClose(popup);
});

//Обработчик отправки формы
function submitProfileForm(evt) {
    evt.preventDefault(); 
    profileName.textContent = nameInput.value;
    profileInfo.textContent = jobInput.value;

};

//Прикрепление обработчика к форме
popupForm.addEventListener('submit', submitProfileForm);
