import { Component, signal } from '@angular/core';
import { form, FormField, FormRoot } from '@angular/forms/signals';

@Component({
  selector: 'app-radio',
  imports: [FormField, FormRoot],
  template: `
    <form [formRoot]="form">
      <label>
        <input type="radio" value="option1" [formField]="form" />
        Option 1
      </label>
      <label>
        <input type="radio" value="option2" [formField]="form" />
        Option 2
      </label>
    </form>
  `,
})
export class Radio {
  private model = signal('option1');

  protected form = form(this.model);
}
