class Task {

    constructor (taskInfo){

        const [title, dueDate, priority, notes] = taskInfo;

        return { title, dueDate, priority, status:'Not Done', notes };
    }
}

export { Task };