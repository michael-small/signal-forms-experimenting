import { Component } from '@angular/core';
import { AutocompleteAutoActiveFirstOptionExample } from './highlight-first-autocomplete-option';
import { ButtonToggleFormsExample } from './button-toggle-with-forms';
import { CheckboxReactiveFormsExample } from './checkbox-with-reactive-forms';
import { ChipsFormControlExample } from './chips-with-form-control';
import { DateRangePickerFormsExample } from './date-range-picker-forms-integration';
import { FormFieldErrorExample } from './form-field-with-error-messages';
import { InputClearableExample } from './input-with-a-clear-button';
import { RadioNgModelExample } from './radio-with-ngModel';
import { SelectHintErrorExample } from './select-with-form-field-features';
import { SlideToggleFormsExample } from './slide-toggle-with-forms';
import { SliderRangeExample } from './range-slider';
import { TimepickerFormsExample } from './timepicker-forms-integration';

@Component({
  selector: 'app-material-modernize',
  imports: [
    AutocompleteAutoActiveFirstOptionExample,
    ButtonToggleFormsExample,
    CheckboxReactiveFormsExample,
    ChipsFormControlExample,
    DateRangePickerFormsExample,
    FormFieldErrorExample,
    InputClearableExample,
    RadioNgModelExample,
    SelectHintErrorExample,
    SlideToggleFormsExample,
    SliderRangeExample,
    TimepickerFormsExample,
  ],
  template: `
    <a href="https://github.com/angular/components/issues/33945" target="_blank"
      >bug(mat-checkbox): with Signal Forms required(), MatCheckbox's own validator adds a duplicate
      required error that hides the schema error message #33945</a
    >

    <timepicker-forms-example />
    <slider-range-example />
    <slide-toggle-forms-example />
    <select-hint-error-example />
    <radio-ng-model-example />
    <input-clearable-example />
    <form-field-error-example />
    <date-range-picker-forms-example />
    <chips-form-control-example />
    <checkbox-reactive-forms-example />
    <button-toggle-forms-example />
    <autocomplete-auto-active-first-option-example />
  `,
})
export class MaterialModernize {}
