import { updateState, withResource } from '@ngrx-toolkit/core';
import { rxResource } from '@angular/core/rxjs-interop';
import {
  signalStoreFeature,
  withComputed,
  withHooks,
  withLinkedState,
  withMethods,
} from '@ngrx/signals';
import { map, Observable } from 'rxjs';
import { linkedSignal } from '@angular/core';
import { form, SchemaPathTree } from '@angular/forms/signals';

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
    withLinkedState((store) => {
      const ls = linkedSignal(() => store._formModelValue());
      const _form = form(ls, (schema) => args.schema(schema));

      return {
        _formDevtoolsData: () => {
          const value = _form().value();
          const dirty = _form().dirty();
          const errorSummary = _form().errorSummary();
          const disabled = _form().disabled();
          const readonly = _form().readonly();
          const submitting = _form().submitting();
          return { value, dirty, errorSummary, disabled, readonly, submitting };
        },
      };
    }),
  );
}
