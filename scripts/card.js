import { openPopup } from "./utils.js";

export class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    const cardTemplate = document
      .querySelector(this._templateSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    return cardTemplate;
  }

  _handleLikeButton() {
    const heartIcon = this._likeButton.querySelector(".heart-icon");
    if (heartIcon.src.includes("heart-empty.svg")) {
      heartIcon.src = "./images/heart-filled.svg";
    } else {
      heartIcon.src = "./images/heart-empty.svg";
    }
  }

  _handleDeleteButton() {
    this._element.remove();
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => this._handleLikeButton());
    this._deleteButton.addEventListener("click", () =>
      this._handleDeleteButton()
    );
    this._imageElement.addEventListener("click", () =>
      this._handleImageClick()
    );
  }

  _handleImageClick() {
    const imagePopup = document.getElementById("imagePopup");
    const bigImage = imagePopup.querySelector(".popup__image");
    const imageTitle = imagePopup.querySelector(".popup__image-title");

    bigImage.src = this._link;
    bigImage.alt = this._name;
    imageTitle.textContent = this._name;

    imagePopup.classList.add("popup_opened");
  }

  generateCard() {
    this._element = this._getTemplate();
    this._imageElement = this._element.querySelector(".card__photo");
    this._likeButton = this._element.querySelector(".card__like-button");
    this._deleteButton = this._element.querySelector(".card__delete-button");

    this._imageElement.src = this._link;
    this._imageElement.alt = this._name;
    this._element.querySelector(".card__title").textContent = this._name;

    // Agregar el ícono del corazón
    const heartIcon = document.createElement("img");
    heartIcon.src = "./images/heart-empty.svg";
    heartIcon.alt = "like";
    heartIcon.classList.add("heart-icon");
    this._likeButton.appendChild(heartIcon);

    // Asegurar que el botón de eliminar tiene un ícono
    if (!this._deleteButton.querySelector(".delete-icon")) {
      const deleteIcon = document.createElement("img");
      deleteIcon.src = "./images/delete-icon.svg";
      deleteIcon.alt = "delete";
      deleteIcon.classList.add("delete-icon");
      this._deleteButton.appendChild(deleteIcon);
    }

    this._setEventListeners();

    return this._element;
  }
}
