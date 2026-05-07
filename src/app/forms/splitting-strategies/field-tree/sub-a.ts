import { JsonPipe } from '@angular/common';
import { Component, input, model } from '@angular/core';
import { FieldTree, form, FormField, FormRoot, minLength, required } from '@angular/forms/signals';
import { min } from 'rxjs';

@Component({
  selector: 'app-sub-a-field-tree-inputs',
  imports: [FormRoot, FormField, JsonPipe],
  template: `
    @let form = this.form();
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
export class SubAFieldTreeInputs {
  form = input.required<FieldTree<string, string, 'writable'>>();
}
