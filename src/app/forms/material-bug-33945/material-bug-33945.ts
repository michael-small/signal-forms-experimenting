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
    <a href="https://github.com/angular/components/issues/33945" target="_blank"
      >bug(mat-checkbox): with Signal Forms required(), MatCheckbox's own validator adds a duplicate
      required error that hides the schema error message #33945</a
    >

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
export class MaterialBug33945 {}
