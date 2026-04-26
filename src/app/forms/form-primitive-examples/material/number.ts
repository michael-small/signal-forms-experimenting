import { Component, signal } from '@angular/core';
import { form, FormField, FormRoot } from '@angular/forms/signals';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-number-material',
  imports: [FormField, FormRoot, MatFormFieldModule, MatInputModule],
  template: `
    <form [formRoot]="form">
      <mat-form-field>
        <mat-label>Enter a number</mat-label>
        <input matInput type="number" [formField]="form" />
      </mat-form-field>
    </form>
  `,
})
export class NumberMaterial {
  private model = signal(1);

  protected form = form(this.model);
}
