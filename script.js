document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');
    const searchBar = document.getElementById('search-bar');
    const taskReminder = document.getElementById('task-reminder');

    taskForm.addEventListener('submit', addTask);
    taskList.addEventListener('click', handleTaskClick);
    searchBar.addEventListener('input', searchTasks);

    function addTask(e) {
        e.preventDefault();
        
        const taskText = taskInput.value.trim();
        const reminderTime = new Date(taskReminder.value);

        if (taskText === '') return;

        const taskItem = document.createElement('li');
        taskItem.className = 'task-item';
        taskItem.innerHTML = `
            <span>${taskText}</span>
            <span>${reminderTime.toLocaleString()}</span>
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
        `;
        taskList.appendChild(taskItem);

        if (taskReminder.value) {
            scheduleReminder(taskText, reminderTime);
        }

        taskInput.value = '';
        taskReminder.value = '';
    }

    function handleTaskClick(e) {
        if (e.target.classList.contains('delete-btn')) {
            e.target.parentElement.remove();
        } else if (e.target.classList.contains('edit-btn')) {
            const taskItem = e.target.parentElement;
            const taskText = taskItem.querySelector('span').textContent;
            taskInput.value = taskText;
            taskList.removeChild(taskItem);
        }
    }

    function searchTasks(e) {
        const text = e.target.value.toLowerCase();
        document.querySelectorAll('.task-item').forEach(task => {
            const item = task.firstChild.textContent.toLowerCase();
            if (item.includes(text)) {
                task.style.display = 'flex';
            } else {
                task.style.display = 'none';
            }
        });
    }

    function scheduleReminder(taskText, reminderTime) {
        const now = new Date();
        const timeToReminder = reminderTime - now;
        if (timeToReminder > 0) {
            setTimeout(() => {
                alert(`Reminder: ${taskText}`);
            }, timeToReminder);
        }
    }
});