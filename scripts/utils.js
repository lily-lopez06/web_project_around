export function openPopup(popup) {
  console.log("Abriendo popup:", popup.id);
  popup.classList.add("popup_opened");
}

export function closePopup(popup) {
  console.log("Cerrando popup:", popup.id);
  popup.classList.remove("popup_opened");
}

export function closePopupOnOverlayClick(evt) {
  if (evt.target.classList.contains("popup_opened")) {
    closePopup(evt.target);
  }
}

export function closePopupOnEsc(evt) {
  console.log("Tecla presionada:", evt.key);
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    console.log("Popup abierto encontrado:", openedPopup);
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
}
