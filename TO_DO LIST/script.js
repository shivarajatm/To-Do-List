
// Retrieve stored tasks from localStorage on page load
document.addEventListener('DOMContentLoaded', function() {
    loadTasks();
});

// Function to add a new task
function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task");
        return;
    }

    const listItem = document.createElement('li');
    listItem.classList.add('list-group-item', 'list-item'); // Add flexbox styling

    // Create task container for checkbox and task text
    const taskContainer = document.createElement('div');
    taskContainer.classList.add('task-container');
    listItem.appendChild(taskContainer);

    // Create checkbox for task completion
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('form-check-input');
    checkbox.onclick = () => toggleTaskCompletion(checkbox, task);
    taskContainer.appendChild(checkbox);

    // Create task text element
    const task = document.createElement('span');
    task.textContent = taskText;
    task.contentEditable = true; // Make the task text editable
    task.classList.add('task-text');
    taskContainer.appendChild(task);

    // Create icons container
    const icons = document.createElement('div');
    icons.classList.add('icons');

    // Edit icon (to allow re-editing)
    const editIcon = document.createElement('i');
    editIcon.classList.add('bi', 'bi-pencil');
    editIcon.onclick = () => editTask(task, editIcon);  // Pass task and editIcon
    icons.appendChild(editIcon);

    // Delete icon
    const deleteIcon = document.createElement('i');
    deleteIcon.classList.add('bi', 'bi-trash');
    deleteIcon.onclick = () => deleteTask(listItem);
    icons.appendChild(deleteIcon);

    listItem.appendChild(icons);
    taskList.appendChild(listItem);

    // Save tasks to localStorage
    saveTasks();

    // Clear input field
    taskInput.value = '';
}

// Function to toggle task completion
function toggleTaskCompletion(checkbox, task) {
    if (checkbox.checked) {
        task.classList.add('checked');
    } else {
        task.classList.remove('checked');
    }
    saveTasks(); // Save to localStorage after change
}

// Function to edit task (toggle contentEditable)
function editTask(task, editIcon) {
    if (task.contentEditable === "true") {
        task.contentEditable = "false"; // Disable editing
        editIcon.classList.remove('bi-pencil');
        editIcon.classList.add('bi-pencil-square');
    } else {
        task.contentEditable = "true"; // Enable editing
        editIcon.classList.remove('bi-pencil-square');
        editIcon.classList.add('bi-pencil');
    }

    saveTasks();
}

// Function to delete task
function deleteTask(taskItem) {
    taskItem.remove();
    saveTasks(); // Save to localStorage after deletion
}

// Function to save tasks to localStorage
function saveTasks() {
    const taskList = document.getElementById('taskList');
    const tasks = [];
    taskList.querySelectorAll('li').forEach(taskItem => {
        const task = taskItem.querySelector('span');
        const isChecked = taskItem.querySelector('input[type="checkbox"]').checked;
        tasks.push({ text: task.textContent, checked: isChecked });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to load tasks from localStorage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskList = document.getElementById('taskList');
    tasks.forEach(taskData => {
        const listItem = document.createElement('li');
        listItem.classList.add('list-group-item', 'list-item'); // Add flexbox styling

        const taskContainer = document.createElement('div');
        taskContainer.classList.add('task-container');
        listItem.appendChild(taskContainer);

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.classList.add('form-check-input');
        checkbox.checked = taskData.checked;
        checkbox.onclick = () => toggleTaskCompletion(checkbox, task);
        taskContainer.appendChild(checkbox);

        const task = document.createElement('span');
        task.textContent = taskData.text;
        task.contentEditable = true;
        task.classList.add('task-text');
        taskContainer.appendChild(task);

        const icons = document.createElement('div');
        icons.classList.add('icons');

        const editIcon = document.createElement('i');
        editIcon.classList.add('bi', 'bi-pencil');
        editIcon.onclick = () => editTask(task, editIcon);
        icons.appendChild(editIcon);

        const deleteIcon = document.createElement('i');
        deleteIcon.classList.add('bi', 'bi-trash');
        deleteIcon.onclick = () => deleteTask(listItem);
        icons.appendChild(deleteIcon);

        listItem.appendChild(icons);
        taskList.appendChild(listItem);
    });
}

// Function to filter tasks based on selected filter
function filterTasks(status) {
    const taskList = document.getElementById('taskList');
    const tasks = taskList.querySelectorAll('li');

    tasks.forEach(taskItem => {
        const checkbox = taskItem.querySelector('input[type="checkbox"]');
        if (status === 'all') {
            taskItem.style.display = 'flex';
        } else if (status === 'completed' && checkbox.checked) {
            taskItem.style.display = 'flex';
        } else if (status === 'pending' && !checkbox.checked) {
            taskItem.style.display = 'flex';
        } else {
            taskItem.style.display = 'none';
        }
    });
}
