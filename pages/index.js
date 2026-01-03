import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Todo from "../components/Todo.js";
import TodoCounter from "../components/TodoCounter.js";
import { initialTodos } from "../utils/constants.js";

const addTodoButton = document.querySelector(".button_action_add");

const todoCounter = new TodoCounter(initialTodos, ".counter__text");

const todoSection = new Section({
  items: initialTodos,
  containerSelector: ".todos__list",
  renderer: (item) => {
    const todo = new Todo(item, "#todo-template", {
      handleCheckboxChange: (checked) => {
        todoCounter.updateCompleted(checked);
      },
      handleDelete: (completed) => {
        todoCounter.updateTotal(false);
        if (completed) {
          todoCounter.updateCompleted(false);
        }
      }
    });

    todoSection.addItem(todo.getView());
  }
});

todoSection.renderItems();

const addTodoPopup = new PopupWithForm("#add-todo-popup", (data) => {
  const todoData = {
    name: data.name,
    completed: false
  };

  const todo = new Todo(todoData, "#todo-template", {
    handleCheckboxChange: (checked) => {
      todoCounter.updateCompleted(checked);
    },
    handleDelete: (completed) => {
      todoCounter.updateTotal(false);
      if (completed) {
        todoCounter.updateCompleted(false);
      }
    }
  });

  todoSection.addItem(todo.getView());
  todoCounter.updateTotal(true);
});

addTodoPopup.setEventListeners();

addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});
