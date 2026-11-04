import { Component, inject, signal } from '@angular/core';
import { FormField } from '@angular/forms/signals';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PasswordGameFormService } from './form.service';
import { MatCardModule } from '@angular/material/card';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-password-game-clone',
  template: `
    <mat-form-field>
      <mat-label>Password</mat-label>
      <input matInput [formField]="formService.form" />
    </mat-form-field>
    @for (error of formService.form().errors(); track error.kind) {
      <mat-card appearance="outlined">
        <mat-card-header>
          <mat-card-title>{{ error | json }}</mat-card-title>
        </mat-card-header>
      </mat-card>
    }
  `,
  imports: [FormField, MatInputModule, MatFormFieldModule, MatCardModule, JsonPipe],
  providers: [PasswordGameFormService],
})
export class PasswordGameClone {
  protected formService = inject(PasswordGameFormService);

  protected rulesGiven = signal(1);

  protected messages = signal<string[]>([]);
}
