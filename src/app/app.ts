import { Component } from '@angular/core';
import { Links } from './links';
import { FormArrays } from './forms/form-arrays/form-arrays';
import { FormPrimitiveExamples } from './forms/form-primitive-examples/form-primitive-examples';
import { About } from './about';
import { ComplexTopics } from './forms/complex-topics';
import { FullCRUD } from './forms/full-crud/full-crud';

@Component({
  selector: 'app-root',
  imports: [Links, FormArrays, FormPrimitiveExamples, About, ComplexTopics, FullCRUD],
  template: `
    <h1>Signal Forms + NgRx + NgRx Toolkit</h1>

    <h2>Links</h2>
    <app-links />

    <h2>About</h2>
    <app-about />

    <h2>Form Primitive Examples</h2>
    <app-form-primitive-examples />

    <h2>Form Arrays</h2>
    <app-form-arrays />

    <h2>Complex Topics</h2>
    <app-complex-topics />

    <h2>Full CRUD</h2>
    <app-full-crud />
  `,
})
export class App {}
