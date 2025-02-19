class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  // Método público para abrir el popup
  open() {
    this._popup.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  // Método público para cerrar el popup
  close() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  // Método privado para manejar el cierre con la tecla Esc
  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  // Método público para agregar los event listeners
  setEventListeners() {
    this._popup.addEventListener("click", (evt) => {
      // Cierra si haces clic fuera del contenido del popup
      if (evt.target.classList.contains("popup_opened")) {
        this.close();
      }
      // Cierra si haces clic en el botón de cerrar o su contenido
      if (
        evt.target.classList.contains("popup__close") ||
        evt.target.closest(".popup__close")
      ) {
        this.close();
      }
    });
  }
}

export default Popup;
