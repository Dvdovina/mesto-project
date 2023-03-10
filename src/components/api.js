//API
import { getResponse } from "./utils"


const config = {
    baseUrl: 'https://nomoreparties.co/v1/plus-cohort-20/users/me',
    headers: {
        authorization: '34da551f-8b90-47e1-a3e0-d31f8d9fdbf4',
        'Content-Type': 'application/json'
    }
}

//Получение информации пользователя
const getUserData = () => {
    return fetch(`${config.baseUrl}`, {
        headers: config.headers
    })
        .then((res) => {
            return getResponse(res)
        })
        .catch(err => console.log(err));
}

getUserData()

//Получение карточек с сервера
const getCards = () => {
    return fetch(`https://nomoreparties.co/v1/plus-cohort-20/cards`, {
        headers: config.headers
    })
        .then((res) => {
            return getResponse(res)
        })
        .catch(err => console.log(err));
}

getCards()

//Отправка инфо пользователя
const postUserProfile = (user, description) => {
    return fetch(`${config.baseUrl}`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name: user,
            about: description
        })
    })
}

postUserProfile()

//Отправка карточек
const postCard = (name, link) => {
    return fetch('https://nomoreparties.co/v1/plus-cohort-20/cards', {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            name: name,
            link: link
        })
    })
}

postCard()

//Удаление карточек
const deleteCard = (cardId) => {
    return fetch(`https://nomoreparties.co/v1/plus-cohort-20/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: config.headers,
    })
}

deleteCard()

//Добавить Лайк
const addLike = (cardId) => {
    return fetch(`https://nomoreparties.co/v1/plus-cohort-20/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: config.headers,
    })
}

addLike()

//Удалить лайк
const deleteLike = (cardId) => {
    return fetch(`https://nomoreparties.co/v1/plus-cohort-20/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: config.headers,
    })
}

deleteLike()

//Добавить/поменять аватар
const addAvatar = (avatar) => {
    return fetch('https://nomoreparties.co/v1/plus-cohort-20/users/me/avatar', {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar: avatar,
        })
    })
}

addAvatar()


export { getUserData, getCards, postUserProfile, postCard, deleteCard, addLike, deleteLike, addAvatar }
