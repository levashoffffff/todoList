const form = document.querySelector('#form');
const input = document.querySelector('#taskInput');
const tasksList = document.querySelector('#tasksList');

let tasks = [];

//Из localStorage достаем данные и преобразуем обратно в массив
let data = JSON.parse(localStorage.getItem('tasksLocal'));

if (data) {
    tasks = [...data];
    renderAllTasks()
} else {
    renderPageNull()
}

form.addEventListener('submit', addTask);

tasksList.addEventListener('click', deleteTask);

tasksList.addEventListener('click', crossingTask);

//Функция добавления новой задачи
function addTask(event) {
    event.preventDefault();

    //Достаем данные из input
    let task = input.value;

    //Создаем задачу
    let taskObject = {
        id: generateRandomId(),
        taskName: task,
        done: false
    }

    //Помещаем задачу в массив
    tasks.push(taskObject);

    //Закидываем в локальное хранилище данные, при этом преобразовам массив в строку json
    localStorage.setItem('tasksLocal', JSON.stringify(tasks));

    //Перерендерим станицу
    renderAllTasks()

    input.value = '';
    input.focus();
}

//Функция удаления задачи
function deleteTask(event) {
    const btnDelete = event.target.closest('[data-action="delete"]');
    if (btnDelete) {
        const parentWithClass = btnDelete.closest('.list-group-item');
        tasks = tasks.filter((item) => !(parentWithClass.id == item.id));
        localStorage.setItem('tasksLocal', JSON.stringify(tasks));
        renderAllTasks();
    } else {
        return;
    }
}

//Функция зачеркивания задачи
function crossingTask(event) {
    const btnCross = event.target.closest('[data-action="done"]');
    
    if (!btnCross) return; // Если клик был не по кнопке зачеркивания
    
    const parentWithClass = btnCross.closest('.list-group-item');
    const taskTitle = parentWithClass.querySelector('.task-title');
    
    // Переключаем класс зачеркивания
    taskTitle.classList.toggle('task-title--done');
    
    // Находим ID задачи из родительского элемента
    const taskId = parentWithClass.id;
    
    // Находим индекс задачи в массиве
    const taskIndex = tasks.findIndex(item => item.id === taskId);
    
    if (taskIndex !== -1) {
        // Переключаем статус done (true/false)
        tasks[taskIndex].done = !tasks[taskIndex].done;
        
        // Сохраняем в localStorage
        localStorage.setItem('tasksLocal', JSON.stringify(tasks));
    }
}

//Функция отрисовки блока нет задач
function renderPageNull() {
    let taskHTML = `
        <li id="emptyList" class="list-group-item empty-list">
			<img src="./img/leaf.svg" alt="Empty" width="48" class="mt-3">
			<div class="empty-list__title">Список дел пуст</div>
		</li>
    `;

    tasksList.innerHTML = taskHTML;
}

//Функция перерисовки страницы
function renderAllTasks() {
    // Очищаем текущий список
    tasksList.innerHTML = '';

    // Если массив tasks пуст - показываем сообщение
    if (tasks.length === 0) {
        renderPageNull();
        return;
    }

    // Иначе рендерим все задачи
    tasks.forEach(task => {
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
    });
}

//Функция генерации случайного идентификатора
function generateRandomId(length = 10) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}





