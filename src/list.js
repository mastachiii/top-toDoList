class List {

    constructor (listName = 'Today'){
        this.tasks = [];
        this.name = listName;
    }
    
    addTask(task) { this.tasks.push(task) }

    removeTask(taskIndex) { this.tasks.splice(taskIndex, 1) }
}

export { List };
