
let tasks = [];

function loadTasks() {
  try {
    tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  } catch (e) {
    tasks = [];
  }
}

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
  const list = document.getElementById('task-list');
  list.innerHTML = '';

  tasks.forEach((task) => {
    const li = document.createElement('li');

    if (task.completed) {
      li.classList.add('completed');
    }

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.addEventListener('change', () => toggleTask(task.id));

    const span = document.createElement('span');
    span.textContent = task.text;

    const del = document.createElement('button');
    del.textContent = 'Delete';
    del.addEventListener('click', () => deleteTask(task.id));

    li.append(checkbox, span, del);
    list.appendChild(li);
  });
}

function addTask(text) {
  tasks.push({
    id: Date.now(),
    text: text,
    completed: false
  });

  saveTasks();
  renderTasks();
}

function toggleTask(id) {
  const task = tasks.find((t) => t.id === id);

  if (task) {
    task.completed = !task.completed;
  }

  saveTasks();
  renderTasks();
}

function deleteTask(id) {
  tasks = tasks.filter((t) => t.id !== id);
  saveTasks();
  renderTasks();
}

document.getElementById('task-form').addEventListener('submit', (e) => {
  e.preventDefault();

  const input = document.getElementById('task-input');
  const text = input.value.trim();

  if (text) {
    addTask(text);
    input.value = '';
  }
});

loadTasks();
renderTasks();
