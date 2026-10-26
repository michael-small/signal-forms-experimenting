import { JsonPipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { FieldTree, FormField, FormRoot } from '@angular/forms/signals';

@Component({
  selector: 'app-sub-a-field-tree-inputs',
  imports: [FormRoot, FormField, JsonPipe],
  template: `
    @let form = this.form();
    <form [formRoot]="form">
      <label>
        First Name
        <input type="text" [formField]="form" />
      </label>
    </form>

    <pre>Sub A form value: {{ form().value() | json }}</pre>
    <pre>Sub A errors: {{ form().errors() | json }}</pre>
  `,
})
export class SubAFieldTreeInputs {
  form = input.required<FieldTree<string, string, 'writable'>>();
}
