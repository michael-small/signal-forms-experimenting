import { JsonPipe } from '@angular/common';
import { Component, input, model } from '@angular/core';
import { FieldTree, form, FormField, FormRoot, minLength, required } from '@angular/forms/signals';

@Component({
  selector: 'app-sub-b-field-tree-inputs',
  imports: [FormRoot, FormField, JsonPipe],
  template: `
    @let form = this.form();
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
export class SubBFieldTreeInputs {
  form = input.required<FieldTree<string, string, 'writable'>>();
}
