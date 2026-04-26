import { Component, signal } from '@angular/core';
import { form, FormField, FormRoot } from '@angular/forms/signals';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-text-material',
  imports: [FormField, FormRoot, MatFormFieldModule, MatInputModule],
  template: `
    <form [formRoot]="form">
      <mat-form-field>
        <mat-label>Enter some text</mat-label>
        <input matInput [formField]="form" />
      </mat-form-field>
    </form>
  `,
})
export class TextMaterial {
  private model = signal('text');

  protected form = form(this.model);
}
