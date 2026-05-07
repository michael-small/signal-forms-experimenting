import { JsonPipe } from '@angular/common';
import { Component, inject, model } from '@angular/core';
import { form, FormField, FormRoot, minLength, required } from '@angular/forms/signals';
import { min } from 'rxjs';
import { FormService } from './form-service';

@Component({
  selector: 'app-sub-a-service',
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
export class SubAService {
  readonly formService = inject(FormService);

  form = this.formService.namesForm.first;
}
