//Проверка ответа
const getResponse = (res) => {
  if (res.ok) {
    return res = res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}


//Кнопка во время загрузки
const renderLoading = (isLoading, button) => {
  const loadingBtn = button.querySelector('.popup__submit-button')
  if (isLoading) {
    loadingBtn.textContent = 'Сохранение...'
  } else {
    loadingBtn.textContent = "Сохранить";
  }
}



export { getResponse, renderLoading }