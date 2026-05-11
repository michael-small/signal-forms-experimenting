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
import { rxMutation, withMutations } from '@angular-architects/ngrx-toolkit';
import { FormsModule } from '@angular/forms';
import { FormField } from '@angular/forms/signals';

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
  withState({ todos: [] as Todo[] }),
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
      onSuccess(removedTodo, id) {
        patchState(store, {
          todos: store.todos().filter((filteredTodo) => filteredTodo.id !== id),
        });
      },
    }),
    editTodo: rxMutation({
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
  })),

  withHooks((store) => ({
    onInit() {
      store._http.get<Todo[]>('https://jsonplaceholder.typicode.com/todos').subscribe((todos) => {
        patchState(store, { todos: todos.slice(0, 10) });
      });
    },
  })),
);

// TODO - signal-form-ify
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
        @for (todo of todos(); track todo.id) {
          <tr>
            <td>{{ todo.id }}</td>
            <td>
              <input [value]="todo.title" (input)="updateTitle(todo.id, $event.target.value)" />
            </td>
            <td>
              <button (click)="toggleCompleted(todo.id)">
                {{ todo.completed ? 'Yes' : 'No' }}
              </button>
            </td>
            <td>
              <button (click)="editTodo(todo)">Edit</button>
              <button (click)="removeTodo(todo.id)">Remove</button>
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

  protected readonly todos = this.#todoStore.todos;

  protected addTodo() {
    this.#todoStore.addTodo({
      id: currentId++,
      title: 'New Todo',
      completed: false,
      userId: 1,
    });
  }

  protected editTodo(todo: Todo) {
    this.#todoStore.editTodo(todo);
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
