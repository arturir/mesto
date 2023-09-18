export default class Api {
    constructor(url, token, id) {
        this._url = url;
        this._token = token;
        this._id = id
    }
    
    editAvatar(avatar) {
        return fetch(`${this._url}${this._id}/users/me/avatar `, {
            method: 'PATCH',
            headers: {
              authorization: this._token,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar: avatar.avatar
            })
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                return Promise.reject(`Ошибка: ${response.status}`);
            }
        })
    }

    eidtProfile(name, about) {
        return fetch(`${this._url}${this._id}/users/me`, {
            method: 'PATCH',
            headers: {
              authorization: this._token,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              name:  name,
              about: about
            })
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                return Promise.reject(`Ошибка: ${response.status}`);
            }
        })
    }
    getUserInfo() {
        return fetch(`${this._url}${this._id}/users/me`, {
            headers: {
                authorization: this._token
            }
        })
        .then(response => {
            if (response.ok) {
                return response.json()
            } else {
                return Promise.reject(`Ошибка: ${response.status}`);
            }
        })       
    }

    getCards() {
        return fetch(`${this._url}${this._id}/cards`, {
            headers: {
                authorization: this._token
            }
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                return Promise.reject(`Ошибка: ${response.status}`);
            }
        })
    }
    addNewCard(name, link) {
        return fetch(`${this._url}${this._id}/cards`, {
            method: 'POST',
            headers: {
              authorization: this._token,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              name:  name,
              link: link
            })
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                return Promise.reject(`Ошибка: ${response.status}`);
            }
        })
    }
    deleteCard(cardId) {
        return fetch(`${this._url}${this._id}/cards/${cardId}`, {
            method: 'DELETE',
            headers: {
                authorization: this._token
            }
        })
        .then(response => {
            if (response.ok) {
                return response.json()
            } else {
                return Promise.reject(`Ошибка: ${response.status}`);
            }
        })
    }
    
    addLikeCard(cardId) {
        return fetch(`${this._url}${this._id}/cards/${cardId}/likes`, {
            method: 'PUT',
            headers: {
                authorization: this._token
            }
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                return Promise.reject(`Ошибка: ${response.status}`);
            }
        })
    }
    deleteLikeCard(cardId) {
        return fetch(`${this._url}${this._id}/cards/${cardId}/likes`, {
            method: 'DELETE',
            headers: {
                authorization: this._token
            }
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                return Promise.reject(`Ошибка: ${response.status}`);
            }
        })
    }

}