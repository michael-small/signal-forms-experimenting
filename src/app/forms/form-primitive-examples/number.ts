import { Component, signal } from '@angular/core';
import { form, FormField, FormRoot } from '@angular/forms/signals';

@Component({
  selector: 'app-number',
  imports: [FormField, FormRoot],
  template: `
    <form [formRoot]="form">
      <label>
        Enter a number:
        <input type="number" [formField]="form" />
      </label>
    </form>
  `,
})
export class Number {
  private model = signal(1);

  protected form = form(this.model);
}
