import { JsonPipe } from '@angular/common';
import { Component, model } from '@angular/core';
import { form, FormField, FormRoot, minLength, required } from '@angular/forms/signals';
import { min } from 'rxjs';

@Component({
  selector: 'app-sub-a-model-inputs',
  imports: [FormRoot, FormField, JsonPipe],
  template: `
    <form [formRoot]="form">
      <label>
        First Name
        <input [formField]="form" type="text" />
      </label>
    </form>

    <pre>Sub A form value: {{ form().value() | json }}</pre>
    <pre>Sub A errors: {{ form().errors() | json }}</pre>
  `,
})
export class SubAModelInputs {
  value = model<string>('');

  form = form(this.value, (path) => {
    required(path);
    minLength(path, 2);
  });
}
