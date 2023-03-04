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

//Закрытие по клику на Esc
function closeOnEsc(evt) {
    if (evt.key === "Escape") {
        const activePopup = document.querySelector('.popup_opened');
        closePopup(activePopup);
    }
}

export {openPopup, closePopup, closeOnEsc};