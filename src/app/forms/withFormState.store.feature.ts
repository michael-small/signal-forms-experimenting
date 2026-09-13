import { updateState, withResource } from '@ngrx-toolkit/core';
import { rxResource } from '@angular/core/rxjs-interop';
import {
  signalMethod,
  signalStoreFeature,
  withComputed,
  withHooks,
  withLinkedState,
  withMethods,
  withProps,
} from '@ngrx/signals';
import { map, Observable } from 'rxjs';
import { linkedSignal, signal } from '@angular/core';
import { FieldTree, form, SchemaPathTree } from '@angular/forms/signals';

/**
 * @description RxJS first feature for:
 * - Syncing form data
 * - Handling default value
 * - Domain to form mapping
 *
 * Perhaps it could also prescribe form submission handling
 */
export function withFormState<DomainModel, FormModel>(args: {
  formDataStream: Observable<DomainModel>;
  defaultFormModel: FormModel;
  mapDomainToFormFn: (domain: DomainModel, extras?: unknown) => FormModel;
  mapFormToDomainFn: (form: FormModel, extras?: unknown) => DomainModel;
  schema: (schema: SchemaPathTree<FormModel>) => void;
}) {
  return signalStoreFeature(
    withResource(
      () => ({
        _formModel: rxResource({
          stream: () => args.formDataStream.pipe(map((domain) => args.mapDomainToFormFn(domain))),
          defaultValue: args.defaultFormModel,
        }),
      }),
      { errorHandling: 'previous value' },
    ),
    withMethods((store) => ({
      getFormModel: () => store._formModelValue(),
      setFormModel: (formValue: FormModel) =>
        updateState(store, 'set Form State', { _formModelValue: formValue }),
    })),
    withComputed((store) => ({
      domainModel: () => args.mapFormToDomainFn(store._formModelValue()),
    })),
    withProps((store) => ({
      _form: form(
        linkedSignal(() => store._formModelValue()),
        (schema) => args.schema(schema),
      ),
      _dirty: signal<boolean | null>(null),
      _touched: signal<boolean | null>(null),
      _submitting: signal<boolean | null>(null),
    })),
    withMethods((store) => ({
      syncFormForDevtoolsTracking: signalMethod<{
        form: FieldTree<FormModel, string | number, 'writable'>;
        touched: boolean;
        dirty: boolean;
        submitting: boolean;
      }>(
        (f: {
          form: FieldTree<FormModel, string | number, 'writable'>;
          touched: boolean;
          dirty: boolean;
          submitting: boolean;
        }) => {
          store._form = f.form;
          store._dirty.set(f.dirty);
          store._touched.set(f.touched);
          store._submitting.set(f.submitting);
        },
      ),
    })),
    withLinkedState((store) => {
      const _form = store._form;
      const _dirty = store._dirty;
      const _touched = store._touched;
      const _submitting = store._submitting;

      const functionMethodWarning = 'use sync fn';
      return {
        // TODO - once I can pass in the `set` type behavior, sync to this
        _formDevtoolsData: () => {
          const value = _form().value();
          const valid = _form().valid();
          const dirty = _dirty() ?? functionMethodWarning;
          const touched = _touched() ?? functionMethodWarning;
          const submitting = _submitting() ?? functionMethodWarning;
          const errorSummary = _form().errorSummary();
          const disabled = _form().disabled();
          const readonly = _form().readonly();
          return {
            value,
            valid,
            dirty,
            touched,
            submitting,
            errorSummary,
            disabled,
            readonly,
          };
        },
      };
    }),
  );
}
