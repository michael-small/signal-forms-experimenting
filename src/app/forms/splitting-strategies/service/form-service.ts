import { Injectable, signal } from '@angular/core';
import { form, minLength, required } from '@angular/forms/signals';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  private names = signal({
    first: '',
    last: '',
  });

  public namesForm = form(this.names, (path) => {
    required(path.first);
    required(path.last);

    minLength(path.first, 2);
    minLength(path.last, 2);
  });
}
