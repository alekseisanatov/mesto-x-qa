import Card from './Card.js';
import FormValidator from "./FormValidator.js";

const profilePopup = document.querySelector('.profile-popup');
const popupSaveButton = document.querySelector('.popup__button');
const popupOpenButton = document.querySelector('.profile__edit-button');
const formElement = document.querySelector('.popup__form');
const formItemElement = document.querySelector('.popup-item__form');
const nameInput = document.querySelector('.popup__text_input_name');
const jobInput = document.querySelector('.popup__text_input_descr');
const placeInput = document.querySelector('.popup__text_input_place');
const linkInput = document.querySelector('.popup__text_input_link');
const title = document.querySelector('.profile__title');
const subtitle = document.querySelector('.profile__subtitle');
const popupItem = document.querySelector('.popup-item');
const popupOpenItem = document.querySelector('.profile__add-button');
const modalImage = document.querySelector('.modal-image');
const modalImagePicture = document.querySelector('.modal__img');
const modalImageCaption = document.querySelector('.modal__figcaption');
const elementsContainer = document.querySelector('.elements__grid');
const dataSelectors = {
  inputSelector: '.popup__text',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__form_type_error',
  errorClass: 'popup__form-error_active'
}
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const popups = document.querySelectorAll('.popup');

popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup_active')) {
      closePopup(popup);
    }
    if(evt.target.classList.contains('popup__close-button')) {
      closePopup(popup);
    }
  });
});

function handleCardClick(name, link) {
  modalImageCaption.textContent = name;
  modalImagePicture.src = link;
  modalImagePicture.alt = name;
  openPopup(modalImage);
}

function createCard(name, link) {
  const card = new Card(name, link, '#element', handleCardClick);
  return card.renderCard();
}

initialCards.forEach(item => {
  elementsContainer.append(createCard(item.name, item.link));
});

const editFormValidation = new FormValidator(dataSelectors, '.profile-form');
editFormValidation.enableValidation();

const addFormValidation = new FormValidator(dataSelectors, '.popup-item__form');
addFormValidation.enableValidation();


function insertCard(name, link, container) {
  container.prepend(createCard(name, link));
}

function openPopup(popupElement) {
  popupElement.classList.add('popup_active');
  document.addEventListener('keydown', closeByEscape);
}

function closePopup(popupElement) {
  popupElement.classList.remove('popup_active');
  document.removeEventListener('keydown', closeByEscape);
}

function formSubmitHandler (evt) {
  evt.preventDefault(); 

  title.textContent = nameInput.value;
  subtitle.textContent = jobInput.value;

  closePopup(profilePopup);
}

function itemFormSubmitHandler (evt) {
  evt.preventDefault();
  insertCard(placeInput.value, linkInput.value, elementsContainer);
  closePopup(popupItem);
  placeInput.value = '';
  linkInput.value = '';
}

function closeByEscape(evt) {
  if(evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_active');
    closePopup(openedPopup);
  }
}

popupOpenItem.addEventListener('click', ()=> {
  openPopup(popupItem);
  addFormValidation.resetValidation();
  popupSaveButton.disabled = true;
});

formItemElement.addEventListener('submit', itemFormSubmitHandler);

formElement.addEventListener('submit', formSubmitHandler);

popupOpenButton.addEventListener('click', () => {
  nameInput.value = title.textContent;
  jobInput.value = subtitle.textContent;
  openPopup(profilePopup);
  editFormValidation.resetValidation();
});


