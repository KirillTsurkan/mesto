export default class Section {
  constructor ({renderer}, containerSelector) {
    this._renderer = renderer
    this._container = document.querySelector(containerSelector)
  };

  //Публичный метод отрисовки карточки
  render (arr) {
    arr.forEach((item) => {
      this._renderer(item)
    })
  }

  //Публичный метод добавления карточки в контейнер
  addItem (element) {
    this._container.append(element)
  };
};
