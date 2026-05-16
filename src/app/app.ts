import { Component } from '@angular/core';
import { Links } from './links';
import { FormArrays } from './forms/form-arrays/form-arrays';
import { FormPrimitiveExamples } from './forms/form-primitive-examples/form-primitive-examples';
import { About } from './about';
import { ComplexTopics } from './forms/complex-topics';
import { FullCRUD } from './forms/full-crud/full-crud';
import { ProfileForm } from './large-form/input-tree/profile-form';

@Component({
  selector: 'app-root',
  imports: [Links, FormArrays, FormPrimitiveExamples, About, ComplexTopics, ProfileForm],
  template: `
    <h1>Signal Forms + NgRx + NgRx Toolkit</h1>

    <app-profile-form />

    <div id="info">
      <div>
        <h2>Links</h2>
        <app-links />
      </div>
      <div>
        <h2>About</h2>
        <app-about />
      </div>
    </div>

    <h2>Form Primitive Examples</h2>
    <app-form-primitive-examples />

    <h2>Form Arrays</h2>
    <app-form-arrays />

    <h2>Complex Topics</h2>
    <app-complex-topics />
  `,
  styles: `
    #info {
      display: flex;
      gap: 2rem;
    }
  `,
})
export class App {}
