window.addEventListener('load', () => {
    const form = document.querySelector('#new-task-form');
    const input = document.querySelector("#new-task-input");
    const list_el = document.querySelector('#tasks');

    let todos = JSON.parse(localStorage.getItem('todos')) || [];

    // Function to save tasks to local storage
    const saveTodos = () => {
        localStorage.setItem('todos', JSON.stringify(todos));
    };

    // Function to add a task to the UI
    const addTaskToUI = (task, index) => {
        const taskElement = document.createElement("div");
        taskElement.classList.add("task");

        const taskContent = document.createElement("div");
        taskContent.classList.add("content");

        taskElement.appendChild(taskContent);

        const taskInputElement = document.createElement("input");
        taskInputElement.classList.add("text");
        taskInputElement.type = "text";
        taskInputElement.value = task;
        taskInputElement.setAttribute("readonly", "readonly");

        taskContent.appendChild(taskInputElement);

        const taskActions = document.createElement("div");
        taskActions.classList.add("actions");

        const taskEditElement = document.createElement("button");
        taskEditElement.classList.add("edit");
        taskEditElement.innerHTML = "Edit";

        const taskDeleteElement = document.createElement("button");
        taskDeleteElement.classList.add("delete");
        taskDeleteElement.innerHTML = "Delete";

        taskActions.appendChild(taskEditElement);
        taskActions.appendChild(taskDeleteElement);

        taskElement.appendChild(taskActions);

        list_el.appendChild(taskElement);

        taskEditElement.addEventListener('click', () => {
            if (taskEditElement.innerText.toLowerCase() === "edit") {
                taskInputElement.removeAttribute("readonly");
                taskInputElement.focus();
                taskEditElement.innerText = "Save";
            } else {
                taskInputElement.setAttribute("readonly", "readonly");
                taskEditElement.innerText = "Edit";

                // Update the task in the todos array and save it
                todos[index] = taskInputElement.value;
                saveTodos();
            }
        });

        taskDeleteElement.addEventListener('click', () => {
            list_el.removeChild(taskElement);

            // Remove the task from the todos array and save it
            todos.splice(index, 1);
            saveTodos();

            // Re-render the task list to update the indexes
            renderTasks();
        });
    };

    // Function to render tasks to the UI
    const renderTasks = () => {
        list_el.innerHTML = '';
        todos.forEach((task, index) => {
            addTaskToUI(task, index);
        });
    };

    // Load tasks from local storage and render them to the UI
    renderTasks();

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const task = input.value;
        if (!task) {
            alert("A task must be filled before submitting");
            return;
        }

        // Add the new task to the todos array and save it
        todos.push(task);
        saveTodos();

        // Render the tasks again to include the new task
        renderTasks();

        input.value = "";
    });
});
