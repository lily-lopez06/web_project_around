import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import {
  openPopup,
  closePopup,
  closePopupOnOverlayClick,
  closePopupOnEsc,
} from "./utils.js";

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
  const editPopup = document.getElementById("editPopup");
  const editProfileButton = document.getElementById("editProfile");
  const closeEditPopupButton = document.getElementById("closeEditPopup");
  const saveProfileButton = document.getElementById("saveProfile");
  const editProfileForm = document.getElementById("editProfileForm");
  const profileName = document.querySelector(".profile__name");
  const profileParagraph = document.querySelector(".profile__paragraph");
  const nameInput = document.getElementById("nameInput");
  const aboutInput = document.getElementById("aboutInput");

  // VARIABLES PARA "NUEVO LUGAR"
  const addPopup = document.getElementById("addPopup");
  const addProfileButton = document.getElementById("addProfile");
  const closeAddPopupButton = document.getElementById("closeAddPopup");
  const submitAddButton = document.getElementById("submitAdd");
  const addCardForm = document.getElementById("addCardForm");
  const cardNameInput = document.getElementById("cardNameInput");
  const cardImageInput = document.getElementById("cardImageInput");

  // VARIABLES PARA "IMAGEN COMPLETA"
  const imagePopup = document.getElementById("imagePopup");
  const closeImagePopupButton = document.getElementById("closeImagePopup");

  // FUNCIONES PARA ABRIR Y CERRAR POPUPS
  editProfileButton.addEventListener("click", () => {
    nameInput.value = profileName.textContent;
    aboutInput.value = profileParagraph.textContent;
    openPopup(editPopup);
  });

  closeEditPopupButton.addEventListener("click", () => closePopup(editPopup));
  addProfileButton.addEventListener("click", () => openPopup(addPopup));
  closeAddPopupButton.addEventListener("click", () => closePopup(addPopup));
  closeImagePopupButton.addEventListener("click", () => closePopup(imagePopup));

  popups.forEach((popup) =>
    popup.addEventListener("click", closePopupOnOverlayClick)
  );
  document.addEventListener("keydown", closePopupOnEsc);

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
  initialCards.forEach((item) => {
    const card = new Card(item, "#card-template");
    const cardElement = card.generateCard();
    cardsContainer.append(cardElement);
  });

  // AÑADIR NUEVA TARJETA
  addCardForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = cardNameInput.value;
    const link = cardImageInput.value;
    const card = new Card({ name, link }, "#card-template");
    const cardElement = card.generateCard();
    cardsContainer.prepend(cardElement);
    closePopup(addPopup);
    addCardForm.reset();
    addCardFormValidator._toggleButtonState();
  });

  // GUARDAR CAMBIOS EN EL PERFIL
  editProfileForm.addEventListener("submit", (event) => {
    event.preventDefault();
    profileName.textContent = nameInput.value;
    profileParagraph.textContent = aboutInput.value;
    closePopup(editPopup);
  });
});
