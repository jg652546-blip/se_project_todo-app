import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Todo from "../components/Todo.js";
import TodoCounter from "../components/TodoCounter.js";
import FormValidator from "../components/FormValidator.js";
import { initialTodos, validationConfig } from "../utils/constants.js";
import { v4 as uuidv4 } from "https://jspm.dev/uuid";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoForm = document.forms["add-todo-form"];

const addTodoValidator = new FormValidator(validationConfig, addTodoForm);
addTodoValidator.enableValidation();

const todoCounter = new TodoCounter(initialTodos, ".counter__text");

let todoSection;

const renderTodo = (item) => {
  const todo = new Todo(item, "#todo-template", {
    handleCheckboxChange: (checked) => {
      todoCounter.updateCompleted(checked);
    },
    handleDelete: (completed) => {
      todoCounter.updateTotal(false);
      if (completed) {
        todoCounter.updateCompleted(false);
      }
    },
  });

  todoSection.addItem(todo.getView());
};

todoSection = new Section({
  items: initialTodos,
  containerSelector: ".todos__list",
  renderer: (item) => {
    renderTodo(item);
  },
});

todoSection.renderItems();

const addTodoPopup = new PopupWithForm("#add-todo-popup", (data) => {
  if (!addTodoForm.checkValidity()) return;

  const todoData = {
    id: uuidv4(),
    name: data.name,
    completed: false,
    date: data.date ? new Date(data.date) : new Date(),
  };

  renderTodo(todoData);
  todoCounter.updateTotal(true);
  addTodoValidator.resetValidation();
});

addTodoPopup.setEventListeners();

addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});

