document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.querySelector(".form-control");
    const addTaskBtn = document.querySelector(".btn-primary");
    const clearTaskBtn = document.querySelector(".btn-danger");
    const taskTableBody = document.querySelector("tbody");
    let tasks = [];

    function renderTasks() {
        taskTableBody.innerHTML = "";
        tasks.forEach((task, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${task.name}</td>
                <td>
                    <button class="btn btn-sm status-btn bg-${task.completed ? 'success text-white' : 'warning'}" data-index="${index}">
                        ${task.completed ? 'Done' : 'Pending'}
                    </button>
                </td>
                <td><button class="btn btn-warning btn-sm edit-btn" data-index="${index}">Edit</button></td>
                <td><button class="btn btn-danger btn-sm delete-btn" data-index="${index}">Delete</button></td>
            `;
            taskTableBody.appendChild(row);
        });
    }

    addTaskBtn.addEventListener("click", function () {
        const taskName = taskInput.value.trim();
        if (taskName === "") {
            alert("Please enter a task!");
            return;
        }
        tasks.push({ name: taskName, completed: false });
        taskInput.value = "";
        renderTasks();
    });

    clearTaskBtn.addEventListener("click", function () {
        tasks = [];
        renderTasks();
    });

    taskTableBody.addEventListener("click", function (event) {
        if (event.target.classList.contains("edit-btn")) {
            const index = event.target.getAttribute("data-index");
            const newTaskName = prompt("Edit Task:", tasks[index].name);
            if (newTaskName !== null && newTaskName.trim() !== "") {
                tasks[index].name = newTaskName.trim();
                renderTasks();
            }
        }

        if (event.target.classList.contains("delete-btn")) {
            const index = event.target.getAttribute("data-index");
            tasks.splice(index, 1);
            renderTasks();
        }

        if (event.target.classList.contains("status-btn")) {
            const index = event.target.getAttribute("data-index");
            tasks[index].completed = !tasks[index].completed;
            renderTasks();
        }
    });

    renderTasks();
});
