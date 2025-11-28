import { Component } from '@angular/core';
import { Todo } from '../todo';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo-test',
  imports: [FormsModule,CommonModule],
  templateUrl: './todo-test.html',
  styleUrl: './todo-test.css',
})
export class TodoTest {
     
  todos: Todo[] = [];
  searchText: string = '';

  // Modal Controls
  showModal = false;
  showDeleteModal = false;

  selectedTodo!: Todo;

  // Form Data
  todo: Todo = {
    id: 0,
    title: '',
    description: '',
    dueDate: '',
    status: "pending"
  };

  constructor() {
    this.loadFromLocalStorage();
  }

  /* ───── CRUD ───── */

  openModal() {
    this.showModal = true;
    this.todo = { id: 0, title: '', description: '', dueDate: '', status: 'pending' };
  }

  editModal(todo: Todo) {
    this.todo = { ...todo };
    this.showModal = true;
  }

  saveTodo() {
    if (this.todo.id === 0) {
      this.todo.id = Date.now();
      this.todos.push({ ...this.todo });
    } else {
      const index = this.todos.findIndex(t => t.id === this.todo.id);
      this.todos[index] = { ...this.todo };
    }

    this.showModal = false;
    this.saveToLocalStorage();
  }

  openDeleteModal(todo: Todo) {
    this.selectedTodo = todo;
    this.showDeleteModal = true;
  }

  confirmDelete() {
    this.todos = this.todos.filter(t => t.id !== this.selectedTodo.id);
    this.showDeleteModal = false;
    this.saveToLocalStorage();
  }

  /* ───── Search Filter ───── */

  get filteredTodos() {
    return this.todos.filter(t =>
      t.title.toLowerCase().includes(this.searchText.toLowerCase()) ||
      t.description.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  /* ───── LocalStorage ───── */

  saveToLocalStorage() {
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  loadFromLocalStorage() {
    const data = localStorage.getItem('todos');
    this.todos = data ? JSON.parse(data) : [];
  }
}
