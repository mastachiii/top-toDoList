const PROJECTS = {
    
    lists: [],
    activeProjectIndex: 0,
    addProject(project) { this.lists.push(project) },
    removeProject(projectIndex) { this.lists.splice(projectIndex, 1) }
}

export { PROJECTS }