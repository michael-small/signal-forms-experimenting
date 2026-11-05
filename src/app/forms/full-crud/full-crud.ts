import { Component, inject, linkedSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { form, FormField } from '@angular/forms/signals';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Todo, TodoStore } from './store';

let currentId = 11;

@Component({
  selector: 'app-full-crud',
  imports: [FormsModule, FormField, MatCheckboxModule],
  template: `
    <h1>Todo List</h1>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Completed</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        @for (todo of form().value(); track todo.id) {
          <tr>
            <td>{{ todo.id }}</td>
            <td>
              <input type="text" [formField]="form[$index].title" />
            </td>
            <td>
              <mat-checkbox [formField]="form[$index].completed" />
            </td>
            <td>
              <button type="submit" (click)="saveTodo(todo)">Save</button>
              <button type="button" (click)="removeTodo(todo.id)">X</button>
            </td>
          </tr>
        }
      </tbody>
    </table>
    <div>
      <button type="button" (click)="addTodo()">Add Todo</button>
    </div>
  `,
})
export class FullCRUD {
  readonly #todoStore = inject(TodoStore);

  readonly #todos = linkedSignal<Todo[]>(() => this.#todoStore.todosValue(), {
    set: (todos) => this.#todoStore.patchTodos(todos),
  });

  protected form = form(this.#todos);

  protected addTodo() {
    this.#todoStore.addTodo({
      id: currentId++,
      title: 'New Todo',
      completed: false,
      userId: 1,
    });
  }

  protected saveTodo(todo: Todo) {
    this.#todoStore.saveTodo(todo);
  }

  protected removeTodo(id: number) {
    this.#todoStore.removeTodo(id);
  }
}
