import { JsonPipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { FieldTree, FormField, FormRoot } from '@angular/forms/signals';

@Component({
  selector: 'app-sub-b-field-tree-inputs',
  imports: [FormRoot, FormField, JsonPipe],
  template: `
    @let form = this.form();
    <form [formRoot]="form">
      <label>
        Last Name
        <input type="text" [formField]="form" />
      </label>
    </form>

    <pre>Sub B form value: {{ form().value() | json }}</pre>
    <pre>Sub B errors: {{ form().errors() | json }}</pre>
  `,
})
export class SubBFieldTreeInputs {
  form = input.required<FieldTree<string, string, 'writable'>>();
}
