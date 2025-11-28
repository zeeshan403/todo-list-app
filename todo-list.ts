import { Component } from '@angular/core';
import { Todo } from '../todo';
import { TodoService } from '../todo-service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-todo-list',
  imports: [FormsModule,CommonModule],
  templateUrl: './todo-list.html',
  styleUrl: './todo-list.css',
})
export class TodoList {


  todos: any[] = [];
  searchText = '';

  todo = {
    title: '',
    description: '',
    dueDate: '',
    status: 'Pending'
  };

  editMode = false;
  editIndex: number = -1;

  addOrUpdateTodo() {
    if (this.editMode) {
      this.todos[this.editIndex] = { ...this.todo };
      this.editMode = false;
    } else {
      this.todos.push({ ...this.todo });
    }

    this.todo = {
      title: '',
      description: '',
      dueDate: '',
      status: 'Pending'
    };
  }

  editTodo(item: any) {
    this.todo = { ...item };
    this.editMode = true;
    this.editIndex = this.todos.indexOf(item);
  }

  deleteTodo(item: any) {
    this.todos = this.todos.filter(x => x !== item);
  }

  filteredTodos() {
    return this.todos.filter(todo =>
      todo.title.toLowerCase().includes(this.searchText.toLowerCase()) ||
      todo.description.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }
}