import { JsonPipe } from '@angular/common';
import { Component, inject, model } from '@angular/core';
import { form, FormField, FormRoot, minLength, required } from '@angular/forms/signals';
import { FormService } from './form-service';

@Component({
  selector: 'app-sub-b-service',
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
export class SubBService {
  readonly formService = inject(FormService);

  form = this.formService.namesForm.last;
}
