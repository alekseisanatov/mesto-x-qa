export default class Card {
    constructor(name, url, template, handleCardClick) {
        this._element = document.querySelector(template).content.children[0].cloneNode(true);
        this._name = name;
        this._url = url;

        this._handleCardClick = handleCardClick;
        this._cardTitle = this._element.querySelector('.element__title');
        this._likeButton = this._element.querySelector('.element__like');
        this._deleteButton = this._element.querySelector('.element__trash');
        this._cardImage = this._element.querySelector('.element__image');
    }

    _deleteCard = () => {
        this._element.remove();
    }

    _likeCard = () => {
        this._likeButton.classList.toggle('element__like_active');
    }

    _setEventListener = () => {
        this._likeButton.addEventListener('click', this._likeCard);
        this._deleteButton.addEventListener('click', this._deleteCard);
        this._cardImage.addEventListener('click', () => {
            this._handleCardClick(this._name, this._url)
        });
    }

    renderCard = () => {
        this._cardTitle.textContent = this._name;
        this._cardImage.style.backgroundImage = 'url(' + this._url + ')';
        this._setEventListener();
        return this._element;
    }
}