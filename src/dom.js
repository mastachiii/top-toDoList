import { format } from 'date-fns';

const DOM = {

    getTaskInfo() {
        const title = document.querySelector('input[name = task-title]').value
                , dueDate = format(document.querySelector('input[name = due-date]').value, 'MM/dd/yyyy')
                , priority = document.querySelector('select').value
                , notes = document.querySelector('textarea').value
                , taskInfo = [title, dueDate, priority, notes];

        if (!taskInfo.includes('')) return taskInfo;
    },

    updateProjects(projects) {
        const projectsContainer = document.getElementById('projects');

        [...projectsContainer.children].forEach( (child) => { if (child) child.remove() });

        projects.forEach( (project, index) => {
            const projectContainer = document.createElement('div')
                    , name = document.createElement('button')
                    , removeProjectButton = document.createElement('button');

            name.textContent = project.name;
            removeProjectButton.textContent = 'X';
            
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

            checkTaskButton.textContent = 'CHECK';
            checkTaskInfoButton.textContent = 'INFO';
            removeTaskButton.textContent = 'REMOVE'; 
            title.textContent = task.title;

            taskContainer.setAttribute('task-index', index);
            checkTaskButton.setAttribute('data-function', 'mark-task-as-done');
            removeTaskButton.setAttribute('data-function', 'remove-task');
            checkTaskInfoButton.setAttribute('data-function', 'check-task-info');

            if (task.status === 'Done') taskContainer.style.backgroundColor = 'green';
                        
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
                    , taskHeader = document.createElement('h1')
                    , closeTaskInfoButton = document.createElement('button')
                    , taskInfoUl = document.createElement('ul')
                    , taskInfoLi = document.createElement('li')
                    , name = document.createElement('h3')
                    , dueDate = document.createElement('p')
                    , priority = document.createElement('p')
                    , status = document.createElement('p')
                    , notes = document.createElement('p');

            taskHeader.textContent = 'TASK DETAILS';
            closeTaskInfoButton.textContent = 'X';
            name.textContent = task.title;
            dueDate.textContent = format(task.dueDate, 'MMMM dd,yyyy');
            priority.textContent = task.priority;
            status.textContent = task.status;
            notes.textContent = task.notes;

            taskInfo.setAttribute('task-info-index', index);

            taskInfoLi.append(name, dueDate, priority, status, notes);
            taskInfoUl.append(taskInfoLi);
            taskInfo.append(taskHeader, closeTaskInfoButton, taskInfoUl);
            taskInfoContainer.append(taskInfo);
        } );
    }
}

export { DOM };