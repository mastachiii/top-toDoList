import "./styles/normalize.css"
import "./styles/style.css"

(function init(){

    const body = document.body

    // Dialog Event Listeners
    body.addEventListener('click', (e) => {

        const buttonFunction = e.target.getAttribute('data-function')
                , projectDialog = document.getElementById('project-form')
                , taskDialog = document.getElementById('task-form')
                , taskDetailsDialog = document.getElementById('task-details');

        switch (buttonFunction){

            case 'open-project-create':
                projectDialog.showModal();
                break;

            case 'close-project-create':
                projectDialog.close();
                break;

            case 'open-task-create':
                taskDialog.showModal();
                break;

            case 'close-task-create':
                taskDialog.close();
                break;

            case 'open-task-details':
                taskDetailsDialog.showModal();
                break;

            case 'close-task-details':
                taskDetailsDialog.close();
        }
    });
})()