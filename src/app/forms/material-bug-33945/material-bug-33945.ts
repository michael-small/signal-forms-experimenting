import { Component } from '@angular/core';
import { AutocompleteMaterialBug } from './autocomplete-material-bug';
import { ButtonToggleMaterialBug } from './button-toggle-material-bug';
import { CheckboxMaterialBug } from './checkbox-material-bug';
import { ChipsMaterialBug } from './chips-material-bug';
import { FormFieldMaterialBug } from './form-field-material-bug';
import { InputMaterialBug } from './input-material-bug';
import { RadioMaterialBug } from './radio-material-bug';
import { SelectMaterialBug } from './select-material-bug';
import { SlideToggleMaterialBug } from './slide-toggle-material-bug';
import { SliderMaterialBug } from './slider-material-bug';
import { TimepickerMaterialBug } from './timepicker-material-bug';
import { DatePickerMaterialBug } from './date-picker-material-bug';

@Component({
  selector: 'app-material-bug-33945',
  imports: [
    AutocompleteMaterialBug,
    ButtonToggleMaterialBug,
    CheckboxMaterialBug,
    ChipsMaterialBug,
    DatePickerMaterialBug,
    FormFieldMaterialBug,
    InputMaterialBug,
    RadioMaterialBug,
    SelectMaterialBug,
    SlideToggleMaterialBug,
    SliderMaterialBug,
    TimepickerMaterialBug,
  ],
  template: `
    <h2>
      <a href="https://github.com/angular/components/issues/33945" target="_blank"
        >bug(mat-checkbox): with Signal Forms required(), MatCheckbox's own validator adds a
        duplicate required error that hides the schema error message #33945</a
      >
    </h2>
    <p>leshaluffscats on GitHub</p>
    <blockquote>
      <p dir="auto">
        When a
        <code class="notranslate rgh-seen-8932205590 rgh-linkified-code rgh-seen--12550919362"
          >mat-checkbox</code
        >
        is bound to a Signal Forms field with
        <code class="notranslate rgh-seen-8932205590 rgh-linkified-code rgh-seen--12550919362"
          >[formField]</code
        >
        and the schema uses
        <code class="notranslate rgh-seen-8932205590 rgh-linkified-code rgh-seen--12550919362"
          >required()</code
        >, the field ends up with <strong>two</strong> errors of kind
        <code class="notranslate rgh-seen-8932205590 rgh-linkified-code rgh-seen--12550919362"
          >required</code
        >:
      </p>

      <p dir="auto">
        This happens with many components which have 'required' input and validate method from
        Validators interface.
      </p>

      <ol dir="auto">
        <li>
          the schema error from
          <code class="notranslate rgh-seen-8932205590 rgh-linkified-code rgh-seen--12550919362"
            >required(path,<span data-rgh-whitespace="space"> </span>{{ openCurly
            }}<span data-rgh-whitespace="space"> </span>message<span data-rgh-whitespace="space">
            </span
            >{{ closedCurly }})</code
          >
          - has the custom
          <code class="notranslate rgh-seen-8932205590 rgh-linkified-code rgh-seen--12550919362"
            >message</code
          >;
        </li>
        <li>
          a
          <code class="notranslate rgh-seen-8932205590 rgh-linkified-code rgh-seen--12550919362"
            >CompatValidationError</code
          >
          (kind
          <code class="notranslate rgh-seen-8932205590 rgh-linkified-code rgh-seen--12550919362"
            >required</code
          >, no
          <code class="notranslate rgh-seen-8932205590 rgh-linkified-code rgh-seen--12550919362"
            >message</code
          >) produced by
          <code class="notranslate rgh-seen-8932205590 rgh-linkified-code rgh-seen--12550919362"
            >MatCheckbox.validate()</code
          >.
        </li>
      </ol>

      <p dir="auto">
        This happens with many components which have 'required' input and validate method from
        Validators interface.
      </p>
    </blockquote>

    <timepicker-material-bug />
    <slider-material-bug />
    <slide-toggle-material-bug />
    <select-material-bug />
    <radio-material-bug />
    <input-material-bug />
    <form-field-material-bug />
    <date-picker-material-bug />
    <chips-material-bug />
    <checkbox-material-bug />
    <button-toggle-material-bug />
    <autocomplete-material-bug />
  `,
})
export class MaterialBug33945 {
  openCurly = '{';
  closedCurly = '}';
}
