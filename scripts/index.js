import { enableValidation } from "./validate.js";

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
  const nameError = document.getElementById("nameError");
  const aboutError = document.getElementById("aboutError");

  // VARIABLES PARA "NUEVO LUGAR"
  const addPopup = document.getElementById("addPopup");
  const addProfileButton = document.getElementById("addProfile");
  const closeAddPopupButton = document.getElementById("closeAddPopup");
  const submitAddButton = document.getElementById("submitAdd");
  const addCardForm = document.getElementById("addCardForm");
  const cardNameInput = document.getElementById("cardNameInput");
  const cardImageInput = document.getElementById("cardImageInput");

  const cardNameError = document.createElement("span");
  const cardImageError = document.createElement("span");
  cardNameError.classList.add("error-message");
  cardImageError.classList.add("error-message");
  cardNameInput.insertAdjacentElement("afterend", cardNameError);
  cardImageInput.insertAdjacentElement("afterend", cardImageError);

  // VARIABLES PARA IMAGEN AMPLIADA
  const imagePopup = document.getElementById("imagePopup");
  const bigImage = document.getElementById("bigImage");
  const imageTitle = document.getElementById("imageTitle");
  const closeImagePopupButton = document.getElementById("closeImagePopup");

  // FUNCIONES GENERALES
  function toggleButtonState(form, button) {
    button.disabled = !form.checkValidity();
  }

  function checkInputValidity(inputElement, errorElement) {
    if (!inputElement.validity.valid) {
      errorElement.textContent = inputElement.validationMessage;
    } else {
      errorElement.textContent = "";
    }
  }

  function closePopupOnOverlayClick(event) {
    if (event.target.classList.contains("popup")) {
      event.target.classList.remove("popup_opened");
    }
  }

  // FUNCIONES DE IMÁGENES
  function handleImageClick(event) {
    const imgElement = event.target;
    if (imgElement.classList.contains("card__photo")) {
      const cardFooter = imgElement
        .closest(".card")
        .querySelector(".card__footer span");
      bigImage.src = imgElement.src;
      bigImage.alt = imgElement.alt;
      imageTitle.textContent = cardFooter.textContent;
      imagePopup.classList.add("popup_opened");
    }
  }

  function createCard(name, link) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <button class="delete-button">
        <img src="./images/icons8-delete.svg" alt="icon-delete" class="icon-delete" />
      </button>
      <img src="${link}" alt="${name}" class="card__photo" />
      <div class="card__footer">
        <span>${name}</span>
        <button class="like-button">&#9825;</button>
      </div>
    `;

    // Eventos de eliminar y dar like
    card
      .querySelector(".delete-button")
      .addEventListener("click", () => card.remove());
    card.querySelector(".like-button").addEventListener("click", (event) => {
      const button = event.target;
      button.classList.toggle("liked");
      button.innerHTML = button.classList.contains("liked")
        ? "&#9829;"
        : "&#9825;";
    });

    return card;
  }

  // FUNCIONES DEL FORMULARIO "EDITAR PERFIL"
  editProfileButton.addEventListener("click", () => {
    editPopup.classList.add("popup_opened");
    nameInput.value = profileName.textContent;
    aboutInput.value = profileParagraph.textContent;
  });

  closeEditPopupButton.addEventListener("click", () =>
    editPopup.classList.remove("popup_opened")
  );

  [nameInput, aboutInput].forEach((input) => {
    input.addEventListener("input", () => {
      const errorElement = input.id === "nameInput" ? nameError : aboutError;
      checkInputValidity(input, errorElement);
      toggleButtonState(editProfileForm, saveProfileButton);
    });
  });

  editProfileForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (editProfileForm.checkValidity()) {
      profileName.textContent = nameInput.value.trim();
      profileParagraph.textContent = aboutInput.value.trim();
      editPopup.classList.remove("popup_opened");
    }
  });

  // FUNCIONES DEL FORMULARIO "NUEVO LUGAR"
  addProfileButton.addEventListener("click", () =>
    addPopup.classList.add("popup_opened")
  );
  closeAddPopupButton.addEventListener("click", () =>
    addPopup.classList.remove("popup_opened")
  );

  [cardNameInput, cardImageInput].forEach((input) => {
    input.addEventListener("input", () => {
      const errorElement =
        input.id === "cardNameInput" ? cardNameError : cardImageError;
      checkInputValidity(input, errorElement);
      toggleButtonState(addCardForm, submitAddButton);
    });
  });

  addCardForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (addCardForm.checkValidity()) {
      const name = cardNameInput.value.trim();
      const link = cardImageInput.value.trim();
      const card = createCard(name, link);
      cardsContainer.appendChild(card);
      addPopup.classList.remove("popup_opened");
      addCardForm.reset();
      toggleButtonState(addCardForm, submitAddButton);
    }
  });

  // INICIALIZACIÓN
  initialCards.forEach(({ name, link }) =>
    cardsContainer.appendChild(createCard(name, link))
  );

  // EVENTOS GENERALES
  cardsContainer.addEventListener("click", handleImageClick);
  closeImagePopupButton.addEventListener("click", () =>
    imagePopup.classList.remove("popup_opened")
  );
  popups.forEach((popup) =>
    popup.addEventListener("click", closePopupOnOverlayClick)
  );
  document.addEventListener("keydown", closePopupOnEsc);

  // Función para cerrar popups al pulsar Esc
  function closePopupOnEsc(event) {
    if (event.key === "Escape") {
      const openedPopup = document.querySelector(".popup.popup_opened");
      if (openedPopup) {
        openedPopup.classList.remove("popup_opened");
      }
    }
  }

  enableValidation({
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible",
  });
});
