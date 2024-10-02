export class TaskModel {
    constructor(public id: string, public parentListId: string, public name: string, public description: string, public completed: boolean, public createdAt: string, public deadline: string) {
        this.id = id;
        this.parentListId = parentListId;
        this.name = name;
        this.description = description;
        this.completed = completed;
        this.createdAt = createdAt;
        this.deadline = deadline;
    }
}