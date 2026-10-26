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
    <h2>Material Modernize</h2>
    <em
      >NOTE: I name these to be exactly what they were based on from the docs, even though these are
      with signal forms and not reactive/template forms.</em
    >

    <app-timepicker-forms-example />
    <app-slider-range-example />
    <app-slide-toggle-forms-example />
    <app-select-hint-error-example />
    <app-radio-ng-model-example />
    <app-input-clearable-example />
    <app-form-field-error-example />
    <app-date-range-picker-forms-example />
    <app-chips-form-control-example />
    <app-checkbox-reactive-forms-example />
    <app-button-toggle-forms-example />
    <app-autocomplete-auto-active-first-option-example />
  `,
})
export class MaterialModernize {}
