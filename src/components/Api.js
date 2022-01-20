export class Api {
  constructor({url, token}) {
    this._url = url
    this._token = token

  }

  getCards() {
    return fetch(this._url, {
      headers: {
        authorization: this._token
      }
    })
      .then(res => res.json())
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
