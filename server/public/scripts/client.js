console.log('js')

$(document).ready(onReady);

function onReady() {
    console.log( 'so ready!' );
    $(document).on('click', '#addButton', addTask);
    $(document).on('click', '.deleteBtn', deleteTask);
    $(document).on('click', '.completeBtn', makeComplete)
    appendTasks();
};

function addTask() {

    let task = {
        task: $('#taskIn').val()
    };
    console.log('add button clicked',task);

    $.ajax({
        type: 'POST',
        url: '/toDo',
        data: task
    }).then(function(response) {
        getTasks();
        console.log('in ajax post.then',response);
    }).catch(function(err) {
        console.log('error in POST', err);
        alert('unable to add task');
    })

    $('#taskIn').val('');
}// end add task

function appendTasks() {
    console.log('in appendTasks');
    $('#viewTasks').empty();

    $.ajax({
        method: 'GET',
        url: '/toDo'
    }).then((response) => {
        console.log('in appendTasks ajax.then', response)
        for (task of response) {
            $('#viewTasks').append(`
            <tr data-task-id="${task.id}">
                <td> ${task.task} </td>
                <td> ${task.status} </td>
                <td>
                    <button class="completeBtn">Complete</button>
                </td>
                <td>
                    <button class="deleteBtn">Delete</button>
                </td>
            </tr>
            `);//end table appending
        }

    }).catch((err) => {
        console.log('in append ajax.catch', err);
        alert('cannot get tasks');
    });
}// end appendTasks

function deleteTask() {
    console.log('in deleteTask');

    let taskId = $(this).parents('tr').data('task-id');
    
    $.ajax({
        method: 'DELETE',
        url: `/toDo/${taskId}`
    }).then(() => {
        console.log('in deleteTask ajax.then',taskId);
        appendTasks();
    }).catch(() => {
        console.log('in deleteTask ajax.catch',err);
        alert('cannot delete task');
    })

}//end delete Task

function makeComplete() {

}//end makeComplete