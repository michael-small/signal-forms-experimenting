import { Component, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

@Component({
  selector: 'button-toggle-material-bug',
  template: `
    <h3>
      <a
        href="https://material.angular.dev/components/button-toggle/examples#button-toggle-forms"
        target="_blank"
        >Button Toggle with Forms</a
      >
    </h3>
    <section>
      <h4>Button Toggle inside of a Signal form</h4>
      <mat-button-toggle-group [formField]="fontStyleForm" aria-label="Font Style">
        <mat-button-toggle value="bold">Bold</mat-button-toggle>
        <mat-button-toggle value="italic">Italic</mat-button-toggle>
        <mat-button-toggle value="underline">Underline</mat-button-toggle>
      </mat-button-toggle-group>
      <p>Chosen value is {{ fontStyleForm().value() }}</p>
    </section>
  `,
  imports: [MatButtonToggleModule, FormField],
})
export class ButtonToggleMaterialBug {
  fontStyleForm = form(signal(''));
}
