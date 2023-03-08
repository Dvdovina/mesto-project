//Проверка ответа
const getResponse = (res) => {
  if (res.ok) {
    return res = res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}


//Кнопка во время загрузки
const renderLoading = (isLoading, button, buttonText = 'Сохранить', loadingText = 'Сохранение...') => {
  const submitButton = button.querySelector('.popup__submit-button')
  if (isLoading) {
    submitButton.textContent = loadingText;
  } else {
    submitButton.textContent = buttonText;
  }
}


export { getResponse, renderLoading }