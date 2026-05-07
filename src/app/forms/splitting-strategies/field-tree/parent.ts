import { Component, signal } from '@angular/core';
import { SubAFieldTreeInputs } from './sub-a';
import { SubBFieldTreeInputs } from './sub-b';
import { JsonPipe } from '@angular/common';
import { form, minLength, required } from '@angular/forms/signals';

@Component({
  selector: 'app-parent-field-tree-inputs',
  imports: [SubAFieldTreeInputs, SubBFieldTreeInputs, JsonPipe],
  template: `
    <app-sub-a-field-tree-inputs [form]="namesForm.first" />
    <app-sub-b-field-tree-inputs [form]="namesForm.last" />

    <pre>Parent values: {{ names() | json }}</pre>
  `,
})
export class ParentFieldTreeInputs {
  names = signal({
    first: '',
    last: '',
  });

  namesForm = form(this.names, (path) => {
    required(path.first);
    required(path.last);

    minLength(path.first, 2);
    minLength(path.last, 2);
  });
}
