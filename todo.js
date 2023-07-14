
// Using IIFE to secure our code and avoid global scope so that no can access and change our code
let TodoApp = (function(){

// Using Array data structure to store out todo list data 
let tasks = [];

// Getting the HTML elements 
const taskList = document.getElementById('list');
const addTaskInput = document.getElementById('add');
const tasksCounter = document.getElementById('tasks-counter');
const addTaskBtn = document.querySelector('.btn');


// Creating the create list function
function createList(task)
{

    let li = document.createElement('li');
    // Modifying the list item
    li.innerHTML = `
    <input type="checkbox" id="${task.id}" ${task.done ? 'checked' : ''} class="custom-checkbox">
    <label for="${task.id}">${task.text}</label>
    <img src="./static/bin.svg" class="delete" data-id=${task.id} />
    `;
    // Appending the List items
    taskList.append(li);

    // Setting the total task using task counter
    tasksCounter.innerText = tasks.length;

}

// Rendering the creted list Array
function renderList () {
    taskList.innerHTML ='';
    for(let i=0; i<tasks.length; i++)
    {
        createList(tasks[i]);
    }
    tasksCounter.innerHTML = tasks.length;
}

// Togglimg function for checkbox to check whether the task is completed or not
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

// Creating delete function to delete the task from tasks Array
function deleteTask (taskId) {

    let newtask  = tasks.filter(function(tasks)
    {
        return tasks.id != taskId;
    })

    tasks = newtask;
    renderList();
    // showNotification('Task deleted succesfully');
    
}

// Creating add function to add tasks
function addTask (task) {
    tasks.push(task);
    renderList();
    // showNotification('Task Added Successfully');
}

// Creating notification function that will pop up on our window when some task is added or deleted
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
        return;
    }
    
}


// To hadle the click on our documents we created this function
// This functions handle delete button, check-box and Add task button
function handleClickOndocument(e)
{

    const target = e.target;
    // handling delete button
    if(target.className == 'delete')
    {
        let taskId = target.dataset.id;
        deleteTask(taskId);
        return;
    }
    // handling check box
    else if(target.className == 'custom-checkbox')
    {
        let taskId = target.id;
        toggleTaskcompletion(taskId);
        return;
    }

    // handling Add Task button
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
        return;
    }
}

function initialiseApp()
{
    addTaskInput.addEventListener('keyup',handleInputKeypress);
    document.addEventListener('click',handleClickOndocument);
}

    return {
        initialiseApp
    }
})();

// Finally initialising the our Todo List App
TodoApp.initialiseApp();