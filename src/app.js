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

        if (!projectName) return; // Prevents user from creating a project with no name.

        PROJECTS.addProject( new List(projectName) );
        DOM.updateProjects(PROJECTS.lists);
        localStorage.projects = JSON.stringify(PROJECTS.lists);
    });

    body.addEventListener('click', (e) => {
        const buttonAttribute = e.target.getAttribute('data-function')
                , projectIndex = e.target.parentElement.getAttribute('project-index')
                , currentProject = PROJECTS.lists[projectIndex]
                , taskContainer = document.querySelector('ul');

        switch (buttonAttribute){
            case 'switch-project':
                PROJECTS.activeProjectIndex = projectIndex
                DOM.updateTasks(currentProject.tasks);
                break;

            case 'remove-project':
                PROJECTS.removeProject(projectIndex);
                DOM.updateProjects(PROJECTS.lists);
                localStorage.projects = JSON.stringify(PROJECTS.lists);

                // Wipes out all tasks if the user deletes the active project.
                if (projectIndex == PROJECTS.activeProjectIndex) [...taskContainer.children].forEach( (child) => { if (child) child.remove() } )
        }
    });

    // Restore previous session 
    PROJECTS.lists = JSON.parse(localStorage.projects);
    PROJECTS.lists.forEach( (list) => { Object.setPrototypeOf(list, List.prototype); })
    
    DOM.updateProjects(PROJECTS.lists);
    DOM.updateTasks(PROJECTS.lists[0].tasks);

    // Task Functionality 
    const createTaskButton = document.querySelector('button[data-function = create-task]');
    createTaskButton.addEventListener('click', () => {
        const currentProject = PROJECTS.lists[PROJECTS.activeProjectIndex]
                , taskInfo = DOM.getTaskInfo();
        
        if (taskInfo) currentProject.addTask( new Task( taskInfo ) );

        DOM.updateTasks(currentProject.tasks);
        localStorage.projects = JSON.stringify(PROJECTS.lists);
    });

    body.addEventListener('click', (e) => {
        const currentProject = PROJECTS.lists[PROJECTS.activeProjectIndex]
                , buttonAttribute = e.target.getAttribute('data-function')
                , taskIndex = e.target.parentElement.getAttribute('task-index')
                , taskDialog = document.querySelector(`dialog[task-info-index = "${taskIndex}"]`)
                , taskDialogCloseButton = document.querySelector(`dialog[task-info-index = "${taskIndex}"] > button`);

        switch (buttonAttribute){
            case 'mark-task-as-done':
                currentProject.tasks[taskIndex].status = 'Done';
                DOM.updateTasks(currentProject.tasks);
                localStorage.projects = JSON.stringify(PROJECTS.lists);
                break;

            case 'check-task-info':
                taskDialog.showModal();
                taskDialogCloseButton.addEventListener('click', () => taskDialog.close());
                break;

            case 'remove-task':
                currentProject.removeTask(taskIndex);
                DOM.updateTasks(currentProject.tasks);
                localStorage.projects = JSON.stringify(PROJECTS.lists);
        }
    });
})()