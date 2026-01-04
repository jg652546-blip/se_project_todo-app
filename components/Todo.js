class Todo {
  constructor(data, selector, { handleCheckboxChange, handleDelete }) {
    this._data = data;
    this._selector = selector;

    this._handleCheckboxChange = handleCheckboxChange;
    this._handleDelete = handleDelete;

    this._templateElement = document.querySelector(this._selector);
  }

  _applyCheckboxBindings() {
    this._todoCheckboxEl = this._todoElement.querySelector(".todo__completed");
    this._todoLabel = this._todoElement.querySelector(".todo__label");

    this._todoCheckboxEl.checked = this._data.completed;

    this._todoCheckboxEl.id = `todo-${this._data.id}`;
    this._todoLabel.setAttribute("for", `todo-${this._data.id}`);
  }

  _setEventListeners() {
    this._todoCheckboxEl.addEventListener("change", () => {
      this._data.completed = this._todoCheckboxEl.checked;
      this._handleCheckboxChange(this._todoCheckboxEl.checked);
    });

    this._todoDeleteBtn.addEventListener("click", () => {
      this._handleDelete(this._data.completed);
      this._todoElement.remove();
    });
  }

  getView() {
    this._todoElement = this._templateElement.content
      .querySelector(".todo")
      .cloneNode(true);

    this._todoDeleteBtn =
      this._todoElement.querySelector(".todo__delete-btn");

    const todoNameEl = this._todoElement.querySelector(".todo__name");
    const todoDateEl = this._todoElement.querySelector(".todo__date");

    todoNameEl.textContent = this._data.name;

    const dueDate = new Date(this._data.date);
    todoDateEl.textContent = !isNaN(dueDate)
      ? dueDate.toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      : "";

    this._applyCheckboxBindings();
    this._setEventListeners();

    return this._todoElement;
  }
}

export default Todo;
