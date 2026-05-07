import { JsonPipe } from '@angular/common';
import { Component, model } from '@angular/core';
import { form, FormField, FormRoot, minLength, required } from '@angular/forms/signals';

@Component({
  selector: 'app-sub-b-model-inputs',
  imports: [FormRoot, FormField, JsonPipe],
  template: `
    <form [formRoot]="form">
      <label>
        Last Name
        <input [formField]="form" type="text" />
      </label>
    </form>

    <pre>Sub B form value: {{ form().value() | json }}</pre>
    <pre>Sub B errors: {{ form().errors() | json }}</pre>
  `,
})
export class SubBModelInputs {
  value = model<string>('');

  form = form(this.value, (path) => {
    required(path);
    minLength(path, 2);
  });
}
