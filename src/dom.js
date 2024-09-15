import { format } from 'date-fns';
import { PROJECTS } from './project';

const DOM = {

    getTaskInfo() {
        const title = document.querySelector('input[name = task-title]')
                , dueDate = document.querySelector('input[name = due-date]')
                , priority = document.querySelector('select')
                , notes = document.querySelector('textarea')
                , taskInfo = [title.value, dueDate.value, priority.value, notes.value];

        if (!taskInfo.includes('')){ format(dueDate.value, 'MM/dd/yyyy'); return taskInfo }; // date-fns format mutates the dueDate even if it's a constant variable ??

    },

    updateProjects(projects) {
        const projectsContainer = document.getElementById('projects');

        [...projectsContainer.children].forEach( (child) => { if (child) child.remove() });

        projects.forEach( (project, index) => {
            const projectContainer = document.createElement('div')
                    , name = document.createElement('button')
                    , removeProjectButton = document.createElement('button');

            name.textContent = project.name;
            
            projectContainer.setAttribute('project-index', index);
            name.setAttribute('data-function', 'switch-project');
            removeProjectButton.setAttribute('data-function', 'remove-project');
            
            projectContainer.append(name, removeProjectButton);
            projectsContainer.append(projectContainer);
        })
    },

    updateTasks(tasks) {
        const tasksContainer = document.getElementById('tasks');

        [...tasksContainer.children].forEach( (child) => { if (child) child.remove() } );

        tasks.forEach( (task, index) => {            
            const taskContainer = document.createElement('li')
                    , checkTaskButton = document.createElement('button')
                    , checkTaskInfoButton = document.createElement('button')
                    , removeTaskButton = document.createElement('button') 
                    , title = document.createElement('p')

            title.textContent = task.title;

            taskContainer.setAttribute('task-index', index);
            checkTaskButton.setAttribute('data-function', 'mark-task-as-done');
            removeTaskButton.setAttribute('data-function', 'remove-task');
            checkTaskInfoButton.setAttribute('data-function', 'check-task-info');

            if (task.status === 'Done') taskContainer.style.backgroundColor = '#65a30d';
                        
            taskContainer.append(checkTaskButton, title, checkTaskInfoButton, removeTaskButton);
            tasksContainer.append(taskContainer);
        } );

        this.createTaskInfo(tasks);
    },

    createTaskInfo(tasks) {
        const taskInfoContainer = document.getElementById('task-info');

        [...taskInfoContainer.children].forEach( (child) => { if (child) child.remove() });

        tasks.forEach( (task, index) => {
            const taskInfo = document.createElement('dialog')
                    , taskHeaderContainer = document.createElement('div')
                    , taskHeader = document.createElement('h1')
                    , closeTaskInfoButton = document.createElement('button')
                    , taskInfoUl = document.createElement('ul')
                    , taskInfoLi = document.createElement('li')
                    , name = document.createElement('p')
                    , dueDate = document.createElement('p')
                    , priority = document.createElement('p')
                    , status = document.createElement('p')
                    , notes = document.createElement('p');

            taskHeader.textContent = 'TASK DETAILS';
            name.innerHTML = `<em>Title:</em> ${task.title}`;
            dueDate.innerHTML = `<em>Date:</em> ${format(task.dueDate, 'MMMM dd,yyyy')}`;
            priority.innerHTML = `<em>Priority:</em> ${task.priority}`;
            status.innerHTML = `<em>Status:</em> ${task.status}`;
            notes.innerHTML = `<em>Notes:</em> ${task.notes}`;

            taskInfo.setAttribute('task-info-index', index);

            taskInfoLi.append(name, dueDate, priority, status, notes);
            taskInfoUl.append(taskInfoLi);
            taskHeaderContainer.append(taskHeader, closeTaskInfoButton);
            taskInfo.append(taskHeaderContainer, taskInfoUl);
            taskInfoContainer.append(taskInfo);
        } );
    }
}

export { DOM };