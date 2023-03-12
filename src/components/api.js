//API
import { getResponse } from "./utils"


const config = {
    baseUrl: 'https://nomoreparties.co/v1/plus-cohort-20/',
    headers: {
        authorization: '34da551f-8b90-47e1-a3e0-d31f8d9fdbf4',
        'Content-Type': 'application/json'
    }
}

function request(source, options) {
    return fetch(source, options).then(getResponse)
  }
  
//Получение информации пользователя
const getUserData = () => {
    return request(`${config.baseUrl}/users/me`, {
        headers: config.headers
    })
}


//Получение карточек с сервера
const getCards = () => {
    return request(`${config.baseUrl}/cards`, {
        headers: config.headers
    })
}


//Отправка инфо пользователя
const postUserProfile = (profileName, profileInfo) => {
    return request(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name: profileName,
            about: profileInfo
        })
    })
}


//Отправка карточек
const postCard = (name, link) => {
    return request(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            name: name,
            link: link
        })
    })
}


//Удаление карточек
const deleteCard = (cardId) => {
    return request(`${config.baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: config.headers,
    })
}


//Добавить Лайк
const addLike = (cardId) => {
    return request(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: config.headers,
    })
}


//Удалить лайк
const deleteLike = (cardId) => {
    return request(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: config.headers,
    })
}


//Добавить/поменять аватар
const addAvatar = (avatar) => {
    return request(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar: avatar
        })
    })
}



export { getUserData, getCards, postUserProfile, postCard, deleteCard, addLike, deleteLike, addAvatar }
