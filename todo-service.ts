import { Injectable } from '@angular/core';
import { Todo } from './todo';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private todos: Todo[] = [];
  private idCounter = 1;


  getAll() {
    return this.todos;
  }


  add(todo: Todo) {
    todo.id = this.idCounter++;
    this.todos.push(todo);
  }


  update(todo: Todo) {
    const index = this.todos.findIndex(t => t.id === todo.id);
    if (index !== -1) this.todos[index] = todo;
  }


  delete(id: number) {
    this.todos = this.todos.filter(t => t.id !== id);
  }
}
