import "./styles/normalize.css"
import "./styles/style.css"
import { PROJECTS } from "./project.js";
import { List } from "./list.js";
import { Task } from "./task.js";
import { DOM } from "./dom.js";

(function init() {

    // Dialog Event Listeners
    const body = document.body

    body.addEventListener('click', (e) => {
        const buttonFunction = e.target.getAttribute('data-function')
                , projectDialog = document.getElementById('project-form')
                , taskDialog = document.getElementById('task-form')
                , taskDetailsDialog = document.getElementById('task-details');

        switch (buttonFunction){
            case 'open-project-dialog':
                projectDialog.showModal();
                break;

            case 'close-project-dialog':
                projectDialog.close();
                break;

            case 'open-task-dialog':
                taskDialog.showModal();
                break;

            case 'close-task-dialog':
                taskDialog.close();
                break;

            case 'open-task-details':
                taskDetailsDialog.showModal();
                break;

            case 'close-task-details':
                taskDetailsDialog.close();
        }
    });

    // Project Functionality
    PROJECTS.addProject( new List() ); // Initialize our projects container with a 'Today' list.
    DOM.updateProjects(PROJECTS.lists);

    const createProjectButton = document.querySelector('button[data-function = create-project]');

    createProjectButton.addEventListener('click', () => {
        const projectName = document.querySelector('#project-form > form > input').value;

        PROJECTS.addProject( new List(projectName) );
        DOM.updateProjects(PROJECTS.lists);
    });

    // Task Functionality 
    const createTaskButton = document.querySelector('button[data-function = create-task]');

    createTaskButton.addEventListener('click', () => {
        const currentProject = PROJECTS.lists[PROJECTS.activeProjectIndex];

        currentProject.addTask( new Task( DOM.getTaskInfo() ) );
    });
})()