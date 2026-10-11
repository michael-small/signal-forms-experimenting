# Reproduction cases for Material Bug "bug(mat-checkbox): with Signal Forms required(), MatCheckbox's own validator adds a duplicate required error that hides the schema error message #33945"

## How to Run

- `npm i`
- `ng serve`

---

### Is this a regression?

- [ ] Yes, this behavior used to work in the previous version

### The previous version in which this bug was not present was

_No response_

### Description

When a `mat-checkbox` is bound to a Signal Forms field with `[formField]` and the schema uses `required()`, the field ends up with **two** errors of kind `required`:

1. the schema error from `required(path, { message })` - has the custom `message`;
2. a `CompatValidationError` (kind `required`, no `message`) produced by `MatCheckbox.validate()`.

This happens with many components which have 'required' input and validate method from Validators interface.

### Reproduction

StackBlitz link: https://stackblitz.com/edit/1sinlau9-qd7bhr37?file=src%2Fexample%2Fcheckbox-signal-forms-example.ts
Steps to reproduce:

1. Open the console
2. Click the 'Show errors' button. The first `getError('required)` log shows `kind: required` and `message: undefined`. The second `errors()` log shows 2 errors.

As the result nothing is rendered

### Expected Behavior

- The field has a single `required` error, the one from the schema.

### Actual Behavior

- `errors()` contains two `required` errors: first a `CompatValidationError` from `MatCheckbox.validate()` (`message` is `undefined`), then the schema error.
- `getError('required')` returns the first one, so `getError('required')?.message` is `undefined` and nothing is rendered.

### Environment

- Angular: 22.0.6
- CDK/Material: 22.0.4
- Browser(s): Google Chrome Version 154.0.8037.98
- Operating System: MacOs 27.0
