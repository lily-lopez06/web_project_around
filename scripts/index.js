import Card from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import Popup from "./Popup.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import Section from "./Section.js";
import UserInfo from "./UserInfo.js";

document.addEventListener("DOMContentLoaded", () => {
  // VARIABLES GLOBALES
  const popups = document.querySelectorAll(".popup");
  const cardsContainer = document.getElementById("cardsContainer");
  const initialCards = [
    { name: "Valle de Yosemite", link: "./images/yosemite-min.jpg" },
    { name: "Lago Louise", link: "./images/lago-louise-min.jpg" },
    { name: "Montañas Calvas", link: "./images/montañas-calvas-min.jpg" },
    { name: "Latemar", link: "./images/latemar-min.jpg" },
    {
      name: "Parque Nacional de Vanoise",
      link: "./images/vanois-national-min.jpg",
    },
    { name: "Lago di Braies", link: "./images/lago-di-braies-min.jpg" },
  ];

  // VARIABLES PARA "EDITAR PERFIL"
  const userInfo = new UserInfo({
    nameSelector: ".profile__name",
    jobSelector: ".profile__paragraph",
  });

  const editPopup = new PopupWithForm("#editPopup", (formData) => {
    userInfo.setUserInfo({ name: formData.name, job: formData.about });
    editPopup.close();
  });

  const editProfileButton = document.getElementById("editProfile");
  const editProfileForm = document.getElementById("editProfileForm");
  const nameInput = document.getElementById("nameInput");
  const aboutInput = document.getElementById("aboutInput");

  // VARIABLES PARA "NUEVO LUGAR"
  const addPopup = new PopupWithForm("#addPopup", (formData) => {
    const card = new Card(
      { name: formData.title, link: formData.link },
      "#card-template",
      handleCardClick
    );
    const cardElement = card.generateCard();
    cardList.addItem(cardElement);
    addPopup.close();
  });

  const addProfileButton = document.getElementById("addProfile");
  const addCardForm = document.getElementById("addCardForm");
  const cardNameInput = document.getElementById("cardNameInput");
  const cardImageInput = document.getElementById("cardImageInput");

  // VARIABLES PARA "IMAGEN COMPLETA"
  const imagePopup = new PopupWithImage("#imagePopup");
  imagePopup.setEventListeners();

  function handleCardClick(link, name) {
    imagePopup.open({ src: link, alt: name, caption: name });
  }

  // FUNCIONES PARA ABRIR Y CERRAR POPUPS
  editProfileButton.addEventListener("click", () => {
    const userData = userInfo.getUserInfo();
    nameInput.value = userData.name;
    aboutInput.value = userData.job;
    editPopup.open();
  });

  addProfileButton.addEventListener("click", () => addPopup.open());

  popups.forEach((popup) => {
    const popupInstance = new Popup(`#${popup.id}`);
    popupInstance.setEventListeners();
  });

  // HABILITAR VALIDACIÓN
  const formConfig = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible",
  };

  const editProfileFormValidator = new FormValidator(
    formConfig,
    editProfileForm
  );
  editProfileFormValidator.enableValidation();

  const addCardFormValidator = new FormValidator(formConfig, addCardForm);
  addCardFormValidator.enableValidation();

  // CREAR TARJETAS INICIALES
  const cardList = new Section(
    {
      items: initialCards,
      renderer: (item) => {
        const card = new Card(item, "#card-template", handleCardClick);
        const cardElement = card.generateCard();
        cardList.addItem(cardElement);
      },
    },
    "#cardsContainer"
  );

  cardList.renderItems();

  // AÑADIR NUEVA TARJETA
  addCardForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = cardNameInput.value;
    const link = cardImageInput.value;
    const card = new Card({ name, link }, "#card-template", handleCardClick);
    const cardElement = card.generateCard();
    cardList.addItem(cardElement);
    addPopup.close();
    addCardForm.reset();
    addCardFormValidator._toggleButtonState();
  });

  // GUARDAR CAMBIOS EN EL PERFIL
  editProfileForm.addEventListener("submit", (event) => {
    event.preventDefault();
    userInfo.setUserInfo({ name: nameInput.value, job: aboutInput.value });
    editPopup.close();
  });
});
