//API
import { openPopup } from "./modal";

// const serverData = {
//     name:	"Jacques Cousteau",
//     about:	"Sailor, researcher",
//     avatar:	"https://pictures.s3.yandex.net/frontend-developer/common/ava.jpg",
//     _id:	"213cf64ee66a0858e9bf439d",
//     cohort:	"plus-cohort-20"
// }

const config = {
    baseUrl: 'https://nomoreparties.co/v1/plus-cohort-20/users/me',
    headers: {
        authorization: '34da551f-8b90-47e1-a3e0-d31f8d9fdbf4',
        'Content-Type': 'application/json'
    }
}

const getResponse = (res) => {
    if (res.ok) {
        return res = res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
}


const getUserData = () => {
    return fetch(`${config.baseUrl}`, {
        headers: config.headers
    })
        .then((res) => {
            return getResponse(res)
        })
}

getUserData()


export { getResponse, getUserData }
