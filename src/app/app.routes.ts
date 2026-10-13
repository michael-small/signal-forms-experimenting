import { Routes } from '@angular/router';
import { FormArrays } from './forms/form-arrays/form-arrays';
import { FormPrimitiveExamples } from './forms/form-primitive-examples/form-primitive-examples';
import { ComplexTopics } from './forms/complex-topics';
import { LargeFormSplittingStrategies } from './large-form/large-form-splitting-strategies';
import { ShowingErrorsConditions } from './forms/showing-errors-conditions/showing-errors-conditions';
import { MaterialModernize } from './forms/material-modernize/material-modernize';
import { FormFieldCustomControlExample } from './forms/material-custom/form-field-custom-control-example';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'custom-control' },
  {
    path: 'custom-control',
    component: FormFieldCustomControlExample,
    title: 'Custom Form Control',
  },
  {
    path: 'form-primitives',
    component: FormPrimitiveExamples,
    title: 'Form Primitive Examples',
  },
  { path: 'form-arrays', component: FormArrays, title: 'Form Arrays' },
  {
    path: 'showing-errors',
    component: ShowingErrorsConditions,
    title: 'Showing Errors Conditions',
  },
  { path: 'complex-topics', component: ComplexTopics, title: 'Complex Topics' },
  {
    path: 'large-form',
    component: LargeFormSplittingStrategies,
    title: 'Large Form Splitting Strategies',
  },
  {
    path: 'material-modernize',
    component: MaterialModernize,
    title: 'Material Modernize Examples',
  },
  { path: '**', redirectTo: 'custom-control' },
];
