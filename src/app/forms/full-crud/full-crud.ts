import { bootstrapApplication } from '@angular/platform-browser';
import { Component, inject } from '@angular/core';
import {
  patchState,
  signalStore,
  withHooks,
  withMethods,
  withProps,
  withState,
} from '@ngrx/signals';
import { HttpClient } from '@angular/common/http';
import { rxMutation, withMutations, withStorageSync } from '@angular-architects/ngrx-toolkit';
import { FormsModule } from '@angular/forms';
import { form, FormField } from '@angular/forms/signals';
import { delegatedSignal } from '../../prototypes/delegatedSignal/delegated-signal';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

let currentId = 11;

interface MutationParameter {
  operation: () => void;
  onSuccess: () => void;
  onError: () => void;
}

const TodoStore = signalStore(
  { providedIn: 'root' },
  withState({ todos: new Array<Todo>() }),
  withProps(() => ({
    _http: inject(HttpClient),
  })),
  withMethods((store) => ({
    addTodo: rxMutation({
      operation(todo: Todo) {
        return store._http.post<Todo>('https://jsonplaceholder.typicode.com/todos', todo);
      },
      onSuccess(todo) {
        patchState(store, { todos: [...store.todos(), todo] });
      },
    }),
    removeTodo: rxMutation({
      operation(id: number) {
        return store._http.delete<Todo>(`https://jsonplaceholder.typicode.com/todos/${id}`);
      },
      onSuccess(_removedTodo, id) {
        patchState(store, {
          todos: store.todos().filter((filteredTodo) => filteredTodo.id !== id),
        });
      },
    }),
    saveTodo: rxMutation({
      operation(todo: Todo) {
        return store._http.put<Todo>(`https://jsonplaceholder.typicode.com/todos/${todo.id}`, todo);
      },
      onSuccess(updatedTodo) {
        patchState(store, {
          todos: store
            .todos()
            .map((filteredTodo) =>
              filteredTodo.id === updatedTodo.id ? updatedTodo : filteredTodo,
            ),
        });
      },
    }),
    toggleCompleted: (id: number) =>
      patchState(store, {
        todos: store.todos().map((todo) => ({
          ...todo,
          completed: todo.id === id ? !todo.completed : todo.completed,
        })),
      }),
    updateTitle: (id: number, title: string) =>
      patchState(store, {
        todos: store.todos().map((todo) => ({
          ...todo,
          title: todo.id === id ? title : todo.title,
        })),
      }),
    patchTodos: (updatedTodos: Todo[]) =>
      patchState(store, {
        todos: store.todos().map((todo) => {
          const updatedTodo = updatedTodos.find((t) => t.id === todo.id);
          return updatedTodo ? updatedTodo : todo;
        }),
      }),
  })),

  withHooks((store) => ({
    onInit() {
      store._http.get<Todo[]>('https://jsonplaceholder.typicode.com/todos').subscribe((todos) => {
        patchState(store, { todos: todos.slice(0, 10) });
      });
    },
  })),
);

@Component({
  selector: 'app-full-crud',
  imports: [FormsModule, FormField],
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
              <input [formField]="form[$index].title" />
            </td>
            <td>
              <button (click)="toggleCompleted(todo.id)">
                {{ todo.completed ? 'Yes' : 'No' }}
              </button>
            </td>
            <td>
              <button (click)="saveTodo(todo)">Save</button>
              <button (click)="removeTodo(todo.id)">X</button>
            </td>
          </tr>
        }
      </tbody>
    </table>
    <div>
      <button (click)="addTodo()">Add Todo</button>
    </div>
  `,
})
export class FullCRUD {
  readonly #todoStore = inject(TodoStore);

  readonly #todos = delegatedSignal({
    source: this.#todoStore.todos,
    update: (todos) => this.#todoStore.patchTodos(todos),
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

  protected toggleCompleted(id: number) {
    this.#todoStore.toggleCompleted(id);
  }

  protected updateTitle(id: number, title: string) {
    this.#todoStore.updateTitle(id, title);
  }
}
