import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);

    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector(".popup__form");
    this._inputs = Array.from(this._form.querySelectorAll(".popup__input"));
  }

  _getInputValues() {
    const values = {};
    this._inputs.forEach((input) => {
      if (input.type === "date") {
        values[input.name] = input.value ? new Date(input.value) : "";
      } else {
        values[input.name] = input.value.trim();
      }
    });
    return values;
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();

      if (!this._form.checkValidity()) return;

      this._handleFormSubmit(this._getInputValues());

      this._form.reset();
      this.close();
    });
  }
}