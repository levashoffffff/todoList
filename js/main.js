const form = document.querySelector('#form');
const input = document.querySelector('#taskInput');
const tasksList = document.querySelector('#tasksList');

let tasks = [];
let data = JSON.parse(localStorage.getItem('tasksLocal'));

if (data) {

    tasks = [...data];
    for (let task in tasks) {
        renderPage(tasks[task]);
    }
}

form.addEventListener('submit', addTask);

//Функция добавления новой задачи
function addTask(event) {
    event.preventDefault();

    //Достаем данные из input
    let task = input.value;

    //Создаем задачу
    let taskObject = {
        id: new Date(),
        taskName: task,
        done: false
    }

    //Помещаем задачу в массив
    tasks.push(taskObject);

    //Закидываем в локальное хранилище данные
    localStorage.setItem('tasksLocal', JSON.stringify(tasks));

    input.value = '';
    input.focus();
}

function renderPage(task) {
    let taskHTML = `
        <li id="${task.id}" class="list-group-item d-flex justify-content-between task-item">
			<span class="task-title">${task.taskName}</span>
				<div class="task-item__buttons">
					<button type="button" data-action="done" class="btn-action">
						<img src="./img/tick.svg" alt="Done" width="18" height="18">
					</button>
					<button type="button" data-action="delete" class="btn-action">
						<img src="./img/cross.svg" alt="Done" width="18" height="18">
					</button>
				</div>
		</li>
    `;

    tasksList.innerHTML += taskHTML;
}





