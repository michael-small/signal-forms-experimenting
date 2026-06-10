import { Component } from '@angular/core';
import { AutocompleteAutoActiveFirstOptionExample } from './highlight-first-autocomplete-option';
import { ButtonToggleFormsExample } from './button-toggle-with-forms';
import { CheckboxReactiveFormsExample } from './checkbox-with-reactive-forms';
import { ChipsFormControlExample } from './chips-with-form-control';
import { DateRangePickerFormsExample } from './date-range-picker-forms-integration';
import { FormFieldErrorExample } from './form-field-with-error-messages';

@Component({
  selector: 'app-material-modernize',
  imports: [
    AutocompleteAutoActiveFirstOptionExample,
    ButtonToggleFormsExample,
    CheckboxReactiveFormsExample,
    ChipsFormControlExample,
    DateRangePickerFormsExample,
    FormFieldErrorExample,
  ],
  template: `
    <form-field-error-example />
    <date-range-picker-forms-example />
    <chips-form-control-example />
    <checkbox-reactive-forms-example />
    <button-toggle-forms-example />
    <autocomplete-auto-active-first-option-example />
  `,
})
export class MaterialModernize {}
