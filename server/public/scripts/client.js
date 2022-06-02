console.log('js')

$(document).ready(onReady);

function onReady() {
    console.log( 'so ready!' );
    $(document).on('click', '#addButton', addTask);
    $(document).on('click', '.deleteBtn', deleteTask);
    $(document).on('click', '.changeStatus', makeComplete)
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
        appendTasks();
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

            //this checks if task is complete when returned from server before appending
            //if tru then gives it a class of taskComplete
            let trclass = '';
            if (task.status === true) {
                trclass = 'class="taskComplete"';
            };

            $('#viewTasks').append(`
            <tr data-task-id="${task.id}">
                <td ${trclass} class="task"> ${task.task} </td>
                <td class="status">${task.status}</td>
                <td> 
                <button class="changeStatus">Status
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
    console.log('in makeComplete');

    let taskId = $(this).parents('tr').data('task-id');
    let updateStatus ={};

    // $(this).parents('tr').children('.task').classList.toggle("taskComplete")

    if($(this).parents('tr').children('.status').text()=== 'false') {
            updateStatus = {
            status: true
            };
            $(this).parents('tr').addClass("taskComplete");
      }
      else if($(this).parents('tr').children('.status').text()=== 'true') {
            updateStatus = {
            status: false
            };
            $(this).parents('tr').removeClass("taskComplete");
      }
      else {
          console.log('PROBLEM');
      };

    console.log(updateStatus);

    $.ajax({
        method: 'PUT',
        url: `/toDo/${taskId}`,
        data: updateStatus
    }).then(res => {
        console.log('PUT transfer success');
        appendTasks();
    }).catch( err => {
        console.log('update failed');
    });
}; 