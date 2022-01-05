import { Popup } from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor (popupSelector) {
    super(popupSelector)
    this._popupImage = this._popup.querySelector('.popup__photo')
    this._popupCaption = this._popup.querySelector('.popup__photo-caption')
    this._popupPhoto = this._popup.querySelector('.popup__photo')
  };

  open (name, link) {
    super.open ()
    this._popupImage.src = link
    this._popupPhoto.alt = name
    this._popupCaption.textContent = name
  };
};
