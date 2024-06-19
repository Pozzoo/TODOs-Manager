export class ListModel {
  constructor(title, id, completed = 0, pending = 0, priority = 0) {
    this.title = title;
    this.id = id;
    this.completed = completed;
    this.pending = pending;
    this.priority = priority;
    this.tasks = [];
  }
}