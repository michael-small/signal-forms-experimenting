import { patchState, signalStore, withMethods, withProps } from '@ngrx/signals';
import { HttpClient } from '@angular/common/http';
import { rxMutation, withDevtools, withResource } from '@ngrx-toolkit/core';
import { map } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';
import { inject } from '@angular/core';
import { extendResource } from '../../temp_resource_extensions/extend-resource';

export type Todo = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
};

export const TodoStore = signalStore(
  { providedIn: 'root' },
  withProps(() => ({
    _http: inject(HttpClient),
  })),
  withDevtools('fullCrud'),
  withResource(
    (store) => {
      return {
        todos: extendResource(
          rxResource({
            stream: () => {
              return store._http
                .get<Todo[]>('https://jsonplaceholder.typicode.com/todos')
                .pipe(map((todos) => todos.slice(0, 10)));
            },
            defaultValue: [],
          }),
        ),
      };
    },
    {
      errorHandling: 'native',
    },
  ),
  withMethods((store) => ({
    addTodo: rxMutation({
      operation(todo: Todo) {
        return store._http.post<Todo>('https://jsonplaceholder.typicode.com/todos', todo);
      },
      onSuccess(todo) {
        patchState(store, { todosValue: [...store.todosValue(), todo] });
      },
    }),
    removeTodo: rxMutation({
      operation(id: number) {
        return store._http.delete<Todo>(`https://jsonplaceholder.typicode.com/todos/${id}`);
      },
      onSuccess(_removedTodo, id) {
        patchState(store, {
          todosValue: store.todosValue().filter((filteredTodo) => filteredTodo.id !== id),
        });
      },
    }),
    saveTodo: rxMutation({
      operation(todo: Todo) {
        return store._http.put<Todo>(`https://jsonplaceholder.typicode.com/todos/${todo.id}`, todo);
      },
      onSuccess(updatedTodo) {
        patchState(store, {
          todosValue: store
            .todosValue()
            .map((filteredTodo) =>
              filteredTodo.id === updatedTodo.id ? updatedTodo : filteredTodo,
            ),
        });
      },
    }),
    patchTodos: (updatedTodos: Todo[]) =>
      patchState(store, {
        todosValue: store.todosValue().map((todo) => {
          const updatedTodo = updatedTodos.find((t) => t.id === todo.id);
          return updatedTodo ? updatedTodo : todo;
        }),
      }),
  })),
);
