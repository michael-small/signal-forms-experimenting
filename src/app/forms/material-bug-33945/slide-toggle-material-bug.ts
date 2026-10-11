import { Component, inject, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { form, FormField, FormRoot, required } from '@angular/forms/signals';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'slide-toggle-material-bug',
  template: `
    <h3>
      <a
        href="https://material.angular.dev/components/slide-toggle/examples#slide-toggle-forms"
        target="_blank"
        >Slide-toggle with forms
      </a>
    </h3>

    <form class="example-form" [formRoot]="signalForm">
      <mat-slide-toggle [formField]="signalForm.enableWifi">Enable Wifi</mat-slide-toggle>
      <mat-slide-toggle [formField]="signalForm.acceptTerms"
        >Accept Terms of Service</mat-slide-toggle
      >
      <p>Signal Form valid: {{ signalForm().valid() }}</p>
      <button matButton="elevated" type="submit">Save Settings</button>
    </form>
  `,
  styles: `
    .example-form mat-slide-toggle {
      margin: 8px 0;
      display: block;
    }
  `,
  imports: [MatSlideToggleModule, MatButtonModule, FormRoot, FormField],
})
export class SlideToggleMaterialBug {
  private _formBuilder = inject(FormBuilder);

  protected isChecked = signal(true);

  protected formGroup = this._formBuilder.group({
    enableWifi: false,
    acceptTerms: [false, Validators.requiredTrue],
  });

  protected signalForm = form(
    signal({ enableWifi: false, acceptTerms: false }),
    (p) => {
      required(p.acceptTerms);
    },
    {
      submission: {
        action: async (form) => {
          alert(JSON.stringify(form().value(), null, 2));
        },
      },
    },
  );

  alertFormValues(formGroup: FormGroup) {
    alert(JSON.stringify(formGroup.value, null, 2));
  }
}
