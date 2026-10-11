import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, inject, signal } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { disabled, form, FormField } from '@angular/forms/signals';
import { MatButtonModule } from '@angular/material/button';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

/**
 * @title Chips with form control
 */
@Component({
  selector: 'chips-form-control-example',
  template: `
    <h3>
      <a
        href="https://material.angular.dev/components/chips/examples#chips-form-control"
        target="_blank"
        >Chips with form control</a
      >
    </h3>
    <div class="example-button-container">
      <button matButton="elevated" (click)="model.update(m => ({ ...m, enabled: false }))">
        Disable form control
      </button>
      <button matButton="elevated" (click)="model.update(m => ({ ...m, enabled: true }))">
        Enable form control
      </button>
    </div>
    <p>
      <em>Enter video keywords</em>
    </p>
    <mat-form-field class="example-form-field">
      <mat-label>Video keywords</mat-label>
      <mat-chip-grid #chipGrid aria-label="Enter keywords" [formField]="form.word">
        @for (keyword of keywords(); track keyword) {
          <mat-chip-row (removed)="removeKeyword(keyword)">
            {{ keyword }}
            <button matChipRemove [attr.aria-label]="'remove ' + keyword">
              <mat-icon>cancel</mat-icon>
            </button>
          </mat-chip-row>
        }
      </mat-chip-grid>
      <input
        placeholder="New keyword..."
        [matChipInputFor]="chipGrid"
        (matChipInputTokenEnd)="add($event)"
      />
    </mat-form-field>

    <p><strong>The following keywords are entered:</strong> {{ form.word().value() }}</p>
  `,
  styles: `
    .example-form-field {
      width: 100%;
    }

    .example-button-container > button {
      margin: 0 12px;
    }
  `,
  imports: [MatButtonModule, MatFormFieldModule, MatChipsModule, MatIconModule, FormField],
})
export class ChipsFormControlExample {
  readonly keywords = signal(['angular', 'how-to', 'tutorial', 'accessibility']);

  protected model = signal({
    word: 'angular',
    enabled: true,
  });
  readonly form = form(this.model, (p) => {
    disabled(p, {
      when: ({ valueOf }) => !valueOf(p.enabled),
    });
  });

  announcer = inject(LiveAnnouncer);

  removeKeyword(keyword: string) {
    this.keywords.update((keywords) => {
      const index = keywords.indexOf(keyword);
      if (index < 0) {
        return keywords;
      }

      keywords.splice(index, 1);
      this.announcer.announce(`removed ${keyword}`);
      return [...keywords];
    });
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our keyword
    if (value) {
      this.keywords.update((keywords) => [...keywords, value]);
    }

    // Clear the input value
    event.chipInput!.clear();
  }
}
