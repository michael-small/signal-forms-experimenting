import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormField, FormRoot } from '@angular/forms/signals';

import { FormService } from './form-service';

@Component({
  selector: 'app-sub-a-service',
  imports: [FormRoot, FormField, JsonPipe],
  template: `
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
export class SubAService {
  readonly formService = inject(FormService);

  form = this.formService.namesForm.first;
}
