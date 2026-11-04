import { computed, effect, Service, signal } from '@angular/core';
import { form, minLength, required, validate } from '@angular/forms/signals';

@Service({ autoProvided: false })
export class PasswordGameFormService {
  form = form(signal(''), (schema) => {
    // "Your password must be at least 5 characters."
    validate(schema, ({ value }) => {
      if (value().length < 5) {
        // `minLength` is not eager, needs at least one character
        return { kind: 'minLengthEager', message: 'Password must be at least 5 characters' };
      } else {
        return null;
      }
    });
  });

  #numConditionsRevealed = signal(1);

  conditionsToShow = computed(() => {
    const errorKindsToShow = this.form()
      .errors()
      .map((error) => error.kind)
      .filter((_, index) => index < this.#numConditionsRevealed());

    return errorKindsToShow;
  });

  constructor() {
    effect(
      () => {
        const numConditionsRevealed = this.#numConditionsRevealed();

        if (
          numConditionsRevealed === 1 &&
          !this.form()
            .errors()
            .map((error) => error.kind)
            .includes('minLengthEager')
        ) {
          this.#numConditionsRevealed.set(2);
        }
      },
      { debugName: 'Add condition number' },
    );
  }
}
