import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormField, FormRoot } from '@angular/forms/signals';
import { FormService } from './form-service';

@Component({
  selector: 'app-sub-b-service',
  imports: [FormRoot, FormField, JsonPipe],
  template: `
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
export class SubBService {
  readonly formService = inject(FormService);

  form = this.formService.namesForm.last;
}
