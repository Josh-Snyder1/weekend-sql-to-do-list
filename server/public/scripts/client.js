console.log('js')

$(document).ready(onReady);

function onReady() {
    console.log( 'so ready!' );
    $(document).on('click', '#addButton', addTask);
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
}// end appendTasks