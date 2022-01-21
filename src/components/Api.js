export class Api {
  constructor({url, token}) {
    this._url = url
    this._token = token
  }
// общая функция для промиса и ошибки
  _checkResponse(res) {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  }
//Получение карточек с сервера
  getCards() {
    return fetch(this._url + 'cards', {
      headers: {
        authorization: this._token
      }
    })
      .then(this._checkResponse)
  }
// получение данных профиля с сервера
  getUserInformation() {
    return fetch(`${this._url}users/me`, {
      headers: {
        authorization: this._token
      }
    })
    .then(this._checkResponse)
  }
// редактирование профиля
  editprofile(data) {
    return fetch(`${this._url}users/me`, {
      method: "PATCH",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        about: data.job
      }),
    })
      .then(this._checkResponse)
  }
}


// fetch('https://mesto.nomoreparties.co/v1/cohort-42/cards', {
//   headers: {
//     authorization: 'c56e30dc-2883-4270-a59e-b2f7bae969c6'
//   }
// })
//   .then(res => res.json())
//   .then((result) => {
//     console.log(result);
//   });
