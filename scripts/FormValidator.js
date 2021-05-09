export default class FormValidator {
    constructor({inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass}, form) {
        this._inputSelector = inputSelector;
        this._submitButtonSelector = submitButtonSelector;
        this._inactiveButtonClass = inactiveButtonClass;
        this._inputErrorClass = inputErrorClass;
        this._errorClass = errorClass;
        this._form = document.querySelector(form);
        this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
    }

    _showInputError = (inputElement, errorMessage) => {
        const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._errorClass);
    }

    _hideInputError = (inputElement) => {
        const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.classList.remove(this._errorClass);
        errorElement.textContent = '';
    }

    _toggleButtonState = () => {
        const buttonElement = this._form.querySelector(this._submitButtonSelector);
        const hasNotValidInput = this._inputList.some(inputElement => !inputElement.validity.valid);
        if(hasNotValidInput) {
            buttonElement.setAttribute('disabled', true);
            buttonElement.classList.add(this._inactiveButtonClass);
        } else {
            buttonElement.removeAttribute('disabled');
            buttonElement.classList.remove(this._inactiveButtonClass);
        }
    }

    _checkInputValidity = (inputElement) => {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        }
    }

    _setEventListeners = () => {
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState(inputElement);
            });
            this._toggleButtonState(inputElement);
        });
    }

    resetValidation = () => {
        this._inputList.forEach((inputElement) => {
            this._hideInputError(inputElement);
        });
        this._toggleButtonState();
    }

    enableValidation = () => {
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        this._setEventListeners();
    }
}