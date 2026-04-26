import { Component, signal } from '@angular/core';
import { form, FormField, FormRoot } from '@angular/forms/signals';

@Component({
  selector: 'app-checkbox',
  imports: [FormField, FormRoot],
  template: `
    <form [formRoot]="form">
      <label>
        <input type="checkbox" [formField]="form" />
        Check me!
      </label>
    </form>
  `,
})
export class Checkbox {
  private model = signal(true);

  protected form = form(this.model);
}
