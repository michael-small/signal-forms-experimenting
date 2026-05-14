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
      <h3>Multiple selection</h3>
      <mat-button-toggle-group aria-label="Ingredients" multiple [formField]="form">
        <mat-button-toggle value="flour">Flour</mat-button-toggle>
        <mat-button-toggle value="eggs">Eggs</mat-button-toggle>
        <mat-button-toggle value="sugar">Sugar</mat-button-toggle>
      </mat-button-toggle-group>
    </section>

    <pre>value: {{ form().value() | json }}</pre>
  `,
  imports: [MatButtonToggleModule, MatCheckboxModule, FormField, JsonPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonToggleMaterial {
  form = form(signal<string[]>([]));
}
