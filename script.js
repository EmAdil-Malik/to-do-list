// git initlet taskList = document.getElementById("taskList");
// let taskInput = document.getElementById("taskInput");

document.addEventListener("DOMContentLoaded", () => {
  loadTasks();
  applySavedTheme();
});

function addTask() {
  const task = taskInput.value.trim();
  if (!task) return;

  createTaskElement(task);
  saveTask(task, false);
  taskInput.value = "";
}

function createTaskElement(task, completed = false) {
  const li = document.createElement("li");
  if (completed) li.classList.add("completed");

  const span = document.createElement("span");
  span.textContent = task;

  const completeBtn = document.createElement("button");
  completeBtn.textContent = "✓";
  completeBtn.title = "Complete";
  completeBtn.onclick = () => {
    li.classList.toggle("completed");
    updateStorage();
  };

  const editBtn = document.createElement("button");
  editBtn.textContent = "✎";
  editBtn.title = "Edit";
  editBtn.onclick = () => {
    const newTask = prompt("Edit task:", span.textContent);
    if (newTask) {
      span.textContent = newTask;
      updateStorage();
    }
  };

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "🗑";
  deleteBtn.title = "Delete";
  deleteBtn.onclick = () => {
    li.remove();
    updateStorage();
  };

  li.append(span, completeBtn, editBtn, deleteBtn);
  taskList.appendChild(li);
}

function clearAll() {
  if (confirm("Clear all tasks?")) {
    taskList.innerHTML = "";
    localStorage.removeItem("tasks");
  }
}

function saveTask(task, completed) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push({ text: task, completed });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(t => createTaskElement(t.text, t.completed));
}

function updateStorage() {
  const items = taskList.querySelectorAll("li");
  const tasks = [];
  items.forEach(item => {
    const text = item.querySelector("span").textContent;
    const completed = item.classList.contains("completed");
    tasks.push({ text, completed });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function toggleTheme() {
  document.body.classList.toggle("dark");
  localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");

  const btn = document.querySelector(".theme-toggle");
  btn.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
}

function applySavedTheme() {
  const theme = localStorage.getItem("theme");
  if (theme === "dark") {
    document.body.classList.add("dark");
    document.querySelector(".theme-toggle").textContent = "☀️";
  }
}
