export default class Section {
  constructor ({items, renderer}, containerSelector) {
    this._initialArray = items
    this._renderer = renderer
    this._container = document.querySelector(containerSelector)
  };

  //Публичный метод отрисовки карточки, который получен из index как колбэк
  render () {
    this._initialArray.forEach((item) => {
      this._renderer(item)
    })
  }

  //Публичный метод добавления карточки в контейнер
  addItem (element) {
    this._container.prepend(element)
  };
};
