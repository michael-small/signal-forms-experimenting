import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';

/**
 * @title Button toggle selection mode
 */
@Component({
  selector: 'app-button-toggle-material',
  template: `
    <section>
      <h3>Single selection</h3>
      <mat-button-toggle-group aria-label="Ingredients" [formField]="formSingle">
        <mat-button-toggle value="flour">Flour</mat-button-toggle>
        <mat-button-toggle value="eggs">Eggs</mat-button-toggle>
        <mat-button-toggle value="sugar">Sugar</mat-button-toggle>
      </mat-button-toggle-group>
    </section>
    <pre>single value: {{ formSingle().value() | json }}</pre>

    <section>
      <h3>Multiple selection</h3>
      <mat-button-toggle-group aria-label="Ingredients" multiple [formField]="formMultiple">
        <mat-button-toggle value="flour">Flour</mat-button-toggle>
        <mat-button-toggle value="eggs">Eggs</mat-button-toggle>
        <mat-button-toggle value="sugar">Sugar</mat-button-toggle>
      </mat-button-toggle-group>
    </section>
    <pre>multiple value: {{ formMultiple().value() | json }}</pre>
  `,
  imports: [MatButtonToggleModule, FormField, JsonPipe],
})
export class ButtonToggleMaterial {
  formSingle = form(signal<string>(''));

  formMultiple = form(signal<string[]>([]));
}
