export default class Api {
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
    return fetch(`${this._url}cards`, {
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

//редактирование аватарки
  editAvatar(data) {
    return fetch(`${this._url}users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: data.avatar,
    }),
  })
  .then(this._checkResponse)
  }

//Добавление карточки
  addCard(data) {
    return fetch(`${this._url}cards`, {
      method: "POST",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
  })
  .then(this._checkResponse)
  }
  getData() {
    return Promise.all([this.getCards(), this.getUserInformation()]);
  }

  deleteCard(id) {
    return fetch(`${this._url}cards/${id}`, {
      method: "DELETE",
      headers: {
        authorization: this._token,
      },
    })
    .then(this._checkResponse)
  }

  addLike(id) {
    return fetch(`${this._url}cards/likes/${id}`, {
      method: "PUT",
      headers: {
        authorization: this._token,
      },
    })
    .then(this._checkResponse)
  }
  deleteLike(id) {
    return fetch(`${this._url}cards/likes/${id}`, {
      method: "DELETE",
      headers: {
        authorization: this._token,
      },
    })
    .then(this._checkResponse)
  }
};
