import { Component, signal } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { form, FormField } from '@angular/forms/signals';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

/**
 * @title Button-toggles with forms
 */
@Component({
  selector: 'button-toggle-forms-example',
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

    <section>
      <h4>Button Toggle inside of a Template-driven form</h4>
      <mat-button-toggle-group [(ngModel)]="fontStyle" aria-label="Font Style">
        <mat-button-toggle value="bold">Bold</mat-button-toggle>
        <mat-button-toggle value="italic">Italic</mat-button-toggle>
        <mat-button-toggle value="underline">Underline</mat-button-toggle>
      </mat-button-toggle-group>
      <p>Chosen value is {{ fontStyle }}</p>
    </section>

    <section>
      <h4>Button Toggle inside of a Reactive form</h4>
      <mat-button-toggle-group [formControl]="fontStyleControl" aria-label="Font Style">
        <mat-button-toggle value="bold">Bold</mat-button-toggle>
        <mat-button-toggle value="italic">Italic</mat-button-toggle>
        <mat-button-toggle value="underline">Underline</mat-button-toggle>
      </mat-button-toggle-group>
      <p>Chosen value is {{ fontStyleControl.value }}</p>
    </section>
  `,
  imports: [MatButtonToggleModule, FormsModule, ReactiveFormsModule, FormsModule, FormField],
})
export class ButtonToggleFormsExample {
  fontStyleControl = new FormControl('');
  fontStyle?: string;
  fontStyleForm = form(signal(''));
}
