import Popup from "./Popup.js";

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imageElement = this._popup.querySelector(".popup__image");
    this._captionElement = this._popup.querySelector(".popup__image-title");
  }

  // Método público para abrir el popup con la imagen y la leyenda
  open({ src, alt, caption }) {
    this._imageElement.src = src;
    this._imageElement.alt = alt;
    this._captionElement.textContent = caption;
    super.open();
  }
}

export default PopupWithImage;
