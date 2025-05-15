document.addEventListener('DOMContentLoaded', () => {
  loadTasks();
  window.onscroll = toggleScrollTopBtn;
  document.getElementById('themeToggle').addEventListener('click', toggleDarkMode);
  if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark');
    document.getElementById('themeToggle').textContent = '☀️';
  }
});

function addTask() {
  const input = document.getElementById('taskInput');
  const taskText = input.value.trim();
  if (taskText === "") return;

  const taskList = document.getElementById('taskList');
  const li = document.createElement('li');
  li.textContent = taskText;

  const doneBtn = document.createElement('button');
  doneBtn.textContent = '✅';
  doneBtn.onclick = () => {
    li.classList.toggle('completed');
    saveTasks();
  };

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = '❌';
  deleteBtn.onclick = () => {
    taskList.removeChild(li);
    saveTasks();
  };

  li.appendChild(doneBtn);
  li.appendChild(deleteBtn);
  taskList.appendChild(li);

  input.value = "";
  saveTasks();
}

function saveTasks() {
  const tasks = [];
  document.querySelectorAll('#taskList li').forEach(li => {
    tasks.push({
      text: li.childNodes[0].textContent,
      completed: li.classList.contains('completed')
    });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
  const saved = localStorage.getItem('tasks');
  if (!saved) return;

  const tasks = JSON.parse(saved);
  tasks.forEach(t => {
    const input = document.getElementById('taskInput');
    input.value = t.text;
    addTask();
    const lastTask = document.querySelector('#taskList li:last-child');
    if (t.completed) lastTask.classList.add('completed');
  });
}

// Scroll-to-top function
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toggleScrollTopBtn() {
  const btn = document.getElementById('scrollTopBtn');
  btn.style.display = window.scrollY > 100 ? 'block' : 'none';
}

// Dark mode toggle
function toggleDarkMode() {
  document.body.classList.toggle('dark');
  const themeBtn = document.getElementById('themeToggle');
  const isDark = document.body.classList.contains('dark');
  themeBtn.textContent = isDark ? '☀️' : '🌙';
  localStorage.setItem('darkMode', isDark);
}
