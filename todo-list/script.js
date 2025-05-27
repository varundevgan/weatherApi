const search = document.querySelector('.search-input');
const todoBody = document.querySelector('.todo-body');

let todos = JSON.parse(localStorage.getItem('todos')) || [];

document.addEventListener('DOMContentLoaded', renderTodos);

search.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') addTodo();
});

function addTodo() {
  const value = search.value.trim();
  if (value === '') return alert('Please enter a todo.');

  const capitalized = value.charAt(0).toUpperCase() + value.slice(1);
  todos.push({ text: capitalized, completed: false });
  updateLocalStorage();
  renderTodos();
  search.value = '';
}

function renderTodos() {
  todoBody.innerHTML = '';
  if (todos.length === 0) return;

  todos.forEach((todo, index) => {
    const todoEl = document.createElement('div');
    todoEl.className = 'todo';

    todoEl.innerHTML = `
      <div class="todo-text" onclick="toggleComplete(${index})">
        <div class="circle"></div>
        <p class="${todo.completed ? 'completed' : ''}">${todo.text}</p>
      </div>
      <div class="cross" onclick="deleteTodo(${index})">
        <i class="fa fa-times"></i>
      </div>
    `;

    todoBody.appendChild(todoEl);
  });
}

function toggleComplete(index) {
  todos[index].completed = !todos[index].completed;
  updateLocalStorage();
  renderTodos();
}

function deleteTodo(index) {
  todos.splice(index, 1);
  updateLocalStorage();
  renderTodos();
}

function updateLocalStorage() {
  localStorage.setItem('todos', JSON.stringify(todos));
}
