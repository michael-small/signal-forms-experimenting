import { Component, computed, inject, input } from '@angular/core';
import { FormService } from './form.service';
import { FormField } from '@angular/forms/signals';
import { MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'app-subform-b',
  imports: [FormField, MatRadioModule],
  template: `
    @let form = this.form();

    <form style="display: inline-block;">
      <label>
        <input type="radio" value="A" [formField]="form.type" />
        <span>A</span>
      </label>
      <label>
        <input type="radio" value="B" [formField]="form.type" />
        <span>B</span>
      </label>
    </form>

    <label>
      Subform B:
      <input type="number" [formField]="form.b.value" />
    </label>
  `,
})
export class SubformB {
  readonly formService = inject(FormService);

  public readonly index = input.required<number>();

  protected form = computed(() => this.formService.differingObjectsArrayForm.items[this.index()]);
}
