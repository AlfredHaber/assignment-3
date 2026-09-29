// Get the main HTML elements
const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const feedback = document.getElementById("feedback");

// Load saved tasks from localStorage, or start with an empty array
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Save the current tasks array in localStorage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Add a new task
function addTask(text) {
  const task = {
    id: Date.now(),
    text: text,
    completed: false
  };

  // Add the new task to the array
  tasks.push(task);

  // Save and refresh the displayed list
  saveTasks();
  renderTasks();
}

// Mark a task as complete or incomplete
function toggleTask(id) {
  tasks = tasks.map(function(task) {
    if (task.id === id) {
      task.completed = !task.completed;
    }

    return task;
  });

  // Save and refresh the displayed list
  saveTasks();
  renderTasks();
}

// Delete a task
function deleteTask(id) {
  tasks = tasks.filter(function(task) {
    return task.id !== id;
  });

  // Save and refresh the displayed list
  saveTasks();
  renderTasks();
}

// Display all tasks on the page
function renderTasks() {
  // Clear the current list before rebuilding it
  taskList.innerHTML = "";

  // Create HTML elements for each task
  tasks.forEach(function(task) {
    const li = document.createElement("li");

    // Create the checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;

    // Create the task text
    const text = document.createElement("span");
    text.textContent = task.text;

    // Add a line through completed tasks
    if (task.completed) {
      text.style.textDecoration = "line-through";
    }

    // Create the delete button
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";

    // Toggle the task when the checkbox changes
    checkbox.addEventListener("change", function() {
      toggleTask(task.id);
    });

    // Delete the task when the delete button is clicked
    deleteButton.addEventListener("click", function() {
      deleteTask(task.id);
    });

    // Add the elements to the task row
    li.appendChild(checkbox);
    li.appendChild(text);
    li.appendChild(deleteButton);

    // Add the task row to the task list
    taskList.appendChild(li);
  });
}

// Handle the form submission
taskForm.addEventListener("submit", function(event) {
  // Prevent the page from refreshing
  event.preventDefault();

  // Remove extra spaces from the input
  const text = taskInput.value.trim();

  // Reject empty tasks
  if (text === "") {
    feedback.textContent = "Please enter a task.";
    return;
  }

  // Clear the feedback message
  feedback.textContent = "";

  // Add the task
  addTask(text);

  // Clear the input field
  taskInput.value = "";
});

// Display saved tasks when the page first loads
renderTasks();