window.addEventListener('load', () =>{
    const form = document.querySelector('#new-task-form');
    const input = document.querySelector("#new-task-input");
    const list_el = document.querySelector('#tasks');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const task = input.value;
        if(!task){
            alert("A task must be filled before submitting");
            return;
        }

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

        input.value = "";

        taskEditElement.addEventListener('click', ()=>{
            if(taskEditElement.innerText.toLowerCase() == "edit"){
                taskInputElement.removeAttribute("readonly");
                taskInputElement.focus();
                taskEditElement.innerText = "Save";
            }
            else{
                taskInputElement.setAttribute("readonly", "readonly");
                taskEditElement.innerText = "Edit";
            }
        })

        taskDeleteElement.addEventListener('click', ()=>{
            list_el.removeChild(taskElement);
        })
    })
})