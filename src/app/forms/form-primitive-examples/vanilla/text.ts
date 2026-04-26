import { Component, signal } from '@angular/core';
import { form, FormField, FormRoot } from '@angular/forms/signals';

@Component({
  selector: 'app-text',
  imports: [FormField, FormRoot],
  template: `
    <form [formRoot]="form">
      <label>
        Enter some text:
        <input type="text" [formField]="form" />
      </label>
    </form>
  `,
})
export class Text {
  private model = signal('text');

  protected form = form(this.model);
}
