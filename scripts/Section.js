class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  // Método público para renderizar todos los elementos
  renderItems() {
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }

  // Método público para agregar un elemento al contenedor
  addItem(element) {
    this._container.prepend(element);
  }
}

export default Section;
