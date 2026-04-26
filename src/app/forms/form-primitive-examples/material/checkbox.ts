import { Component, signal } from '@angular/core';
import { form, FormField, FormRoot } from '@angular/forms/signals';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-checkbox-material',
  imports: [FormField, FormRoot, MatCheckboxModule],
  template: `
    <form [formRoot]="form">
      <mat-checkbox [formField]="form">Check me!</mat-checkbox>
    </form>
  `,
})
export class CheckboxMaterial {
  private model = signal(true);

  protected form = form(this.model);
}
