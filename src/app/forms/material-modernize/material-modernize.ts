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
  ],
  template: `
    <em
      >NOTE: I name these to be exactly what they were based on from the docs, even though these are
      with signal forms and not reactive/template forms.</em
    >

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
