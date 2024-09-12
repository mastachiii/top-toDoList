const DOM = {

    getTaskInfo() {

        const title = document.querySelector('input[name = task-title]').value
                , dueDate = document.querySelector('input[name = due-date]').value
                , priority = document.querySelector('select').value
                , notes = document.querySelector('textarea').value;

        return [title, dueDate, priority, notes];
    },

    updateProjects(projects) {

        const projectsContainer = document.getElementById('projects');

        [...projectsContainer.children].forEach( (child) => { if (child) child.remove() });

        projects.forEach( (project) => {

            const projectName = document.createElement('button')
                    , removeProjectButton = document.createElement('button');

            projectName.textContent = project.name;
            removeProjectButton.textContent = 'X';

            projectsContainer.append(projectName, removeProjectButton);
        })
    }
}

export { DOM };