import { Component, signal } from '@angular/core';
import { form, FormField, FormRoot } from '@angular/forms/signals';
import { MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'app-radio-material',
  imports: [FormField, FormRoot, MatRadioModule],
  template: `
    <form [formRoot]="form">
      <mat-radio-group [formField]="form">
        <mat-radio-button value="option1">Option 1</mat-radio-button>
        <mat-radio-button value="option2">Option 2</mat-radio-button>
      </mat-radio-group>
    </form>
  `,
})
export class RadioMaterial {
  private model = signal('option1');

  protected form = form(this.model);
}
