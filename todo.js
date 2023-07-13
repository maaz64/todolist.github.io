let tasks = [];
const taskList = document.getElementById('list');
const addTaskInput = document.getElementById('add');
const tasksCounter = document.getElementById('tasks-counter');
const addTaskBtn = document.querySelector('.btn');


function createList(task)
{
    let li = document.createElement('li');
    li.innerHTML = `
    <input type="checkbox" id="${task.id}" ${task.done ? 'checked' : ''} class="custom-checkbox">
    <label for="${task.id}">${task.text}</label>
    <img src="./static/bin.svg" class="delete" data-id=${task.id} />
    `;
    taskList.append(li);
    tasksCounter.innerText = tasks.length;

}

function renderList () {
    taskList.innerHTML ='';
    for(let i=0; i<tasks.length; i++)
    {
        createList(tasks[i]);
    }
    tasksCounter.innerHTML = tasks.length;
}

function toggleTaskcompletion (taskId) {

    let currentTask = tasks.filter(function(tasks){
        return tasks.id == taskId;
    })
    if(currentTask.length>0)
    {
        currentTask[0].done = !currentTask[0].done;
        renderList();
        // showNotification('Task toggle Successfully');
    }
    else{
        // showNotification('Toggling is not successfull');
    }
}

function deleteTask (taskId) {

    let newtask  = tasks.filter(function(tasks)
    {
        return tasks.id != taskId;
    })

    tasks = newtask;
    renderList();
    // showNotification('Task deleted succesfully');
    
}

function addTask (task) {
    tasks.push(task);
    renderList();
    // showNotification('Task Added Successfully');
}

function showNotification(text) {
    alert(text);
}

function handleInputKeypress(e) {
    
    if(e.key=='Enter')
    {
        const text = e.target.value;

        if(!text)
        {
            // showNotification('Enter a task first');
            return;
        }

        const task = {
            text: text,
            id: Date.now().toString(),
            done: false
        }

        e.target.value = '';
        addTask(task);
    }
    
}

function handleClickOndocument(e)
{

    const target = e.target;
    if(target.className == 'delete')
    {
        let taskId = target.dataset.id;
        deleteTask(taskId);
        return;
    }
    else if(target.className == 'custom-checkbox')
    {
        let taskId = target.id;
        toggleTaskcompletion(taskId);
        return;
    }
    else if(target.className == 'add-btn')
    {
        const text = addTaskInput.value;
        console.log(text);

        if(!text)
        {
            // showNotification('Enter a task first');
            return;
        }

        const task = {
            text: text,
            id: Date.now().toString(),
            done: false
        }

        addTaskInput.value = '';
        addTask(task);
    }
}


function initialiseApp()
{
    addTaskInput.addEventListener('keyup',handleInputKeypress);
    document.addEventListener('click',handleClickOndocument);
}

initialiseApp();