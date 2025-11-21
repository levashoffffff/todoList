//Находим элементы на странице
const from = document.querySelector('#form');
const taskInput = document.querySelector('#taskInput');
const tasksList = document.querySelector('#tasksList');
const emptyList = document.querySelector('#emptyList');

//Добавление задачи
from.addEventListener('submit', addTask);

//Удаление задачи (Привязываемся к списку задач, т.к. изначально элементов нет)
tasksList.addEventListener('click', deleteTask);

//Отмечаем задачу завершенной
tasksList.addEventListener('click', doneTask);

if(localStorage.getItem('tasksHTML')) {
    tasksList.innerHTML = localStorage.getItem('tasksHTML');
}

function addTask(event) {
    //В переменной event хранится вся информация о том событии которое произошло (отмена стандартного поведения -  отменяем отправку формы, чтобы не обновлялась страница)
    event.preventDefault();

    //Достаем текст задачи из поля ввода
    const taskText = taskInput.value;

    //Формируем разметку для новой задачи
    const taskHTML = `
        <li class="list-group-item d-flex justify-content-between task-item">
			<span class="task-title">${taskText}</span>
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

    //Добавляем задачу на страницу
    tasksList.insertAdjacentHTML('beforeend', taskHTML);

    //Очищаем поле ввода и возвращаем на него фокус
    taskInput.value = '';
    taskInput.focus();

    //Проверка. Если в списке задач более 1-го элемента
    if (tasksList.children.length > 1) {
        emptyList.classList.add('none');
    }

    saveHTMLtoLS();
}

function deleteTask(event) {

    if (event.target.dataset.action !== 'delete') return;

    const parentNode = event.target.closest('.list-group-item');
    parentNode.remove();
    //Проверка. Если в списке задач один элемент
    if (tasksList.children.length === 1) {
        emptyList.classList.remove('none');
    }

    saveHTMLtoLS();
}

function doneTask(event) {
    if (event.target.dataset.action !== 'done') return;
    const parentNode = event.target.closest('.list-group-item');
    const taskTitle = parentNode.querySelector('.task-title');
    taskTitle.classList.toggle('task-title--done');

    //Проверяем что клик произошел по кнопке "Задача выполнена"
    /* if (event.target.dataset.action === 'done') {
        const parentNode = event.target.closest('.list-group-item');
        const taskTitle = parentNode.querySelector('.task-title');
        taskTitle.classList.toggle('task-title--done');
    } */

    saveHTMLtoLS();
}

function saveHTMLtoLS() {
    localStorage.setItem('tasksHTML', tasksList.innerHTML);
}
