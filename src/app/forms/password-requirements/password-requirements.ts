import { JsonPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import {
  form,
  FormField,
  maxLength,
  minLength,
  pattern,
  required,
  SchemaPathTree,
  validateAsync,
} from '@angular/forms/signals';
import { SWAPIStarWarsMovies, SWAPIStore } from './async-stuff';
import { HttpResourceRef } from '@angular/common/http';

// Brainstorming various validators, whether they are good or bad from a security perspective
// Required, min length, max length, arbitrary list of banned common passwords

function passwordSchema(
  schema: SchemaPathTree<{ password: string }>,
  moviesResource: HttpResourceRef<SWAPIStarWarsMovies[]>,
) {
  required(schema.password, {
    message: 'Password is required',
  });
  // This is not seen in the errors summary if `required` precedes it
  minLength(schema.password, 8, {
    message: 'Password must be at least 8 characters',
  });
  maxLength(schema.password, 20, {
    // With how the validator works, you likely will not be able
    // to even see this message in practice, as the form won't let you.
    message: 'Arbitrarily 20 max length for testing purposes',
  });
  // Perhaps I would do this different in prod, but I find that with regex, multiple simple
  // regex patterns are easier to make and maintain than one singular monster pattern with everything
  // TODO - if this gets to multiple patterns, make it into its own schema function
  pattern(schema.password, /[A-Z]/, {
    message: 'Password must contain at least one uppercase letter',
  });

  validateAsync(schema.password, {
    params: () => null, // none needed, just fullfil signature
    factory: () => moviesResource,
    onSuccess: (values, ctx) => {
      const releaseYears = values
        .map((movie) => movie.release_date) // YYYY-MM-DD
        .map((val) => val.split('-')[0]);

      const passwordValue = ctx.stateOf(schema.password).value();

      return releaseYears.find((year) => passwordValue.includes(year))
        ? null
        : {
            kind: 'bad',
            message: 'Password should include a release year (YYYY) of a Star Wars movie.',
          };
    },
    onError: () => ({
      kind: 'serverError',
      message: 'Could not verify password',
    }),
  });
}

@Component({
  selector: 'app-password-requirements',
  imports: [FormField, JsonPipe],
  template: `
    <p>
      This is not a test of what is perhaps a decent industry standard password. This is just an
      exercise in validation. Depending on how this exercise works, I may even do silly things, like
      how some game I saw required a password to contain the day's Wordle answer.
    </p>

    <label>
      Password
      <input type="password" [formField]="form.password" />
    </label>

    <pre>{{ form().errorSummary() | json }}</pre>
  `,
})
export class PasswordRequirements {
  readonly #starWarsMoviesStore = inject(SWAPIStore);

  private model = signal({
    password: '',
  });

  protected form = form(this.model, (schema) => {
    passwordSchema(schema, this.#starWarsMoviesStore.movies);
  });
}
