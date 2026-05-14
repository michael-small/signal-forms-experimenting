import { Component, inject, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { form, FormField, required } from '@angular/forms/signals';
import { JsonPipe } from '@angular/common';

/**
 * @title Slide-toggle with forms
 */
@Component({
  selector: 'app-slide-toggle-material',
  template: `
    <form>
      <mat-slide-toggle [formField]="wifiForm">Enable Wifi</mat-slide-toggle>
      <mat-slide-toggle [formField]="termsForm">Accept Terms of Service</mat-slide-toggle>
    </form>

    <pre>wifi: {{ wifiForm().value() | json }}</pre>
    <pre>terms: {{ termsForm().value() | json }}, valid: {{ termsForm().valid() }}</pre>
  `,
  imports: [MatSlideToggleModule, FormField, JsonPipe],
})
export class SlideToggleMaterial {
  wifiForm = form(signal<boolean>(false));
  termsForm = form(signal<boolean>(false), (p) => {
    required(p);
  });
}
