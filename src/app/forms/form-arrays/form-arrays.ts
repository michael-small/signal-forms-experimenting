import { Component, inject, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { SubformA } from './subform-a';
import { SubformB } from './subform-b';
import { FormService } from './form.service';
import { JsonPipe } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-form-arrays',
  imports: [FormField, SubformA, SubformB, JsonPipe, MatTabsModule],
  providers: [FormService],
  template: `
    <h2>Form Arrays</h2>
    <mat-tab-group animationDuration="0ms" mat-align-tabs="start" mat-stretch-tabs="false">
      <mat-tab label="Basic Array & Array Tracking">
        <h3>Basic Array & Array Tracking</h3>

        <div id="basic-array">
          @for (item of basicArrayForm; track item) {
            <label>
              Basic Array Form ({{ $index }}):
              <input type="text" [formField]="item" />
            </label>
          }
        </div>

        <blockquote
          cite="https://angular.dev/guide/forms/signals/field-state-management#tracking-values-for-array-fields"
        >
          <p>
            The forms system is already tracking the model values within the array and maintaining a
            stable identity of the fields it creates automatically. When an item changes, it may
            represent a new logical entity even if some of its properties look the same. Tracking by
            identity ensures the framework treats it as a distinct item rather than reusing existing
            UI elements. This prevents stateful elements, like form inputs, from being incorrectly
            shared and keeps bindings aligned with the correct part of the model.
          </p>
        </blockquote>
        <p>
          <a target="_blank" [href]="docLinks.trackingValuesForArrayFields"
            >-- Angular Docs: "Tracking values for array fields"</a
          >
        </p>
      </mat-tab>
      <mat-tab label="Differing Objects">
        <p>
          Disclaimer: I am not sure if the following approach for how child items are handled in
          child components is the intended best practice. But it seems to work fine? Will check with
          others.
        </p>

        <button id="add-item" type="button" (click)="formService.addItem()">Add Item</button>

        <div id="differing-objects-array">
          @for (item of formService.differingObjectsArrayForm.items; track item) {
            @if (item().value().type === 'A') {
              <app-subform-a [index]="$index" />
            } @else if (item().value().type === 'B') {
              <app-subform-b [index]="$index" />
            }
          }
        </div>

        <pre>{{ formService.differingObjectsArrayForm().value() | json }}</pre>
        <pre>Errors: {{ formService.differingObjectsArrayForm().errorSummary() | json }}</pre>
      </mat-tab>
    </mat-tab-group>
  `,
  styles: `
    #basic-array,
    #differing-objects-array {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    button#add-item {
      margin-bottom: 1rem;
    }
  `,
})
export class FormArrays {
  protected formService = inject(FormService);

  docLinks = {
    trackingValuesForArrayFields:
      'https://angular.dev/guide/forms/signals/field-state-management#tracking-values-for-array-fields',
  };

  basicArrayForm = form(signal(['a', 'b', 'c']));
}
